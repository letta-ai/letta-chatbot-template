'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createContext, useContext, useState } from 'react'
import { Button } from './button'
import { AgentState } from '@letta-ai/letta-client/api'
import { USE_AGENTS_KEY } from '../hooks/use-agents'
import { useDeleteAgent } from '../hooks/use-agent-state'
import { useQueryClient } from '@tanstack/react-query'
import { useAgentContext } from '@/app/[agentId]/context/agent-context'

enum DialogType {
  EditAgent = 'edit-agent',
  DeleteAgent = 'delete-agent'
}

interface DialogContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  dialogType: DialogType | null
  setDialogType: (type: DialogType | null) => void
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined)

const DialogContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<DialogType | null>(null)

  return (
    <DialogContext.Provider
      value={{ isOpen, setIsOpen, dialogType, setDialogType }}
    >
      {children}
    </DialogContext.Provider>
  )
}

function useDialogDetails() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error(
      'useDialogDetails must be used within a DialogContextProvider.'
    )
  }
  return context
}

const AgentDialog: React.FC<{ title: string; content: React.ReactNode }> = ({
  title,
  content
}) => {
  const { setIsOpen } = useDialogDetails()

  return (
    <>
      <div
        className='fixed inset-0 z-50 bg-black/80'
        onClick={() => {
          setIsOpen(false)
        }}
      />
      <Card className='fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none'>
        <div className='bg-white rounded-lg shadow-lg max-w-lg w-full pointer-events-auto'>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>{content}</CardContent>
        </div>
      </Card>
    </>
  )
}

export { DialogContextProvider, useDialogDetails, DialogType, AgentDialog }
