import { useQuery } from '@tanstack/react-query'
import { Letta } from '@letta-ai/letta-client'

export const USE_AGENT_ARCHIVAL_MEMORY_KEY = ['agentArchivalMemory']

export function useAgentArchivalMemory(agentId: string) {
  return useQuery<Letta.Passage[]>({
    queryKey: [...USE_AGENT_ARCHIVAL_MEMORY_KEY, agentId],
    queryFn: async () => {
      const response = await fetch(`/api/agents/${agentId}/archival_memory`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    refetchInterval: 3000,
    enabled: !!agentId
  })
}
