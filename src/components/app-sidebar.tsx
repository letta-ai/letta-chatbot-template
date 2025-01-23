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
import { useAgentMessages } from './hooks/use-agent-messages';


export function AppSidebar() {
    const { agentId, setAgentId } = useAgentContext();
    const { data } = useAgents();
    const { data: messages } = useAgentMessages(agentId);

    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();


    console.log('data', data);

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="cursor-pointer">
                        {data &&
                            data.map((agent) => (
                                <SidebarMenuItem key={agent.id} >
                                    <div className='border-l-4 border-gray-200' >
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
                                            <div className="flex overflow-hidden flex-col">
                                                <span className="block w-full truncate">{agent.name}</span>
                                                <span className="block w-full truncate text-muted-foreground">messages</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </div>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
