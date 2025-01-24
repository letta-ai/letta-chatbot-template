import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getAgentMessagesQueryKey } from './use-agent-messages';
import { AppMessage, MessageType } from '../../types';

export function useSendMessage() {
    const queryClient = useQueryClient();

    async function sendMessage(agentId: string, text: string) {
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
                            messageType: MessageType.USER_MESSAGE,
                        },
                        {
                            id: 'deleteme_',
                            date: Date.now(),
                            message: 'Typing...',
                            messageType: MessageType.TOOL_CALL_MESSAGE,
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
                    const response = JSON.parse(message.data) as AppMessage;
                    queryClient.setQueriesData<AppMessage[]>(
                        {
                            queryKey: getAgentMessagesQueryKey(agentId),
                        },
                        (_data) => {
                            if (!_data) {
                                return _data;
                            }
                            const data = _data.filter((message) => message.id !== 'deleteme_');

                            const existingMessage = data.find((message) => message.id === response.id);
                            if (existingMessage) {
                                return data.map((message) => {
                                    if (message.id === response.id) {
                                        return {
                                            ...message,
                                            ...response,
                                        };
                                    }
                                    return message;
                                });
                            }
                            return [...data, response];
                        },
                    );
                },
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    return useMutation({
        mutationFn: ({ agentId, text }: { agentId: string; text: string }) =>
            sendMessage(agentId, text),
    });
}
