/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useMemo } from "react";

import { useToast } from "@/hooks/useToast";

import { TaskRepository } from "@/store/persistence/TaskRepository";
import { Quotes } from "@/store/quotes";
import { useTasksState } from "@/store/useTasksState";

import type { Task } from "@/types/entities";

// Helper
function getRandomQuoteIndex(): number {
	return Math.floor(Math.random() * Quotes.length);
}

export function useActionBarWithQuote() {
	const repository = useMemo(() => new TaskRepository(), []);
	const { addTask: addTaskInUI, removeAllTasks: removeAllTasksInUI } = useTasksState();
	const { toast } = useToast();

	// handler
	function createTask() {
		// default values
		const defaultTask: Task = {
			id: Date.now(),
			source: "Default Source",
			description: "Default Description",
			completed: false,
		};

		try {
			repository.addTask(defaultTask);
			addTaskInUI(defaultTask);

			toast.success("Task added successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	// handler
	function deleteAllTasks() {
		try {
			repository.deleteAllTasks();
			removeAllTasksInUI();

			toast.success("All tasks removed successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	let type: "success" | "error" | "quote";
	let message: string;

	if (toast.type === undefined) {
		type = "quote";
		message = Quotes[getRandomQuoteIndex()];
	} else {
		type = toast.type;
		message = toast.message ?? "";
	}

	return {
		handlers: {
			createTask,
			deleteAllTasks,
		},
		toast: {
			type,
			message,
		},
	};
}
