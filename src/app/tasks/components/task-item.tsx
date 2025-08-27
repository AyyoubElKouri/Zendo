/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';

import {
   createTask,
   deleteTask,
   getAllTasks,
   reorderTask,
   updateTask,
} from '../store/task-local-storage';
import { useTasksState } from '../store/use-tasks-store';
import type { Task } from '../types/entities';
import TaskField from './task-field';

// Main task item component with action buttons and editable fields
export default function TaskItem({ task }: { task: Task }) {
   const { order, move, add, update, remove } = useTasksState();

   const toggleTask = useCallback(() => {
      const newState = !task.completed;
      const updatedTask = { ...task, completed: newState };

      update(task.id, { completed: newState });
      updateTask(updatedTask);
   }, [task, update]);

   const removeTask = useCallback(() => {
      remove(task.id);
      deleteTask(task.id);
   }, [task.id, remove]);

   const duplicateTask = useCallback(() => {
      const duplicatedTask: Task = {
         ...task,
         id: Date.now(),
      };

      // Add task to state store
      add(duplicatedTask);

      // Find original task position and move duplicate after it
      const originalIndex = order.indexOf(task.id);
      if (originalIndex !== -1) {
         move(duplicatedTask.id, originalIndex + 1);
      }

      // Save duplicate task to local storage
      createTask(duplicatedTask);

      // Get current tasks and reorder in storage
      const allTasks = getAllTasks();
      const taskIndex = allTasks.findIndex((t) => t.id === task.id);

      if (taskIndex !== -1) {
         reorderTask(duplicatedTask.id, taskIndex + 1);
      }
   }, [task, order, add, move]);

   return (
      <div
         className='w-full min-h-[50px] rounded-xl bg-[#F3F3F3] dark:bg-[#050404] border-1
                      border-black/30 dark:border-white/10 relative grid
                      grid-cols-[36px_36px_222px_1fr_130px]'
      >
         {/* Delete task button */}
         <button
            type='button'
            onClick={removeTask}
            className={clsx(
               'w-full h-full bg-transparent flex justify-center items-center',
               'hover:bg-[#e9e9e9] hover:rounded-l-xl dark:hover:bg-[#292323]',
               'border-r border-black/30 dark:border-white/10',
            )}
         >
            <Image src='/icons/delete.svg' alt='delete icon' width={25} height={25} />
         </button>

         {/* Duplicate task button */}
         <button
            type='button'
            onClick={duplicateTask}
            className={clsx(
               'w-full h-full bg-transparent flex justify-center items-center',
               'hover:bg-[#e9e9e9] dark:hover:bg-[#292323]',
               'border-r border-black/30 dark:border-white/10',
            )}
         >
            <Image src='/icons/copy.svg' alt='copy icon' width={20} height={20} />
         </button>

         {/* Editable source field */}
         <TaskField task={task} type='source' />

         {/* Editable description field */}
         <TaskField task={task} type='description' />

         {/* Task completion toggle button */}
         <div className='w-full h-full flex justify-center items-center p-[10px]'>
            <Button variant={task.completed ? 'finished' : 'pending'} onClick={toggleTask}>
               {task.completed ? 'Finished' : 'Pending'}
            </Button>
         </div>
      </div>
   );
}
