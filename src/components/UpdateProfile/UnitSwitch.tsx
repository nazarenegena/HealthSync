"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// Props for UnitSwitch
interface UnitSwitchProps {
  label1: string; // "kg" or "cm"
  label2: string; //  "lbs" or "feet"
  checked: boolean; // Determines if the switch is toggled
  onToggle: (checked: boolean) => void; // Callback when the switch is toggled
}

const UnitSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & UnitSwitchProps
>(({ className, label1, label2, checked, onToggle, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-10 w-[100px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-primary",
        className
      )}
      checked={checked}
      //   onCheckedChange={onToggle}
      onCheckedChange={(value: boolean) => onToggle(value)}
      ref={ref}
      {...props}
    >
      <div className="relative w-full h-full">
        {/* Label 1 (e.g., kg or cm) */}
        <span
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold z-10 transition-colors duration-200",
            !checked ? "text-primary" : "text-white"
          )}
        >
          {label1}
        </span>

        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-9 w-[46px] rounded-full bg-background shadow-lg ring-0 transition-transform duration-200",
            checked ? "translate-x-[50px]" : "translate-x-0"
          )}
        />

        {/* Label 2 (e.g., lbs or feet) */}
        <span
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold z-10 transition-colors duration-200",
            checked ? "text-primary" : "text-white"
          )}
        >
          {label2}
        </span>
      </div>
    </SwitchPrimitives.Root>
  );
});
UnitSwitch.displayName = SwitchPrimitives.Root.displayName;

export default UnitSwitch;
