/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useCallback, useState, ChangeEvent, KeyboardEvent } from 'react';

import { useTasksState } from '@/store/useTasksState';

import { TaskRepository } from '@/services/persistence/task-repository';
import { TaskFieldProps } from '@/components/tasks/TaskItem/TaskField';

export function useTaskFieldAdapter({ task, type }: TaskFieldProps, repository: TaskRepository) {
   // States ---
   const [editMode, setEditMode] = useState<string | null>(null);
   const { updateTask } = useTasksState();

   // Helpers ---
   const isEditMode = editMode !== null;
   const fieldValue = type === 'source' ? task.source : task.description;

   // handler for enabling edit mode on double click.
   const enableEditMode = useCallback(() => {
      setEditMode(fieldValue);
   }, [fieldValue]);

   // Handler to keep track input value changes.
   const changeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setEditMode(event.target.value);
   }, []);

   // Handler to manage exit EditMode action
   const exitEditMode = useCallback(async () => {
      try {
         if (editMode !== null) {
            // Update task on the UI.
            updateTask(task.id, { [type]: editMode });

            // Update task on local storage.
            await repository.updateTask(task.id, { [type]: editMode });
         }
         setEditMode(null);
      } catch (error) {
         // TODO: Handle this Error.
      }
   }, [editMode, task, type, updateTask, repository]);

   // Handler to manage exitMode on Key `Enter` pressed
   const exitEditModeIfEnter = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
         if (event.key === 'Enter') {
            exitEditMode();
         }
      },
      [exitEditMode],
   );

   return {
      states: {
         isEditMode,
         editMode: editMode ?? fieldValue,
      },
      handlers: {
         enableEditMode,
         changeValue,
         exitEditMode,
         exitEditModeIfEnter,
      },
   };
}
