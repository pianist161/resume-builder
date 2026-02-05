"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Globe, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../sortable-item";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AiSuggestionPanel } from "../ai-suggestion-panel";
import { useDndList } from "@/hooks/use-dnd-list";
import { DeleteConfirmDialog } from "../delete-confirm-dialog";
import { EmptySectionState } from "../empty-section-state";

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
  const { sensors, itemIds, handleDragEnd } = useDndList(languages.length, reorderLanguages);

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

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {languages.length === 0 && (
              <EmptySectionState
                icon={Globe}
                title="Добавьте языки"
                subtitle="Укажите языки и уровень владения"
              />
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
                    <DeleteConfirmDialog title="Удалить язык?" onConfirm={() => handleRemove(i)} triggerSize="icon" />
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
      <AiSuggestionPanel
        section="languages"
        context={{ currentLanguages: languages.map((l) => `${l.language} (${l.level})`).filter((s) => s !== " ()").join(", ") }}
        onAccept={() => { toast.info("Используйте рекомендации для добавления языков вручную"); }}
      />
    </div>
  );
}
