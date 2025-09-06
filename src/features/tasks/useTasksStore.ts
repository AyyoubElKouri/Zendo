/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { Task } from "@features-tasks/Task";
import { create } from "zustand";

export interface TaskStore {
	/**
	 * List of all tasks.
	 * The order in this array defines the natural order.
	 */
	tasks: Task[];

	/**
	 * Add a new task to the list.
	 * If `position` is provided, insert at that index.
	 * Otherwise, append at the end.
	 */
	addTask: (task: Task, position?: number) => void;

	/**
	 * Update an existing task by its ID.
	 */
	updateTask: (id: number, updated: Partial<Task>) => void;

	/**
	 * Remove a task from the list by its ID.
	 */
	deleteTask: (id: number) => void;

	/**
	 * Remove a task from the list by its ID.
	 */
	deleteAllTasks: () => void;

	/**
	 * Return all tasks in natural order.
	 */
	getAllTasks: () => Task[];

	/**
	 * Return a specific task by its ID.
	 */
	getTaskById: (id: number) => Task | undefined;
}

export const useTasksStore = create<TaskStore>((set, get) => ({
	tasks: [],

	addTask: (task: Task, position?: number): void => {
		set((state) => {
			const newTasks = [...state.tasks];

			if (position !== undefined && position >= 0 && position <= newTasks.length) {
				newTasks.splice(position, 0, task);
			} else {
				newTasks.push(task);
			}

			return { tasks: newTasks };
		});
	},

	updateTask: (id: number, updated: Partial<Task>): void => {
		set((state) => ({
			tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updated } : task)),
		}));
	},

	deleteTask: (id: number): void => {
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		}));
	},

	deleteAllTasks: (): void => {
		set(() => ({
			tasks: [],
		}));
	},

	getAllTasks: (): Task[] => {
		return get().tasks;
	},

	getTaskById: (id: number): Task | undefined => {
		return get().tasks.find((task) => task.id === id);
	},
}));
