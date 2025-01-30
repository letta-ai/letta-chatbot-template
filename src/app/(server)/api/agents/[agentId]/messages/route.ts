import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import client from '@/config/letta-client';
import { filterMessages } from './helpers';
import { Letta } from '@letta-ai/letta-client';

async function getAgentMessages(
  _req: NextApiRequest,
  { params }: { params: { agentId: string } },
) {
  try {
    const { agentId } = await params;
    const messages = await client.agents.messages.list(agentId, {
      limit: 100,
    });

    const result = filterMessages(
      messages as Letta.LettaMessageUnion[],
    );
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

  return new NextResponse(
    new ReadableStream({
      async start(controller) {
        const response = await client.agents.messages.createStream(
          agentId,
          {
            streamTokens: true,
            messages: [
              {
                role,
                content: text,
              },
            ],
          },
        );

        for await (const message of response) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(message)}\n\n`),
          );
        }

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
}

export const GET = getAgentMessages;
export const POST = sendMessage;
