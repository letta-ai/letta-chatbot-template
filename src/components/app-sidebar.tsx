import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useAgents } from '@/components/hooks/use-agents';
import { useIsMobile } from './hooks/use-mobile';
import { useEffect, useRef, useState } from 'react';

export function AppSidebar() {
    return <AppSidebarContent />;
}

function AppSidebarContent() {
    const { agentId, setAgentId } = useAgentContext();
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();

    const { data } = useAgents();
    const ref = useRef(false);


    useEffect(() => {
        if (data && data.length > 0 && !ref.current) {
            setAgentId(data[0].id);
            ref.current = true;
        }
    }, [data, setAgentId]);

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="cursor-pointer">
                        {data &&
                            data.map((agent) => (
                                <SidebarMenuItem key={agent.id}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={agent.id === agentId}
                                        className="overflow-hidden whitespace-nowrap"
                                        onClick={() => {
                                            if (isMobile) {
                                                toggleSidebar();
                                            }
                                            setAgentId(agent.id);
                                        }}
                                    >
                                        <div className="flex-1 overflow-hidden">
                                            <span className="block w-full truncate">{agent.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
