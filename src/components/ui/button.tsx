/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
   `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-[20px] font-medium
    transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
    [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
    aria-invalid:border-destructive active:scale-95 w-full h-full text-white`,
   {
      variants: {
         variant: {
            default: 'bg-primary shadow-xs hover:bg-primary/90',
            pending: 'bg-[#C42D78] dark:bg-[#5C0B33]',
            finished: 'bg-[#4055A8] dark:bg-[#19216C]',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
);

function Button({
   className,
   variant,
   asChild = false,
   ...props
}: React.ComponentProps<'button'> &
   VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
   }) {
   const Comp = asChild ? Slot : 'button';

   return (
      <Comp data-slot='button' className={cn(buttonVariants({ variant, className }))} {...props} />
   );
}

export { Button, buttonVariants };
