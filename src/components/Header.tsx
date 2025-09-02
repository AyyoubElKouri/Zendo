/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useAccentColor } from "@/hooks/useAccentColor";

export function Header() {
	const { primary } = useAccentColor();

	const username = "Ayyoub";
	const date = getFormattedDate();
	return (
		<header
			className="w-full h-17 flex justify-between items-center px-3 bg-neutral-950
                    border-t-1 border-border"
		>
			{/* Lables */}
			<div className="flex flex-col">
				<span className="text-large font-medium text-neutral-200">
					Welcome <span style={{ color: primary }}>{username}</span>
				</span>
				<span className="text-medium text-neutral-500 -mt-1.5">{date}</span>
			</div>

			<Logo />
		</header>
	);
}

function Logo() {
	const { primary } = useAccentColor();
	return (
		<svg width="40" height="27" viewBox="0 0 40 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
				fill={primary}
			/>
			<rect
				x="22.7231"
				y="4.13501"
				width="5.62391"
				height="18.7789"
				rx="2.81195"
				transform="rotate(34.8222 22.7231 4.13501)"
				fill={primary}
			/>
		</svg>
	);
}

// helper
function getFormattedDate(): string {
	const date = new Date();

	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	const parts = new Intl.DateTimeFormat("fr-FR", options).formatToParts(date);

	const formatted = parts.map((p) => p.value).join("");
	return formatted.replace(/^(\w+)(\d)/, "$1, $2");
}
