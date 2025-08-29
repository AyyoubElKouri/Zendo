/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { Task } from '@/types/entities';

import { TaskRepository } from '@tasks/services/persistence/TaskRepository';
import { useTasksState } from '@/store/useTasksState';
import { useMemo } from 'react';
import { TaskRepositoryImpl } from '../../services/persistence/TaskRepositoryImpl';

function useActionButtons(repository: TaskRepository) {
   // Zustand state
   const { addTask, removeAllTask } = useTasksState();

   // Handler for creating new task
   async function createTask() {
      try {
         // new task with default values.
         const newTask: Task = {
            id: Date.now(),
            source: 'Default Source',
            description: 'Default Description',
            completed: false,
         };

         // Local storage.
         repository.addTask(newTask);

         // the UI (Zustand state).
         addTask(newTask);
      } catch (error) {
         // TODO: handle this Error.
      }
   }

   // Handler for deleting all tasks.
   async function deleteAllTAsks() {
      try {
         // In the local storage.
         await repository.deleteAllTasks();

         // In the UI (Zustand State)
         removeAllTask();
      } catch (error) {
         // TODO: Handle this Error.
      }
   }

   return {
      handlers: {
         createTask,
         deleteAllTAsks,
      },
   };
}

export function ActionButtons() {
   const repository = useMemo(() => new TaskRepositoryImpl(), []);
   const { handlers } = useActionButtons(repository);

   return (
      <div
         className={clsx(
            'w-[413px] h-[64px] p-[8px] flex bg-[#DADADA] dark:bg-[#090808]',
            'border-1 border-black/30 dark:border-white/10 rounded-[16px]',
         )}
      >
         <Button variant={'deleteAll'} onClick={handlers.deleteAllTAsks}>
            Delete All
         </Button>
         <Button variant={'createTask'} onClick={handlers.createTask}>
            Create Task
         </Button>
      </div>
   );
}
