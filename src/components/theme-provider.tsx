/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
   children,
   ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
