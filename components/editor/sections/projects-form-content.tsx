"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { FolderOpen, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../sortable-item";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function ProjectsFormContent() {
  const projects = useResumeStore((s) => s.resume.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);
  const reorderProjects = useResumeStore((s) => s.reorderProjects);
  const [techInputs, setTechInputs] = useState<Record<number, string>>({});
  const newItemRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleAdd = () => {
    addProject();
    toast.success("Проект добавлен");
    setTimeout(() => {
      newItemRef.current?.focus();
      const items = document.querySelectorAll("[data-project-item]");
      items[items.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleRemove = (index: number) => {
    removeProject(index);
    toast.success("Проект удалён");
  };

  const handleAddTech = (index: number) => {
    const value = (techInputs[index] || "").trim();
    if (!value) return;
    const current = projects[index].technologies;
    if (!current.includes(value)) {
      updateProject(index, "technologies", [...current, value]);
    }
    setTechInputs((prev) => ({ ...prev, [index]: "" }));
  };

  const handleRemoveTech = (index: number, tech: string) => {
    const current = projects[index].technologies;
    updateProject(index, "technologies", current.filter((t) => t !== tech));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderProjects(Number(active.id), Number(over.id));
    }
  };

  const itemIds = projects.map((_, i) => String(i));

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {projects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700"
              >
                <FolderOpen className="mx-auto mb-3 size-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-base font-medium text-zinc-500 dark:text-zinc-400">Добавьте ваши проекты</p>
                <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                  Покажите свои лучшие работы с технологиями
                </p>
              </motion.div>
            )}
            {projects.map((project, i) => (
              <SortableItem key={i} id={String(i)} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 pl-10 dark:bg-zinc-900/50 dark:border-zinc-800">
                <motion.div
                  data-project-item
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Проект {i + 1}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500">
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
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
                    <legend className="sr-only">Проект {i + 1}</legend>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`proj-name-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Название <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          ref={i === projects.length - 1 ? newItemRef : undefined}
                          id={`proj-name-${i}`}
                          value={project.name}
                          onChange={(e) => updateProject(i, "name", e.target.value)}
                          placeholder="Мой проект"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`proj-link-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Ссылка
                        </Label>
                        <Input
                          id={`proj-link-${i}`}
                          type="url"
                          placeholder="https://github.com/..."
                          value={project.link}
                          onChange={(e) => updateProject(i, "link", e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`proj-desc-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Описание
                      </Label>
                      <Textarea
                        id={`proj-desc-${i}`}
                        value={project.description}
                        onChange={(e) => updateProject(i, "description", e.target.value)}
                        rows={2}
                        className="resize-none"
                        placeholder="Краткое описание проекта и вашей роли..."
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Технологии
                      </Label>
                      <div className="flex flex-wrap gap-2 min-h-[32px]">
                        <AnimatePresence initial={false}>
                          {project.technologies.map((tech) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Badge
                                variant="secondary"
                                className="gap-1.5 px-3 py-1 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-950 dark:text-purple-300"
                              >
                                {tech}
                                <button
                                  onClick={() => handleRemoveTech(i, tech)}
                                  className="rounded-full p-0.5 hover:bg-purple-300 dark:hover:bg-purple-800"
                                  aria-label={`Удалить ${tech}`}
                                >
                                  <X className="size-3" />
                                </button>
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Добавить технологию..."
                          className="h-10"
                          value={techInputs[i] || ""}
                          onChange={(e) => setTechInputs((prev) => ({ ...prev, [i]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTech(i);
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 shrink-0"
                          onClick={() => handleAddTech(i)}
                          aria-label="Добавить технологию"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
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
        Добавить проект
      </Button>
    </div>
  );
}
