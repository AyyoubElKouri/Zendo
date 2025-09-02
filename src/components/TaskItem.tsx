/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from "clsx";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";
import { useAccentColor } from "@/hooks/useAccentColor";
import { useTaskItem } from "@/hooks/useTaskItem";

export function TaskItem({ id }: { id: number }) {
	const { handlers, editingValue, task } = useTaskItem(id);
	const { primary, secondary } = useAccentColor();
	return (
		<div
			className="w-full h-12.5 min-h-12.5 bg-black border-1 border-border rounded-small grid
                    grid-cols-[34px_34px_223px_560px_1fr]"
		>
			<ActionButton type="delete" action={handlers.deleteTask} />
			<ActionButton type="duplicate" action={handlers.duplicateTask} />

			<TaskItemField
				type="source"
				editingValue={editingValue.source}
				value={task.source}
				changeValue={handlers.changeValue}
				enableEditMode={handlers.enableEditMode}
				disableEditMode={handlers.disableEditMode}
			/>

			<TaskItemField
				type="description"
				editingValue={editingValue.description}
				value={task.description}
				changeValue={handlers.changeValue}
				enableEditMode={handlers.enableEditMode}
				disableEditMode={handlers.disableEditMode}
			/>
			<button
				type="button"
				className="m-2.5 rounded-[8px] text-medium font-medium text-white active:scale-95"
				onClick={handlers.toggleTask}
				style={{ backgroundColor: task.completed ? secondary : primary }}
			>
				{task.completed ? "Finished" : "Pending"}
			</button>
		</div>
	);
}

interface TaskItemFieldProps {
	type: "source" | "description";
	editingValue: string | null;
	value: string;
	changeValue: (type: "source" | "description", event: React.ChangeEvent<HTMLInputElement>) => void;
	enableEditMode: (type: "source" | "description") => void;
	disableEditMode: (type: "source" | "description") => void;
}

function TaskItemField({
	type,
	editingValue,
	value,
	changeValue,
	enableEditMode,
	disableEditMode,
}: TaskItemFieldProps) {
	return (
		<div>
			{editingValue || (typeof editingValue === "string" && editingValue.length === 0) ? (
				<div className="h-full flex justify-start items-center p-2.5 border-r-1 border-border">
					<input
						type="text"
						// biome-ignore lint/a11y/noAutofocus: <no>
						autoFocus
						spellCheck={false}
						value={editingValue}
						onChange={(event) => changeValue(type, event)}
						onBlur={() => disableEditMode(type)}
						onKeyDown={(event) => {
							event.key === "Enter" && disableEditMode(type);
						}}
						className="w-full text-neutral-300 pl-[13px] rounded-[8px] bg-neutral-950
                             border border-border focus:outline-none"
					/>
				</div>
			) : (
				<button
					type="button"
					onDoubleClick={() => enableEditMode(type)}
					className={clsx(
						"w-full h-full flex justify-start items-center pl-6 text-medium font-medium",
						type === "source"
							? "font-medium text-neutral-300 border-r-1 border-border"
							: "text-neutral-400 font-normal",
					)}
				>
					{value}
				</button>
			)}
		</div>
	);
}

interface ActionButtonProps {
	type: "delete" | "duplicate";
	action: () => void;
}

function ActionButton({ type, action }: ActionButtonProps) {
	const button = (
		<button
			type="button"
			onClick={type === "duplicate" ? action : undefined}
			className={clsx(
				"w-8.5 h-full gap-0 rounded-none bg-transparent border-r-1 border-border",
				"flex justify-center items-center hover:bg-neutral-900 active:scale-95",
				type === "delete" && "hover:rounded-l-small",
			)}
		>
			{type === "delete" ? <DeleteIcon /> : <DuplicateIcon />}
		</button>
	);
	return type === "delete" ? (
		<ConfirmationAlert
			title="Sure you want to do this?"
			description="this action will delete this task"
			action={action}
		>
			{button}
		</ConfirmationAlert>
	) : (
		<div>{button}</div>
	);
}

// --------------------------------------------- Icons ---------------------------------------------

function DeleteIcon() {
	const { primary } = useAccentColor();
	return (
		<svg
			version="1.1"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			width={25}
			height={25}
		>
			<title>Delete Icon</title>
			<path
				d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0
               c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6
               C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
				fill={primary}
			/>
		</svg>
	);
}

function DuplicateIcon() {
	const { primary } = useAccentColor();
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={21} height={21}>
			<title>Duplicate Icon</title>
			<path
				d="M21,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0
            ,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,14.05,2H10A3,3,0,0,0,7,5V6H6A3,3,0,0,0,3,9V19a3
            ,3,0,0,0,3,3h8a3,3,0,0,0,3-3V18h1a3,3,0,0,0,3-3V9S21,9,21,8.94ZM15,5.41,17.59,8H16a1,1,0
            ,0,1-1-1ZM15,19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9A1,1,0,0,1,6,8H7v7a3,3,0,0,0,3,3h5Zm4-4a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h3V7a3,3,0,0,0,3,3h3Z"
				fill={primary}
				stroke={primary}
				stroke-width="0.5"
				stroke-linejoin="round"
				stroke-linecap="round"
			/>
		</svg>
	);
}
