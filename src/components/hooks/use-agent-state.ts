'use client';
import { Letta } from '@letta-ai/letta-client';
import { useQuery } from '@tanstack/react-query';

export const getUseAgentStateKey = (agentId: string) => ['agentState', agentId];

export function useAgentState(agentId: string) {
    return useQuery<Letta.AgentState>({
        queryKey: getUseAgentStateKey(agentId),
        queryFn: () => fetch(`/api/agents/${agentId}`).then((res) => res.json()),
        refetchInterval: 3000,
        enabled: !!agentId
    });
}