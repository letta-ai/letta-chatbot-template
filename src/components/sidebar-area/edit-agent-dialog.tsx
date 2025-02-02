import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getUseAgentStateKey, useAgentState, useModifyAgent } from '../hooks/use-agent-state';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { AgentState } from '@letta-ai/letta-client/api';
import { useQueryClient } from '@tanstack/react-query';
import { USE_AGENTS_KEY } from '../hooks/use-agents';


const EditAgentDialog: React.FC<{ agentId: string, setOpenEditAgent: (open: boolean) => void }> = ({ agentId, setOpenEditAgent }) => {
	const { data } = useAgentState(agentId)
	const { mutate: modifyAgent } = useModifyAgent(agentId)
	const queryClient = useQueryClient()


	const formSchema = z.object({
		agentName: z.string().min(1, {
			message: "Agent name must be at least 1 characters.",
		}),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			agentName: data?.name || '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		modifyAgent({ name: values.agentName }, {
			onSuccess: (data) => {
				queryClient.setQueriesData(
					{ queryKey: getUseAgentStateKey(agentId) },
					() => {
						return data
					}
				)
				queryClient.setQueriesData(
					{ queryKey: USE_AGENTS_KEY },
					(oldData: AgentState[]) => {
						return oldData.map((agent) => {
							if (agent.id === agentId) {
								return data
							}
							return agent
						})
					}
				)
				setOpenEditAgent(false);
			}
		});
	}

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
					<CardTitle>Edit Agent</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="agentName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Agent Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter a new agent name..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end space-x-3">
								<Button variant="outline" onClick={() => setOpenEditAgent(false)}>Cancel</Button>
								<Button variant="default" type="submit">Submit</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</div>
		</Card >
	)
};

export default EditAgentDialog;
