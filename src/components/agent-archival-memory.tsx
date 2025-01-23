import { useEffect, useState } from 'react';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgentArchivalMemory } from './hooks/use-agent-archival-memory';

export function AgentArchivalMemory() {
    const { agentId } = useAgentContext();
    const { data } = useAgentArchivalMemory(agentId);
    const archivalMemory = data || [];

    return (
        <div>
            {archivalMemory.map((block) => (
                <div key={block.id} className='mb-2'>
                    <span className='text-sm'>{block.text}</span>
                </div>
            ))}
        </div>
    );
}
