import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-3.5 text-base text-slate-100",
          "placeholder:text-slate-500 focus:border-purple-500/80 focus:outline-none focus:ring-2 focus:ring-purple-500/40",
          "transition-shadow",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
