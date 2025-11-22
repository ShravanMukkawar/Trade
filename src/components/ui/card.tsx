import * as React from "react";
import { cn } from "@/lib/utils";

// Basic Card primitive compatible with Tailwind classes used in SubscriptionPlans
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
