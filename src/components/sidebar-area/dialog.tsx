import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const AgentDialog: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => {
	return (
		<Card
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
		// TODO: FIX THIS
		// onClick={() => setOpen(false)}
		>
			<div
				className="bg-white rounded-lg shadow-lg max-w-lg w-full"
			>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					{content}
				</CardContent>
			</div>
		</Card >
	)
};

export default AgentDialog;
