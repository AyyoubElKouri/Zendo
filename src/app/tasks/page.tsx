/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { useEffect, useMemo } from 'react';

import { useTasksState } from '@/store/useTasksState';

import { TaskList } from '@/components/tasks/TaskList';
import { TaskRepositoryImpl } from '@/services/persistence/task-repository-impl';
import { Statistics } from '@/components/tasks/Statistics';
import { ActionButtons } from '@/components/tasks/ActionButtons';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function TasksPage() {
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

export default TasksPage;