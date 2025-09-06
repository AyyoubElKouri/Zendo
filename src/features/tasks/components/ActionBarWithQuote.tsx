/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Button } from "@headlessui/react";

import { ErrorIcon, QuoteIcon, SuccessIcon, ConfirmationButton } from "@shared/components";
import { useAccentColor } from "@shared/hooks";
import { useToast } from "@shared/hooks";
import { QUOTES } from "@shared/constants";

import { useTasks } from "@features/tasks/hooks/useTasks";

export function ActionBarWithQuote() {
	const { createTask, deleteAllTasks } = useTasks();
	const { primary } = useAccentColor();
	const { toast } = useToast();

	// Get a random quote
	const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

	const message = toast.message ?? quote;
	const icon = !toast.type ? (
		<QuoteIcon />
	) : toast.type === "success" ? (
		<SuccessIcon />
	) : (
		<ErrorIcon />
	);

	return (
		<div
			className="w-261 h-15.5 rounded-medium bg-neutral-950 border-1 border-border flex
                    justify-between items-center pl-4 pr-3.5 py-3.5"
		>
			<div className="flex justify-start items-center gap-3">
				{icon} <span className="text-medium text-neutral-400">{message}</span>
			</div>

			<div className="flex justify-end items-center gap-3.5 font-medium">
				<ConfirmationButton
					button="Clear"
					title="Sure you want to do this?"
					description="This action will delete all tasks"
					callback={deleteAllTasks}
					className="w-31 h-8.5 text-[18px] text-neutral-400 bg-transparent border-1 
               rounded-md data-active:scale-95"
				/>

				<Button
					className="w-31 h-8.5 rounded-md data-active:scale-95 text-[18px] text-white"
					style={{ backgroundColor: primary }}
					onClick={createTask}
				>
					Create
				</Button>
			</div>
		</div>
	);
}
