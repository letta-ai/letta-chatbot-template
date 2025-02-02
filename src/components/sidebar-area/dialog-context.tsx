'use client'

import { createContext, useContext, useState } from "react"

interface DialogContextProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextProps | undefined>(
  undefined
)

const DialogContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
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

export { DialogContextProvider, useDialogDetails }