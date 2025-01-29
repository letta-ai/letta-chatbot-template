'use client';

import { useAgentContext } from './[agentId]/context/agent-context';
import { SidebarArea } from '@/components/sidebar-area/sidebar-area';
import { ChatHeader } from '@/components/chat-header';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAgents } from '@/components/hooks/use-agents';
import { useParams } from 'next/navigation';


export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const { agentId: agentIdFromParams } = params;
  const { data, isLoading } = useAgents();
  const { setAgentId } = useAgentContext();
  const ref = useRef(false);

  useEffect(() => {
    if (data && data.length > 0 && !ref.current) {
      console.log('data', data);
      setAgentId(data[0].id);
      ref.current = true;
    }
  }, [data, setAgentId, agentIdFromParams]);

  return (
    <>
      <SidebarArea />
      <main className="relative flex h-dvh w-dvw flex-col overflow-hidden">
        <div className="flex border-b border-border p-2.5 gap-3 w-full">
          <ChatHeader />
        </div>
        {children}
      </main>
    </>
  );
}
