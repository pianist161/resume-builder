"use client";

import { TemplateCard } from "./template-card";
import { useResumeStore } from "@/lib/store";
import type { TemplateId } from "@/lib/types";
import { motion } from "framer-motion";

function ModernPreview() {
  return (
    <div className="space-y-2">
      <div className="text-center">
        <div className="mx-auto mb-0.5 h-2.5 w-20 rounded-sm bg-zinc-800" />
        <div className="mx-auto h-1.5 w-14 rounded-sm bg-zinc-400" />
      </div>
      <div className="border-t pt-1.5">
        <div className="mb-1 h-1.5 w-10 rounded-sm bg-blue-600" />
        <div className="space-y-0.5">
          <div className="h-1 w-full rounded-sm bg-zinc-100" />
          <div className="h-1 w-4/5 rounded-sm bg-zinc-100" />
        </div>
      </div>
      <div className="border-t pt-1.5">
        <div className="mb-1 h-1.5 w-14 rounded-sm bg-blue-600" />
        <div className="space-y-1">
          <div>
            <div className="h-1 w-16 rounded-sm bg-zinc-700" />
            <div className="mt-0.5 h-1 w-full rounded-sm bg-zinc-100" />
          </div>
          <div>
            <div className="h-1 w-12 rounded-sm bg-zinc-700" />
            <div className="mt-0.5 h-1 w-full rounded-sm bg-zinc-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="flex h-full gap-2">
      <div className="w-1/3 rounded-sm bg-zinc-800 p-1.5">
        <div className="mb-2 h-2 w-full rounded-sm bg-zinc-600" />
        <div className="mb-2 space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-zinc-500" />
          <div className="h-0.5 w-3/4 rounded-sm bg-zinc-500" />
        </div>
        <div className="mb-1 h-1 w-8 rounded-sm bg-blue-400" />
        <div className="flex flex-wrap gap-0.5">
          <div className="h-1.5 w-6 rounded-full bg-zinc-600" />
          <div className="h-1.5 w-8 rounded-full bg-zinc-600" />
          <div className="h-1.5 w-5 rounded-full bg-zinc-600" />
        </div>
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="h-2 w-16 rounded-sm bg-zinc-800" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-zinc-200" />
          <div className="h-0.5 w-4/5 rounded-sm bg-zinc-200" />
        </div>
        <div className="h-1 w-10 rounded-sm bg-blue-600" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-zinc-100" />
          <div className="h-0.5 w-3/4 rounded-sm bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}

function CreativePreview() {
  return (
    <div className="space-y-2">
      <div className="rounded-sm bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
        <div className="flex items-center gap-1.5">
          <div className="size-4 rounded-full bg-white/30" />
          <div>
            <div className="h-1.5 w-14 rounded-sm bg-white" />
            <div className="mt-0.5 h-1 w-10 rounded-sm bg-white/60" />
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <div className="size-1.5 rounded-full bg-blue-600" />
          <div className="h-1.5 w-10 rounded-sm bg-blue-600" />
        </div>
        <div className="space-y-0.5 pl-3">
          <div className="h-0.5 w-full rounded-sm bg-zinc-200" />
          <div className="h-0.5 w-4/5 rounded-sm bg-zinc-200" />
        </div>
        <div className="flex items-center gap-1">
          <div className="size-1.5 rounded-full bg-blue-600" />
          <div className="h-1.5 w-12 rounded-sm bg-blue-600" />
        </div>
        <div className="space-y-0.5 pl-3">
          <div className="h-0.5 w-full rounded-sm bg-zinc-200" />
          <div className="h-0.5 w-3/4 rounded-sm bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

function ClassicPreview() {
  return (
    <div className="space-y-1.5 font-serif">
      <div className="border-b border-zinc-300 pb-1 text-center">
        <div className="mx-auto mb-0.5 h-2 w-20 rounded-sm bg-zinc-800" />
        <div className="mx-auto flex justify-center gap-2">
          <div className="h-0.5 w-10 rounded-sm bg-zinc-300" />
          <div className="h-0.5 w-12 rounded-sm bg-zinc-300" />
        </div>
      </div>
      <div>
        <div className="mb-0.5 h-1 w-14 rounded-sm bg-zinc-800" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-zinc-200" />
          <div className="h-0.5 w-5/6 rounded-sm bg-zinc-200" />
        </div>
      </div>
      <div>
        <div className="mb-0.5 h-1 w-18 rounded-sm bg-zinc-800" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-zinc-200" />
          <div className="h-0.5 w-4/5 rounded-sm bg-zinc-200" />
          <div className="h-0.5 w-full rounded-sm bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

const templates: { name: string; description: string; templateId: TemplateId; preview: React.ReactNode }[] = [
  { name: "Modern", description: "Одна колонка, минималистичный дизайн", templateId: "modern", preview: <ModernPreview /> },
  { name: "Professional", description: "Две колонки с sidebar", templateId: "professional", preview: <ProfessionalPreview /> },
  { name: "Creative", description: "Акцентные цвета, нестандартная сетка", templateId: "creative", preview: <CreativePreview /> },
  { name: "Classic", description: "Строгий, традиционный формат", templateId: "classic", preview: <ClassicPreview /> },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function TemplateGrid() {
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {templates.map((template) => (
        <motion.div key={template.name} variants={cardVariants}>
          <TemplateCard
            {...template}
            isSelected={selectedTemplate === template.templateId}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
