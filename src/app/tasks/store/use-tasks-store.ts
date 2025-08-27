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
    * List that keep track the order of tasks.
    */
   order: number[];

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
   remove: (id: number) => void;

   /**
    * Return all tasks.
    */
   find: () => Task[];

   /**
    * Return a specific task by its ID.
    */
   findOne: (id: number) => Task | undefined;

   /**
    * Reorder tasks by moving one task to a new index.
    */
   move: (id: number, toIndex: number) => void;
}

export const useTasksState = create<TaskState>((set, get) => ({
   tasks: [],
   order: [],

   add: (task: Task): void => {
      set((state) => ({
         tasks: [...state.tasks, task],
         order: [...state.order, task.id],
      }));
   },

   update: (id: number, updated: Partial<Task>): void => {
      set((state) => ({
         tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updated } : task)),
      }));
   },

   remove: (id: number): void => {
      set((state) => ({
         tasks: state.tasks.filter((task) => task.id !== id),
         order: state.order.filter((taskId) => taskId !== id),
      }));
   },

   find: (): Task[] => {
      const { tasks, order } = get();
      return order
         .map((id) => tasks.find((task) => task.id === id))
         .filter((task): task is Task => task !== undefined);
   },

   findOne: (id: number): Task | undefined => {
      return get().tasks.find((task) => task.id === id);
   },

   move: (id: number, toIndex: number): void => {
      set((state) => {
         const order = [...state.order];
         const fromIndex = order.indexOf(id);
         if (fromIndex === -1) return state;
         order.splice(fromIndex, 1);
         order.splice(toIndex, 0, id);
         return { order };
      });
   },
}));
