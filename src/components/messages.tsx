import { useEffect, useRef } from 'react';
import { MessagePill } from '@/components/ui/message';
import { useAgentContext } from '../app/(chat)/context/agent-context';
import { useAgentMessages } from './hooks/use-agent-messages';
import { Ellipsis } from 'lucide-react';
import { MessagePopover } from './message-popover';

export const Messages: React.FC = () => {
	const { agentId } = useAgentContext();
	const { data } = useAgentMessages(agentId);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [data]);

	return (
		<div className="group/message mx-auto w-full max-w-3xl px-4 h-full">
			<div className="flex min-w-0 flex-1 flex-col gap-6 pt-4 h-full">
				{data
					? data.length === 1 && data[0].message === 'More human than human is our motto.' ?
						<MessagePopover key={data[0].id} /> :
						data.map((message) => {
							const messageId = message.id;
							return messageId === 'deleteme_' ? (
								<Ellipsis key={messageId} className="animate-pulse" />
							) : (
								<MessagePill
									key={messageId}
									message={message.message}
									sender={message.messageType}
								/>
							);
						})
					: // TODO: ADD LOADING STATE
					''}
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
};
