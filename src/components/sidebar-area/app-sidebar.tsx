import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { AppSidebarMenuButton } from './app-sidebar-menu-button'
import { AgentState } from '@letta-ai/letta-client/api'

export function AppSidebar({ agents, setOpenEditAgent }: { agents: AgentState[], setOpenEditAgent: (open: boolean) => void }) {
  return (
    <SidebarContent id='agents-list'>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='cursor-pointer'>
            {agents &&
              agents.map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <AppSidebarMenuButton agent={agent} setOpenEditAgent={setOpenEditAgent} />
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
