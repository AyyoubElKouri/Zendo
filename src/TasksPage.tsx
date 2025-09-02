/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { ActionBarWithQuote } from "@/components/ActionBarWithQuote";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Statistics } from "@/components/Statistics";
import { useLoadTasks } from "./hooks/useLoadTasks";
import { TaskList } from "@/components/TaskList";

export function TasksPage() {
	useLoadTasks();

	return (
		<div
			className="min-w-svh min-h-svh bg-neutral-900 flex flex-col
                    justify-between items-center "
		>
			<Header />
			<Statistics />
			<TaskList />
			<ActionBarWithQuote />
			<Footer />
		</div>
	);
}
