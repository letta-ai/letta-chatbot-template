import { Letta } from '@letta-ai/letta-client';

export interface AppMessage {
    id: string;
    date: number;
    message: string;
    messageType: Letta.agents.MessagesListResponseItem['messageType'];
}

export enum MESSAGE_TYPE {
    USER_MESSAGE = 'user_message',
    TOOL_CALL_MESSAGE = 'tool_call_message',
    REASONING_MESSAGE = 'reasoning_message',
}