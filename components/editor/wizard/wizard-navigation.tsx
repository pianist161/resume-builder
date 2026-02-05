"use client";

import { Button } from "@/components/ui/button";
import { useWizard, WIZARD_STEPS } from "./wizard-context";
import { ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface WizardNavigationProps {
  onPreview?: () => void;
}

export function WizardNavigation({ onPreview }: WizardNavigationProps) {
  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep, totalSteps } = useWizard();

  const currentStepInfo = WIZARD_STEPS[currentStep];
  const nextStepInfo = !isLastStep ? WIZARD_STEPS[currentStep + 1] : null;

  return (
    <motion.div
      className="flex items-center justify-between border-t bg-white/80 backdrop-blur-sm px-6 py-4 dark:bg-zinc-950/80 dark:border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={isFirstStep}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Назад</span>
        </Button>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Шаг {currentStep + 1} из {totalSteps}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {onPreview && (
          <Button variant="ghost" onClick={onPreview} className="gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Предпросмотр</span>
          </Button>
        )}

        {isLastStep ? (
          <Link href="/export">
            <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Download className="h-4 w-4" />
              Экспорт резюме
            </Button>
          </Link>
        ) : (
          <Button
            onClick={nextStep}
            className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <span>{nextStepInfo?.label || "Далее"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
