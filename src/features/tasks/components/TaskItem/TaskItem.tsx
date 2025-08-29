/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { useMemo, ReactNode } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

import { Button } from '@/components/ui/Button';
import { Task } from '@/types/entities';

import { TaskField } from '@tasks/components/TaskItem/TaskField';
import { TaskRepositoryImpl } from '@tasks/services/persistence/TaskRepositoryImpl';
import { useTaskItemAdapter } from '@tasks/components/TaskItem/useTaskItemAdapter';

export function TaskItem({ task }: { task: Task }) {
   const repository = useMemo(() => new TaskRepositoryImpl(), []);
   const { handlers } = useTaskItemAdapter(task, repository);

   return (
      <TaskItemContainer>
         <TaskButton type='delete' action={handlers.removeTask} />
         <TaskButton type='duplicate' action={handlers.duplicateTask} />

         <TaskField task={task} type='source' />
         <TaskField task={task} type='description' />

         <ToggleButton completed={task.completed} toggleTask={handlers.toggleTask} />
      </TaskItemContainer>
   );
}

/*-------------------------------------- Internel Helpers ----------------------------------------*/

function TaskItemContainer({ children }: { children: ReactNode }) {
   return (
      <div
         className='w-full min-h-[50px] rounded-xl bg-[#F3F3F3] dark:bg-[#050404] border-1
                  border-black/30 dark:border-white/10 relative grid
                    grid-cols-[36px_36px_222px_1fr_130px]'
      >
         {children}
      </div>
   );
}

interface TaskButtonProps {
   type: 'delete' | 'duplicate';
   action: () => void;
}

function TaskButton({ type, action }: TaskButtonProps) {
   return (
      <button
         type='button'
         onClick={action}
         className={clsx(
            'w-full h-full bg-transparent flex justify-center items-center',
            'hover:bg-[#e9e9e9] dark:hover:bg-[#292323]',
            'border-r border-black/30 dark:border-white/10',
            type === 'delete' && 'hover:rounded-l-xl',
         )}
      >
         <Image
            src={type === 'delete' ? '/icons/delete.svg' : '/icons/copy.svg'}
            alt={type === 'delete' ? 'delete icon' : 'copy icon'}
            width={type === 'delete' ? 25 : 20}
            height={type === 'delete' ? 25 : 20}
         />
      </button>
   );
}

interface ToggleButtonProps {
   completed: boolean;
   toggleTask: () => void;
}

function ToggleButton({ completed, toggleTask }: ToggleButtonProps) {
   return (
      <div className='w-full h-full flex justify-center items-center p-[10px]'>
         <Button variant={completed ? 'finished' : 'pending'} onClick={toggleTask}>
            {completed ? 'Finished' : 'Pending'}
         </Button>
      </div>
   );
}
