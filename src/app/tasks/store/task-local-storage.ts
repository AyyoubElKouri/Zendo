/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { Task } from '../types/entities';

const STORAGE_KEY_TASKS = '__tasks__key__';
const STORAGE_KEY_ORDER = '__tasks_order__key__';

// Utility functions -------------------------------------------------------------------------------
const isLocalStorageAvailable = (): boolean => {
   try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
   } catch {
      return false;
   }
};

const isValidId = (id: number): boolean => {
   return typeof id === 'number' && id > 0 && Number.isInteger(id);
};

const isValidTaskStructure = (task: Task): boolean => {
   return (
      task &&
      typeof task === 'object' &&
      typeof task.id === 'number' &&
      typeof task.source === 'string' &&
      typeof task.description === 'string' &&
      typeof task.completed === 'boolean'
   );
};

const validateTask = (task: Task): void => {
   if (!task) {
      throw new Error('Task object is required');
   }

   if (!task.id || typeof task.id !== 'number' || task.id <= 0) {
      throw new Error('Task id is required and must be > 0');
   }

   if (!task.source || typeof task.source !== 'string' || task.source.trim() === '') {
      throw new Error('Task source is required and must be a non-empty string');
   }

   if (
      !task.description ||
      typeof task.description !== 'string' ||
      task.description.trim() === ''
   ) {
      throw new Error('Task description is required and must be a non-empty string');
   }

   if (typeof task.completed !== 'boolean') {
      throw new Error('Task completed status must be a boolean');
   }
};

const handleError = (error: unknown, message?: string): never => {
   if (error instanceof Error) {
      throw error;
   }

   throw new Error(`${message}: ${error instanceof Error ? error.message : 'Unknown error'}`);
};

// Core functions ----------------------------------------------------------------------------------
const loadTasks = (): Task[] => {
   try {
      if (!isLocalStorageAvailable()) {
         throw new Error('localStorage is not available');
      }

      const tasksJson = localStorage.getItem(STORAGE_KEY_TASKS);
      if (!tasksJson) {
         return [];
      }

      const tasks = JSON.parse(tasksJson);

      if (!Array.isArray(tasks)) {
         throw new Error('Invalid tasks data format in localStorage');
      }

      tasks.forEach((task, index) => {
         if (!isValidTaskStructure(task)) {
            throw new Error(`Invalid task structure at index ${index}`);
         }
      });

      return tasks;
   } catch (error) {
      if (error instanceof SyntaxError) {
         throw new Error('Corrupted task data in localStorage');
      }
      handleError(error, 'Failed to load tasks');

      return [];
   }
};

const saveTasks = (tasks: Task[]): void => {
   try {
      if (!isLocalStorageAvailable()) {
         throw new Error('localStorage is not available');
      }

      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
   } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
         throw new Error('localStorage quota exceeded');
      }
      handleError(error, 'Failed to save tasks');
   }
};

const loadOrder = (): number[] => {
   try {
      if (!isLocalStorageAvailable()) throw new Error('localStorage is not available');
      const orderJson = localStorage.getItem(STORAGE_KEY_ORDER);
      if (!orderJson) return [];
      const order = JSON.parse(orderJson);
      if (!Array.isArray(order)) throw new Error('Invalid order data format in localStorage');
      return order.filter((id) => isValidId(id));
   } catch (error) {
      handleError(error, 'Failed to load order');
      return [];
   }
};

const saveOrder = (order: number[]): void => {
   try {
      if (!isLocalStorageAvailable()) throw new Error('localStorage is not available');
      localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(order));
   } catch (error) {
      handleError(error, 'Failed to save order');
   }
};

// Public API functions ----------------------------------------------------------------------------

export const createTask = (task: Task): void => {
   try {
      validateTask(task);
      const tasks = loadTasks();
      tasks.push(task);
      saveTasks(tasks);

      const order = loadOrder();
      order.push(task.id);
      saveOrder(order);
   } catch (error) {
      handleError(error, 'Failed to create task');
   }
};

export const updateTask = (task: Task): void => {
   try {
      validateTask(task);

      const tasks = loadTasks();
      const taskIndex = tasks.findIndex((t) => t.id === task.id);

      if (taskIndex === -1) {
         throw new Error(`Task with ID ${task.id} not found`);
      }

      tasks[taskIndex] = { ...task };
      saveTasks(tasks);
   } catch (error) {
      handleError(error, 'Failed to update task');
   }
};

export const deleteTask = (taskId: number): void => {
   try {
      if (!isValidId(taskId)) {
         throw new Error('Invalid task ID provided');
      }

      const tasks = loadTasks();
      const taskIndex = tasks.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) {
         throw new Error(`Task with ID ${taskId} not found`);
      }

      tasks.splice(taskIndex, 1);
      saveTasks(tasks);

      const order = loadOrder().filter((id) => id !== taskId);
      saveOrder(order);
   } catch (error) {
      handleError(error, 'Failed to delete task');
   }
};

export const getAllTasks = (): Task[] => {
   try {
      const tasks = loadTasks();
      const order = loadOrder();

      return order.flatMap((id) => {
         const task = tasks.find((t) => t.id === id);
         return task ? [task] : [];
      });
   } catch (error) {
      handleError(error, 'Failed to retrieve tasks');
      return [];
   }
};

export const toggleTaskStatus = (taskId: number): void => {
   try {
      if (!isValidId(taskId)) {
         throw new Error('Invalid task ID provided');
      }

      const tasks = loadTasks();
      const task = tasks.find((t) => t.id === taskId);

      if (!task) {
         throw new Error(`Task with ID ${taskId} not found`);
      }

      task.completed = !task.completed;
      saveTasks(tasks);
   } catch (error) {
      handleError(error, 'Failed to toggle task status');
   }
};

export const deleteAllTasks = (): void => {
   try {
      saveTasks([]);
   } catch (error) {
      handleError(error, 'Failed to delete all tasks');
   }
};

export const reorderTask = (id: number, toIndex: number): void => {
   try {
      const order = loadOrder();
      const fromIndex = order.indexOf(id);
      if (fromIndex === -1) throw new Error(`Task with ID ${id} not found in order`);
      order.splice(fromIndex, 1);
      order.splice(toIndex, 0, id);
      saveOrder(order);
   } catch (error) {
      handleError(error, 'Failed to reorder task');
   }
};
