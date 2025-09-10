/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TasksPage } from "@features-tasks/TasksPage";

import "./globals.css";

import { MainLayout } from "@shared/components/layout/MainLayout";

import { createHashRouter, RouterProvider } from "react-router-dom";

function Calender() {
	return (
		<div className="w-full h-full bg-amber-200 text-3xl text-amber-800 flex justify-center items-center">
			hello Ayyoub
		</div>
	);
}

const router = createHashRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <TasksPage /> },
			{ path: "/calender", element: <Calender /> },
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
