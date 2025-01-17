'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AgentProvider } from './context/agent-context';
import { SidebarContent } from '@/components/sidebar-content';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AgentProvider>
				<SidebarContent />
				<main className="relative flex h-dvh w-dvw flex-col overflow-hidden space-y-2 p-2.5">
					<SidebarTrigger />
					{children}
				</main>
			</AgentProvider>
		</SidebarProvider>
	);
}
