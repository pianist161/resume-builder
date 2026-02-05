"use client";

import { cn } from "@/lib/utils";
import { useWizard, WIZARD_STEPS } from "./wizard-context";
import { Check, User, FileText, Briefcase, GraduationCap, Wrench, FolderOpen, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Globe,
  Award,
};

export function StepIndicator() {
  const { currentStep, goToStep, completedSteps, progress } = useWizard();

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10" />

        {WIZARD_STEPS.map((step, index) => {
          const Icon = iconMap[step.icon as keyof typeof iconMap];
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = index === currentStep;
          const isPast = index < currentStep;

          return (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-200 group",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg p-1",
                (isPast || isCompleted) && "cursor-pointer",
              )}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`${step.label}: ${isCompleted ? "завершено" : isCurrent ? "текущий шаг" : "не начато"}`}
            >
              <motion.div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
                  isCurrent && "border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
                  isCompleted && !isCurrent && "border-green-500 bg-green-500 text-white",
                  !isCurrent && !isCompleted && "border-zinc-300 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900",
                  "group-hover:scale-110"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-indigo-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ opacity: 0.3 }}
                  />
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors hidden sm:block",
                  isCurrent && "text-indigo-600 dark:text-indigo-400",
                  isCompleted && !isCurrent && "text-green-600 dark:text-green-400",
                  !isCurrent && !isCompleted && "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
