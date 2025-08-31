/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useMemo } from 'react';

import { Button } from '@/components/ui/Button';
import { Task } from '@/types/entities';
import { useTasksState } from '@/store/useTasksState';

import { TaskRepository } from '@/services/persistence/task-repository';
import { TaskRepositoryImpl } from '@/services/persistence/task-repository-impl';
import { ConfirmationAlert } from '@/components/ui/AlertDialog';
import { useToast } from '@/hooks/useToast';

function useActionButtons(repository: TaskRepository) {
   // Zustand state
   const { addTask, removeAllTask } = useTasksState();

   // toast
   const { toast } = useToast();

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

         toast.success('Task created successfuly');
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

         toast.success('All tasks removed Successfuly');
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
