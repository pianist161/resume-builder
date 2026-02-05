"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Lightbulb } from "lucide-react";
import { AiSuggestionPanel } from "../ai-suggestion-panel";
import { useMemo } from "react";

export function SummaryFormContent() {
  const summary = useResumeStore((s) => s.resume.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);
  const experience = useResumeStore((s) => s.resume.experience);
  const skills = useResumeStore((s) => s.resume.skills);

  const aiContext = useMemo(() => ({
    currentSummary: summary,
    positions: experience.map((e) => e.position).filter(Boolean).join(", "),
    skills: skills.flatMap((g) => g.items).join(", "),
  }), [summary, experience, skills]);

  return (
    <fieldset>
      <legend className="sr-only">О себе</legend>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Профессиональное резюме <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows={6}
            className="resize-none text-base leading-relaxed"
            maxLength={500}
            placeholder="Кратко опишите ваш профессиональный опыт, ключевые навыки и карьерные цели..."
          />
          <AiSuggestionPanel
            section="summary"
            context={aiContext}
            onAccept={(text) => updateSummary(text)}
          />

          <div className="flex items-center justify-between">
            {summary.length > 0 && summary.length < 100 && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Рекомендуется добавить больше деталей для лучшей видимости в ATS
              </p>
            )}
            <p className="ml-auto text-right text-xs text-zinc-400">
              {summary.length}/500
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950/30">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Советы:</p>
              <ul className="mt-1 space-y-1 text-sm text-indigo-700 dark:text-indigo-300">
                <li>• Начните с вашей текущей роли и опыта</li>
                <li>• Укажите ключевые достижения с цифрами</li>
                <li>• Упомяните основные технологии и навыки</li>
                <li>• Завершите карьерными целями</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
