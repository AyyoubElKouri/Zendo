/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import clsx from "clsx";
import { useAccentColor } from "@/hooks/useAccentColor";
import { AccentColors } from "@/store/accentColor";

export function ThemeSelector() {
	const { primary, setAccentColor } = useAccentColor();
	const colors = Object.keys(AccentColors) as (keyof typeof AccentColors)[];

	return (
		<div className="flex justify-center items-center gap-medium">
			{colors.map((color) => (
				<Selector
					key={AccentColors[color].primary}
					color={color}
					isActive={AccentColors[color].primary === primary}
					setAccentColor={setAccentColor}
				/>
			))}
		</div>
	);
}

interface SelectorProps {
	color: keyof typeof AccentColors;
	isActive: boolean;
	setAccentColor: (accentColor: keyof typeof AccentColors) => void;
}

function Selector({ color, isActive, setAccentColor }: SelectorProps) {
	return (
		<button
			type="button"
			onClick={() => setAccentColor(color)}
			className={clsx("w-4 h-4 text-transparent rounded-full", isActive && "ring-2 ring-white")}
			style={{
				background: `linear-gradient(to bottom right, 
                         ${AccentColors[color].primary}, ${AccentColors[color].secondary})`,
			}}
		></button>
	);
}
