import React from 'react';
import { Button } from '@/components/ui/button';
import { useDialogDetails } from '@/components/ui/agent-dialog';
import { useAgentState } from '../hooks/use-agent-state';

const DeleteAgentConfirmation: React.FC<{ agentId: string, handleDelete: () => void }> = ({ agentId, handleDelete }) => {
    const { setIsOpen } = useDialogDetails();
    const { data: agent } = useAgentState(agentId)

    return (
        <div className="space-y-4">
            <span className="text-m">This will delete the agent </span>
            <span className="text-m font-bold">{agent?.name}.</span>
            <div className="flex justify-end space-x-3">
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
