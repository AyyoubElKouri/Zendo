/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useCallback } from 'react';

import { useTasksState } from '@/store/useTasksState';
import { Task } from '@/types/entities';

import { TaskRepository } from '@tasks/services/persistence/TaskRepository';

export function useTaskItemAdapter(task: Task, repository: TaskRepository) {
   const { moveTask, addTask, updateTask, removeTask: _removeTask } = useTasksState();

   // Toggle task handler
   const toggleTask = useCallback(async () => {
      try {
         const newState = !task.completed;

         // Update task in the local storage.
         await repository.updateTask(task.id, { completed: newState });

         // Update task in the UI (Zustand store).
         updateTask(task.id, { completed: newState });
      } catch (error: any) {
         // TODO: Handle Error
      }
   }, [task, repository, updateTask]);

   const removeTask = useCallback(async () => {
      try {
         // Remove task in local storage.
         await repository.deleteTask(task.id);

         // Remove task in UI (Zustand store).
         _removeTask(task.id);
      } catch (error: any) {
         // TODO: Handle Error
      }
   }, [task, repository, _removeTask]);

   const duplicateTask = useCallback(async () => {
      try {
         const duplicatedTask: Task = {
            ...task,
            id: Date.now() + Math.floor(Math.random() * 1000),
         };

         // Add task to the UI First so we can read the original position.
         addTask(duplicatedTask);

         const originalIndex = useTasksState.getState().tasks.findIndex((t) => t.id === task.id);
         if (originalIndex !== -1) {
            moveTask(duplicatedTask.id, originalIndex + 1);
            await repository.addTask(duplicatedTask, originalIndex + 1);
         } else {
            await repository.addTask(duplicatedTask);
         }
      } catch (error: any) {
         // TODO: Handle Error
      }
   }, [task, repository, addTask, moveTask]);

   return {
      handlers: {
         toggleTask,
         removeTask,
         duplicateTask,
      },
   };
}
