/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { ThemeSelector } from "@shared/components";
import { useAccentColor } from "@shared/hooks";

const COPYRIGHT = "Copyright (c) Ayyoub EL Kouri. All rights reserved";
const GITHUB_LINK = "https://github.com/AyyoubElKouri";
const LINKEDIN_LINK = "https://www.linkedin.com/in/ayyoub-el-kouri-0a34ab328/";

export function Footer() {
	const { primary } = useAccentColor();

	return (
		<footer
			className="w-full h-12 flex justify-between items-center px-8 bg-neutral-950
                    border-t-1 border-border"
		>
			<ThemeSelector />
			<span className="text-medium text-neutral-400">{COPYRIGHT}</span>

			<div className="flex justify-center items-center gap-4">
				<a
					href={GITHUB_LINK}
					target="_blank"
					className={`link text-medium text-neutral-400 underline underline-offset-4`}
					style={{ "--hover-color": primary } as React.CSSProperties} // check globals.css
				>
					GitHub
				</a>
				<a
					href={LINKEDIN_LINK}
					target="_blank"
					className={`link text-medium text-neutral-400 underline underline-offset-4`}
					style={{ "--hover-color": primary } as React.CSSProperties}
				>
					LinkedIn
				</a>
			</div>
		</footer>
	);
}
