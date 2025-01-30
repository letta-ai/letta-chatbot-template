import { AgentDetailsTrigger } from './ui/agent-details';
import { useAgentContext } from '@/app/[agentId]/context/agent-context';
import { useAgents } from './hooks/use-agents';
import { SkeletonLoadBlock } from './ui/skeleton-load-block';
import { SidebarTrigger } from './ui/sidebar';
import { ReasoningMessageSwitch } from './toggle-reasoning-messages';
import { LoaderCircle } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  const { agentId } = useAgentContext();
  const { data: agentData, isLoading } = useAgents();

  const selectedAgent =
    agentData &&
    agentData.length > 0 &&
    agentData?.find((a) => a.id === agentId);

  return (
    <>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 w-1/2 overflow-hidden">
            <SidebarTrigger />
            <div className="w-full overflow-hidden hidden sm:block">
              {isLoading ? (
                <SkeletonLoadBlock className="w-[10em] h-[1em]" />
              ) : (
                <div className="text-l font-bold truncate">
                  {selectedAgent?.name}
                </div>
              )}
            </div>
          </div>
          <div className="flex h-[2em]">
            {isLoading ? (
              <LoaderCircle
                className="flex w-max h-max animate-spin"
                size={17}
              />
            ) : (
              <div className="flex flex-row gap-1">
                <ReasoningMessageSwitch />
                <AgentDetailsTrigger isLoading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
