'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createContext, useContext, useState } from "react"

enum DialogType {
	EditAgent = 'edit-agent',
	DeleteAgent = 'delete-agent',
}

interface DialogContextProps {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	dialogType: DialogType | null
	setDialogType: (type: DialogType | null) => void
}

const DialogContext = createContext<DialogContextProps | undefined>(
	undefined
)

const DialogContextProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [dialogType, setDialogType] = useState<DialogType | null>(null)

	return (
		<DialogContext.Provider value={{ isOpen, setIsOpen, dialogType, setDialogType }}>
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

export { DialogContextProvider, useDialogDetails, DialogType }

const AgentDialog: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => {
	return (
		<Card
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
		// TODO: FIX THIS
		// onClick={() => setOpen(false)}
		>
			<div
				className="bg-white rounded-lg shadow-lg max-w-lg w-full"
			>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					{content}
				</CardContent>
			</div>
		</Card >
	)
};

export default AgentDialog;
