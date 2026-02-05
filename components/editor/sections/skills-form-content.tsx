"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Plus, X, Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export function SkillsFormContent() {
  const skills = useResumeStore((s) => s.resume.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const [inputs, setInputs] = useState<Record<number, string>>({});

  const handleAdd = (groupIndex: number) => {
    const value = (inputs[groupIndex] || "").trim();
    if (!value) return;
    addSkill(groupIndex, value);
    setInputs((prev) => ({ ...prev, [groupIndex]: "" }));
    toast.success(`Навык "${value}" добавлен`);
  };

  const handleRemove = (groupIndex: number, item: string) => {
    removeSkill(groupIndex, item);
    toast.success(`Навык "${item}" удалён`);
  };

  return (
    <div className="space-y-6">
      {skills.map((group, i) => (
        <fieldset key={i} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <Label className="mb-3 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {group.category}
          </Label>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            <AnimatePresence initial={false}>
              {group.items.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-zinc-400 dark:text-zinc-500"
                >
                  Добавьте навыки для лучшей видимости в ATS
                </motion.p>
              )}
              {group.items.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Badge
                    variant="secondary"
                    className="gap-1.5 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300"
                  >
                    {item}
                    <button
                      onClick={() => handleRemove(i, item)}
                      className="rounded-full p-0.5 hover:bg-indigo-300 dark:hover:bg-indigo-800"
                      aria-label={`Удалить ${item}`}
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Введите навык и нажмите Enter..."
              className="h-11"
              value={inputs[i] || ""}
              onChange={(e) => setInputs((prev) => ({ ...prev, [i]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAdd(i);
                }
              }}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={() => handleAdd(i)}
              aria-label="Добавить навык"
            >
              <Plus className="size-5" />
            </Button>
          </div>
        </fieldset>
      ))}

      <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Совет для ATS:</p>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
              Используйте конкретные названия технологий (React, Python, PostgreSQL) вместо общих терминов.
              Это повысит шансы прохождения автоматического отбора.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
