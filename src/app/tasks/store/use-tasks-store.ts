/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { create } from 'zustand';

import type { Task } from '@/app/tasks/types/entities';

export interface TaskState {
   /**
    * List of all tasks.
    * The order in this array defines the natural order.
    */
   tasks: Task[];

   /**
    * Add a new task to the list.
    */
   addTask: (task: Task) => void;

   /**
    * Update an existing task by its ID.
    */
   updateTask: (id: number, updated: Partial<Task>) => void;

   /**
    * Remove a task from the list by its ID.
    */
   removeTask: (id: number) => void;

   /**
    * Return all tasks in natural order.
    */
   getAllTasks: () => Task[];

   /**
    * Return a specific task by its ID.
    */
   getTaskById: (id: number) => Task | undefined;

   /**
    * Move a task to a new position in the array.
    */
   moveTask: (id: number, toIndex: number) => void;
}

export const useTasksState = create<TaskState>((set, get) => ({
   tasks: [],

   addTask: (task: Task): void => {
      set((state) => ({
         tasks: [...state.tasks, task],
      }));
   },

   updateTask: (id: number, updated: Partial<Task>): void => {
      set((state) => ({
         tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updated } : task)),
      }));
   },

   removeTask: (id: number): void => {
      set((state) => ({
         tasks: state.tasks.filter((task) => task.id !== id),
      }));
   },

   getAllTasks: (): Task[] => {
      return get().tasks;
   },

   getTaskById: (id: number): Task | undefined => {
      return get().tasks.find((task) => task.id === id);
   },

   moveTask: (id: number, toIndex: number): void => {
      set((state) => {
         const tasks = [...state.tasks];
         const fromIndex = tasks.findIndex((task) => task.id === id);
         if (fromIndex === -1 || toIndex < 0 || toIndex >= tasks.length) return state;
         const [movedTask] = tasks.splice(fromIndex, 1);
         tasks.splice(toIndex, 0, movedTask);
         return { tasks };
      });
   },
}));
