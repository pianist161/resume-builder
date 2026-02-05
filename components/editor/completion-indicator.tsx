"use client";

import { useResumeStore } from "@/lib/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function calculateCompletion(resume: ReturnType<typeof useResumeStore.getState>["resume"]) {
  let score = 0;
  const details: { label: string; filled: boolean; weight: number }[] = [];

  const nameOk = resume.basics.name.trim().length > 0;
  details.push({ label: "Имя", filled: nameOk, weight: 15 });
  if (nameOk) score += 15;

  const titleOk = resume.basics.title.trim().length > 0;
  details.push({ label: "Должность", filled: titleOk, weight: 10 });
  if (titleOk) score += 10;

  const summaryOk = resume.summary.trim().length > 0;
  details.push({ label: "О себе", filled: summaryOk, weight: 10 });
  if (summaryOk) score += 10;

  const expOk = resume.experience.length > 0 && resume.experience.some((e) => e.company.trim().length > 0);
  details.push({ label: "Опыт работы", filled: expOk, weight: 20 });
  if (expOk) score += 20;

  const eduOk = resume.education.length > 0 && resume.education.some((e) => e.institution.trim().length > 0);
  details.push({ label: "Образование", filled: eduOk, weight: 15 });
  if (eduOk) score += 15;

  const skillsOk = resume.skills.some((g) => g.items.length > 0);
  details.push({ label: "Навыки", filled: skillsOk, weight: 15 });
  if (skillsOk) score += 15;

  const projOk = resume.projects.length > 0 && resume.projects.some((p) => p.name.trim().length > 0);
  details.push({ label: "Проекты", filled: projOk, weight: 10 });
  if (projOk) score += 10;

  const langOk = resume.languages.length > 0 && resume.languages.some((l) => l.language.trim().length > 0);
  details.push({ label: "Языки", filled: langOk, weight: 5 });
  if (langOk) score += 5;

  return { score, details };
}

export function CompletionIndicator() {
  const resume = useResumeStore((s) => s.resume);
  const { score, details } = calculateCompletion(resume);

  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score < 30 ? "text-red-500" : score < 70 ? "text-yellow-500" : "text-green-500";
  const strokeColor = score < 30 ? "#ef4444" : score < 70 ? "#eab308" : "#22c55e";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1.5 cursor-default">
          <svg width="24" height="24" viewBox="0 0 24 24" className="shrink-0">
            <circle
              cx="12"
              cy="12"
              r={radius}
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="2.5"
            />
            <circle
              cx="12"
              cy="12"
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
              className="transition-all duration-500"
            />
          </svg>
          <span className={`text-xs font-medium ${color}`}>{score}%</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <p className="mb-1.5 text-xs font-medium">Заполненность резюме</p>
        <div className="space-y-1">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between text-xs">
              <span className={d.filled ? "text-green-600" : "text-zinc-400"}>{d.label}</span>
              <span className={d.filled ? "text-green-600" : "text-zinc-400"}>
                {d.filled ? `+${d.weight}%` : `${d.weight}%`}
              </span>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
