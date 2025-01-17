'use client';

import { Messages } from '@/components/messages';
import { MessageComposer } from '@/components/message-composer';

export default function Home() {
	return (
		<div className="relative flex h-full min-w-0 flex-col gap-5 overflow-hidden bg-background pt-4">
			<div className="flex-1 overflow-auto">
				<Messages />
			</div>
			<MessageComposer />
		</div>
	);
}
