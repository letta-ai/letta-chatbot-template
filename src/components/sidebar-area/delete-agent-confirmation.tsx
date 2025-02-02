import React from 'react';
import { Button } from '@/components/ui/button';
import { useDialogDetails } from './agent-dialog';
import { getUseAgentStateKey, useDeleteAgent } from '../hooks/use-agent-state';
import { useQueryClient } from '@tanstack/react-query';
import { AgentState } from '@letta-ai/letta-client/api';
import { USE_AGENTS_KEY } from '../hooks/use-agents';


const DeleteAgentConfirmation: React.FC<{ agentId: string, handleDelete: () => void }> = ({ agentId, handleDelete }) => {
    const { setIsOpen } = useDialogDetails();
    const { mutate: deleteAgent } = useDeleteAgent()
    const queryClient = useQueryClient()

    return (
        <div className="space-y-4">
            <p>Are you sure you want to delete this agent?</p>
            <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={() => {
                    handleDelete()
                    setIsOpen(false)
                }}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default DeleteAgentConfirmation;
