/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useMemo } from "react";

import { useToast } from "@shared/hooks";

import type { Task } from "@features-tasks/Task";
import { TaskRepository } from "@features-tasks/TaskRepository";
import { useSelectedTaskStore } from "@features-tasks/useSelectedTaskStore";
import { useTasksStore } from "@features-tasks/useTasksStore";

export function useTasks() {
	// Dependencies
	const repository = useMemo(() => new TaskRepository(), []);
	const state = useTasksStore();
	const { setSelectedTaskId } = useSelectedTaskStore();
	const { toast } = useToast();

	// Operations
	function createTask() {
		// Default values
		const defaultValues: Task = {
			id: Date.now(),
			source: "Default Source",
			description: "Default Description",
			duration: 0,
			isCompleted: false,
			group: "DEFAULT",
		};

		try {
			repository.addTask(defaultValues);
			state.addTask(defaultValues);

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
			state.updateTask(id, updates);

			toast.success("Task updated successfuly");
		} catch (error: unknown) {
			error instanceof Error && toast.error(error.message);
		}
	}

	function deleteTask(id: number) {
		try {
			repository.deleteTask(id);
			state.deleteTask(id);

			setSelectedTaskId(undefined);

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
			state.deleteAllTasks();

			toast.success("All tasks removed successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function duplicateTask(id: number) {
		try {
			repository.duplicateTask(id);
			state.duplicateTask(id);

			toast.success("Task copied successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function toggleTask(id: number) {
		try {
			const task = state.getTaskById(id);
			if (!task) {
				throw new Error(`Task with ID ${id} not found`);
			}

			repository.updateTask(id, { isCompleted: !task.isCompleted });
			state.updateTask(id, { isCompleted: !task.isCompleted });

			toast.success(task.isCompleted ? "Task finished Successfuly" : "Task not finished");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	function upTask(id: number) {
		try {
			repository.upTask(id);
			state.upTask(id);
		} catch (error: unknown) {
			error instanceof Error && toast.error(error.message);
		}
	}

	function downTask(id: number) {
		try {
			repository.downTask(id);
			state.downTask(id);
		} catch (error: unknown) {
			error instanceof Error && toast.error(error.message);
		}
	}

	function getStatistics() {
		const tasks = state.getAllTasks();

		const allTasks = tasks.length;
		const completedTasks = tasks.filter((task) => task.isCompleted === true).length;
		const rateOfCompletion =
			allTasks > 0 ? ((completedTasks / allTasks) * 100).toFixed(0).concat("%") : "0%";

		const duration = tasks.reduce((sum, task) => sum + task.duration, 0);

		return {
			allTasksNumber: allTasks,
			completedTasksNumber: completedTasks,
			rateOfCompletion,
			duration,
		};
	}

	return {
		createTask,
		updateTask,
		deleteTask,
		deleteAllTasks,
		duplicateTask,
		toggleTask,
		upTask,
		downTask,
		getStatistics,
		repository,
		state,
	};
}
