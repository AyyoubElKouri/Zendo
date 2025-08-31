/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useToastStore } from '@/store/useToastState';

export interface ToastType {
   toast: {
      type: 'success' | 'error' | undefined;
      message: string | undefined;
      success: (message: string) => void;
      error: (message: string) => void;
      reset: () => void;
   };
}

export function useToast(): ToastType {
   const { type, message, setType, setMessage } = useToastStore();

   // Internel helper
   function action(message: string, type: 'success' | 'error' | undefined) {
      setType(type);
      setMessage(message);

      setTimeout(() => {
         setType(undefined);
         setMessage(undefined);
      }, 2000);
   }

   function success(message: string) {
      action(message, 'success');
   }

   function error(message: string) {
      action(message, 'error');
   }

   function reset() {
      setType(undefined);
      setMessage(undefined);
   }

   return {
      toast: {
         type,
         message,
         success,
         error,
         reset,
      },
   };
}
