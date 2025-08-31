/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useCallback } from 'react';

import { useTasksState } from '@/store/useTasksState';
import { Task } from '@/types/entities';

import { TaskRepository } from '@/services/persistence/task-repository';
import { useToast } from '@/hooks/useToast';

export function useTaskItemAdapter(task: Task, repository: TaskRepository) {
   const {
      moveTask,
      addTask,
      updateTask: updateTaskInUI,
      removeTask: removeTaskInUI,
   } = useTasksState();
   const { toast } = useToast();

   // toggleTask -----------------------------------------------------------------------------------
   const toggleTask = useCallback(async () => {
      try {
         const newState = !task.completed;

         await repository.updateTask(task.id, { completed: newState });
         updateTaskInUI(task.id, { completed: newState });

         toast.success(newState ? 'Task finished successfuly' : 'Task not finished yet');
      } catch (error: unknown) {
         error instanceof Error && toast.error(error.message);
      }
   }, [task, repository, updateTaskInUI, toast]);

   // removeTask -----------------------------------------------------------------------------------
   const removeTask = useCallback(async () => {
      try {
         await repository.deleteTask(task.id);
         removeTaskInUI(task.id);

         toast.success('Task removed successfuly');
      } catch (error: unknown) {
         error instanceof Error && toast.error(error.message);
      }
   }, [task, repository, removeTaskInUI, toast]);

   // duplicateTask --------------------------------------------------------------------------------
   const duplicateTask = useCallback(async () => {
      try {
         const duplicatedTask: Task = {
            ...task,
            id: Date.now() + Math.floor(Math.random() * 1000),
         };

         addTask(duplicatedTask);

         const originalIndex = useTasksState.getState().tasks.findIndex((t) => t.id === task.id);
         if (originalIndex !== -1) {
            moveTask(duplicatedTask.id, originalIndex + 1);
            await repository.addTask(duplicatedTask, originalIndex + 1);
         } else {
            await repository.addTask(duplicatedTask);
         }

         toast.success('Task duplicated successfuly');
      } catch (error: unknown) {
         error instanceof Error && toast.error(error.message);
      }
   }, [task, repository, addTask, moveTask, toast]);

   return {
      handlers: {
         toggleTask,
         removeTask,
         duplicateTask,
      },
   };
}
