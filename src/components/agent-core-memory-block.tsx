import { useEffect, useState } from 'react';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgentState } from './hooks/use-agent-state';
import { Letta } from '@letta-ai/letta-client';

export function AgentCoreMemoryBlock() {
    const { agentId } = useAgentContext();
    const { data } = useAgentState(agentId);
    const [error, setError] = useState<string>('');
    const coreMemory = data?.memory.blocks || [];

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!coreMemory) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {coreMemory.map((block) => (
                <div key={block.id} className='mb-2'>
                    <h3 className='text-sm font-bold mb-1'>{block.label}</h3>
                    <span className='text-sm'>{block.value}</span>
                </div>
            ))}
        </div>
    );
}
