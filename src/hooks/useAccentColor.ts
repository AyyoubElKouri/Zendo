/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useEffect } from "react";

import { AccentColors } from "@/store/accentColor";
import { useAccentColorState } from "@/store/useAccentColorState";
import type { AccentColorType } from "@/types/types";

const LOCAL_STORAGE_KEY = "__ACCENT_COLOR_KEY__";

export function useAccentColor() {
	const {
		accentColor: accentColorInState,
		setAccentColor: setAccentColorInState,
	} = useAccentColorState();

	let primary = AccentColors.orange.primary;
	let secondary = AccentColors.orange.secondary;

	useEffect(() => {
		const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY);

		if (savedColor) {
			try {
				const currentColor: AccentColorType = JSON.parse(savedColor);
				setAccentColorInState(currentColor);
			} catch {
				setAccentColorInState(AccentColors.orange);
			}
		} else {
			setAccentColorInState(AccentColors.orange);
		}
	}, [setAccentColorInState]);

	function setAccentColor(accentColor: keyof typeof AccentColors) {
		const color = AccentColors[accentColor] ?? AccentColors.orange;

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
