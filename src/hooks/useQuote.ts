/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Quotes } from "@/store/quotes";

export function useQuote() {
	return { quote: Quotes[Math.floor(Math.random() * Quotes.length)] };
}
