import { AppMessage, MessageType } from '@/types';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import client from '@/config/letta-client';

// TODO: fix typing below once SDK is fixed
function filterMessages(data: AppMessage[]): AppMessage[] {
    return data
        .filter((item) => {
            if (item.messageType === MessageType.USER_MESSAGE) {
                return isValidUserMessage(item.message);
            }
            return item.messageType === MessageType.TOOL_CALL_MESSAGE;
        })
        .map((item) => extractMessage(item))
        .filter((item) => item !== null)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function isValidUserMessage(message: string | undefined): boolean {
    if (!message) return false;
    try {
        const parsedMessage = JSON.parse(message);
        return !!parsedMessage.message;
    } catch {
        return false;
    }
}

function extractMessage(item: AppMessage): AppMessage | null {
    const { messageType, id, message, date, toolCall } = item;
    let extractedMessage = '';

    if (messageType === MessageType.USER_MESSAGE && message) {
        extractedMessage = parseMessage(message, id, 'user_message');
    } else if (messageType === MessageType.TOOL_CALL_MESSAGE && toolCall) {
        extractedMessage = parseMessage(toolCall.arguments, id, 'toolCall arguments');
    }

    if (!extractedMessage) return null;

    return { messageType, id, date, message: extractedMessage };
}

function parseMessage(content: string, id: string, context: string): string {
    try {
        const parsedContent = JSON.parse(content);
        return parsedContent.message || '';
    } catch (error) {
        console.error(`Failed to parse ${context} for id ${id}:`, error);
        return '';
    }
}

async function getAgentMessages(
    req: NextApiRequest,
    { params }: { params: { agentId: string } },
) {
    try {
        const { agentId } = await params;
        const messages = await client.agents.messages.list(agentId, {
            limit: 100,
        });
        console.log('====> result', messages)
        const result = filterMessages(messages);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return {};
    }
}

async function sendMessage(
    req: NextRequest,
    { params }: { params: { agentId: string } },
) {
    const { role, text } = await req.json();
    const { agentId } = await params;

    // set up eventstream
    const encoder = new TextEncoder();

    const response = new NextResponse(
        new ReadableStream({
            async start(controller) {
                const response = await client.agents.messages.create(agentId, {
                    messages: [
                        {
                            role,
                            text,
                        },
                    ],
                });
                const messageToSend = filterMessages(response.messages)?.[0];
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(messageToSend)}\n\n`));

                controller.close();
                // Close connection on request close
                req.signal.addEventListener('abort', () => {
                    controller.close();
                });
            },
        }),
        {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            },
        },
    );

    return response;
}

export const GET = getAgentMessages;
export const POST = sendMessage;
