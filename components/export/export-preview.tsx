"use client";

import { useResumeStore } from "@/lib/store";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { CreativeTemplate } from "@/components/resume-templates/creative";
import { ClassicTemplate } from "@/components/resume-templates/classic";
import type { TemplateId } from "@/lib/types";

const templates: Record<TemplateId, typeof ModernTemplate> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate,
};

export function ExportPreview() {
  const resume = useResumeStore((s) => s.resume);
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const designSettings = useResumeStore((s) => s.designSettings);
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);

  const Template = templates[selectedTemplate];

  return (
    <div className="flex flex-1 items-start justify-center overflow-auto bg-zinc-100 p-8">
      <div
        id="resume-print-area"
        className="bg-white shadow-lg"
        style={{ width: "595px", minHeight: "842px" }}
      >
        <Template data={resume} designSettings={designSettings} sectionVisibility={sectionVisibility} />
      </div>
    </div>
  );
}
