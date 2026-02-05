"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { SectionVisibility } from "@/lib/types";

export type WizardStep = keyof SectionVisibility;

export const WIZARD_STEPS: { id: WizardStep; label: string; icon: string; description: string }[] = [
  { id: "basics", label: "Основное", icon: "User", description: "Контактные данные" },
  { id: "summary", label: "О себе", icon: "FileText", description: "Краткое описание" },
  { id: "experience", label: "Опыт", icon: "Briefcase", description: "Опыт работы" },
  { id: "education", label: "Образование", icon: "GraduationCap", description: "Учебные заведения" },
  { id: "skills", label: "Навыки", icon: "Wrench", description: "Профессиональные навыки" },
  { id: "projects", label: "Проекты", icon: "FolderOpen", description: "Ваши проекты" },
  { id: "languages", label: "Языки", icon: "Globe", description: "Владение языками" },
  { id: "certifications", label: "Сертификаты", icon: "Award", description: "Достижения" },
];

interface WizardContextType {
  currentStep: number;
  currentStepId: WizardStep;
  totalSteps: number;
  progress: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  completedSteps: Set<WizardStep>;
  markStepCompleted: (step: WizardStep) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<WizardStep>>(new Set());

  const totalSteps = WIZARD_STEPS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentStepId = WIZARD_STEPS[currentStep].id;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCompletedSteps(prev => new Set(prev).add(WIZARD_STEPS[currentStep].id));
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const markStepCompleted = useCallback((step: WizardStep) => {
    setCompletedSteps(prev => new Set(prev).add(step));
  }, []);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        currentStepId,
        totalSteps,
        progress,
        goToStep,
        nextStep,
        prevStep,
        isFirstStep,
        isLastStep,
        completedSteps,
        markStepCompleted,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within WizardProvider");
  }
  return context;
}
