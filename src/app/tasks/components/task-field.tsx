/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from 'clsx';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useCallback, useState } from 'react';

import { updateTask } from '../store/task-local-storage';
import { useTasksState } from '../store/use-tasks-store';
import type { Task } from '../types/entities';

type FieldType = 'source' | 'description';

interface TaskFieldProps {
   task: Task;
   type: FieldType;
}

// Custom hook for managing editable field state and actions
function useTaskField({ task, type }: TaskFieldProps) {
   const [editMode, setEditMode] = useState<string | null>(null);
   const { update } = useTasksState();

   const isEditMode = editMode !== null;
   const fieldValue = type === 'source' ? task.source : task.description;

   const enableEditMode = useCallback(() => {
      setEditMode(fieldValue);
   }, [fieldValue]);

   const changeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setEditMode(event.target.value);
   }, []);

   const exitEditMode = useCallback(() => {
      if (editMode !== null) {
         const newTask = { ...task, [type]: editMode };
         update(task.id, { [type]: editMode });
         updateTask(newTask);
      }
      setEditMode(null);
   }, [editMode, task, type, update]);

   const exitEditModeIfEnter = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
         if (event.key === 'Enter') {
            exitEditMode();
         }
      },
      [exitEditMode],
   );

   return {
      isEditMode,
      editMode: editMode ?? fieldValue,
      enableEditMode,
      changeValue,
      exitEditMode,
      exitEditModeIfEnter,
   };
}

// Editable field component that switches between display and edit modes
export default function TaskField({ task, type }: TaskFieldProps) {
   const { isEditMode, editMode, enableEditMode, changeValue, exitEditMode, exitEditModeIfEnter } =
      useTaskField({ task, type });

   return (
      <div
         className={clsx(
            'w-full h-full flex justify-start items-center',
            'border-r border-black/10 dark:border-white/10',
            isEditMode ? 'px-[9px]' : 'px-[20px]',
            type === 'source'
               ? 'text-[20px] font-medium text-[#2A2929] dark:text-white'
               : 'text-[18px] text-[#323232] dark:text-[#AAAAAA]',
         )}
         onDoubleClick={enableEditMode}
      >
         {isEditMode ? (
            <input
               type='text'
               autoFocus
               spellCheck={false}
               value={editMode}
               onChange={changeValue}
               onBlur={exitEditMode}
               onKeyDown={exitEditModeIfEnter}
               className={clsx(
                  'w-full h-10 pl-[10px] border border-black/10 dark:border-white/10',
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
