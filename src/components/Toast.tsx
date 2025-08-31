/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import Image from 'next/image';
import clsx from 'clsx';

import { ToastType } from '@/hooks/useToast';

export function Toast({ toast }: ToastType) {
   const isSuccess = toast.type === 'success';
   return (
      <div className='h-10 rounded-medium bg-background-1 border-1 border-border grid grid-cols-[1fr_40px]'>
         <div className='flex justify-start items-center gap-2 px-3 border-r-1 border-border'>
            <Image
               src={isSuccess ? '/icons/success.svg' : '/icons/error.svg'}
               width={20}
               height={20}
               alt='success or error icon'
            />
            <span
               className={clsx('text-md', isSuccess ? 'text-toast-success' : 'text-toast-error')}
            >
               {toast.message}
            </span>
         </div>
         <button
            type='button'
            onClick={toast.reset}
            className='flex justify-center items-center hover:bg-background-2 rounded-r-medium'
         >
            <Image src={'/icons/delete.svg'} width={25} height={25} alt='Delete icon' />
         </button>
      </div>
   );
}
