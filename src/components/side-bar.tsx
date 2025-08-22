/*--------------------------------------------------------------------------------------------------
 *                    Copyright (c) Ayyoub EL Kouri. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *------------------------------------------------------------------------------------------------*/

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface Route {
   label: string;
   icon: string;
   path: string;
}

// @note: to add more paths, modify just this ROUTES object.
const ROUTES: Route[] = [
   { label: 'Tasks', icon: '/tasks.svg', path: '/tasks' },
   { label: 'Ho made this', icon: '/ho-made-this.svg', path: '/ho-made-this' },
];

export default function SideBar() {
   return (
      <div
         className='w-60 min-h-svh border-r-1 border-gray-300 bg-gray-100 flex flex-col
                    items-start'
      >
         <header
            className='w-full h-15 flex justify-start items-center pl-4  text-gray-700 border-b-1
                     border-gray-300 text-2xl'
         >
            Zendo
         </header>

         <nav aria-label='Sidebar navigation' className='w-full h-full p-2 flex flex-col gap-1'>
            {ROUTES.map((route) => (
               <SideBarItem key={route.label} route={route} />
            ))}
         </nav>

         <footer className='w-full h-15 border-t-1 flex justify-center items-center border-gray-300'>
            <p className='text-xs text-gray-500 text-center'>
               Copyright (c) Ayyoub EL Kouri
               <br />
               All rights reserved
            </p>
         </footer>
      </div>
   );
}

function SideBarItem({ route }: { route: Route }) {
   const router = useRouter();
   const currentPath = usePathname();

   return (
      <button
         type='button'
         key={route.label}
         aria-current='page'
         onClick={() => router.push(route.path)}
         className={clsx(
            'w-full h-9 flex justify-start items-center gap-2 px-2 rounded-md transition-colors',
            'text-gray-600 duration-200 ease-in-out',
            currentPath.includes(route.path) ? 'bg-green-300' : 'hover:bg-green-200',
         )}
      >
         <Image src={route.icon} alt='Icon for Tasks route' width={20} height={20} />
         {route.label}
      </button>
   );
}
