/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { useEffect } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';

import TaskItem from './components/task-item';
import { getAllTasks } from './store/task-local-storage';
import { useTasksState } from './store/use-tasks-store';

export default function Tasks() {
   const { add, find } = useTasksState();

   useEffect(() => {
      // createTask({
      //    id: 3,
      //    source: 'Code Review',
      //    description: 'Learn from the last version',
      //    completed: true,
      // });

      // createTask({
      //    id: 4,
      //    source: 'Oracle Academy',
      //    description: 'Finish the last chapter of Clean Architecture',
      //    completed: false,
      // });

      const tasksFromLocalStorage = getAllTasks();
      tasksFromLocalStorage.forEach((task) => {
         add(task);
      });
   }, [add]);

   const tasks = find();

   return (
      <div
         className='w-full min-h-svh bg-white dark:bg-[#090808] flex justify-center items-center text-4xl
                  '
      >
         <div className='w-[1043px] '>
            <ThemeToggle />
            <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
               {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
               ))}
            </div>
         </div>
      </div>
   );
}
