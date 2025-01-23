import { AgentDetailsTrigger } from './ui/agent-details';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgentState } from './hooks/use-agent-state';

export const ChatHeader: React.FC = () => {
    const { agentId } = useAgentContext();
    const { data: agentData } = useAgentState(agentId);

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="text-l font-bold">{agentData?.name}</div>
                <AgentDetailsTrigger />
            </div>
        </div>
    );
};
