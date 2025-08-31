/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import Link from 'next/link';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';

const COPYRIGHT = 'Copyright (c) Ayyoub EL Kouri. All rights reserved';
const GITHUB_LINK = 'https://github.com/AyyoubElKouri';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/ayyoub-el-kouri-0a34ab328/';

export function Footer() {
   return (
      <div
         className='w-full h-13 bg-background-2 border-t-1 border-border px-4 flex justify-between 
                    items-center'
      >
         <ToggleThemeButton />

         <span className='text-sm text-secondary'>{COPYRIGHT}</span>

         <div className='flex gap-5 text-link-size text-secondary'>
            <Link
               href={GITHUB_LINK}
               className='border-b-1 border-secondary hover:text-accent hover:!border-accent'
               target='_blank'
            >
               GitHub
            </Link>
            <Link
               href={LINKEDIN_LINK}
               className='border-b-1 border-secondary hover:text-accent hover:!border-accent'
               target='_blank'
            >
               LinkedIn
            </Link>
         </div>
      </div>
   );
}
