/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TasksPage } from "@/TasksPage";

import "@/globals.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<TasksPage />
	</StrictMode>,
);
