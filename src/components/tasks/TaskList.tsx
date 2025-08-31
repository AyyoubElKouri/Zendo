/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useTasksState } from '@/store/useTasksState';
import { Task } from '@/types/entities';

import { TaskItem } from '@/components/tasks/TaskItem';

export function TaskList() {
   const { getAllTasks } = useTasksState();
   const tasks = getAllTasks();

   return (
      <div
         className='w-260 h-110 bg-background-2 rounded-large border-1 border-border py-8 pl-8 pr-4
                    overflow-auto'
      >
         <div className='task-list pr-4 w-full h-full flex flex-col gap-2 overflow-auto'>
            {tasks.length !== 0 ? (
               tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
            ) : (
               <div
                  className='w-full h-full flex justify-center items-center text-5xl
                             text-secondary'
               >
                  Create new tasks
               </div>
            )}
         </div>
      </div>
   );
}
