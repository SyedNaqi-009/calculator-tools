import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide transition-colors uppercase",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border-border bg-secondary text-secondary-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        Finance: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
        Health: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        Academic: "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400",
        Utility: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        Math: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
