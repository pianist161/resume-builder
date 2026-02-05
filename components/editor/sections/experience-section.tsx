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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../sortable-item";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export function ExperienceSection() {
  const experience = useResumeStore((s) => s.resume.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const reorderExperience = useResumeStore((s) => s.reorderExperience);
  const newItemRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      reorderExperience(oldIndex, newIndex);
    }
  };

  const itemIds = experience.map((_, i) => String(i));

  return (
    <AccordionItem value="experience">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <Briefcase className="size-4 text-blue-600" />
          <span className="font-medium">Опыт работы</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {experience.length}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <AnimatePresence initial={false}>
                {experience.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center dark:border-zinc-700"
                  >
                    <Briefcase className="mx-auto mb-2 size-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">Добавьте первый опыт работы</p>
                    <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">Опишите достижения цифрами для ATS</p>
                  </motion.div>
                )}
                {experience.map((exp, i) => (
                  <SortableItem key={i} id={String(i)} className="rounded-lg border bg-zinc-50/50 p-3 pl-8 dark:bg-zinc-900/50 dark:border-zinc-800">
                    <motion.div
                      data-experience-item
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Позиция {i + 1}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <Switch
                              id={`current-job-${i}`}
                              checked={!!exp.isCurrentJob}
                              onCheckedChange={(checked) => {
                                updateExperience(i, "isCurrentJob", checked);
                                if (checked) updateExperience(i, "endDate", "Настоящее время");
                              }}
                            />
                            <Label htmlFor={`current-job-${i}`} className="text-xs text-zinc-500 dark:text-zinc-400">Сейчас</Label>
                          </div>
                          <AlertDialog>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon-xs" className="text-zinc-400 hover:text-red-500" aria-label="Удалить опыт">
                                    <Trash2 className="size-3" />
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>Удалить</TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить опыт работы?</AlertDialogTitle>
                                <AlertDialogDescription>Это действие можно отменить через Ctrl+Z.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemove(i)} className="bg-red-600 hover:bg-red-700">Удалить</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <fieldset>
                        <legend className="sr-only">Опыт работы {i + 1}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <Label htmlFor={`exp-company-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Компания <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              ref={i === experience.length - 1 ? newItemRef : undefined}
                              id={`exp-company-${i}`}
                              value={exp.company}
                              onChange={(e) => updateExperience(i, "company", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`exp-position-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Должность <span className="text-red-500">*</span>
                            </Label>
                            <Input id={`exp-position-${i}`} value={exp.position} onChange={(e) => updateExperience(i, "position", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`exp-start-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Начало</Label>
                            <Input id={`exp-start-${i}`} placeholder="2024-01" value={exp.startDate} onChange={(e) => updateExperience(i, "startDate", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`exp-end-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Конец</Label>
                            <Input id={`exp-end-${i}`} placeholder="2025-01" value={exp.endDate} onChange={(e) => updateExperience(i, "endDate", e.target.value)} disabled={!!exp.isCurrentJob} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Label htmlFor={`exp-desc-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Описание</Label>
                          <Textarea id={`exp-desc-${i}`} value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} rows={2} className="resize-none" />
                        </div>
                      </fieldset>
                    </motion.div>
                  </SortableItem>
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
          <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
            <Plus className="size-4" />
            Добавить опыт
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
