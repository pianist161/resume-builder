"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface EmptySectionStateProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function EmptySectionState({ icon: Icon, title, subtitle }: EmptySectionStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700"
    >
      <Icon className="mx-auto mb-3 size-12 text-zinc-300 dark:text-zinc-600" />
      <p className="text-base font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
      <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">{subtitle}</p>
    </motion.div>
  );
}
