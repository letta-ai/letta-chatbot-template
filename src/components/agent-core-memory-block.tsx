import { useEffect, useState } from 'react';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgentState } from './hooks/use-agent-state';

export function AgentCoreMemoryBlock() {
    const { agentId } = useAgentContext();
    const { data } = useAgentState(agentId);
    const coreMemory = data?.memory.blocks || [];

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
