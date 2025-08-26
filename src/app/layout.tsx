/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const Laila = localFont({
   src: [
      {
         path: '../../public/Laila/Laila-Regular.ttf',
         weight: '400',
         style: 'normal',
      },
      {
         path: '../../public/Laila/Laila-Light.ttf',
         weight: '300',
         style: 'normal',
      },
      {
         path: '../../public/Laila/Laila-Medium.ttf',
         weight: '500',
         style: 'normal',
      },
      {
         path: '../../public/Laila/Laila-SemiBold.ttf',
         weight: '600',
         style: 'normal',
      },
      {
         path: '../../public/Laila/Laila-Bold.ttf',
         weight: '700',
         style: 'normal',
      },
   ],
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
         <body className={Laila.className}>
            <div className='flex'>{children}</div>
         </body>
      </html>
   );
}
