import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground hover:brightness-110 shadow-sm": variant === "primary",
            "bg-secondary text-secondary-foreground hover:brightness-110": variant === "secondary",
            "border border-border bg-transparent hover:bg-muted": variant === "outline",
            "hover:bg-muted": variant === "ghost",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-11 px-5 text-base": size === "md",
            "h-13 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
