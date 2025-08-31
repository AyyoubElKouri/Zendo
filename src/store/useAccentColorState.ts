/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { create } from "zustand";
import type { AccentColorType } from "@/types/types";
import { AccentColors } from "./accentColor";

interface AccentColorState {
	accentColor: AccentColorType;
	setAccentColor: (color: AccentColorType) => void;
}

export const useAccentColorState = create<AccentColorState>((set) => ({
	accentColor: AccentColors.orange,
	setAccentColor: (color: AccentColorType) => {
		set({ accentColor: color });
	},
}));
