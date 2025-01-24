import { useAgents } from "./use-agents"

export function useIsConnected() {
    const { isError, data } = useAgents()
    console.log('isError', data)
    return !isError
}