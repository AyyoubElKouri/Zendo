/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { ToggleTheme } from '@/components/ToggleTheme';

import { useEffect, useMemo } from 'react';
import { useTasksState } from '@/store/useTasksState';
import { TaskList } from '@tasks/components/TaskList';
import { TaskRepositoryImpl } from '@tasks/services/persistence/TaskRepositoryImpl';
import { Statistics } from '@tasks/components/Statistics';
import { ActionButtons } from '../components/ActionButtons';

export function TasksPage() {
   const { addTask } = useTasksState();
   const repo = useMemo(() => new TaskRepositoryImpl(), []);

   useEffect(() => {
      (async function addNow() {
         try {
            const tasks = await repo.findAllTasks();
            tasks.forEach((task) => {
               addTask(task);
            });
         } catch (err) {
            console.error(err);
         }
      })();
   }, [repo, addTask]);

   return (
      <div
         className='w-full min-h-svh bg-white dark:bg-[#040404] flex justify-center items-center text-4xl
                  '
      >
         <div className='w-[1043px] flex flex-col items-center gap-2 '>
            <ToggleTheme />
            <Statistics />
            <TaskList />
            <ActionButtons />
         </div>
      </div>
   );
}
