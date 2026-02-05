"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Code2, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

export function SkillsSection() {
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

  const totalSkills = skills.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <AccordionItem value="skills">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <Code2 className="size-4 text-blue-600" />
          <span className="font-medium">Навыки</span>
          {totalSkills > 0 && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {totalSkills}
            </span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          {skills.map((group, i) => (
            <fieldset key={i}>
              <Label className="mb-2 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {group.category}
              </Label>
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence initial={false}>
                  {group.items.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-zinc-300 dark:text-zinc-600"
                    >
                      Добавьте навыки для ATS-совместимости
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
                      <Badge variant="secondary" className="gap-1 pl-2.5 pr-1">
                        {item}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleRemove(i, item)}
                              className="rounded-full p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                              aria-label={`Удалить ${item}`}
                            >
                              <X className="size-2.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Удалить</TooltipContent>
                        </Tooltip>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Добавить навык..."
                  className="h-7 text-xs"
                  value={inputs[i] || ""}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [i]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdd(i);
                    }
                  }}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="xs" onClick={() => handleAdd(i)} aria-label="Добавить навык">
                      <Plus className="size-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Добавить</TooltipContent>
                </Tooltip>
              </div>
            </fieldset>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
