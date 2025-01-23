import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAgents } from '@/components/hooks/use-agents';
import { AppSidebarMenuItem } from './app-sidebar-menu-item';

export function AppSidebar() {
    const { data } = useAgents();
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="cursor-pointer">
                        {data &&
                            data.map((agent) => (
                                <SidebarMenuItem key={agent.id} >
                                    <div className='border-l-4 border-gray-200' >
                                        <AppSidebarMenuItem agent={agent} />
                                    </div>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
