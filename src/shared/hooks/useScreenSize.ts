import { useEffect, useState } from "react";

// TailwindCSS default breakpoints (adjust if needed for your project)
const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

type Breakpoint = keyof typeof breakpoints | "base";

/**
 * Custom hook to detect screen size (width + height) in a clean, professional way.
 * - Returns width & height
 * - Returns current Tailwind breakpoint
 * - Provides semantic booleans (isSmallWidth, isLargeHeight, etc.)
 */
export function useScreenSize() {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

	useEffect(() => {
		function handleResize() {
			const w = window.innerWidth;
			const h = window.innerHeight;

			setSize({ width: w, height: h });

			// Width → Tailwind breakpoints
			if (w >= breakpoints["2xl"]) setBreakpoint("2xl");
			else if (w >= breakpoints.xl) setBreakpoint("xl");
			else if (w >= breakpoints.lg) setBreakpoint("lg");
			else if (w >= breakpoints.md) setBreakpoint("md");
			else if (w >= breakpoints.sm) setBreakpoint("sm");
			else setBreakpoint("base");
		}

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const { width, height } = size;

	return {
		width,
		height,
		breakpoint,

		// Width categories (you can adapt names if needed)
		isSmallWidth: width < breakpoints.sm,
		isMediumWidth: width >= breakpoints.sm && width < breakpoints.lg,
		isLargeWidth: width >= breakpoints.lg,

		// Height categories (custom thresholds for desktop apps)
		isShortHeight: height < 690,
		isMediumHeight: height >= 690 && height < 900,
		isTallHeight: height >= 900,
	};
}
