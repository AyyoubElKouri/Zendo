/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

export default function TaskItem() {
   return (
      <div
         className='w-full h-12 rounded-xl border-1 border-gray-300 grid grid-cols-[15%_75%_10%]
                  bg-white'
      >
         {/* --- Source --- */}
         <div
            className='bg-transparent text-green-700 text-[16px] flex justify-start items-center
                       font-medium px-2 border-r border-gray-300'
         >
            <span className='truncate'>Oracle Academy sdffqsd fqsd</span>
         </div>

         {/* --- Description --- */}
         <div
            className='bg-transparent text-gray-700 text-[16px] flex justify-start items-center
                       px-2 border-r-1 border-gray-300'
         >
            <span className='truncate'>Lire le premier chapitre du clean Architecture</span>
         </div>

         {/* --- Completed ---- */}
         <div className=''></div>
      </div>
   );
}
