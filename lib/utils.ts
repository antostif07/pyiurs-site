import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Variants} from "framer-motion";

export const DURATION = 0.5
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const asideVariants: Variants = {
  isOpen: {
    width: "300px",
    transition: {
      duration: DURATION
    }
  },
  isClosed: {
    width: "72px",
    transition: {
      duration: DURATION
    }
  }
}
