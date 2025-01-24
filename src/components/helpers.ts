import { AgentState } from "@letta-ai/letta-client/api";
import { USE_AGENTS_KEY } from "./hooks/use-agents";

export const handleCreateAgent = (isPending, createAgent, setAgentId, queryClient) => {
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