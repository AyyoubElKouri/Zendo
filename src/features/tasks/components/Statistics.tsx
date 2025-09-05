/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from "clsx";

import { useAccentColor } from "@/shared/hooks/useAccentColor";
import { useTasks } from "@/features/tasks/hooks/useTasks";

export function Statistics() {
	const { getStatistics } = useTasks();

	const statistics = getStatistics();
	const statisticsArray = [
		{ label: "All Tasks", value: statistics.allTasksNumber },
		{ label: "Completed Tasks", value: statistics.completedTasksNumber },
		{ label: "Rate Of Completion", value: statistics.rateOfCompletion },
	];

	return (
		<div className="flex bg-neutral-950 rounded-medium border-1 border-border">
			{statisticsArray.map((statisticsItem, index) => (
				<StatisticsItem
					key={statisticsItem.label}
					{...statisticsItem}
					isLast={index === statisticsArray.length - 1}
				/>
			))}
		</div>
	);
}

interface StatisticsItemProps {
	label: string;
	value: string | number;
	isLast: boolean;
}

function StatisticsItem({ label, value, isLast }: StatisticsItemProps) {
	const { primary } = useAccentColor();

	return (
		<div className="w-87 h-29 bg-transparent">
			<div
				className={clsx(
					`h-11 flex justify-center items-center text-medium text-neutral-300 border-b-1
                border-border`,
					!isLast && "border-r-1",
				)}
			>
				{label}
			</div>
			<div
				className={clsx(
					"h-18 flex justify-center items-center text-3xl font-medium",
					!isLast && "border-r-1",
				)}
				style={{ color: primary }}
			>
				{value}
			</div>
		</div>
	);
}
