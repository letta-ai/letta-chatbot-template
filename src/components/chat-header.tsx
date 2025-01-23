import { AgentDetailsTrigger } from './ui/agent-details';

export const ChatHeader: React.FC<{ agentName: string }> = ({ agentName }) => {
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
