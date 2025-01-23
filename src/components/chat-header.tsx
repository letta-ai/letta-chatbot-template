import { AgentDetailsTrigger } from './ui/agent-details';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgentState } from './hooks/use-agent-state';

export const ChatHeader: React.FC = () => {
    const { agentId, setAgentId } = useAgentContext();
    const { data: agentData } = useAgentState(agentId);
    const agentName = agentData?.name;
    return (
        <div className="flex-1">
            {agentName && (
                <div className="flex items-center justify-between">
                    <div className="text-l font-bold">{agentName}</div>
                    <AgentDetailsTrigger />
                </div>
            )}
        </div>
    );
};
