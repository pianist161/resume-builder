"use client";

import { useResumeStore } from "@/lib/store";
import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Tip {
  type: "warning" | "success" | "info";
  text: string;
}

function getAtsTips(resume: ReturnType<typeof useResumeStore.getState>["resume"]): Tip[] {
  const tips: Tip[] = [];

  if (!resume.basics.name.trim()) {
    tips.push({ type: "warning", text: "Укажите имя — без него резюме не рассмотрят" });
  }
  if (!resume.basics.email.trim()) {
    tips.push({ type: "warning", text: "Добавьте email для связи" });
  }
  if (!resume.basics.phone.trim()) {
    tips.push({ type: "info", text: "Телефон повышает шанс быстрого отклика" });
  }
  if (resume.summary.trim().length < 50 && resume.summary.trim().length > 0) {
    tips.push({ type: "info", text: "Описание слишком короткое — добавьте ключевые навыки" });
  }
  if (!resume.summary.trim()) {
    tips.push({ type: "warning", text: "Раздел «О себе» помогает выделиться среди кандидатов" });
  }
  if (resume.experience.length === 0) {
    tips.push({ type: "warning", text: "Добавьте хотя бы одно место работы" });
  }
  if (resume.experience.some((e) => !e.description.trim())) {
    tips.push({ type: "info", text: "Опишите достижения цифрами: «увеличил на 30%»" });
  }
  if (resume.skills.every((g) => g.items.length === 0)) {
    tips.push({ type: "warning", text: "Перечислите ключевые навыки для ATS-фильтров" });
  }
  if (resume.education.length === 0) {
    tips.push({ type: "info", text: "Образование важно для многих работодателей" });
  }

  if (tips.filter((t) => t.type === "warning").length === 0) {
    tips.push({ type: "success", text: "Резюме готово к отправке!" });
  }

  return tips;
}

export function AtsTips() {
  const resume = useResumeStore((s) => s.resume);
  const tips = getAtsTips(resume);

  const warnings = tips.filter((t) => t.type === "warning").length;
  const color = warnings > 2 ? "text-red-500" : warnings > 0 ? "text-yellow-500" : "text-green-500";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className={`flex items-center gap-1 text-xs ${color} cursor-default`} aria-label="ATS-подсказки">
          <Lightbulb className="size-3.5" />
          <span className="hidden sm:inline">ATS</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[280px]">
        <p className="mb-2 text-xs font-medium">Подсказки для ATS</p>
        <div className="space-y-1.5" role="list">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs" role="listitem">
              {tip.type === "warning" && <AlertTriangle className="mt-0.5 size-3 shrink-0 text-yellow-500" />}
              {tip.type === "success" && <CheckCircle className="mt-0.5 size-3 shrink-0 text-green-500" />}
              {tip.type === "info" && <Lightbulb className="mt-0.5 size-3 shrink-0 text-blue-500" />}
              <span className="text-zinc-600 dark:text-zinc-300">{tip.text}</span>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
