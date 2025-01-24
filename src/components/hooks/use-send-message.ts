import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getAgentMessagesQueryKey } from './use-agent-messages';
import { AppMessage } from '../../types';
import * as Letta from '@letta-ai/letta-client/api';

export interface UseSendMessageType {
    agentId: string,
    text: string
}

export function useSendMessage() {
    const queryClient = useQueryClient();

    async function sendMessage(options: UseSendMessageType) {
        const { agentId, text } = options;
        const url = `/api/agents/${agentId}/messages`;
        try {
            queryClient.setQueriesData<AppMessage[]>(
                {
                    queryKey: getAgentMessagesQueryKey(agentId),
                },
                (data) => {
                    if (!data) {
                        return data;
                    }

                    return [
                        ...data,
                        {
                            id: 'new_' + Date.now(),
                            date: Date.now(),
                            message: text,
                            messageType: 'user_message',
                        },
                    ];
                },
            );

            await fetchEventSource(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'user', text }),
                onmessage: (message) => {
                    const response = JSON.parse(message.data) as Letta.agents.LettaStreamingResponse;
                    queryClient.setQueriesData<AppMessage[] | undefined>(
                        {
                            queryKey: getAgentMessagesQueryKey(agentId),
                        },
                        (_data) => {
                            if (!_data) {
                                return _data;
                            }

                            const data = _data.filter((message) => message.id !== 'deleteme_');

                            const existingMessage = data.find((message) => message.id === response?.id);

                            if (response.messageType !== 'assistant_message') {
                                return data;
                            }

                            if (existingMessage) {
                                return data.map((message) => {
                                    if (message.id === response.id) {
                                        return {
                                            id: response.id,
                                            date: new Date(response.date).getTime(),
                                            messageType: response.messageType,
                                            message: `${existingMessage.message || ''}${response.assistantMessage || ''}`,
                                        };
                                    }

                                    return message;
                                });
                            }

                            return [...data, {
                                id: response.id,
                                date: new Date(response.date).getTime(),
                                messageType: response.messageType,
                                message: response.assistantMessage || '',
                            }];
                        },
                    );
                },
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    return useMutation<void, undefined, UseSendMessageType>({
        mutationFn: (options) => sendMessage(options),
    });
}
