import { Letta } from '@letta-ai/letta-client';

export interface AppMessage {
  id: string;
  date: number;
  message: string;
  messageType: Letta.agents.MessagesListResponseItem['messageType'];
}
