/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from "clsx";

import { ACCENT_COLORS } from "@shared/constants";
import { useAccentColor } from "@shared/hooks/useAccentColor";

export function ThemeSelector() {
	const { primary, setAccentColor } = useAccentColor();
	const colors = Object.keys(ACCENT_COLORS) as (keyof typeof ACCENT_COLORS)[];

	return (
		<div className="flex justify-center items-center gap-medium">
			{colors.map((color) => (
				<Selector
					key={ACCENT_COLORS[color].primary}
					color={color}
					isActive={ACCENT_COLORS[color].primary === primary}
					setAccentColor={setAccentColor}
				/>
			))}
		</div>
	);
}

interface SelectorProps {
	color: keyof typeof ACCENT_COLORS;
	isActive: boolean;
	setAccentColor: (accentColor: keyof typeof ACCENT_COLORS) => void;
}

function Selector({ color, isActive, setAccentColor }: SelectorProps) {
	return (
		<button
			type="button"
			onClick={() => setAccentColor(color)}
			className={clsx("w-4 h-4 text-transparent rounded-full", isActive && "ring-2 ring-white")}
			style={{
				background: `linear-gradient(to bottom right, 
                         ${ACCENT_COLORS[color].primary}, ${ACCENT_COLORS[color].secondary})`,
			}}
		></button>
	);
}
