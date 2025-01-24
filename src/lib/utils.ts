import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppMessage } from '@/types';
import * as Letta from '@letta-ai/letta-client/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function extractMessage(item: Letta.LettaMessageUnion): AppMessage | null {
  const { messageType } = item;

  if (messageType === 'user_message') {
    if (!item.message) {
      return null;
    }

    return {
      id: item.id,
      date: new Date(item.date).getTime(),
      message: item.message,
      messageType: 'user_message',
    };
  }

  if (messageType === 'tool_call_message') {
    return {
      id: item.id,
      date: new Date(item.date).getTime(),
      message: item.toolCall.arguments || '',
      messageType: 'tool_call_message',
    };
  }

  return null;

}

export function filterMessages(data: Letta.LettaMessageUnion[]): AppMessage[] {
  return data
    .map((item) => extractMessage(item))
    .filter((item) => item !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}