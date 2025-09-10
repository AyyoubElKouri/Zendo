/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

export const formatDuration = (duration: number): string => {
	if (duration < 60) {
		return `${duration}min`;
	}

	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	return minutes === 0 ? `${hours}h` : `${hours}h${minutes}`;
};
