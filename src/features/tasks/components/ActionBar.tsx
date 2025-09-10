/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { JSX } from "react";
import { Button } from "@headlessui/react";
import clsx from "clsx";

import { ConfirmationButton, ErrorIcon, QuoteIcon, SuccessIcon } from "@shared/components";
import {
	CompletedIcon,
	DeleteIcon,
	DownIcon,
	DuplicateIcon,
	UpIcon,
} from "@shared/components/icons";
import { QUOTES } from "@shared/constants";
import { useAccentColor, useToast } from "@shared/hooks";
import { useScreenSize } from "@shared/hooks/useScreenSize";

import { TaskGroupColors } from "@features-tasks/taskGroupColors";
import { useSelectedTaskStore } from "@features-tasks/useSelectedTaskStore";
import { useTasks } from "@features-tasks/useTasks";

// Helper
function getRandomQuote() {
	return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export function ActionBar() {
	const {
		state,
		createTask,
		updateTask,
		deleteTask,
		duplicateTask,
		upTask,
		downTask,
		deleteAllTasks,
	} = useTasks();
	const { secondary } = useAccentColor();
	const { toast } = useToast();

	const { isMediumWidth } = useScreenSize();

	const quote = getRandomQuote();

	const message = toast.message ?? quote;

	// Icon for the propriete message
	const icon = !toast.type ? (
		<QuoteIcon />
	) : toast.type === "success" ? (
		<SuccessIcon />
	) : (
		<ErrorIcon />
	);

	const { id } = useSelectedTaskStore();

	let actionBarContent: JSX.Element;

	// if any task selected, render an action bar that contain actions to manipulate the task.
	if (id) {
		// Get the task group
		const group = state.getTaskById(id)?.group;

		actionBarContent = (
			<>
				{/* Message to the user */}
				{!isMediumWidth && (
					<span
						className="w-71 h-8.5 text-[15px] text-neutral-400 bg-transparent flex justify-start
               items-center"
					>
						To modify data, just double click on it
					</span>
				)}

				<div
					className={clsx("w-full flex gap-2", isMediumWidth ? "justify-center" : "justify-end")}
				>
					{/* --- Groups --- */}
					<div className="w-42 h-8.5 bg-transparent border-1 rounded-md font-medium flex">
						<Button
							className={`w-[33.4px] h-full data-active:scale-95 rounded-l-[8px] flex
                              justify-center items-center`}
							style={{ backgroundColor: TaskGroupColors.DEFAULT.background1 }}
							onClick={() => updateTask(id, { group: "DEFAULT" })}
						>
							{group === "DEFAULT" && <CompletedIcon />}
						</Button>

						<Button
							className={`w-[33.4px] h-full data-active:scale-95 border-l-1 border-border flex
                              justify-center items-center`}
							style={{ backgroundColor: TaskGroupColors.RED.background1 }}
							onClick={() => updateTask(id, { group: "RED" })}
						>
							{group === "RED" && <CompletedIcon />}
						</Button>

						<Button
							className={`w-[33.4px] h-full data-active:scale-95 border-l-1 border-border flex
                              justify-center items-center`}
							style={{ backgroundColor: TaskGroupColors.YELLOW.background1 }}
							onClick={() => updateTask(id, { group: "YELLOW" })}
						>
							{group === "YELLOW" && <CompletedIcon />}
						</Button>

						<Button
							className={`w-[33.4px] h-full data-active:scale-95 border-l-1 border-border flex
                              justify-center items-center`}
							style={{ backgroundColor: TaskGroupColors.GREEN.background1 }}
							onClick={() => updateTask(id, { group: "GREEN" })}
						>
							{group === "GREEN" && <CompletedIcon />}
						</Button>

						<Button
							className={`w-[33.4px] h-full data-active:scale-95 border-l-1 border-border
                              rounded-r-[8px] flex justify-center items-center`}
							style={{ backgroundColor: TaskGroupColors.BLUE.background1 }}
							onClick={() => updateTask(id, { group: "BLUE" })}
						>
							{group === "BLUE" && <CompletedIcon />}
						</Button>
					</div>

					{/* --- Delete --- */}
					<ConfirmationButton
						button={<DeleteIcon />}
						title="Sure your want to do this?"
						description="This action will delete the task"
						callback={() => deleteTask(id)}
						className="w-10 h-8.5 bg-transparent border-1 rounded-md
				              data-active:scale-95 font-medium flex justify-center items-center"
					/>

					{/* --- Duplicate --- */}
					<Button
						className="w-10 h-8.5 text-[18px] text-neutral-400 bg-transparent border-1 
                          rounded-md data-active:scale-95 font-medium flex justify-center items-center"
						onClick={() => duplicateTask(id)}
					>
						<DuplicateIcon />
					</Button>

					{/* --- Up, Down --- */}
					<div className="w-20 h-8.5 bg-transparent border-1 rounded-md flex">
						<Button
							className="h-full w-1/2 border-r-1 border-border data-active:scale-90 flex 
                             justify-center items-center"
							onClick={() => downTask(id)}
						>
							<DownIcon />
						</Button>

						<Button
							className="h-full w-1/2 data-active:scale-90 flex justify-center items-center"
							onClick={() => upTask(id)}
						>
							<UpIcon />
						</Button>
					</div>

					{/* --- Start Time --- */}
					<Button
						className="w-31 h-8.5 rounded-[8px] data-active:scale-95 text-[18px] text-white
                          border-1 border-border font-medium"
						style={{ backgroundColor: secondary }}
						onClick={() => updateTask(id, { startTime: 910 })}
					>
						Start Time
					</Button>
				</div>
			</>
		);
	}

	// Else render a quote, and two button, `Clear`: for delete all tasks, and `Create` to new task
	// with default values.
	else {
		actionBarContent = (
			<>
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
                             rounded-md data-active:scale-95 font-medium"
					/>

					<Button
						className="w-31 h-8.5 rounded-[8px] data-active:scale-95 text-[18px] text-white
                             border-1 border-border font-medium"
						style={{ backgroundColor: secondary }}
						onClick={createTask}
					>
						Create
					</Button>
				</div>
			</>
		);
	}

	return (
		<div
			className="w-full max-w-261 h-15.5 rounded-sm bg-neutral-950 border-1 border-border flex
                    justify-between items-center pl-4 pr-3.5 py-3.5"
		>
			{actionBarContent}
		</div>
	);
}
