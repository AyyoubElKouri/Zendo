/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { create } from 'zustand';

import type { Task } from '@/app/tasks/types/entities';

export interface TaskState {
   /**
    * List of all tasks.
    */
   tasks: Task[];

   /**
    * Add a new task to the list.
    */
   add: (task: Task) => void;

   /**
    * Update an existing task by its ID.
    */
   update: (id: number, updated: Partial<Task>) => void;

   /**
    * Remove a task from the list by its ID.
    */
   delete: (id: number) => void;

   /**
    * Return all tasks.
    */
   find: () => Task[];

   /**
    * Return a specific task by its ID.
    */
   findOne: (id: number) => Task | undefined;
}

export const useTasksState = create<TaskState>((set, get) => ({
   tasks: [],
   add: (task: Task): void => {
      set((state) => ({
         tasks: [...state.tasks, task],
      }));
   },

   update: (id: number, updated: Partial<Task>): void => {
      set((state) => ({
         tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updated } : task)),
      }));
   },

   delete: (id: number): void => {
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
   },

   find: (): Task[] => {
      return get().tasks;
   },

   findOne: (id: number): Task | undefined => {
      return get().tasks.find((task) => task.id === id);
   },
}));
