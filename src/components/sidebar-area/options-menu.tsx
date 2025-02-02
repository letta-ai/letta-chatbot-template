import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Ellipsis, PenBox, Trash2Icon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DialogType, useDialogDetails } from './agent-dialog';


const OptionsMenu: React.FC<{ agentId: string }> = ({ agentId }) => {

	const { setDialogType, setIsOpen } = useDialogDetails()

	return (
		<div className='flex rounded-full'>
			<Tooltip>
				<TooltipTrigger>
					<DropdownMenu>
						<DropdownMenuTrigger><Ellipsis size={16} /></DropdownMenuTrigger>
						<DropdownMenuContent className="flex flex-col gap-1 p-3">
							<DropdownMenuItem
								id={`edit-agent-${agentId}`}
								onClick={() => {
									setDialogType(DialogType.EditAgent)
									setIsOpen(true)
								}}>
								<PenBox size={16} />Edit Agent
							</DropdownMenuItem>
							<DropdownMenuItem
								id={`delete-agent-${agentId}`}
								className='text-red-500 hover:text-red-500 focus:text-red-500'
								onClick={() => {
									setDialogType(DialogType.DeleteAgent)
									setIsOpen(true)
									console.log('Delete Agent')
								}}>
								<Trash2Icon size={16} />Delete Agent
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<TooltipContent>
						<span>Options</span>
					</TooltipContent>
				</TooltipTrigger>
			</Tooltip>
		</div>
	);
};

export default OptionsMenu;
