'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AgentProvider, useAgentContext } from './context/agent-context';
import { SidebarContent } from '@/components/sidebar-content';
import { ChatHeader } from '@/components/chat-header';
import { AgentDetailsProvider } from '@/components/ui/agent-details';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAgents } from '@/components/hooks/use-agents';
import { useAgentState } from '@/components/hooks/use-agent-state';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data } = useAgents();
	const { agentId, setAgentId } = useAgentContext();
	const { data: agentData } = useAgentState(agentId);
	const agentName = agentData?.name;

	const ref = useRef(false);

	useEffect(() => {
		if (data && data.length > 0 && !ref.current) {
			setAgentId(data[0].id);
			ref.current = true;
		}
	}, [data, setAgentId]);

	return (
		<>
			<SidebarContent />
			<main className="relative flex h-dvh w-dvw flex-col overflow-hidden">
				<div className="flex border-b border-border p-2.5 gap-3">
					<SidebarTrigger />
					<ChatHeader agentName={agentName || ''} />
				</div>
				{children}
			</main>
		</>
	);
}
