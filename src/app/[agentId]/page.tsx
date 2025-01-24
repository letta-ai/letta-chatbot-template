'use client';

import { Messages } from '@/components/message-area/messages';
import { MessageComposer } from '@/components/message-area/message-composer';
import { useAgentDetails } from '@/components/ui/agent-details';
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { useSendMessage } from '@/components/hooks/use-send-message';

export default function Home() {
  const { isOpen } = useAgentDetails();
  const isMobile = useIsMobile();

  const { isPending, mutate: sendMessage } = useSendMessage()

  return (
    <div className="flex flex-row flex-1 h-0">
      {!isMobile || (isMobile && !isOpen) ? (
        <div className="relative flex flex-col flex-1 h-full min-w-0 gap-5 overflow-hidden bg-background pt-4">
          <Messages isSendingMessage={isPending} />
          <MessageComposer sendMessage={sendMessage} isSendingMessage={isPending} />
        </div>
      ) : null}
      <AgentDetailDisplay />
    </div>
  );
}
