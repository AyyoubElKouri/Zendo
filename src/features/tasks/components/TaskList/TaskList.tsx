/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useTasksState } from '@/store/useTasksState';
import { Task } from '@/types/entities';

import { TaskItem } from '@tasks/components/TaskItem';

export function TaskList() {
   const { getAllTasks } = useTasksState();
   const tasks = getAllTasks();

   return (
      <div
         className='w-[1043px] h-[524px] bg-[#DADADA] rounded-[16px] border-1 border-black/30
                  dark:border-white/10 dark:bg-[#090808] py-[35px] pl-[35px] pr-[17px]
                    overflow-auto'
      >
         <div className='task-list pr-[16px] w-full h-full flex flex-col gap-2 overflow-auto'>
            {tasks.map((task: Task) => (
               <TaskItem key={task.id} task={task} />
            ))}
         </div>
      </div>
   );
}
