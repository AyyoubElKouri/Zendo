/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

// -------------------------------------------------------------------------------------------------
import { useEffect, useRef } from "react";

import { useToast } from "@shared/hooks";

import { ActionBar } from "@features-tasks/components/ActionBar";
import { Statistics } from "@features-tasks/components/Statistics";
import { TaskList } from "@features-tasks/components/TaskList";
import { useTasks } from "@features-tasks/useTasks";

// Internel hook
function useLoadTasks() {
	const { state, repository } = useTasks();
	const { toast } = useToast();
	const loadedRef = useRef(false);

	// Load tasks from local storage to Zustand state.
	useEffect(() => {
		if (loadedRef.current) return;
		loadedRef.current = true;

		try {
			const tasks = repository.findAllTasks();
			tasks.forEach((task) => {
				state.addTask(task);
			});
		} catch (error: unknown) {
			error instanceof Error && toast.error(error.message);
		}
	}, [repository.findAllTasks, state.addTask, toast.error]);
}

export function TasksPage() {
	useLoadTasks();

	return (
		<div className="w-full h-full bg-neutral-900 flex justify-center items-center">
			<div className="flex flex-col gap-2.5 m-3 w-full items-center">
				<Statistics />
				<TaskList />
				<ActionBar />
			</div>
		</div>
	);
}
