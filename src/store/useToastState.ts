/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { create } from "zustand";

export interface ToastState {
	type: "success" | "error" | undefined;
	message: string | undefined;
	timerId: NodeJS.Timeout | null;

	setType: (type: "success" | "error" | undefined) => void;
	setMessage: (message: string | undefined) => void;
	setTimerId: (timerId: NodeJS.Timeout | null) => void;
}

export const useToastStore = create<ToastState>((set) => ({
	type: undefined,
	message: undefined,
	timerId: null,

	setType: (type) => set({ type }),
	setMessage: (message) => set({ message }),
	setTimerId: (timerId) => set({ timerId }),
}));
