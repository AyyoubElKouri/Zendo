/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useTasksState } from '@/store/useTasksState';
import clsx from 'clsx';

function useStatistics() {
   const { tasks } = useTasksState();

   const allTasks = tasks.length;
   const completedTasks = tasks.filter((task) => task.completed === true).length;
   const rateOfCompletion =
      allTasks > 0 ? ((completedTasks / allTasks) * 100).toFixed(0).concat('%') : '0.00';

   return [
      { label: 'All Tasks', value: allTasks },
      { label: 'Completed Tasks', value: completedTasks },
      { label: 'Rate of Completion', value: rateOfCompletion },
   ];
}

export function Statistics() {
   const statistics = useStatistics();

   return (
      <div
         className='w-260 h-20 bg-background-2 rounded-large border-1 border-border grid
                    grid-cols-[1fr_1fr_1fr]'
      >
         {statistics.map((statistic, index) => (
            <div
               key={statistic.label}
               className={clsx(
                  'flex justify-center items-center bg-transparent',
                  index !== statistics.length - 1 && 'border-r-1 border-border',
               )}
            >
               <div className='flex flex-col items-center'>
                  <span className='text-lg font-medium text-secondary'>{statistic.label}</span>
                  <span className='text-3xl text-accent font-medium'>{statistic.value}</span>
               </div>
            </div>
         ))}
      </div>
   );
}
