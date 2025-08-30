/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useMemo } from 'react';

import { Button } from '@/components/ui/Button';
import { Task } from '@/types/entities';
import { useTasksState } from '@/store/useTasksState';

import { TaskRepository } from '@tasks/services/persistence/TaskRepository';
import { TaskRepositoryImpl } from '@tasks/services/persistence/TaskRepositoryImpl';
import { ConfirmationAlert } from '@/components/ui/AlertDialog';

function useActionButtons(repository: TaskRepository) {
   // Zustand state
   const { addTask, removeAllTask } = useTasksState();

   // Handler
   async function createTask() {
      try {
         const defaultValue: Task = {
            id: Date.now(),
            source: 'Default Source',
            description: 'Default Description',
            completed: false,
         };

         // In Local Storage.
         repository.addTask(defaultValue);

         // In UI.
         addTask(defaultValue);
      } catch (error) {
         // TODO: handle this Error.
      }
   }

   // Handler
   async function deleteAllTAsks() {
      try {
         // In Local Storage.
         await repository.deleteAllTasks();

         // In UI
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
      <div className='w-80 h-13 p-2 flex bg-background-2 border-1 border-border rounded-large'>
         <ConfirmationAlert
            action={handlers.deleteAllTAsks}
            title='Sure ?'
            description='This action will delete all tasks'
         >
            <Button variant={'deleteAll'}>Delete All</Button>
         </ConfirmationAlert>
         <Button variant={'createTask'} onClick={handlers.createTask}>
            Create Task
         </Button>
      </div>
   );
}
