"use client";

import { useResumeStore } from "@/lib/store";
import { templateComponents } from "@/lib/template-registry";

export function ExportPreview() {
  const resume = useResumeStore((s) => s.resume);
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const designSettings = useResumeStore((s) => s.designSettings);
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);

  const Template = templateComponents[selectedTemplate];

  return (
    <div className="flex flex-1 items-start justify-center overflow-auto bg-zinc-100 p-8">
      <div
        id="resume-print-area"
        className="bg-white shadow-lg"
        style={{ width: "595px", minHeight: "842px" }}
      >
        <Template data={resume} designSettings={designSettings} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />
      </div>
    </div>
  );
}
