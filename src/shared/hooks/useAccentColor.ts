/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect } from "react";

import { ACCENT_COLORS } from "@shared/constants";
import { useAccentColorState } from "@shared/store";

const LOCAL_STORAGE_KEY = "__ACCENT_COLOR_KEY__";

export interface AccentColorType {
	primary: string;
	secondary: string;
}

export function useAccentColor() {
	const { accentColor: accentColorInState, setAccentColor: setAccentColorInState } =
		useAccentColorState();

	let primary = ACCENT_COLORS.orange.primary;
	let secondary = ACCENT_COLORS.orange.secondary;

	useEffect(() => {
		const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY);

		if (savedColor) {
			try {
				const currentColor: AccentColorType = JSON.parse(savedColor);
				setAccentColorInState(currentColor);
			} catch {
				setAccentColorInState(ACCENT_COLORS.orange);
			}
		} else {
			setAccentColorInState(ACCENT_COLORS.orange);
		}
	}, [setAccentColorInState]);

	function setAccentColor(accentColor: keyof typeof ACCENT_COLORS) {
		const color = ACCENT_COLORS[accentColor] ?? ACCENT_COLORS.orange;

		setAccentColorInState(color);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(color));
	}

	if (accentColorInState) {
		primary = accentColorInState.primary;
		secondary = accentColorInState.secondary;
	}

	return {
		primary,
		secondary,
		setAccentColor,
	};
}
