'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AgentProvider } from './context/agent-context';
import { SidebarContent } from '@/components/sidebar-content';
import { ChatHeader } from '@/components/chat-header';
import { AgentDetailsProvider, AgentDetailsTrigger } from '@/components/ui/agent-details';

export default function Layout({ children }: { children: React.ReactNode }) {

	return (
		<SidebarProvider>
			<AgentProvider>
				<AgentDetailsProvider>
					<SidebarContent />
					<main className="relative flex h-dvh w-dvw flex-col overflow-hidden">
						<div className="flex border-b border-border p-2.5 gap-3">
							<SidebarTrigger />
							<ChatHeader />
						</div>
						{children}
					</main>
				</AgentDetailsProvider>
			</AgentProvider>
		</SidebarProvider>
	);
}
