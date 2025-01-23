'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAgentContext } from './context/agent-context';
import { SidebarContent } from '@/components/sidebar-content';
import { ChatHeader } from '@/components/chat-header';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAgents } from '@/components/hooks/use-agents';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data } = useAgents();
	const { setAgentId } = useAgentContext();
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
					<ChatHeader />
				</div>
				{children}
			</main>
		</>
	);
}
