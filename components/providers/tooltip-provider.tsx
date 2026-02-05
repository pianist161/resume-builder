"use client";

import { TooltipProvider as ShadcnTooltipProvider } from "@/components/ui/tooltip";

export function TooltipProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ShadcnTooltipProvider delayDuration={300}>{children}</ShadcnTooltipProvider>;
}
