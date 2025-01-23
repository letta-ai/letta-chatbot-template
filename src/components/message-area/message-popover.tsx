import React from 'react';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSendMessage } from '../hooks/use-send-message';
import { useAgentContext } from '@/app/(chat)/context/agent-context';

export const MessagePopover: React.FC = () => {
  const isMobile = useIsMobile();
  const { agentId } = useAgentContext();
  const { mutate: sendMessage } = useSendMessage();

  const suggestedActions = [
    {
      title: 'What is Letta?',
      description: 'Card Description',
      action: 'What is Letta?',
    },
    {
      title: 'Lorum ipsum',
      description: 'Card Description',
      action: 'Lorum ipsum',
    },
    {
      title: 'Lorum ipsum 2',
      description: 'Card Description',
      action: 'Lorum ipsum 2',
    },
    {
      title: 'Lorum ipsum 3',
      description: 'Card Description',
      action: 'Lorum ipsum 3',
    },
  ];

  return (
    <div className="flex flex-col items-center h-full justify-between">
      <div className="flex top-component pt-20">
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 w-full`}>
        {suggestedActions
          .slice(0, isMobile ? 2 : suggestedActions.length)
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
