/*--------------------------------------------------------------------------------------------------
 *                    Copyright (c) Ayyoub EL Kouri. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *------------------------------------------------------------------------------------------------*/

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SideBar from '@/components/side-bar';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
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
      <html lang='en'>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <div className='flex'>
               <SideBar />
               {children}
            </div>
         </body>
      </html>
   );
}
