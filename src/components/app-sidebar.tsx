import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAgents } from '@/components/hooks/use-agents';
import { AppSidebarMenuButton } from './app-sidebar-menu-button';

export function AppSidebar() {
    const { data } = useAgents();
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="cursor-pointer">
                        {data &&
                            data.map((agent) => (
                                <SidebarMenuItem key={agent.id}>
                                    <AppSidebarMenuButton agent={agent} />
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
