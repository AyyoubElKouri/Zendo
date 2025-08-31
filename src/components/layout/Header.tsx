/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/Toast';

export function Header() {
   const { toast } = useToast();
   const username = 'Ayyoub';
   const date = getFormattedDate();

   return (
      <div
         className='w-full h-16 bg-background-2 border-b-1 border-border px-4 flex justify-between
         items-center'
      >
         <div className='flex flex-col justify-center items-start'>
            <span className='text-xl font-medium'>
               Welcome <span className='text-accent'>{username}</span>
            </span>
            <span className='text-sm text-secondary'>{date}</span>
         </div>

         {toast.type !== undefined && <Toast toast={toast} />}
      </div>
   );
}

/*-------------------------------------- Internel Helpers ----------------------------------------*/

function getFormattedDate(): string {
   const date = new Date();

   const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   };

   const parts = new Intl.DateTimeFormat('fr-FR', options).formatToParts(date);

   const formatted = parts.map((p) => p.value).join('');
   return formatted.replace(/^(\w+)(\d)/, '$1, $2');
}
