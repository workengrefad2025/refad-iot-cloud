import React, { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "purple" | "cyan" | "pink" | "none";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function GlassCard({ 
  children, 
  className, 
  hover = false, 
  glow = "none",
  ...props
}: GlassCardProps) {
  const glowClasses = {
    blue: "neon-glow-blue",
    purple: "neon-glow-purple",
    cyan: "neon-glow-cyan",
    pink: "neon-glow-pink",
    none: "",
  };

  return (
    <div 
      {...props}
      className={cn(
        "glass-panel p-6",
        hover && "glass-panel-hover",
        glow !== "none" && glowClasses[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
