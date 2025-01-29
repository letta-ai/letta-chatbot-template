import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppMessage, MESSAGE_TYPE } from '@/types';
import * as Letta from '@letta-ai/letta-client/api';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TEMP: todo remove
const tryParseUserExtractedMessage = (message: string): string | null => {
  try {
    const parsed = JSON.parse(message);
    if (parsed.type === MESSAGE_TYPE.USER_MESSAGE) {
      return parsed.message;
    }

    return null;
  } catch (e) {
    return null;
  }
}

const tryParseAssistantExtractedMessage = (message: string): string | null => {
  try {
    const parsed = JSON.parse(message);
    if (parsed.message) {
      return parsed.message;
    }

    return null;
  } catch (e) {
    return null;
  }
}

function extractMessage(item: Letta.LettaMessageUnion): AppMessage | null {
  const { messageType } = item;

  if (messageType === MESSAGE_TYPE.USER_MESSAGE) {
    if (!item.content) {
      return null;
    }

    const message = typeof item.content === 'string' ? item.content : item.content.text;

    const extractedMessage = tryParseUserExtractedMessage(message);

    if (!extractedMessage) {
      return null;
    }

    return {
      id: item.id,
      date: new Date(item.date).getTime(),
      message: extractedMessage,
      messageType: MESSAGE_TYPE.USER_MESSAGE,
    };
  }

  if (messageType === MESSAGE_TYPE.TOOL_CALL_MESSAGE && item.toolCall.name === 'send_message') {
    const extractedMessage = tryParseAssistantExtractedMessage(item.toolCall.arguments || '');

    return {
      id: item.id,
      date: new Date(item.date).getTime(),
      message: extractedMessage || '',
      messageType: MESSAGE_TYPE.TOOL_CALL_MESSAGE,
    };
  }

  if (messageType === MESSAGE_TYPE.REASONING_MESSAGE) {
    return {
      id: item.id,
      date: new Date(item.date).getTime(),
      message: item.reasoning || '',
      messageType: MESSAGE_TYPE.REASONING_MESSAGE,
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