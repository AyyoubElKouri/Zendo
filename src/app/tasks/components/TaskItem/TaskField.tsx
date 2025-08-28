/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from 'clsx';
import { useMemo } from 'react';

import type { Task } from '../../types/entities';
import TaskRepositoryImpl from '../../services/persistence/TaskRepositoryImpl';
import { useTaskFieldAdapter } from './useTaskFieldAdapter';

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
            'w-full h-full flex justify-start items-center',
            'border-r border-black/30 dark:border-white/10',
            states.isEditMode ? 'px-[6px]' : 'px-[12px]',
            type === 'source'
               ? 'text-[18px] font-medium text-[#2A2929] dark:text-white'
               : 'text-[16px] text-[#323232] dark:text-[#AAAAAA]',
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
                  'w-full h-8 pl-[5px] border border-black/10 dark:border-white/10',
                  'focus:outline-none rounded-lg',
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
