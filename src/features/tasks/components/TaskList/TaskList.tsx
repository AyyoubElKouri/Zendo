/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useTasksState } from '../../../../store/useTasksState';
import { Task } from '../../../../types/entities';
import { TaskItem } from '../TaskItem';

export function TaskList() {
   const { getAllTasks } = useTasksState();
   const tasks = getAllTasks();

   return (
      <div
         className='w-[1043px] h-[524px] bg-[#DADADA] rounded-[16px] border-1 border-black/30
                  dark:border-white/10 dark:bg-[#090808] py-[25px] pl-[25px] pr-[12px]
                    overflow-auto'
      >
         <div className='task-list pr-[12px] w-full h-full flex flex-col gap-2 overflow-auto'>
            {tasks.map((task: Task) => (
               <TaskItem key={task.id} task={task} />
            ))}
         </div>
      </div>
   );
}
