import { SidebarMenuButton, useSidebar, SidebarMenuItem } from '@/components/ui/sidebar';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { useAgentMessages } from './hooks/use-agent-messages';

export const AppSidebarMenuItem: React.FC<{ agent: any }> = ({ agent }) => {
    const { data } = useAgentMessages(agent.id);
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    const { agentId, setAgentId } = useAgentContext();


    return (
        <SidebarMenuButton
            asChild
            isActive={agent.id === agentId}
            className="overflow-hidden whitespace-nowrap h-full"
            onClick={() => {
                if (isMobile) {
                    toggleSidebar();
                }
                setAgentId(agent.id);
            }}
        >
            <div className="overflow-hidden flex-col">
                <span className="block w-full truncate">{agent.name}</span>
                <span className="block w-full truncate text-muted-foreground">
                    {data ? `${data[data.length - 1].message}` : 'Loading...'}
                </span>
            </div>
        </SidebarMenuButton>
    );
};

