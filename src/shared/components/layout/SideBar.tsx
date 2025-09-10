/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { FC, JSX } from "react";

import { TasksIcon } from "@shared/components/icons";
import { ThemeSelector } from "@shared/components/ui/ThemeSelector";
import { useAccentColor } from "@shared/hooks";
import { useScreenSize } from "@shared/hooks/useScreenSize";

import { Link, useLocation } from "react-router-dom";

interface SideBarItemProps {
	icon: JSX.Element;
	label: string;
	route: string;
}

const SideBarItem: FC<SideBarItemProps> = ({ icon, label, route }) => {
	const location = useLocation();
	const isActive = location.pathname === route;

	const { secondary } = useAccentColor();

	return (
		<Link to={route} className="w-full">
			<div
				className={`w-full h-10 flex items-center px-2 mb-2 rounded-lg cursor-pointer
                    transition-colors duration-200`}
				style={isActive ? { backgroundColor: secondary } : {}}
			>
				<span className="mr-3">{icon}</span>
				<span className="text-[16px] text-white font-medium">{label}</span>
			</div>
		</Link>
	);
};

export function SideBar() {
	const { primary } = useAccentColor();
	const { isMediumWidth } = useScreenSize();

	const items = [
		{ icon: <TasksIcon />, label: isMediumWidth ? "Taday Tasks" : "Tasks for Today", route: "/" },
	];

	return (
		<div className="w-57.5 min-h-screen border-r border-border bg-neutral-950 flex flex-col justify-between">
			{/* Header */}
			<span
				className="w-full h-[44px] flex items-center text-[16px] border-b border-border pl-3 font-medium"
				style={{ color: primary }}
			>
				Zendo
			</span>

			{/* Sidebar Items */}
			<div className="flex-1 px-2 py-14 overflow-y-auto">
				{items.map((item) => (
					<SideBarItem key={item.route} icon={item.icon} label={item.label} route={item.route} />
				))}
			</div>

			{/* Footer */}
			<div className="w-full h-10 border-t border-border flex items-center justify-center text-gray-400">
				<ThemeSelector />
			</div>
		</div>
	);
}
