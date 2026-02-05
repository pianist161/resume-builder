"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

export function EducationSection() {
  const education = useResumeStore((s) => s.resume.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);
  const reorderEducation = useResumeStore((s) => s.reorderEducation);
  const newItemRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleAdd = () => {
    addEducation();
    toast.success("Образование добавлено");
    setTimeout(() => {
      newItemRef.current?.focus();
      const items = document.querySelectorAll("[data-education-item]");
      items[items.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleRemove = (index: number) => {
    removeEducation(index);
    toast.success("Образование удалено");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      reorderEducation(oldIndex, newIndex);
    }
  };

  const itemIds = education.map((_, i) => String(i));

  return (
    <AccordionItem value="education">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <GraduationCap className="size-4 text-blue-600" />
          <span className="font-medium">Образование</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {education.length}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <AnimatePresence initial={false}>
                {education.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center dark:border-zinc-700"
                  >
                    <GraduationCap className="mx-auto mb-2 size-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">Добавьте образование</p>
                    <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">Укажите учебное заведение и степень</p>
                  </motion.div>
                )}
                {education.map((edu, i) => (
                  <SortableItem key={i} id={String(i)} className="rounded-lg border bg-zinc-50/50 p-3 pl-8 dark:bg-zinc-900/50 dark:border-zinc-800">
                    <motion.div
                      data-education-item
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Образование {i + 1}</span>
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon-xs" className="text-zinc-400 hover:text-red-500" aria-label="Удалить образование">
                                  <Trash2 className="size-3" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Удалить</TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить образование?</AlertDialogTitle>
                              <AlertDialogDescription>Это действие можно отменить через Ctrl+Z.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemove(i)} className="bg-red-600 hover:bg-red-700">Удалить</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <fieldset>
                        <legend className="sr-only">Образование {i + 1}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <Label htmlFor={`edu-institution-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Учебное заведение <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              ref={i === education.length - 1 ? newItemRef : undefined}
                              id={`edu-institution-${i}`}
                              value={edu.institution}
                              onChange={(e) => updateEducation(i, "institution", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edu-degree-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Степень / Специальность <span className="text-red-500">*</span>
                            </Label>
                            <Input id={`edu-degree-${i}`} value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`edu-start-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Начало</Label>
                            <Input id={`edu-start-${i}`} placeholder="2020-09" value={edu.startDate} onChange={(e) => updateEducation(i, "startDate", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`edu-end-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Конец</Label>
                            <Input id={`edu-end-${i}`} placeholder="2024-06" value={edu.endDate} onChange={(e) => updateEducation(i, "endDate", e.target.value)} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Label htmlFor={`edu-desc-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Описание</Label>
                          <Textarea id={`edu-desc-${i}`} value={edu.description} onChange={(e) => updateEducation(i, "description", e.target.value)} rows={2} className="resize-none" />
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
            Добавить образование
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
