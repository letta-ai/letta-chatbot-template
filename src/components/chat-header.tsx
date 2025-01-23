import { AgentDetailsTrigger } from './ui/agent-details';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgentState } from './hooks/use-agent-state';
import { useAgents } from './hooks/use-agents';

export const ChatHeader: React.FC = () => {
    const { agentId } = useAgentContext();
    const { data: agentData } = useAgents();

    const selectedAgent = agentData?.find((a) => a.id === agentId);

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="text-l font-bold">{selectedAgent?.name}</div>
                <AgentDetailsTrigger />
            </div>
        </div>
    );
};
