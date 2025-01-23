import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useEffect, useState } from 'react';
import { AgentDetailsTrigger } from './ui/agent-details';

export const ChatHeader: React.FC = () => {
  const { agentId } = useAgentContext();
  const [agentName, setAgentName] = useState('');

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(`/api/agents/${agentId}`);
        const agent = await response.json();
        setAgentName(agent.name);
      } catch (error) {
        console.error('Error fetching agent:', error);
      }
    };

    if (agentId) {
      fetchAgent();
    }
  }, [agentId]);

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
