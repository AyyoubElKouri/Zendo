/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { z } from "zod";
import type { Task } from "@features/tasks/entities";

export class TaskRepository {
	private readonly STORAGE_KEY_TASKS = "__tasks__key__";

	private static readonly AddTaskSchema = z.object({
		id: z
			.number("ID must be a number")
			.int("ID must be an integer")
			.positive("ID must be positive"),

		source: z
			.string()
			.min(2, "Source must be at least 2 characters")
			.max(20, "Source must not exceed 20 characters"),

		description: z
			.string()
			.min(1, "Description cannot be empty")
			.max(70, "Description must not exceed 70 characters"),

		completed: z.boolean(),
	});

	private static readonly UpdateTaskSchema = TaskRepository.AddTaskSchema.partial();

	private isAvailable(): boolean {
		try {
			const testKey = "__test__";
			localStorage.setItem(testKey, "test");
			localStorage.removeItem(testKey);
			return true;
		} catch {
			return false;
		}
	}

	private saveTasks(tasks: Task[]): void {
		try {
			if (!this.isAvailable()) {
				throw new Error("localStorage is not available");
			}

			localStorage.setItem(this.STORAGE_KEY_TASKS, JSON.stringify(tasks));
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			if (error instanceof DOMException && error.name === "QuotaExceededError") {
				throw new Error("Storage quota exceeded");
			}
			throw new Error(`Failed to save tasks: ${error}`);
		}
	}

	private loadTasks(): Task[] {
		try {
			if (!this.isAvailable()) {
				throw new Error("localStorage is not available");
			}

			const tasksJson = localStorage.getItem(this.STORAGE_KEY_TASKS);
			if (!tasksJson) {
				return [];
			}

			const tasks = JSON.parse(tasksJson);
			if (!Array.isArray(tasks)) {
				throw new Error("Invalid tasks data format in localStorage");
			}

			return tasks;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			if (error instanceof SyntaxError) {
				throw new Error("Corrupted task data in localStorage");
			}
			throw new Error(`Failed to load tasks: ${error}`);
		}
	}

	public addTask(task: Task, position?: number): Task {
		// Validate task input
		const results = TaskRepository.AddTaskSchema.safeParse(task);
		if (!results.success) {
			const firstError = results.error.issues[0].message;
			throw new Error(firstError);
		}

		const validatedTask = results.data;

		// Check if task with same ID already exists
		const tasks = this.loadTasks();
		if (tasks.some((t) => t.id === validatedTask.id)) {
			throw new Error(`Task with ID ${validatedTask.id} already exists`);
		}

		// Add task at the desired position, or push at the end if position is undefined/out of range
		if (position !== undefined && position >= 0 && position <= tasks.length) {
			tasks.splice(position, 0, validatedTask);
		} else {
			tasks.push(validatedTask);
		}

		this.saveTasks(tasks);

		return validatedTask;
	}

	public updateTask(id: number, updates: Partial<Task>): Task {
		// Validate updates input
		const results = TaskRepository.UpdateTaskSchema.safeParse(updates);
		if (!results.success) {
			const firstError = results.error.issues[0].message;
			throw new Error(firstError);
		}

		const validatedUpdates = results.data;
		const tasks = this.loadTasks();

		// Find and update the task
		const taskIndex = tasks.findIndex((task) => task.id === id);
		if (taskIndex === -1) {
			throw new Error(`Task with ID ${id} not found`);
		}

		const updatedTask = { ...tasks[taskIndex], ...validatedUpdates, id }; // Preserve original ID

		// Validate the complete updated task
		const finalValidation = TaskRepository.AddTaskSchema.safeParse(updatedTask);
		if (!finalValidation.success) {
			const firstError = finalValidation.error.issues[0].message;
			throw new Error(firstError);
		}

		tasks[taskIndex] = finalValidation.data;
		this.saveTasks(tasks);

		return finalValidation.data;
	}

	public deleteTask(id: number): void {
		const tasks = this.loadTasks();

		const taskIndex = tasks.findIndex((task) => task.id === id);
		if (taskIndex === -1) {
			throw new Error(`Task with ID ${id} not found`);
		}

		tasks.splice(taskIndex, 1);
		this.saveTasks(tasks);
	}

	public deleteAllTasks(): void {
		this.saveTasks([]);
	}

	public findTaskById(id: number): Task | null {
		const tasks = this.loadTasks();
		const task = tasks.find((task) => task.id === id);
		return task ?? null;
	}

	public findAllTasks(): Task[] {
		return this.loadTasks();
	}

	public countTasks(): number {
		const tasks = this.loadTasks();
		return tasks.length;
	}
}
