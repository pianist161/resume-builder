import type { TemplateId } from "./types";
import type { TemplateProps } from "./template-constants";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { CreativeTemplate } from "@/components/resume-templates/creative";
import { ClassicTemplate } from "@/components/resume-templates/classic";
import { MinimalTemplate } from "@/components/resume-templates/minimal";
import { ExecutiveTemplate } from "@/components/resume-templates/executive";
import { TechTemplate } from "@/components/resume-templates/tech";
import { TwoColumnTemplate } from "@/components/resume-templates/twocolumn";
import { AcademicTemplate } from "@/components/resume-templates/academic";
import { InfographicTemplate } from "@/components/resume-templates/infographic";

export const templateComponents: Record<TemplateId, React.ComponentType<TemplateProps>> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  tech: TechTemplate,
  twocolumn: TwoColumnTemplate,
  academic: AcademicTemplate,
  infographic: InfographicTemplate,
};

export const templateMeta: Record<TemplateId, { name: string; description: string }> = {
  modern: {
    name: "Modern",
    description: "Одна колонка, минималистичный дизайн",
  },
  professional: {
    name: "Professional",
    description: "Две колонки с sidebar",
  },
  creative: {
    name: "Creative",
    description: "Акцентные цвета, нестандартная сетка",
  },
  classic: {
    name: "Classic",
    description: "Строгий, традиционный формат",
  },
  minimal: {
    name: "Minimal",
    description: "Чистый дизайн, максимум пространства",
  },
  executive: {
    name: "Executive",
    description: "Солидный стиль для руководителей",
  },
  tech: {
    name: "Tech",
    description: "Акцент на навыки и проекты",
  },
  twocolumn: {
    name: "Two Column",
    description: "Двухколоночный макет 50/50",
  },
  academic: {
    name: "Academic",
    description: "Академический стиль с засечками",
  },
  infographic: {
    name: "Infographic",
    description: "Прогресс-бары и таймлайн",
  },
};

export const templateIds: TemplateId[] = [
  "modern", "professional", "creative", "classic",
  "minimal", "executive", "tech", "twocolumn",
  "academic", "infographic",
];
