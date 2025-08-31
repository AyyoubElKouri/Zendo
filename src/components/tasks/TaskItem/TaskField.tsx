/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useMemo } from 'react';
import { clsx } from 'clsx';

import { Task } from '@/types/entities';

import { TaskRepositoryImpl } from '@/services/persistence/task-repository-impl';
import { useTaskFieldAdapter } from '@/components/tasks/TaskItem/useTaskFieldAdapter';

export interface TaskFieldProps {
   task: Task;
   type: 'source' | 'description';
}

export function TaskField({ task, type }: TaskFieldProps) {
   const repository = useMemo(() => new TaskRepositoryImpl(), []);
   const { states, handlers } = useTaskFieldAdapter({ task, type }, repository);

   return (
      <div
         className={clsx(
            'w-full h-full flex justify-start items-center border-r border-border text-md',
            states.isEditMode ? 'px-2' : 'px-4',
            type === 'source' ? 'font-medium text-secondary' : 'text-secondary',
         )}
         onDoubleClick={handlers.enableEditMode}
      >
         {states.isEditMode ? (
            <input
               type='text'
               autoFocus
               spellCheck={false}
               value={states.editMode}
               onChange={handlers.changeValue}
               onBlur={handlers.exitEditMode}
               onKeyDown={handlers.exitEditModeIfEnter}
               className={clsx(
                  'w-full h-8 pl-2 border border-border focus:outline-none rounded-small',
               )}
            />
         ) : (
            <span className='max-w-132 truncate'>
               {type === 'source' ? task.source : task.description}
            </span>
         )}
      </div>
   );
}
