import React from 'react';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSendMessage } from '../hooks/use-send-message';
import { useAgentContext } from '@/app/[agentId]/context/agent-context';
import { MESSAGE_POPOVER_DESCRIPTION, suggestedChatActions } from '@/app/lib/labels';

export const MessagePopover: React.FC = () => {
  const isMobile = useIsMobile();
  const { agentId } = useAgentContext();
  const { mutate: sendMessage } = useSendMessage();

  return (
    <div className="flex flex-col items-center h-full justify-between">
      <div className="flex top-component pt-20">
        <p className="text-center">
          {MESSAGE_POPOVER_DESCRIPTION}
        </p>
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 w-full`}>
        {suggestedChatActions
          .slice(0, isMobile ? 2 : suggestedChatActions.length)
          .map((card, index) => (
            <Card
              key={index}
              onClick={() => {
                sendMessage({ agentId: agentId, text: card.action });
              }}
              className="cursor-pointer shadow-none hover:bg-accent transition-shadow duration-300"
            >
              <CardHeader>
                <p className="text-sm font-medium leading-none !font-bold">
                  {card.title}
                </p>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
};
