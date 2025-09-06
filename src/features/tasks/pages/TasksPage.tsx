/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect, useRef } from "react";
import { ActionBarWithQuote } from "@features/tasks/components/ActionBarWithQuote";
import { Footer } from "@shared/components";
import { Header } from "@shared/components";
import { Statistics } from "@features/tasks/components/Statistics";
import { TaskList } from "@features/tasks/components/TaskList";
import { useTasks } from "@features/tasks/hooks/useTasks";
import { useToast } from "@shared/hooks";

export function TasksPage() {
	const { tasksState, repository } = useTasks();
	const { toast } = useToast();
	const loadedRef = useRef(false);

	// Load tasks from local storage to Zustand state.
	useEffect(() => {
		if (loadedRef.current) return;
		loadedRef.current = true;

		try {
			const tasks = repository.findAllTasks();
			tasks.forEach((task) => {
				tasksState.addTask(task);
			});
		} catch (error: unknown) {
			error instanceof Error && toast.error(error.message);
		}
	}, [repository.findAllTasks, tasksState.addTask, toast.error]);

	return (
		<div
			className="min-w-svh min-h-svh bg-neutral-900 flex flex-col gap-2.5
                    justify-between items-center "
		>
			<Header />
			<Statistics />
			<TaskList />
			<ActionBarWithQuote />
			<Footer />
		</div>
	);
}
