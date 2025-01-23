'use client';
import { Letta } from '@letta-ai/letta-client';
import { useQuery } from '@tanstack/react-query';

export const USE_AGENT_STATE_KEY = ['agentState'];

export function useAgentState(agentId: string) {
  return useQuery<Letta.AgentState>({
    queryKey: [...USE_AGENT_STATE_KEY, agentId],
    queryFn: () => fetch(`/api/agents/${agentId}`).then((res) => res.json()),
    refetchInterval: 3000,
  });
}
