/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

'use client';

import { useTheme } from 'next-themes';
import { useRef } from 'react';

export function ThemeToggle() {
   const { setTheme } = useTheme();
   const theme = useRef('dark');
   function handleTheme() {
      const currentThem = theme.current;
      if (currentThem === 'dark') {
         setTheme('light');
         theme.current = 'ligth';
      } else {
         setTheme('dark');
         theme.current = 'dark';
      }
   }
   return (
      <button type='button' onClick={handleTheme} className='text-2xl'>
         t
      </button>
   );
}
