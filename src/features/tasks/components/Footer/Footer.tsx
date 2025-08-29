/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import Link from 'next/link';
import { ToggleThemeButton } from '@tasks/components/ToggleThemeButton';

const COPYRIGHT = 'Copyright (c) Ayyoub EL Kouri. All rights reserved';
const GITHUB_LINK = 'https://github.com/AyyoubElKouri';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/ayyoub-el-kouri-0a34ab328/';

export function Footer() {
   return (
      <div
         className='w-full h-[53px] bg-[#DADADA] dark:bg-[#090808] border-t-1 border-black/30
                  dark:border-white/10 flex justify-between items-center px-[38px]'
      >
         <ToggleThemeButton />

         <span className='text-[16px] text-[#3B3B3B] dark:text-[#AAAAAA]'>{COPYRIGHT}</span>

         <div className='flex gap-[22px] text-[15px] text-[#3B3B3B] dark:text-[#BCBCBC]'>
            <Link
               href={GITHUB_LINK}
               className='border-b-1 border-[#3B3B3B] dark:border-[#BCBCBC] 
                        hover:!border-[#FF4D00]  hover:text-[#FF4D00]'
               target='_blank'
            >
               GitHub
            </Link>
            <Link
               href={LINKEDIN_LINK}
               className='border-b-1 border-[#3B3B3B] dark:border-[#BCBCBC]  
                        hover:!border-[#FF4D00]  hover:text-[#FF4D00]'
               target='_blank'
            >
               LinkedIn
            </Link>
         </div>
      </div>
   );
}
