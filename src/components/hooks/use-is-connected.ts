import { useAgents } from './use-agents';

export function useIsConnected() {
  const { isError, data } = useAgents();
  return !isError;
}
