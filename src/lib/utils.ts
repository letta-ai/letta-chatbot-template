import { Letta } from '@letta-ai/letta-client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AssistantMessageContent } from '@letta-ai/letta-client/api/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMessageId = (message: Letta.agents.LettaStreamingResponse): string => {
  if (message.messageType === 'usage_statistics') {
    return message.messageType
  }
  if ('id' in message) {
    return message.messageType + message.id
  }

  return '';
}


export const extractMessageText = (message: AssistantMessageContent) => {
  if (typeof message === 'string') {
    return message
  } else if (Array.isArray(message)) {
    return message.map((content) => {
      if (typeof content === 'string') {
        return content
      }

      return content.text
    }).join(' ')
  }

  return ''
};

