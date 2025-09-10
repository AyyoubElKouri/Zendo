/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@headlessui/react";

import { useTasks } from "@features-tasks/useTasks";

/**
 * @Helper extractDuration
 * @description recieve an string, if start with `59 min of ... ` return the number (59)
 *              else undefined
 */
function extractDuration(input: string): number | undefined {
	const regex = /^(\d+)\s*(minutes?|min|m)\s+of/i;

	const match = input.match(regex);
	if (match) {
		return Number(match[1]);
	}
	return undefined;
}

/**
 * @interface TaskInputProps
 * @description define the shape of data that TaskInput will recieve.
 *
 * @field id will be used to access zustand state to retrive task data.
 * @field type to specify the type of the input
 * @field onBlur or `Enter` key pressed, TaskInput need to have access to exit the edit mode
 */
interface TaskInputProps {
	id: number;
	type: "source" | "description" | "startTime";
	setIsEditMode: (field: "source" | "description" | "startTime" | null) => void;
}

/**
 * @brief the input that will be rendered on edit mode.
 */
export function TaskInput({ id, type, setIsEditMode }: TaskInputProps) {
	// Get data from global state
	const { state, updateTask } = useTasks();
	const task = state.getTaskById(id)!;

	// temprary value
	const [tempValue, setTempValue] = useState<string | number>(task[type]!);

	// AutoFocus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	// exit edit mode on user click outside the input or if they press `Enter`
	const exitEditMode = useCallback(() => {
		if (type === "startTime" && tempValue === 0) {
			updateTask(id, { startTime: undefined });
		} else if (type === "description") {
			// If the description start with `50 minutes of ... ` pr `80 min of ... `, add this duration
			// to the duration property of the task

			const minutes = extractDuration(tempValue as string);
			minutes
				? updateTask(id, { description: tempValue as string, duration: minutes })
				: updateTask(id, { description: tempValue as string });
		} else {
			updateTask(id, { [type]: tempValue });
		}

		setIsEditMode(null);
	}, [id, updateTask, type, setIsEditMode, tempValue]);

	// Special handeling for startTime type
	if (type === "startTime") {
		// minutes → "HH:MM"
		const minutesTotal = Number(tempValue);
		const hours = Math.floor(minutesTotal / 60)
			.toString()
			.padStart(2, "0");

		const minutes = (minutesTotal % 60).toString().padStart(2, "0");
		const timeString = `${hours}:${minutes}`;

		return (
			<Input
				type="time"
				value={timeString}
				ref={inputRef}
				onChange={(event) => {
					const [h, m] = event.target.value.split(":").map(Number);
					setTempValue(h * 60 + m); // "HH:MM" -> minutes
				}}
				onBlur={exitEditMode}
				onKeyDown={(event) => event.key === "Enter" && exitEditMode()}
				className="w-20 h-8 text-[18px] text-[#E3E3E3] pl-2 rounded-[8px] border border-border
                       focus:outline-none appearance-none
                       [&::-webkit-calendar-picker-indicator]:hidden"
			/>
		);
	}

	// So the type is source or description.
	return (
		<Input
			type="text"
			value={tempValue}
			ref={inputRef}
			spellCheck={false}
			onChange={(event) => setTempValue(event.target.value)}
			onBlur={exitEditMode}
			onKeyDown={(event) => event.key === "Enter" && exitEditMode()}
			className="w-220 h-8 text-[18px] text-[#E3E3E3] pl-2 rounded-[8px] border border-border
                    focus:outline-none"
		/>
	);
}
