/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

export function Header() {
   const username = 'Ayyoub'; // TODO: This will be dynimaque.
   const date = getFormattedDate();

   return (
      <div
         className='w-full h-[72px] bg-[#DADADA] dark:bg-[#090808] border-b-1 border-black/30
                  dark:border-white/10 flex flex-col justify-center items-start pl-[38px]'
      >
         <span className='text-[24px] font-medium'>
            Welcome <span className=' text-[#FF8000] dark:text-[#FF7F00]'>{username}</span>
         </span>
         <span className='text-[16px] text-[#515151] dark:text-[#7C7C7C]'>{date}</span>
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
