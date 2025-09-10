/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from "clsx";

import { useAccentColor } from "@shared/hooks";
import { useScreenSize } from "@shared/hooks/useScreenSize";

import { useTasksStore } from "@features-tasks/useTasksStore";
import { TaskItem } from "./TaskItem";

export const startTimeFormat = (duration: number) => {
	if (duration < 60) {
		return { formated: `${duration}min`, hours: 0, minutes: duration };
	}

	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	return { formated: minutes === 0 ? `${hours}h` : `${hours}h${minutes}m`, hours, minutes };
};

export function TaskList() {
	const { getAllTasks } = useTasksStore();
	const tasks = getAllTasks();
	const { primary } = useAccentColor();

	const { isShortHeight } = useScreenSize();

	return (
		<div
			className={clsx(
				"relative w-full max-w-261 rounded-sm border-1 border-border",
				"p-3.5 pr-3 bg-neutral-950",
				isShortHeight ? "h-85" : "h-105",
			)}
		>
			<div
				className="w-full h-full text-3xl text-white flex flex-col gap-3.75 overflow-auto task-list-css"
				style={{ "--scroll": primary } as React.CSSProperties}
			>
				{tasks.map((task) => (
					<TaskItem key={task.id} id={task.id} />
				))}
			</div>
			<div className="absolute top-0 bottom-0 right-8 w-0.25 bg-border pointer-events-none" />
		</div>
	);
}
