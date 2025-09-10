/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { Group, Task } from "@features-tasks/Task";
import { create } from "zustand";

export interface TasksStore {
	tasks: Task[];

	addTask: (task: Task) => void;
	updateTask: (id: number, updated: Partial<Task>) => void;
	deleteTask: (id: number) => void;
	deleteAllTasks: () => void;
	changeTaskGroup: (id: number, group: Group) => void;
	duplicateTask: (id: number) => void;
	upTask: (id: number) => void;
	downTask: (id: number) => void;
	setStartTime: (id: number, time: number | undefined) => void;
	getTaskById: (id: number) => Task | undefined;
	getAllTasks: () => Task[];
}

export const useTasksStore = create<TasksStore>((set, get) => ({
	tasks: [],

	addTask: (task: Task) => {
		set((state) => ({
			tasks: [...state.tasks, task],
		}));
	},

	updateTask: (id: number, updated: Partial<Task>) => {
		set((state) => ({
			tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updated } : task)),
		}));
	},

	deleteTask: (id: number) => {
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		}));
	},

	deleteAllTasks: () => {
		set(() => ({
			tasks: [],
		}));
	},

	changeTaskGroup: (id: number, group: Group) => {
		set((state) => ({
			tasks: state.tasks.map((task) => (task.id === id ? { ...task, group } : task)),
		}));
	},

	duplicateTask: (id: number) => {
		set((state) => {
			const index = state.tasks.findIndex((task) => task.id === id);
			if (index === -1) return state;

			const original = state.tasks[index];
			const copy: Task = {
				...original,
				id: Date.now(),
			};

			const newTasks = [...state.tasks];
			newTasks.splice(index + 1, 0, copy);

			return { tasks: newTasks };
		});
	},

	upTask: (id: number) => {
		set((state) => {
			const index = state.tasks.findIndex((task) => task.id === id);
			if (index <= 0) return state;

			const newTasks = [...state.tasks];
			[newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
			return { tasks: newTasks };
		});
	},

	downTask: (id: number) => {
		set((state) => {
			const index = state.tasks.findIndex((task) => task.id === id);
			if (index === -1 || index >= state.tasks.length - 1) return state;

			const newTasks = [...state.tasks];
			[newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
			return { tasks: newTasks };
		});
	},

	setStartTime: (id: number, time: number | undefined) => {
		set((state) => ({
			tasks: state.tasks.map((task) => (task.id === id ? { ...task, startTime: time } : task)),
		}));
	},

	getTaskById: (id: number): Task | undefined => {
		return get().tasks.find((task) => task.id === id);
	},

	getAllTasks: (): Task[] => {
		return get().tasks;
	},
}));
