/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useAccentColor } from "@shared/hooks";

export function QuoteIcon() {
	const { primary } = useAccentColor();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			viewBox="0 0 25 25"
			role="img"
			aria-label="Lampe noire centrée dans cercle orange"
		>
			<circle cx="12.5" cy="12.5" r="12.5" fill={primary} />

			<svg
				x="5.5"
				y="5.5"
				width="14"
				height="14"
				viewBox="0 0 20 20"
				preserveAspectRatio="xMidYMid meet"
				aria-hidden="true"
			>
				<path
					d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 
                  .572.729a6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 
                  1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483a9.066 9.066 0 0 0 
                  2.726 0a.75.75 0 0 0-.226-1.483a7.553 7.553 0 0 1-2.274 0Z"
					fill="#000000"
				/>
			</svg>
		</svg>
	);
}
