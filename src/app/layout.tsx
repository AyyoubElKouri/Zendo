/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';

const Inter = localFont({
   src: '../../public/fonts/Inter.ttf',
});

export const metadata: Metadata = {
   title: 'Zendo',
   description: 'Best task manager you will see',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en' suppressHydrationWarning>
         <body className={Inter.className}>
            <ThemeProvider
               attribute='class'
               defaultTheme='system'
               enableSystem
               disableTransitionOnChange
            >
               <div className='flex'>{children}</div>
            </ThemeProvider>
         </body>
      </html>
   );
}
