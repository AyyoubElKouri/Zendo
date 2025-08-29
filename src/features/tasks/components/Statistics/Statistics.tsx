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
         className='w-[1043px] h-[119px] bg-[#DADADA] dark:bg-[#090808] rounded-[16px]
                    border-1 border-black/30 dark:border-white/10 grid grid-cols-[1fr_1fr_1fr]'
      >
         {statistics.map((statistic, index) => (
            <div
               key={statistic.label}
               className={clsx(
                  'flex justify-center items-center bg-transparent',
                  index !== statistics.length - 1 &&
                     'border-r-1 border-black/30 dark:border-white/10',
               )}
            >
               <div className='flex flex-col items-center gap-2'>
                  <span className='text-[20px] font-medium text-[#4C4C4C]'>{statistic.label}</span>
                  <div
                     className={clsx(
                        'w-[168px] h-[48px] flex justify-center items-center bg-[#F3F3F3]',
                        'dark:bg-[#050404] rounded-[12px]',
                        'border-1 border-black/30 dark:border-white/10',
                     )}
                  >
                     <span
                        className='text-[32px] text-[#FF6200] dark:text-[#FF6200]/80 
                                   font-medium'
                     >
                        {statistic.value}
                     </span>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
