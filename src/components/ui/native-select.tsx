import * as React from "react";

import { cn } from "@/lib/utils";

const nativeSelectClassName =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50";

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(nativeSelectClassName, className)}
      {...props}
    >
      {children}
    </select>
  );
});

NativeSelect.displayName = "NativeSelect";

export { NativeSelect, nativeSelectClassName };
