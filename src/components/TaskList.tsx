/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useTasksState } from "@/store/useTasksState";
import { TaskItem } from "./TaskItem";
import { useAccentColor } from "@/hooks/useAccentColor";

export function TaskList() {
	const { primary, secondary } = useAccentColor();

	const { getAllTasks } = useTasksState();
	const tasks = getAllTasks();

	return (
		<div className="w-261 h-105 bg-neutral-950 border-1 border-border rounded-medium p-6">
			<div
				className="h-full flex flex-col gap-2.5 overflow-auto task-list pr-2.5"
				style={{ "--accent-color": primary, "--accent-track": secondary } as React.CSSProperties}
			>
				{tasks.map((task) => (
					<TaskItem key={task.id} id={task.id} />
				))}
			</div>
		</div>
	);
}
