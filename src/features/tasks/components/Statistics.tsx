/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from "clsx";

import { useAccentColor } from "@shared/hooks";
import { useScreenSize } from "@shared/hooks/useScreenSize";

import { formatDuration } from "@features-tasks/formatDuration";
import { useTasks } from "@features-tasks/useTasks";

export function Statistics() {
	const { isMediumWidth } = useScreenSize();
	const { getStatistics } = useTasks();

	const statistics = getStatistics();
	const statisticsArray = [
		{ label: "All Tasks", value: statistics.allTasksNumber },
		{
			label: isMediumWidth ? "Completed" : "Completed Tasks",
			value: statistics.completedTasksNumber,
		},
		{ label: "Duration", value: formatDuration(statistics.duration).concat("m") },
		{
			label: isMediumWidth ? "Completion" : "Rate Of Completion",
			value: statistics.rateOfCompletion,
		},
	];

	return (
		<div className="w-full max-w-261 grid grid-cols-4 bg-neutral-950 rounded-sm border-1 border-border">
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
function StatisticsItem({ label, value }: StatisticsItemProps) {
	const { isMediumWidth, isShortHeight } = useScreenSize();
	const { primary } = useAccentColor();

	return (
		<div className="bg-transparent border-r border-border last:border-r-0">
			{/* Label */}
			<div
				className={clsx(
					"flex justify-center items-center text-xs sm:text-sm md:text-base",
					"lg:text-medium text-neutral-300 border-b border-border",
					isMediumWidth || isShortHeight ? "h-9" : "h-11",
				)}
			>
				{label}
			</div>

			{/* Value */}
			<div
				className={clsx(
					"flex justify-center items-center text-lg sm:text-xl md:text-2xl",
					"lg:text-3xl font-medium",
					isMediumWidth || isShortHeight ? "h-13" : "h-18",
				)}
				style={{ color: primary }}
			>
				{value}
			</div>
		</div>
	);
}
