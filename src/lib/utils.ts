import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-amber-50/80 text-amber-900 border border-amber-200/60 shadow-xs hover:bg-amber-100/90 hover:border-amber-300/80 transition-colors duration-300",

        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 focus-visible:ring-red-500/20",
        outline:
          "border border-amber-300/60 hover:border-amber-400 text-amber-800 bg-amber-50 shadow-xs hover:bg-amber-100 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 shadow-sm",

        secondary:
          "bg-gradient-to-r from-amber-100/80 to-orange-100/70 text-amber-800 border border-amber-200/50 shadow-xs hover:from-amber-200/90 hover:to-orange-200/80 hover:border-amber-300/70 transition-all duration-300",

        ghost:
          "text-amber-700 hover:bg-amber-100/60 hover:text-amber-900 transition-colors duration-300",

        link: "text-amber-600 underline-offset-4 hover:underline hover:text-amber-700 transition-colors duration-200",

        primary:
          "border border-transparent bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-colors duration-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
