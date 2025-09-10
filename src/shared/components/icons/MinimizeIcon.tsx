/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Button } from "@headlessui/react";

export function MinimizeIcon() {
	const handleClick = () => {
		if (window.electronAPI?.minimizeWindow) {
			window.electronAPI.minimizeWindow();
		}
	};

	return (
		<Button onClick={handleClick}>
			<svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="active:scale-90">
				<title>Minimize Icon</title>
				<rect x="1" y="1" width="24" height="24" rx="12" fill="#171717" />
				<rect x="0.5" y="0.5" width="25" height="25" rx="12.5" stroke="white" strokeOpacity="0.1" />
				<g clip-path="url(#clip0_182_2106)">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8.55556 12H17.4444C17.75 12 18 12.45 18 13C18 13.55 17.75 14 17.4444 14H8.55556C8.25 14 8 13.55 8 13C8 12.45 8.25 12 8.55556 12Z"
						fill="white"
					/>
				</g>
				<defs>
					<clipPath>
						<rect width="10" height="2" fill="white" transform="translate(8 12)" />
					</clipPath>
				</defs>
			</svg>
		</Button>
	);
}
