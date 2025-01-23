'use client';

import { Messages } from '@/components/messages';
import { MessageComposer } from '@/components/message-composer';
import { useAgentDetails } from '@/components/ui/agent-details';
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { useAgentContext } from './context/agent-context';

export default function Home() {
	const { isOpen } = useAgentDetails();
	const { agentId } = useAgentContext();
	const isMobile = useIsMobile();

	return (
		<div className="flex flex-row flex-1 h-0">
			{!isMobile || (isMobile && !isOpen) ? (
				<div className="relative flex flex-col flex-1 h-full min-w-0 gap-5 overflow-hidden bg-background pt-4">
					<div className="flex-1 overflow-auto">
						<Messages />
					</div>
					<MessageComposer />
				</div>
			) : null}
			<AgentDetailDisplay />
		</div>
	);
}
