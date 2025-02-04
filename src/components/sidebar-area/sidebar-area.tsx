import { Button } from '@/components/ui/button'
import { LoaderCircle, PlusIcon } from 'lucide-react'
import { AppSidebar } from '@/components/sidebar-area/app-sidebar'
import { Sidebar } from '@/components/ui/sidebar'
import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useCreateAgent } from '../hooks/use-create-agent'
import { useQueryClient } from '@tanstack/react-query'
import { USE_AGENTS_KEY, useAgents } from '../hooks/use-agents'
import { StatusCircle } from '../ui/status-circle'
import { useIsConnected } from '../hooks/use-is-connected'
import { useEffect, useMemo } from 'react'
import { AgentState } from '@letta-ai/letta-client/api'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import EditAgentForm from './edit-agent-form'
import { AgentDialog } from '../ui/agent-dialog'
import { DialogType, useDialogDetails } from '../ui/agent-dialog'
import DeleteAgentConfirmation from './delete-agent-confirmation'
import { useDeleteAgent } from '../hooks/use-agent-state'

export function SidebarArea() {
  const queryClient = useQueryClient()
  const { agentId, setAgentId } = useAgentContext()
  const { mutate: createAgent, isPending } = useCreateAgent()
  const { data, isLoading } = useAgents()
  const isConnected = useIsConnected()
  const { mutate: deleteAgent } = useDeleteAgent()

  const { dialogType, setDialogType } = useDialogDetails()

  const scrollSidebarToTop = () => {
    const divToScroll = document.getElementById('agents-list')
    if (divToScroll) {
      divToScroll.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollSidebarToCurrentAgent = () => {
    document.getElementById(agentId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCreateAgent = () => {
    if (isPending) return
    createAgent(undefined, {
      onSuccess: (data) => {
        queryClient.setQueriesData(
          { queryKey: USE_AGENTS_KEY },
          (oldData: AgentState[]) => {
            return [data, ...oldData]
          }
        )
        setAgentId(data.id)
        scrollSidebarToTop()
      }
    })
  }

  const handleDelete = () => {
    deleteAgent(agentId, {
      onSuccess: () => {
        queryClient.setQueriesData(
          { queryKey: USE_AGENTS_KEY },
          (oldData: AgentState[]) => {
            const updatedData = [
              ...oldData.filter((agent) => agent.id !== agentId)
            ]
            if (updatedData.length > 0) {
              setAgentId(updatedData[0].id)
              scrollSidebarToTop()
            }
            return updatedData
          }
        )
        // setIsOpen(false)
        setDialogType(null)
      }
    })
  }

  useEffect(() => {
    if (data && data.length === 0) {
      handleCreateAgent()
    }
  }, [data])

  const hostname = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '0.0.0.0'
        ? 'LOCAL SERVER'
        : 'REMOTE SERVER'
    }

    return 'LOCAL SERVER'
  }, [])

  return (
    <Sidebar className='mt-1'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-xs font-bold relative flex w-full min-w-0 cursor-default p-2.5 pl-4'>
          <Tooltip>
            <TooltipTrigger>
              <div
                className='flex items-center w-full'
                onClick={() => {
                  scrollSidebarToCurrentAgent()
                }}
              >
                <StatusCircle isConnected={isConnected} isLoading={isLoading} />
                {hostname}
              </div>
              <TooltipContent>
                {typeof window !== 'undefined' && window.location.origin}
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </div>
        <div className='flex justify-end p-2'>
          <Button
            disabled={isPending}
            type='button'
            onClick={() => {
              handleCreateAgent()
            }}
            className='inline-flex size-3 h-fit items-center justify-center whitespace-nowrap bg-transparent font-medium text-primary shadow-none ring-offset-background transition-colors hover:hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
          >
            {isPending ? (
              <LoaderCircle className='animate-spin' size={17} />
            ) : (
              <PlusIcon width={16} height={16} />
            )}
          </Button>
        </div>
      </div>

      {data && data.length > 0 && <AppSidebar agents={data} />}
      {dialogType === DialogType.EditAgent && (
        <AgentDialog
          title='Edit agent'
          content={<EditAgentForm agentId={agentId} />}
        />
      )}
      {dialogType === DialogType.DeleteAgent && (
        <AgentDialog
          title='Delete agent?'
          content={
            <DeleteAgentConfirmation
              agentId={agentId}
              handleDelete={handleDelete}
            />
          }
        />
      )}
    </Sidebar>
  )
}
