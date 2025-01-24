import { AgentState } from "@letta-ai/letta-client/api";
import { USE_AGENTS_KEY } from "./hooks/use-agents";
import { useQueryClient } from "@tanstack/react-query";

export const handleCreateAgent = (isPending, createAgent, setAgentId) => {
    const queryClient = useQueryClient();

    if (isPending) return;
    createAgent(undefined, {
        onSuccess: (data) => {
            queryClient.setQueriesData(
                { queryKey: USE_AGENTS_KEY },
                (oldData: AgentState[]) => {
                    return [data, ...oldData];
                },
            );
            setAgentId(data.id);
        },
    });
};  