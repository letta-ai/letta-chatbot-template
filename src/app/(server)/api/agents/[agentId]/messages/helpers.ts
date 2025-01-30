import { getMessageId } from '@/lib/utils';
import { AppMessage, MESSAGE_TYPE } from '@/types';
import * as Letta from '@letta-ai/letta-client/api';

const tryParseAssistantExtractedMessage = (
  message: string,
): string | null => {
  try {
    const parsed = JSON.parse(message);
    if (parsed.message) {
      return parsed.message;
    }

    return null;
  } catch (e) {
    return null;
  }
};

function extractMessage(
  item: Letta.LettaMessageUnion,
): AppMessage | null {
  const { messageType } = item;

  if (messageType === MESSAGE_TYPE.USER_MESSAGE) {
    if (!item.content) {
      return null;
    }

    const message =
      typeof item.content === 'string'
        ? item.content
        : item.content.text;
    if (!message) {
      return null;
    }

    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: message,
      messageType: MESSAGE_TYPE.USER_MESSAGE,
    };
  }

  if (messageType === MESSAGE_TYPE.TOOL_CALL_MESSAGE) {
    const extractedMessage = tryParseAssistantExtractedMessage(
      item.toolCall.arguments || '',
    );
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: extractedMessage || '',
      messageType: MESSAGE_TYPE.ASSISTANT_MESSAGE,
    };
  }

  if (messageType === MESSAGE_TYPE.ASSISTANT_MESSAGE) {
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: item.content || '',
      messageType: MESSAGE_TYPE.ASSISTANT_MESSAGE,
    };
  }

  if (messageType === MESSAGE_TYPE.REASONING_MESSAGE) {
    return {
      id: getMessageId(item),
      date: new Date(item.date).getTime(),
      message: item.reasoning || '',
      messageType: MESSAGE_TYPE.REASONING_MESSAGE,
    };
  }

  return null;
}

export function filterMessages(
  data: Letta.LettaMessageUnion[],
): AppMessage[] {
  return data
    .map((item) => extractMessage(item))
    .filter((item) => item !== null)
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
}
