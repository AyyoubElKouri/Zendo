/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { useEffect, useMemo } from 'react';

import { useTasksState } from '@/store/useTasksState';

import { TaskList } from '@tasks/components/TaskList';
import { TaskRepositoryImpl } from '@tasks/services/persistence/TaskRepositoryImpl';
import { Statistics } from '@tasks/components/Statistics';
import { ActionButtons } from '@tasks/components/ActionButtons';
import { Header } from '@tasks/components/Header';
import { Footer } from '@tasks/components/Footer';

import '@tasks/styles.css';

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
      <div className='w-full min-h-svh bg-background-1 flex flex-col justify-between items-center gap-4'>
         <Header />
         <Statistics />
         <TaskList />
         <ActionButtons />
         <Footer />
      </div>
   );
}
