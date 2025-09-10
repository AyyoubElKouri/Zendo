/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { CloseIcon, ExpandIcon, Logo } from "@shared/components/icons";
import { MinimizeIcon } from "@shared/components/icons/MinimizeIcon";

export function Header() {
	return (
		<header
			className="w-full h-[47px] flex justify-between items-center px-3 bg-neutral-950 border-b-1
                    border-border"
			style={{
				// @ts-ignore
				WebkitAppRegion: "drag",
				WebkitUserSelect: "none",
				userSelect: "none",
			}}
		>
			<Logo />

			{/* Lables */}
			<div
				className="flex gap-2"
				// @ts-ignore
				style={{ WebkitAppRegion: "no-drag" }}
			>
				<MinimizeIcon />
				<ExpandIcon />
				<CloseIcon />
			</div>
		</header>
	);
}
