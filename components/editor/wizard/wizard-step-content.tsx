"use client";

import { useWizard, WIZARD_STEPS, WizardStep } from "./wizard-context";
import { BasicsFormContent } from "../sections/basics-form-content";
import { SummaryFormContent } from "../sections/summary-form-content";
import { ExperienceFormContent } from "../sections/experience-form-content";
import { EducationFormContent } from "../sections/education-form-content";
import { SkillsFormContent } from "../sections/skills-form-content";
import { ProjectsFormContent } from "../sections/projects-form-content";
import { LanguagesFormContent } from "../sections/languages-form-content";
import { CertificationsFormContent } from "../sections/certifications-form-content";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Briefcase, GraduationCap, Wrench, FolderOpen, Globe, Award } from "lucide-react";

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

const sectionComponents: Record<WizardStep, React.ComponentType> = {
  basics: BasicsFormContent,
  summary: SummaryFormContent,
  experience: ExperienceFormContent,
  education: EducationFormContent,
  skills: SkillsFormContent,
  projects: ProjectsFormContent,
  languages: LanguagesFormContent,
  certifications: CertificationsFormContent,
};

export function WizardStepContent() {
  const { currentStep, currentStepId } = useWizard();
  const stepInfo = WIZARD_STEPS[currentStep];
  const Icon = iconMap[stepInfo.icon as keyof typeof iconMap];
  const SectionComponent = sectionComponents[currentStepId];

  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full"
        >
          {/* Step header */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-zinc-50 via-zinc-50 to-transparent dark:from-zinc-900 dark:via-zinc-900 pb-6 pt-6 px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {stepInfo.label}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {stepInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Section content */}
          <div className="px-6 pb-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
              <SectionComponent />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
