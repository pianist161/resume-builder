"use client";

import { Accordion } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import type { SectionVisibility } from "@/lib/types";
import { BasicsSection } from "./sections/basics-section";
import { SummarySection } from "./sections/summary-section";
import { ExperienceSection } from "./sections/experience-section";
import { EducationSection } from "./sections/education-section";
import { SkillsSection } from "./sections/skills-section";
import { ProjectsSection } from "./sections/projects-section";
import { LanguagesSection } from "./sections/languages-section";
import { CertificationsSection } from "./sections/certifications-section";
import { toast } from "sonner";

const sectionLabels: Record<keyof SectionVisibility, string> = {
  basics: "Основное",
  summary: "О себе",
  experience: "Опыт работы",
  education: "Образование",
  skills: "Навыки",
  projects: "Проекты",
  languages: "Языки",
  certifications: "Сертификаты",
};

export function EditorSidebar() {
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const toggleSectionVisibility = useResumeStore((s) => s.toggleSectionVisibility);

  const handleToggle = (key: keyof SectionVisibility) => {
    const willBeVisible = !sectionVisibility[key];
    toggleSectionVisibility(key);
    toast.success(`${sectionLabels[key]}: ${willBeVisible ? "показана" : "скрыта"}`);
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
      <div className="border-b px-4 py-3 dark:border-zinc-800">
        <div className="mb-2 flex items-center gap-1.5">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Видимость секций</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-3.5 text-zinc-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Скрытые секции не отображаются в итоговом резюме
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {(Object.keys(sectionLabels) as (keyof SectionVisibility)[]).map((key) => (
            <div key={key} className="flex items-center gap-1.5">
              <Switch
                id={`vis-${key}`}
                checked={sectionVisibility[key]}
                onCheckedChange={() => handleToggle(key)}
                aria-pressed={sectionVisibility[key]}
                aria-label={`Секция ${sectionLabels[key]}: ${sectionVisibility[key] ? "видима" : "скрыта"}`}
              />
              <Label htmlFor={`vis-${key}`} className="text-xs text-zinc-600 dark:text-zinc-400">
                {sectionLabels[key]}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Accordion type="multiple" defaultValue={["basics", "summary", "experience"]}>
        <BasicsSection />
        <SummarySection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <LanguagesSection />
        <CertificationsSection />
      </Accordion>
    </div>
  );
}
