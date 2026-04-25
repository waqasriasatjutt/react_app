'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-bg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:   'bg-primary text-primary-foreground hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98]',
        secondary: 'bg-secondary text-secondary-foreground hover:shadow-glow-secondary hover:scale-[1.02] active:scale-[0.98]',
        outline:   'border border-border bg-transparent text-white hover:bg-white/5 hover:border-primary/40',
        ghost:     'bg-transparent text-white hover:bg-white/5',
        link:      'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm:   'h-9 px-3',
        md:   'h-10 px-5',
        lg:   'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, ...props }, ref
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});

export { Button, buttonVariants };
