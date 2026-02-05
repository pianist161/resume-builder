"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Globe, Plus, Trash2 } from "lucide-react";
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const LANGUAGE_LEVELS = [
  { value: "Родной", label: "Родной" },
  { value: "C2", label: "C2 — Свободное владение" },
  { value: "C1", label: "C1 — Продвинутый" },
  { value: "B2", label: "B2 — Выше среднего" },
  { value: "B1", label: "B1 — Средний" },
  { value: "A2", label: "A2 — Ниже среднего" },
  { value: "A1", label: "A1 — Начальный" },
];

export function LanguagesFormContent() {
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
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {languages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700"
              >
                <Globe className="mx-auto mb-3 size-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-base font-medium text-zinc-500 dark:text-zinc-400">Добавьте языки</p>
                <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                  Укажите языки и уровень владения
                </p>
              </motion.div>
            )}
            {languages.map((lang, i) => (
              <SortableItem key={i} id={String(i)} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 pl-10 dark:bg-zinc-900/50 dark:border-zinc-800">
                <motion.div
                  data-language-item
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`lang-name-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Язык <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        ref={i === languages.length - 1 ? newItemRef : undefined}
                        id={`lang-name-${i}`}
                        value={lang.language}
                        onChange={(e) => updateLanguage(i, "language", e.target.value)}
                        placeholder="Английский"
                        className="h-11"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`lang-level-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Уровень
                      </Label>
                      <Select value={lang.level} onValueChange={(val) => updateLanguage(i, "level", val)}>
                        <SelectTrigger id={`lang-level-${i}`} className="h-11">
                          <SelectValue placeholder="Выберите уровень" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGE_LEVELS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="mb-0.5 text-zinc-400 hover:text-red-500">
                          <Trash2 className="size-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить язык?</AlertDialogTitle>
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
        Добавить язык
      </Button>
    </div>
  );
}
