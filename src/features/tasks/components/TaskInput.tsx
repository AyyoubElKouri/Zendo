/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@headlessui/react";
import clsx from "clsx";

import type { Task } from "@features-tasks/Task";
import { useTasks } from "@features-tasks/useTasks";

// Helper
function extractDuration(input: string): number | undefined {
	const regex = /^(\d+)\s*(minutes?|min|m)\s+of/i;

	const match = input.match(regex);
	if (match) {
		return Number(match[1]);
	}

	return undefined;
}

// Helper
function getTimeString(time: string) {
	const minutesTotal = Number(time);

	if (!time || Number.isNaN(Number(time))) return "00:00";

	const minutes = (minutesTotal % 60).toString().padStart(2, "0");
	const hours = Math.floor(minutesTotal / 60)
		.toString()
		.padStart(2, "0");

	return `${hours}:${minutes}`;
}

// Props
interface TaskInputProps {
	id: number;
	type: "source" | "description" | "startTime";
	setIsEditMode: (field: "source" | "description" | "startTime" | null) => void;
}

// Component
export function TaskInput({ id, type, setIsEditMode }: TaskInputProps) {
	// Hooks
	const [tempValue, setTempValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const { state, updateTask } = useTasks();

	const isStartTime = type === "startTime";

	useEffect(() => {
		const task = state.getTaskById(id);
		if (!task) {
			throw new Error("Task was not found");
		}

		setTempValue(String(task[type]));

		inputRef.current?.focus();
	}, [id, type, state]);

	// Exit edit mode on user click outside the input or if they press `Enter`
	const exitEditMode = useCallback(() => {
		const updates: Partial<Task> = {};

		switch (type) {
			case "startTime": {
				updates.startTime =
					tempValue === "0" || tempValue === "NaN" ? undefined : Number(tempValue);
				break;
			}

			case "source": {
				updates.source = tempValue;
				break;
			}

			case "description": {
				updates.description = tempValue;
				updates.duration = extractDuration(tempValue) ?? 0;
				break;
			}
		}

		updateTask(id, updates);
		setIsEditMode(null);
	}, [id, updateTask, type, setIsEditMode, tempValue]);

	const handleChange = useCallback(
		(value: string) => {
			if (isStartTime) {
				const [h, m] = value.split(":").map(Number);

				setTempValue(String(h * 60 + m));
				return;
			}

			setTempValue(value);
		},
		[isStartTime],
	);

	return (
		<Input
			type={isStartTime ? "time" : "text"}
			value={isStartTime ? getTimeString(tempValue) : tempValue}
			aria-label={`Update task ${type}`}
			ref={inputRef}
			spellCheck={false}
			onChange={(event) => handleChange(event.target.value)}
			onBlur={exitEditMode}
			onKeyDown={(event) => event.key === "Enter" && exitEditMode()}
			className={clsx(
				"h-8 text-[18px] text-[#E3E3E3] pl-2 rounded-[8px] border border-border",
				"focus:outline-none",
				isStartTime && "w-18 appearance-none [&::-webkit-calendar-picker-indicator]:hidden",
				!isStartTime && "w-220",
			)}
		/>
	);
}
