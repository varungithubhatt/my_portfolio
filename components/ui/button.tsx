import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const variants = {
      primary:
        "bg-linear-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
      secondary:
        "bg-slate-900/60 text-slate-100 border border-purple-500/40 hover:border-purple-400/80",
      ghost: "bg-transparent text-slate-200 hover:text-white",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
          "hover:-translate-y-0.5",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
