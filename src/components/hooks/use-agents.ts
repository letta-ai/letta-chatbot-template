'use client'
import { Letta } from '@letta-ai/letta-client'
import { useQuery } from '@tanstack/react-query'

export const USE_AGENTS_KEY = ['agents']

export function useAgents() {
  return useQuery<Letta.AgentState[]>({
    queryKey: USE_AGENTS_KEY,
    retry: 0,
    queryFn: () =>
      fetch('/api/agents').then((res) => {
        if (res.status !== 200) {
          throw new Error()
        }
        return res.json()
      })
  })
}
