/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Button } from "@headlessui/react";

export function CloseIcon() {
	const handleClick = () => {
		if (window.electronAPI?.closeWindow) {
			window.electronAPI.closeWindow();
		}
	};

	return (
		<Button onClick={handleClick}>
			<svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="active:scale-90">
				<title>Close Icon</title>
				<rect x="1" y="1" width="24" height="24" rx="12" fill="#171717" />
				<rect
					x="0.5"
					y="0.5"
					width="25"
					height="25"
					rx="12.5"
					stroke="white"
					stroke-opacity="0.1"
				/>
				<path
					d="M15 13L17.5714 10.4286C18.1429 9.85714 18.1429 9 17.5714 8.42857C17 7.85714 16.1429 
                  7.85714 15.5714 8.42857L13 11L10.4286 8.42857C9.85714 7.85714 9 7.85714 8.42857 
                  8.42857C7.85714 9 7.85714 9.85714 8.42857 10.4286L11 13L8.42857 15.5714C7.85714 
                  16.1429 7.85714 17 8.42857 17.5714C8.71429 17.8571 9.07143 18 9.42857 18C9.78571 
                  18 10.1429 17.8571 10.4286 17.5714L13 15L15.5714 17.5714C15.8571 17.8571 16.2143 
                  18 16.5714 18C16.9286 18 17.2857 17.8571 17.5714 17.5714C18.1429 17 18.1429 16.1429 
                  17.5714 15.5714L15 13Z"
					fill="white"
				/>
			</svg>
		</Button>
	);
}
