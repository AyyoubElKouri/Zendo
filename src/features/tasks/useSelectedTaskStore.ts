/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { create } from "zustand";

interface SelectedTaskStore {
	id: number | undefined;
	setSelectedTaskId: (id: number | undefined) => void;
}

export const useSelectedTaskStore = create<SelectedTaskStore>((set) => ({
	id: undefined,
	setSelectedTaskId: (id: number | undefined) => {
		set((state) => ({ ...state, id }));
	},
}));
