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

export function EducationFormContent() {
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
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {education.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700"
              >
                <GraduationCap className="mx-auto mb-3 size-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-base font-medium text-zinc-500 dark:text-zinc-400">Добавьте ваше образование</p>
                <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                  Укажите учебные заведения, степени и специальности
                </p>
              </motion.div>
            )}
            {education.map((edu, i) => (
              <SortableItem key={i} id={String(i)} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 pl-10 dark:bg-zinc-900/50 dark:border-zinc-800">
                <motion.div
                  data-education-item
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Образование {i + 1}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500">
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить образование?</AlertDialogTitle>
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
                  <fieldset>
                    <legend className="sr-only">Образование {i + 1}</legend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-institution-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Учебное заведение <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          ref={i === education.length - 1 ? newItemRef : undefined}
                          id={`edu-institution-${i}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(i, "institution", e.target.value)}
                          placeholder="МГУ им. М.В. Ломоносова"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-degree-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Степень / Специальность <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`edu-degree-${i}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(i, "degree", e.target.value)}
                          placeholder="Бакалавр информатики"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-start-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Начало обучения
                        </Label>
                        <Input
                          id={`edu-start-${i}`}
                          placeholder="Сентябрь 2018"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(i, "startDate", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-end-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Окончание
                        </Label>
                        <Input
                          id={`edu-end-${i}`}
                          placeholder="Июнь 2022"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(i, "endDate", e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`edu-desc-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Дополнительная информация
                      </Label>
                      <Textarea
                        id={`edu-desc-${i}`}
                        value={edu.description}
                        onChange={(e) => updateEducation(i, "description", e.target.value)}
                        rows={2}
                        className="resize-none"
                        placeholder="Красный диплом, участие в олимпиадах..."
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
        Добавить образование
      </Button>
    </div>
  );
}
