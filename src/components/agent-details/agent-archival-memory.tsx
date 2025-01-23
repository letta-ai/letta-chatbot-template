import { useAgentContext } from '@/app/[agentId]/context/agent-context';
import { useAgentArchivalMemory } from '../hooks/use-agent-archival-memory';
import { SkeletonLoadBlock } from '../ui/skeleton-load-block';

export function AgentArchivalMemory() {
  const { agentId } = useAgentContext();
  const { data, isLoading } = useAgentArchivalMemory(agentId);
  const archivalMemory = data || [];

  if (!archivalMemory || isLoading) {
    return <SkeletonLoadBlock className="w-[18em] h-[6em]" />;
  }

  return (
    <div>
      {archivalMemory.length > 0 ? (
        archivalMemory.map((block) => (
          <div key={block.id} className="mb-2">
            <span className="text-sm">{block.text}</span>
          </div>
        ))
      ) : (
        <span className="text-sm text-muted-foreground">No memory available</span>
      )}
    </div>
  );
}
