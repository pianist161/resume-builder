"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useResumeStore } from "@/lib/store";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../sortable-item";
import { toast } from "sonner";
import { AiSuggestionPanel } from "../ai-suggestion-panel";
import { useDndList } from "@/hooks/use-dnd-list";
import { DeleteConfirmDialog } from "../delete-confirm-dialog";
import { EmptySectionState } from "../empty-section-state";

export function ExperienceFormContent() {
  const experience = useResumeStore((s) => s.resume.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const reorderExperience = useResumeStore((s) => s.reorderExperience);
  const newItemRef = useRef<HTMLInputElement>(null);
  const { sensors, itemIds, handleDragEnd } = useDndList(experience.length, reorderExperience);

  const handleAdd = () => {
    addExperience();
    toast.success("Опыт работы добавлен");
    setTimeout(() => {
      newItemRef.current?.focus();
      const items = document.querySelectorAll("[data-experience-item]");
      items[items.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleRemove = (index: number) => {
    removeExperience(index);
    toast.success("Опыт работы удалён");
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {experience.length === 0 && (
              <EmptySectionState
                icon={Briefcase}
                title="Добавьте ваш опыт работы"
                subtitle="Укажите достижения с конкретными цифрами для лучшей видимости в ATS"
              />
            )}
            {experience.map((exp, i) => (
              <SortableItem key={i} id={String(i)} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 pl-10 dark:bg-zinc-900/50 dark:border-zinc-800">
                <motion.div
                  data-experience-item
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Позиция {i + 1}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`current-job-${i}`}
                          checked={!!exp.isCurrentJob}
                          onCheckedChange={(checked) => {
                            updateExperience(i, "isCurrentJob", checked);
                            if (checked) updateExperience(i, "endDate", "Настоящее время");
                          }}
                        />
                        <Label htmlFor={`current-job-${i}`} className="text-sm text-zinc-500 dark:text-zinc-400">
                          Текущее место
                        </Label>
                      </div>
                      <DeleteConfirmDialog title="Удалить опыт работы?" onConfirm={() => handleRemove(i)} />
                    </div>
                  </div>
                  <fieldset>
                    <legend className="sr-only">Опыт работы {i + 1}</legend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`exp-company-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Компания <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          ref={i === experience.length - 1 ? newItemRef : undefined}
                          id={`exp-company-${i}`}
                          value={exp.company}
                          onChange={(e) => updateExperience(i, "company", e.target.value)}
                          placeholder="Название компании"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-position-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Должность <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`exp-position-${i}`}
                          value={exp.position}
                          onChange={(e) => updateExperience(i, "position", e.target.value)}
                          placeholder="Frontend разработчик"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-start-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Начало работы
                        </Label>
                        <Input
                          id={`exp-start-${i}`}
                          placeholder="Январь 2022"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(i, "startDate", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-end-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Окончание
                        </Label>
                        <Input
                          id={`exp-end-${i}`}
                          placeholder="Декабрь 2024"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(i, "endDate", e.target.value)}
                          disabled={!!exp.isCurrentJob}
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`exp-desc-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Описание и достижения
                      </Label>
                      <Textarea
                        id={`exp-desc-${i}`}
                        value={exp.description}
                        onChange={(e) => updateExperience(i, "description", e.target.value)}
                        rows={3}
                        className="resize-none"
                        placeholder="• Увеличил конверсию на 25% за счёт оптимизации UI&#10;• Руководил командой из 3 разработчиков"
                      />
                      <AiSuggestionPanel
                        section="experience"
                        context={{ company: exp.company, position: exp.position, currentDescription: exp.description }}
                        onAccept={(text) => updateExperience(i, "description", text)}
                      />
                    </div>
                  </fieldset>
                </motion.div>
              </SortableItem>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-2 border-dashed hover:border-indigo-500 hover:text-indigo-600"
        onClick={handleAdd}
      >
        <Plus className="size-5" />
        Добавить опыт работы
      </Button>
    </div>
  );
}
