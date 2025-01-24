import { useEffect, useRef } from 'react';
import { MessagePill } from '@/components/ui/message';
import { useAgentContext } from '../../app/[agentId]/context/agent-context';
import { useAgentMessages } from '../hooks/use-agent-messages';
import { Ellipsis, LoaderCircle } from 'lucide-react';
import { MessagePopover } from './message-popover';
import { DEFAULT_BOT_MESSAGE, ERROR_CONNECTING } from '@/app/lib/labels';
import { useIsConnected } from '../hooks/use-is-connected';
import { useAgents } from '../hooks/use-agents';

interface MessagesProps {
  isSendingMessage: boolean;
}

export const Messages = (props: MessagesProps) => {
  const { isSendingMessage } = props;
  const { agentId } = useAgentContext();
  const { data: messages, isLoading } = useAgentMessages(agentId);
  const { data: agents } = useAgents()

  const messagesListRef = useRef<HTMLDivElement>(null);
  const isConnected = useIsConnected()

  const mounted = useRef(false);

  useEffect(() => {
    if (!messages) {
      return;
    }

    // scroll to the bottom on first render
    if (messagesListRef.current && !mounted.current) {
      messagesListRef.current.scrollTo(0, messagesListRef.current.scrollHeight);
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (messagesListRef.current) {
      // only scroll to the bottom is user is 100px away from the bottom
      const boundary = 100;
      const bottom = messagesListRef.current.scrollHeight - messagesListRef.current.clientHeight - boundary;

      if (messagesListRef.current.scrollTop >= bottom || isSendingMessage) {
        messagesListRef.current.scrollTo(0, messagesListRef.current.scrollHeight);
      }
    }
  }, [messages, isSendingMessage]);



  return (
    <div ref={messagesListRef} className="flex-1 overflow-auto">
      <div className="group/message mx-auto w-full max-w-3xl px-4 h-full">
        <div className="flex h-full">

          {messages ? (
            messages.length === 1 &&
            messages[0].message === DEFAULT_BOT_MESSAGE ? (
              <MessagePopover key={messages[0].id} />
            ) : (
              <div className="flex min-w-0 flex-1 flex-col gap-6 pt-4">

                {messages.map((message) => {
                  return (
                    <MessagePill
                      key={message.id}
                      message={message.message}
                      sender={message.messageType}
                    />
                  )
                })}
                {isSendingMessage && (
                  <div className="flex justify-start">
                    <Ellipsis size={24} className="animate-spin" />
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="flex min-w-0 flex-1 flex-col justify-center items-center h-full">
              {isLoading || (isConnected && agents && agents.length === 0) ? (
                <LoaderCircle className="animate-spin" size={32} />
              ) : (
                ERROR_CONNECTING
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};