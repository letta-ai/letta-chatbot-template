import { Letta } from '@letta-ai/letta-client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMessageId = (message: Letta.agents.LettaStreamingResponse) => {
  if (message.messageType === 'usage_statistics') {
    return message.messageType
  }
  if ('id' in message) {
    return message.messageType + message.id
  }
}
