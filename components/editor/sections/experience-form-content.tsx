"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useResumeStore } from "@/lib/store";
import { Briefcase, Plus, Trash2, GripVertical } from "lucide-react";
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
import { toast } from "sonner";

export function ExperienceFormContent() {
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
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {experience.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700"
              >
                <Briefcase className="mx-auto mb-3 size-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-base font-medium text-zinc-500 dark:text-zinc-400">Добавьте ваш опыт работы</p>
                <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                  Укажите достижения с конкретными цифрами для лучшей видимости в ATS
                </p>
              </motion.div>
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500">
                            <Trash2 className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить опыт работы?</AlertDialogTitle>
                            <AlertDialogDescription>Это действие можно отменить через Ctrl+Z.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemove(i)} className="bg-red-600 hover:bg-red-700">
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
