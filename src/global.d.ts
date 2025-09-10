/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

export {};

declare global {
	interface Window {
		electronAPI?: {
			closeWindow: () => void;
			minimizeWindow: () => void;
			maximizeWindow: () => void;
			unmaximizeWindow: () => void;
			restoreWindow: () => void;
			isWindowMaximized: () => Promise<boolean>;
			onWindowMaximized: (callback: () => void) => void;
			onWindowUnmaximized: (callback: () => void) => void;
			getDPI: () => number;
		};
	}

	interface CSSProperties {
		WebkitAppRegion?: string;
	}
}
