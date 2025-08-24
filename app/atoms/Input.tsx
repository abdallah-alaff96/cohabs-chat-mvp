import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-gray-300 bg-white px-3 text-sm ring-offset-white placeholder:text-gray-400 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
