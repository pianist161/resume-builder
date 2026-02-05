"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResumeStore } from "@/lib/store";
import { mockResume } from "@/data/mock-resume";
import type { TemplateId, DesignSettings, SectionVisibility } from "@/lib/types";
import { Eye } from "lucide-react";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { CreativeTemplate } from "@/components/resume-templates/creative";
import { ClassicTemplate } from "@/components/resume-templates/classic";

const templates: Record<TemplateId, typeof ModernTemplate> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate,
};

const defaultDesign: DesignSettings = {
  accentColor: "#2563eb",
  fontFamily: "inter",
  fontSize: "medium",
};

const allVisible: SectionVisibility = {
  basics: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  languages: true,
  certifications: true,
};

interface TemplateCardProps {
  name: string;
  description: string;
  preview: React.ReactNode;
  templateId: TemplateId;
  isSelected: boolean;
}

export function TemplateCard({ name, description, preview, templateId, isSelected }: TemplateCardProps) {
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSelect = () => {
    setTemplate(templateId);
    router.push("/editor");
  };

  const Template = templates[templateId];

  return (
    <>
      <div className="group relative rounded-lg border bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-200">
        {isSelected && (
          <Badge className="absolute right-2 top-2 z-10 bg-blue-600">Выбрано</Badge>
        )}
        <div className="aspect-[210/297] overflow-hidden rounded-t-lg bg-zinc-50 p-4">
          <div className="h-full w-full rounded border bg-white p-3 text-[6px] leading-tight shadow-sm transition-transform group-hover:scale-[1.02]">
            {preview}
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-1 font-semibold text-zinc-900">{name}</h3>
          <p className="mb-3 text-sm text-zinc-500">{description}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="size-4" />
              Предпросмотр
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSelect}
            >
              Выбрать
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[660px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>
          <div className="mx-auto" style={{ width: "595px" }}>
            <div
              className="bg-white shadow-lg border"
              style={{ width: "595px", minHeight: "842px" }}
            >
              <Template data={mockResume} designSettings={defaultDesign} sectionVisibility={allVisible} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Закрыть
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSelect}>
              Выбрать
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
