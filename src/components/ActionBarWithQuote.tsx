/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { JSX } from "react";

import { Button } from "@/components/ui/Button";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";

import { useAccentColor } from "@/hooks/useAccentColor";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "@/hooks/useToast";
import { useQuote } from "@/hooks/useQuote";

export function ActionBarWithQuote() {
	const { createTask, deleteAllTasks } = useTasks();
	const { primary } = useAccentColor();
	const { toast } = useToast();
	const { quote } = useQuote();

	let message: string;
	let icon: JSX.Element;

	if (toast.type && toast.message) {
		message = toast.message;
		icon = toast.type === "success" ? <SuccessIcon /> : <ErrorIcon />;
	} else {
		message = quote;
		icon = <QuoteIcon />;
	}

	return (
		<div
			className="w-261 h-15.5 rounded-medium bg-neutral-950 border-1 border-border flex
                    justify-between items-center pl-4 pr-3.5 py-3.5"
		>
			<div className="flex justify-start items-center gap-3">
				{icon} <span className="text-medium text-neutral-400">{message}</span>
			</div>

			<div className="flex justify-end items-center gap-3.5 font-medium">
				<ConfirmationAlert
					title="Sure you want to do this?"
					description="This action will delete all tasks"
					action={deleteAllTasks}
				>
					<Button
						className="w-31 h-8.5 text-[18px] text-neutral-400 bg-transparent border-1
               border-border"
					>
						Clear
					</Button>
				</ConfirmationAlert>

				<Button
					className="w-31 h-8.5 text-[18px] text-white"
					style={{ backgroundColor: primary }}
					onClick={createTask}
				>
					Create
				</Button>
			</div>
		</div>
	);
}

function QuoteIcon() {
	const { primary } = useAccentColor();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			viewBox="0 0 25 25"
			role="img"
			aria-label="Lampe noire centrée dans cercle orange"
		>
			<circle cx="12.5" cy="12.5" r="12.5" fill={primary} />

			<svg
				x="5.5"
				y="5.5"
				width="14"
				height="14"
				viewBox="0 0 20 20"
				preserveAspectRatio="xMidYMid meet"
				aria-hidden="true"
			>
				<path
					d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 
                  .572.729a6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 
                  1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483a9.066 9.066 0 0 0 
                  2.726 0a.75.75 0 0 0-.226-1.483a7.553 7.553 0 0 1-2.274 0Z"
					fill="#000000"
				/>
			</svg>
		</svg>
	);
}

function SuccessIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
			<title>Success Icon</title>
			<path
				d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 
               C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z 
               M9.29,16.29 L5.7,12.7 
               C5.31,12.31 5.31,11.68 5.7,11.29 
               C6.09,10.9 6.72,10.9 7.11,11.29 
               L10,14.17 L16.88,7.29 
               C17.27,6.9 17.9,6.9 18.29,7.29 
               C18.68,7.68 18.68,8.31 18.29,8.7 
               L10.7,16.29 
               C10.32,16.68 9.68,16.68 9.29,16.29 Z"
				fill="#16a34a"
			/>
		</svg>
	);
}

function ErrorIcon() {
	return (
		<svg width="25" height="25" viewBox="0 0 24 24" role="img">
			<title>Error</title>
			<path
				d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22
               C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z
               M12,13 C11.45,13 11,12.55 11,12 L11,8 C11,7.45 11.45,7 12,7
               C12.55,7 13,7.45 13,8 L13,12 C13,12.55 12.55,13 12,13 Z
               M13,17 L11,17 L11,15 L13,15 L13,17 Z"
				fill="#dc2626"
			/>
		</svg>
	);
}
