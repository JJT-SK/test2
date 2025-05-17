import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PillProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Pill({ children, className, ...props }: PillProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}