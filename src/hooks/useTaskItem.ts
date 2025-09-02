/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { TaskRepository } from "@/store/persistence/TaskRepository";
import { useTasksState } from "@/store/useTasksState";
import type { Task } from "@/types/entities";

export function useTaskItem(id: number) {
	// hooks
	const repository = useMemo(() => new TaskRepository(), []);
	const {
		addTask: addTaskInUI,
		removeTask: removeTaskInUI,
		updateTask: updateTaskInUI,
		getAllTasks: getAllTasksFromUI,
		getTaskById: getTaskByIdFromUI,
	} = useTasksState();

	const { toast } = useToast();

	const [editingValue, setEditingValue] = useState<{
		source: string | null;
		description: string | null;
	}>({ source: null, description: null });

	// task informations;
	const task = getTaskByIdFromUI(id)!;

	// handler
	function duplicateTask() {
		try {
			// we need to find the index of the current task, to add the new task juste after it.
			const tasks = getAllTasksFromUI();
			let index = tasks.findIndex((task) => task.id === id);

			index = index ?? tasks.length - 1;

			// default values are copied from the original task.
			const defaultTask: Task = {
				id: Date.now(),
				source: task!.source,
				description: task!.description,
				completed: false,
			};

			addTaskInUI(defaultTask, index + 1);
			repository.addTask(defaultTask, index + 1);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	// handler
	function toggleTask() {
		try {
			repository.updateTask(id, { completed: !task.completed });
			updateTaskInUI(id, { completed: !task.completed });

			toast.success(task.completed ? "Task finished Successfuly" : "Task not finished");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	// handler
	function deleteTask() {
		try {
			repository.deleteTask(id);
			removeTaskInUI(id);

			toast.success("Task removed successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	// edit mode handler
	function enableEditMode(type: "source" | "description") {
		const task = getTaskByIdFromUI(id);

		setEditingValue({
			...editingValue,
			[type]: type === "source" ? task!.source : task!.description,
		});
	}

	// edit mode handler
	function disableEditMode(type: "source" | "description") {
		try {
			repository.updateTask(id, {
				[type]: type === "source" ? editingValue.source : editingValue.description,
			});

			updateTaskInUI(id, {
				[type]: type === "source" ? editingValue.source : editingValue.description,
			});

			setEditingValue((prev) => ({
				...prev,
				[type]: null,
			}));

			toast.success("Task updated successfuly");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	// keep track the value on change
	function changeValue(type: "source" | "description", event: ChangeEvent<HTMLInputElement>) {
		setEditingValue({ ...editingValue, [type]: event.target.value });
	}

	return {
		handlers: {
			duplicateTask,
			toggleTask,
			deleteTask,
			enableEditMode,
			disableEditMode,
			changeValue,
		},

		editingValue: {
			source: editingValue.source,
			description: editingValue.description,
		},

		task,
	};
}
