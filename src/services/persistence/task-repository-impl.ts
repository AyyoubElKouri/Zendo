/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { z } from 'zod';

import { Task } from '@/types/entities';

import { TaskRepository } from '@/services/persistence/task-repository';
import { RepositoryException } from '@/services/exceptions';
import { TaskException } from '@/services/exceptions';

export class TaskRepositoryImpl implements TaskRepository {
   private readonly STORAGE_KEY_TASKS = '__tasks__key__';

   private static readonly AddTaskSchema = z.object({
      id: z
         .number('ID must be a number')
         .int('ID must be an integer')
         .positive('ID must be positive'),

      source: z
         .string()
         .min(2, 'Source must be at least 2 characters')
         .max(20, 'Source must not exceed 20 characters'),

      description: z
         .string()
         .min(1, 'Description cannot be empty')
         .max(200, 'Description must not exceed 200 characters'),

      completed: z.boolean(),
   });

   private static readonly UpdateTaskSchema = TaskRepositoryImpl.AddTaskSchema.partial();

   private isAvailable(): boolean {
      try {
         const testKey = '__test__';
         localStorage.setItem(testKey, 'test');
         localStorage.removeItem(testKey);
         return true;
      } catch {
         return false;
      }
   }

   private async saveTasks(tasks: Task[]): Promise<void> {
      try {
         if (!this.isAvailable()) {
            throw new RepositoryException('localStorage is not available');
         }

         localStorage.setItem(this.STORAGE_KEY_TASKS, JSON.stringify(tasks));
      } catch (error) {
         if (error instanceof RepositoryException) {
            throw error;
         }
         if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            throw new RepositoryException('Storage quota exceeded');
         }
         throw new RepositoryException(`Failed to save tasks: ${error}`);
      }
   }

   private async loadTasks(): Promise<Task[]> {
      try {
         if (!this.isAvailable()) {
            throw new RepositoryException('localStorage is not available');
         }

         const tasksJson = localStorage.getItem(this.STORAGE_KEY_TASKS);
         if (!tasksJson) {
            return [];
         }

         const tasks = JSON.parse(tasksJson);
         if (!Array.isArray(tasks)) {
            throw new RepositoryException('Invalid tasks data format in localStorage');
         }

         return tasks;
      } catch (error) {
         if (error instanceof RepositoryException) {
            throw error;
         }
         if (error instanceof SyntaxError) {
            throw new RepositoryException('Corrupted task data in localStorage');
         }
         throw new RepositoryException(`Failed to load tasks: ${error}`);
      }
   }

   public async addTask(task: Task, position?: number): Promise<Task> {
      // Validate task input
      const results = TaskRepositoryImpl.AddTaskSchema.safeParse(task);
      if (!results.success) {
         const firstError = results.error.issues[0].message;
         throw new TaskException(firstError);
      }

      const validatedTask = results.data;

      // Check if task with same ID already exists
      const tasks = await this.loadTasks();
      if (tasks.some((t) => t.id === validatedTask.id)) {
         throw new TaskException(`Task with ID ${validatedTask.id} already exists`);
      }

      // Add task at the desired position, or push at the end if position is undefined/out of range
      if (position !== undefined && position >= 0 && position <= tasks.length) {
         tasks.splice(position, 0, validatedTask);
      } else {
         tasks.push(validatedTask);
      }

      await this.saveTasks(tasks);

      return validatedTask;
   }

   public async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
      // Validate updates input
      const results = TaskRepositoryImpl.UpdateTaskSchema.safeParse(updates);
      if (!results.success) {
         const firstError = results.error.issues[0].message;
         throw new TaskException(firstError);
      }

      const validatedUpdates = results.data;
      const tasks = await this.loadTasks();

      // Find and update the task
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
         throw new TaskException(`Task with ID ${id} not found`);
      }

      const updatedTask = { ...tasks[taskIndex], ...validatedUpdates, id }; // Preserve original ID

      // Validate the complete updated task
      const finalValidation = TaskRepositoryImpl.AddTaskSchema.safeParse(updatedTask);
      if (!finalValidation.success) {
         const firstError = finalValidation.error.issues[0].message;
         throw new TaskException(firstError);
      }

      tasks[taskIndex] = finalValidation.data;
      await this.saveTasks(tasks);

      return finalValidation.data;
   }

   public async deleteTask(id: number): Promise<void> {
      const tasks = await this.loadTasks();

      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
         throw new TaskException(`Task with ID ${id} not found`);
      }

      tasks.splice(taskIndex, 1);
      await this.saveTasks(tasks);
   }

   public async deleteAllTasks(): Promise<void> {
      await this.saveTasks([]);
   }

   public async findTaskById(id: number): Promise<Task | null> {
      const tasks = await this.loadTasks();
      const task = tasks.find((task) => task.id === id);
      return task ?? null;
   }

   public async findAllTasks(): Promise<Task[]> {
      return await this.loadTasks();
   }

   public async countTasks(): Promise<number> {
      const tasks = await this.loadTasks();
      return tasks.length;
   }
}
