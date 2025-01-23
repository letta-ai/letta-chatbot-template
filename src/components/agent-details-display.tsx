'use client';

import { useEffect } from 'react';
import { AgentCoreMemoryBlock } from './agent-core-memory-block';
import { useAgentDetails } from './ui/agent-details';
import { AgentArchivalMemory } from './agent-archival-memory';

export function AgentDetailDisplay() {
    const { isOpen } = useAgentDetails();

    if (!isOpen) {
        return null;
    }

    return (
        <div className='pt-2 px-6'>
            {[
                { title: 'CORE MEMORY', component: <AgentCoreMemoryBlock /> },
                { title: 'ARCHIVAL MEMORY', component: <AgentArchivalMemory /> }
            ].map((section, index) => (
                <section key={index} className='pb-4'>
                    <header className='text-[0.75rem] font-bold py-4'>{section.title}</header>
                    <div className='flex'>
                        <div className='w-[0.25em] bg-gray-200 mr-4' />
                        {section.component}
                    </div>
                </section>
            ))}

        </div>
    );
}

