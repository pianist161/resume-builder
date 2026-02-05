"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Languages, Plus, Trash2 } from "lucide-react";
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const LANGUAGE_LEVELS = ["Родной", "C2", "C1", "B2", "B1", "A2", "A1"];

export function LanguagesSection() {
  const languages = useResumeStore((s) => s.resume.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);
  const reorderLanguages = useResumeStore((s) => s.reorderLanguages);
  const newItemRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleAdd = () => {
    addLanguage();
    toast.success("Язык добавлен");
    setTimeout(() => {
      newItemRef.current?.focus();
      const items = document.querySelectorAll("[data-language-item]");
      items[items.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleRemove = (index: number) => {
    removeLanguage(index);
    toast.success("Язык удалён");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderLanguages(Number(active.id), Number(over.id));
    }
  };

  const itemIds = languages.map((_, i) => String(i));

  return (
    <AccordionItem value="languages">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <Languages className="size-4 text-blue-600" />
          <span className="font-medium">Языки</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{languages.length}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-3">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <AnimatePresence initial={false}>
                {languages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center dark:border-zinc-700">
                    <Languages className="mx-auto mb-2 size-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">Добавьте язык</p>
                    <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">Укажите уровень владения</p>
                  </motion.div>
                )}
                {languages.map((lang, i) => (
                  <SortableItem key={i} id={String(i)} className="flex items-end gap-2 rounded-lg border bg-zinc-50/50 p-2 pl-8 dark:bg-zinc-900/50 dark:border-zinc-800">
                    <motion.div data-language-item initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 items-end gap-2">
                      <div className="flex-1">
                        <Label htmlFor={`lang-name-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Язык <span className="text-red-500">*</span>
                        </Label>
                        <Input ref={i === languages.length - 1 ? newItemRef : undefined} id={`lang-name-${i}`} value={lang.language} onChange={(e) => updateLanguage(i, "language", e.target.value)} />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`lang-level-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Уровень</Label>
                        <Select value={lang.level} onValueChange={(val) => updateLanguage(i, "level", val)}>
                          <SelectTrigger id={`lang-level-${i}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <AlertDialog>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon-xs" className="mb-1 text-zinc-400 hover:text-red-500" aria-label="Удалить язык">
                                <Trash2 className="size-3" />
                              </Button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>Удалить</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить язык?</AlertDialogTitle>
                            <AlertDialogDescription>Это действие можно отменить через Ctrl+Z.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemove(i)} className="bg-red-600 hover:bg-red-700">Удалить</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </motion.div>
                  </SortableItem>
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
          <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
            <Plus className="size-4" />
            Добавить язык
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
