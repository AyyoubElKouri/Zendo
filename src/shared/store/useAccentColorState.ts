/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { ACCENT_COLORS } from "@shared/constants";
import type { AccentColorType } from "@shared/hooks";

import { create } from "zustand";

interface AccentColorState {
	accentColor: AccentColorType;
	setAccentColor: (color: AccentColorType) => void;
}

export const useAccentColorState = create<AccentColorState>((set) => ({
	accentColor: ACCENT_COLORS.orange,
	setAccentColor: (color: AccentColorType) => {
		set({ accentColor: color });
	},
}));
