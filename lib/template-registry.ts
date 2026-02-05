import type { TemplateId } from "./types";

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
};

export const templateIds: TemplateId[] = ["modern", "professional", "creative", "classic"];
