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
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

export function ProjectsSection() {
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
    <AccordionItem value="projects">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <FolderOpen className="size-4 text-blue-600" />
          <span className="font-medium">Проекты</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{projects.length}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <AnimatePresence initial={false}>
                {projects.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center dark:border-zinc-700">
                    <FolderOpen className="mx-auto mb-2 size-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">Добавьте проект</p>
                    <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">Покажите свои лучшие работы</p>
                  </motion.div>
                )}
                {projects.map((project, i) => (
                  <SortableItem key={i} id={String(i)} className="rounded-lg border bg-zinc-50/50 p-3 pl-8 dark:bg-zinc-900/50 dark:border-zinc-800">
                    <motion.div data-project-item initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Проект {i + 1}</span>
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon-xs" className="text-zinc-400 hover:text-red-500" aria-label="Удалить проект">
                                  <Trash2 className="size-3" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Удалить</TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
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
                        <legend className="sr-only">Проект {i + 1}</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <Label htmlFor={`proj-name-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Название <span className="text-red-500">*</span>
                            </Label>
                            <Input ref={i === projects.length - 1 ? newItemRef : undefined} id={`proj-name-${i}`} value={project.name} onChange={(e) => updateProject(i, "name", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`proj-link-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Ссылка</Label>
                            <Input id={`proj-link-${i}`} type="url" placeholder="https://..." value={project.link} onChange={(e) => updateProject(i, "link", e.target.value)} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Label htmlFor={`proj-desc-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Описание</Label>
                          <Textarea id={`proj-desc-${i}`} value={project.description} onChange={(e) => updateProject(i, "description", e.target.value)} rows={2} className="resize-none" />
                        </div>
                        <div className="mt-2">
                          <Label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Технологии</Label>
                          <div className="flex flex-wrap gap-1">
                            <AnimatePresence initial={false}>
                              {project.technologies.map((tech) => (
                                <motion.div key={tech} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                                  <Badge variant="secondary" className="gap-1 pl-2 pr-1 text-xs">
                                    {tech}
                                    <button onClick={() => handleRemoveTech(i, tech)} className="rounded-full p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-600" aria-label={`Удалить ${tech}`}>
                                      <X className="size-2.5" />
                                    </button>
                                  </Badge>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                          <div className="mt-1.5 flex gap-2">
                            <Input
                              placeholder="Добавить технологию..."
                              className="h-7 text-xs"
                              value={techInputs[i] || ""}
                              onChange={(e) => setTechInputs((prev) => ({ ...prev, [i]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTech(i); } }}
                            />
                            <Button variant="outline" size="xs" onClick={() => handleAddTech(i)} aria-label="Добавить технологию">
                              <Plus className="size-3" />
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
          <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
            <Plus className="size-4" />
            Добавить проект
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
