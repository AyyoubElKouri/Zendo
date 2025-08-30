/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ToggleThemeButton() {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   if(!mounted) return null;

   return (
      <div
         className='w-[164px] h-[27px] rounded-full border-1 border-border flex justify-between text-[16px] font-semibold'
      >
         <button
            type='button'
            onClick={() => setTheme('light')}
            className={clsx(
               'w-[82px] border-r-1 border-border rounded-l-full',
               theme === 'light' ? 'text-black bg-[#b8b8b8]' : 'text-[#CECECE] bg-[#090808]',
            )}
         >
            Light
         </button>
         <button
            type='button'
            onClick={() => setTheme('dark')}
            className={clsx(
               'w-[82px] rounded-r-full',
               theme === 'light' ? 'text-[#797979] bg-[#F3F3F3]' : 'text-[#FF6200] bg-[#141212]',
            )}
         >
            Dark
         </button>
      </div>
   );
}
