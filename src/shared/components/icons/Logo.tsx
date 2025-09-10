/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useAccentColor } from "@shared/hooks";

export function Logo() {
	const { primary } = useAccentColor();
	return (
		<svg
			width="40"
			height="27"
			viewBox="0 0 40 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="transition-colors duration-200"
		>
			<title>Logo Icon</title>
			<path
				d="M32.7987 2.48734C33.6849 1.21332 35.4361 0.898934 36.7101 1.78513V1.78513C37.9841 2.67132 38.2985 4.42252 37.4123 5.69653L24.2185 24.6643C23.3323 25.9383 21.5811 26.2527 20.3071 25.3665V25.3665C19.0331 24.4803 18.7187 22.7291 19.6049 21.4551L32.7987 2.48734Z"
				fill={primary}
			/>
			<rect
				x="16.8989"
				y="0.154785"
				width="5.62"
				height="28.6027"
				rx="2.81"
				transform="rotate(34.8222 16.8989 0.154785)"
				className="transition-colors duration-200"
				fill={primary}
			/>
			<rect
				x="22.7231"
				y="4.13501"
				width="5.62391"
				height="18.7789"
				rx="2.81195"
				transform="rotate(34.8222 22.7231 4.13501)"
				className="transition-colors duration-200"
				fill={primary}
			/>
		</svg>
	);
}
