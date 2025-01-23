import { Button } from '@/components/ui/button';
import { LoaderCircle, PlusIcon } from 'lucide-react';
import { AppSidebar } from '@/components/sidebar-area/app-sidebar';
import { Sidebar } from '../ui/sidebar';
import { useAgentContext } from '@/app/[agentId]/context/agent-context';
import { useCreateAgent } from '../hooks/use-create-agent';
import { useQueryClient } from '@tanstack/react-query';
import { USE_AGENTS_KEY } from '../hooks/use-agents';
import { AgentState } from '@letta-ai/letta-client/api';
import { StatusCircle } from '../ui/status-circle';

export function SidebarArea() {
  const { agentId, setAgentId } = useAgentContext();
  const queryClient = useQueryClient();
  const { mutate: createAgent, isPending } = useCreateAgent();

  const handleCreateAgent = () => {
    if (isPending) return;
    createAgent(undefined, {
      onSuccess: (data) => {
        queryClient.setQueriesData(
          { queryKey: USE_AGENTS_KEY },
          (oldData: AgentState[]) => {
            return [data, ...oldData];
          },
        );
        setAgentId(data.id);
        // window.history.pushState(null, '', `/${data.id}`);
      },
    });
  };

  return (
    <Sidebar>
      <div className="flex flex-row items-center justify-between">
        <div className="text-xs font-bold relative flex w-full min-w-0 cursor-default p-2.5 pl-4">
          <div
            className="flex items-center w-full"
            onClick={() => {
              const divToScroll = document.getElementById('agents-list');
              if (divToScroll) {
                divToScroll.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <StatusCircle isLoading={agentId !== null} />
            {window.location.hostname === 'localhost' ? 'LOCAL SERVER' : 'REMOTE SERVER'}
          </div>
        </div>
        <div className="flex justify-end p-2">
          <Button
            disabled={isPending}
            type="button"
            onClick={handleCreateAgent}
            className="inline-flex size-3 h-fit items-center justify-center whitespace-nowrap bg-transparent font-medium text-primary shadow-none ring-offset-background transition-colors hover:hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isPending ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <PlusIcon width={16} height={16} />
            )}
          </Button>
        </div>
      </div>
      <AppSidebar />
    </Sidebar>
  );
}
