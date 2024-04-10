import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { departments as deps } from "./deps";
const departments = deps as Record<string, { tr: string; en: string }>;
export { departments };
export type Suggestion = {
  id: string;
  title: string;
  content: string;
  stars: number;
  date: string;
  upvotes: number;
  vote: number;
  author: string;
};
