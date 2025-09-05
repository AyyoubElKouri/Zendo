/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Button, Input } from "@headlessui/react";
import { clsx } from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import { DeleteIcon, DuplicateIcon } from "@/shared/components/icons";
import { ConfirmationAlert } from "@/shared/components/ui/AlertDialog";

import { useAccentColor } from "@/shared/hooks/useAccentColor";
import { useTasks } from "@/features/tasks/hooks/useTasks";

export function TaskItem({ id }: { id: number }) {
	const { primary, secondary } = useAccentColor();
	const { tasksState, toggleTask } = useTasks();

	const task = tasksState.getTaskById(id)!;

	const handleToggle = useCallback(() => toggleTask(id), [id, toggleTask]);

	return (
		<div
			className="w-full h-12.5 min-h-12.5 bg-black border-1 border-border rounded-small grid
                    grid-cols-[34px_34px_223px_560px_1fr]"
		>
			<ActionButton id={id} type="delete" />
			<ActionButton id={id} type="duplicate" />

			<TaskItemField id={id} type="source" />
			<TaskItemField id={id} type="description" />

			<Button
				className="m-2.5 rounded-[8px] text-medium font-medium text-white active:scale-95"
				onClick={handleToggle}
				style={{ backgroundColor: task.completed ? secondary : primary }}
			>
				{task.completed ? "Finished" : "Pending"}
			</Button>
		</div>
	);
}

/* ------------------------------------ Internel Components ------------------------------------- */

function ActionButton({ id, type }: { id: number; type: "delete" | "duplicate" }) {
	const { tasksState, deleteTask, duplicateTask } = useTasks();

	const taskToBeCopied = tasksState.getTaskById(id)!;

	const handleDelete = useCallback(() => deleteTask(id), [id, deleteTask]);
	const handleDuplicate = useCallback(
		() => duplicateTask(id, taskToBeCopied),
		[id, duplicateTask, taskToBeCopied],
	);

	const button = (
		<Button
			onClick={type === "duplicate" ? handleDuplicate : undefined}
			className={clsx(
				"w-8.5 h-full gap-0 rounded-none bg-transparent border-r-1 border-border",
				"flex justify-center items-center hover:bg-neutral-900 active:scale-95",
				type === "delete" && "hover:rounded-l-small",
			)}
		>
			{type === "delete" ? <DeleteIcon /> : <DuplicateIcon />}
		</Button>
	);

	return type === "delete" ? (
		<ConfirmationAlert
			title="Sure you want to do this?"
			description="this action will delete this task"
			action={handleDelete}
		>
			{button}
		</ConfirmationAlert>
	) : (
		<div>{button}</div>
	);
}

function TaskItemField({ id, type }: { id: number; type: "source" | "description" }) {
	// Indicate if we are in edit mode
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	// Store a temporary value that will be stored later
	const [tempValue, setTempValue] = useState<string>("");

	// AutoFocus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isEditMode) {
			inputRef.current?.focus();
		}
	}, [isEditMode]);

	const { tasksState, updateTask } = useTasks();
	const task = tasksState.getTaskById(id)!;

	// Wen user click outside of the input or presse `Enter` key, we exit the edit mode
	function exitEditMode() {
		const sanitizedValue = tempValue.trim();

		if (sanitizedValue !== task[type]) {
			updateTask(id, { [type]: sanitizedValue });
		}

		setTempValue("");
		setIsEditMode(false);
	}

	return isEditMode ? (
		<div className="w-full h-full p-2.5 border-r-1 border-border">
			<Input
				type="text"
				value={tempValue}
				spellCheck={false}
				ref={inputRef}
				onChange={(event) => setTempValue(event.target.value)}
				onBlur={exitEditMode}
				onKeyDown={(event) => event.key === "Enter" && exitEditMode()}
				className="w-full text-neutral-300 pl-[13px] rounded-[8px] bg-neutral-950 border
                       border-border focus:outline-none"
			/>
		</div>
	) : (
		<Button
			onDoubleClick={() => {
				setTempValue(task[type]);
				setIsEditMode(true);
			}}
			className={clsx(
				"w-full h-full flex justify-start items-center pl-6 text-medium font-medium",
				type === "source"
					? "font-medium text-neutral-300 border-r-1 border-border"
					: "text-neutral-400 font-normal",
			)}
		>
			{task[type]}
		</Button>
	);
}
