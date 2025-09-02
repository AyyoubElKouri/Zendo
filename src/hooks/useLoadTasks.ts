/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect, useMemo, useRef } from "react";

import { useToast } from "@/hooks/useToast";

import { TaskRepository } from "@/store/persistence/TaskRepository";
import { useTasksState } from "@/store/useTasksState";

export function useLoadTasks() {
	const repository = useMemo(() => new TaskRepository(), []);
	const { addTask: addTaskInUI } = useTasksState();
	const { toast } = useToast();

	const loadedRef = useRef(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <no>
	useEffect(() => {
		if (loadedRef.current) return;
		loadedRef.current = true;
		try {
			const tasks = repository.findAllTasks();
			console.log(tasks);

			tasks.forEach((task) => {
				addTaskInUI(task);
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error("Error in loading tasks");
			}
		}
	}, []);
}
