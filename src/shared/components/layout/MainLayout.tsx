/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export function MainLayout() {
	return (
		<div className="min-w-svh min-h-svh flex">
			<SideBar />
			<div className="w-full flex flex-col">
				<Header />
				<div className="w-full h-full flex justify-center items-center">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
