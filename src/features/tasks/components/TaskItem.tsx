/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useCallback, useState } from "react";
import { Button } from "@headlessui/react";

import { TaskGroupColors } from "@features-tasks/taskGroupColors";
import { TaskInput } from "./TaskInput";
import "@features-tasks/tasks.css";

import { CompletedIcon, PendingIcon } from "@shared/components/icons";

import { formatDuration } from "@features-tasks/formatDuration";
import { useSelectedTaskStore } from "@features-tasks/useSelectedTaskStore";
import { useTasks } from "@features-tasks/useTasks";

export function TaskItem({ id }: { id: number }) {
	const [isEditMode, setIsEditMode] = useState<"source" | "description" | "startTime" | null>(null);
	const { id: selectedId, setSelectedTaskId } = useSelectedTaskStore();
	const { updateTask, state } = useTasks();

	const task = state.getTaskById(id)!;

	const { primary, border, background1, background2, completed } = TaskGroupColors[task.group];

	const select = useCallback(() => {
		selectedId === id ? setSelectedTaskId(undefined) : setSelectedTaskId(id);
	}, [id, setSelectedTaskId, selectedId]);

	const enterEditMode = useCallback(
		(field: "source" | "description" | "startTime") => {
			if (task.isCompleted) return;

			setSelectedTaskId(undefined);
			setIsEditMode(field);
		},
		[setSelectedTaskId, task.isCompleted],
	);

	return (
		<div
			className="max-w-245 min-h-16.5 rounded-[8px] flex mr-7"
			// Styling based on the task group.
			style={
				task.isCompleted
					? {
							backgroundColor: background1,
							border: `1px solid ${id === selectedId ? primary : border}`,
							backgroundImage: `
                                       repeating-linear-gradient(
                                                45deg,
                                                ${completed},
                                                ${completed} 2px,
                                                transparent 2px,
                                                transparent 4px
                                             ),

                                       repeating-linear-gradient(
                                                -45deg,
                                                ${completed},
                                                ${completed} 2px,
                                                transparent 2px,
                                                transparent 4px
                                             )`,
						}
					: {
							backgroundColor: background1,
							border: `1px solid ${id === selectedId ? primary : border}`,
						}
			}
		>
			{/** biome-ignore lint/a11y/noStaticElementInteractions: <no accessibily needed here> */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: <> */}
			<div className="relative w-full h-full flex flex-col justify-center pl-3" onClick={select}>
				{isEditMode ? (
					<TaskInput id={id} type={isEditMode} setIsEditMode={setIsEditMode} />
				) : (
					<div className="flex flex-col pl-0.25 items-start justify-center">
						<Button
							className="text-[20px] font-medium text-[#E3E3E3]"
							onDoubleClick={() => enterEditMode("source")}
						>
							{task.source}
						</Button>
						<Button
							className="text-[16px] text-[#AFAFAF]"
							onDoubleClick={() => enterEditMode("description")}
						>
							{task.description}
						</Button>
					</div>
				)}

				{/* startTime field */}
				{task.startTime && !isEditMode && (
					<Button
						onDoubleClick={() => enterEditMode("startTime")}
						className="absolute w-23 h-6.5 text-[16px] font-medium startTime
                             rounded-b-[8px] top-0 bottom-0 right-8.5 flex justify-center items-center"
						style={
							{
								"--bg": background2,
								"--br": border,
								"--primary": primary,
							} as React.CSSProperties
						}
					>
						{formatDuration(task.startTime)}
					</Button>
				)}
			</div>

			<Button
				className="w-10 h-full flex justify-center items-center
                       data-active:scale-95"
				style={{
					borderLeft: `1px solid ${border}`,
				}}
				type="button"
				onClick={() => updateTask(id, { isCompleted: !task?.isCompleted })}
			>
				{task?.isCompleted ? <CompletedIcon /> : <PendingIcon />}
			</Button>
		</div>
	);
}
