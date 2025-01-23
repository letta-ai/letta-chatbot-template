import { useAgentContext } from '@/app/[agentId]/context/agent-context';
import { useAgentState } from '../hooks/use-agent-state';
import { SkeletonLoadBlock } from '../ui/skeleton-load-block';

export function AgentCoreMemoryBlock() {
  const { agentId } = useAgentContext();
  const { data, isLoading } = useAgentState(agentId);
  const coreMemory = data?.memory?.blocks || [];

  if (!coreMemory || isLoading) {
    return <SkeletonLoadBlock className="w-[18em] h-[6em]" />;
  }

  return (
    <div>
      {coreMemory.length > 0 ? (
        coreMemory.map((block) => (
          <div key={block.id} className="mb-2">
            <h3 className="text-sm font-bold mb-1">{block.label}</h3>
            <span className="text-sm">
              {block.value ? block.value : 'No memory available'}
            </span>
          </div>
        ))
      ) : (
        <span className="text-sm text-muted-foreground">No memory available</span>
      )}
    </div>
  );
}
