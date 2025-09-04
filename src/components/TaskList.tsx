/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { TaskItem } from "@/components/TaskItem";
import { useAccentColor } from "@/hooks/useAccentColor";
import { useTasks } from "@/hooks/useTasks";

export function TaskList() {
	const { primary, secondary } = useAccentColor();
	const { tasksState } = useTasks();

	const tasks = tasksState.getAllTasks();

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
