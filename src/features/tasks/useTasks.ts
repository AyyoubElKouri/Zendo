/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useMemo } from "react";

import { useToast } from "@shared/hooks";

import type { Task } from "@features-tasks/Task.entity";
import { TaskRepository } from "@features-tasks/TaskRepository";
import { useTasksStore } from "@features-tasks/useTasksStore";

export function useTasks() {
	// Dependencies
	const repository = useMemo(() => new TaskRepository(), []);
	const tasksState = useTasksStore();
	const { toast } = useToast();

	// Operations
	function createTask() {
		// Default values
		const defaultTask: Task = {
			id: Date.now(),
			source: "Default Source",
			description: "Default Description",
			completed: false,
		};

		try {
			repository.addTask(defaultTask);
			tasksState.addTask(defaultTask);

			toast.success("Task added successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function updateTask(id: number, updates: Partial<Task>) {
		try {
			repository.updateTask(id, updates);
			tasksState.updateTask(id, updates);

			toast.success("Task updated successfuly");
		} catch (error: unknown) {
			error instanceof Error && toast.error(error.message);
		}
	}

	function deleteTask(id: number) {
		try {
			repository.deleteTask(id);
			tasksState.deleteTask(id);

			toast.success("Task removed successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function deleteAllTasks() {
		try {
			repository.deleteAllTasks();
			tasksState.deleteAllTasks();

			toast.success("All tasks removed successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function duplicateTask(id: number, taskToDuplicate: Task) {
		// we need to find the index of the current task, to add the new task juste after it.
		const tasks = tasksState.getAllTasks();
		const index = tasks.findIndex((task) => task.id === id) ?? tasks.length - 1;

		const defaultTask: Task = {
			id: Date.now(),
			source: taskToDuplicate.source,
			description: taskToDuplicate.description,
			completed: false,
		};

		try {
			repository.addTask(defaultTask, index + 1);
			tasksState.addTask(defaultTask, index + 1);

			toast.success("Task copied successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function toggleTask(id: number) {
		try {
			const task = tasksState.getTaskById(id);
			if (!task) {
				throw new Error(`Task with ID ${id} not found`);
			}

			repository.updateTask(id, { completed: !task.completed });
			tasksState.updateTask(id, { completed: !task.completed });

			toast.success(task.completed ? "Task finished Successfuly" : "Task not finished");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function getStatistics() {
		const tasks = tasksState.getAllTasks();

		const allTasks = tasks.length;
		const completedTasks = tasks.filter((task) => task.completed === true).length;
		const rateOfCompletion =
			allTasks > 0 ? ((completedTasks / allTasks) * 100).toFixed(0).concat("%") : "0%";

		return {
			allTasksNumber: allTasks,
			completedTasksNumber: completedTasks,
			rateOfCompletion,
		};
	}

	return {
		createTask,
		updateTask,
		deleteTask,
		deleteAllTasks,
		duplicateTask,
		toggleTask,
		getStatistics,
		repository,
		tasksState,
	};
}
