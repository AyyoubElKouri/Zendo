/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useTasksState } from "@/store/useTasksState";

export function useStatistics() {
	const { getAllTasks } = useTasksState();
	const tasks = getAllTasks();
   console.log(tasks);

	const allTasks = tasks.length;
	const completedTasks = tasks.filter((task) => task.completed === true).length;
	const rateOfCompletion =
		allTasks > 0 ? ((completedTasks / allTasks) * 100).toFixed(0).concat("%") : "0%";

	return {
		statistics: {
			allTasksNumber: allTasks,
			completedTasksNumber: completedTasks,
			rateOfCompletion,
		},
	};
}
