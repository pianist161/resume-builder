"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { AiSuggestionPanel } from "../ai-suggestion-panel";
import { PhotoUpload } from "./photo-upload";
import { Linkedin, Github, Send } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^https?:\/\/.+/;

export function BasicsFormContent() {
  const basics = useResumeStore((s) => s.resume.basics);
  const updateBasics = useResumeStore((s) => s.updateBasics);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const aiContext = useMemo(() => ({
    name: basics.name,
    currentTitle: basics.title,
  }), [basics.name, basics.title]);

  const urlFields = ["website", "linkedin", "github", "telegram"];

  const validateField = (field: string, value: string) => {
    if (field === "email" && value && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Некорректный email" }));
    } else if (urlFields.includes(field) && value && !urlRegex.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: "URL должен начинаться с http:// или https://" }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Основная информация</legend>
      <PhotoUpload />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="basics-name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Полное имя <span className="text-red-500">*</span>
          </Label>
          <Input
            id="basics-name"
            value={basics.name}
            onChange={(e) => updateBasics("name", e.target.value)}
            placeholder="Иван Иванов"
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Желаемая должность <span className="text-red-500">*</span>
          </Label>
          <Input
            id="basics-title"
            value={basics.title}
            onChange={(e) => updateBasics("title", e.target.value)}
            placeholder="Frontend разработчик"
            className="h-12 text-base"
          />
          <AiSuggestionPanel
            section="basics"
            context={aiContext}
            onAccept={(text) => updateBasics("title", text.split("\n")[0].trim())}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="basics-email"
            type="email"
            value={basics.email}
            onChange={(e) => updateBasics("email", e.target.value)}
            onBlur={(e) => validateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            placeholder="ivan@example.com"
            className={`h-12 text-base ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-500" role="alert">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Телефон
          </Label>
          <Input
            id="basics-phone"
            type="tel"
            placeholder="+7 (999) 123-45-67"
            value={basics.phone}
            onChange={(e) => updateBasics("phone", e.target.value)}
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-location" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Город / Локация
          </Label>
          <Input
            id="basics-location"
            value={basics.location}
            onChange={(e) => updateBasics("location", e.target.value)}
            placeholder="Москва, Россия"
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-website" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Сайт / Портфолио
          </Label>
          <Input
            id="basics-website"
            type="url"
            placeholder="https://mysite.com"
            value={basics.website}
            onChange={(e) => updateBasics("website", e.target.value)}
            onBlur={(e) => validateField("website", e.target.value)}
            aria-invalid={!!errors.website}
            className={`h-12 text-base ${errors.website ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.website && <p className="text-xs text-red-500" role="alert">{errors.website}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-linkedin" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Linkedin className="size-3.5" /> LinkedIn
          </Label>
          <Input
            id="basics-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={basics.linkedin}
            onChange={(e) => updateBasics("linkedin", e.target.value)}
            onBlur={(e) => validateField("linkedin", e.target.value)}
            aria-invalid={!!errors.linkedin}
            className={`h-12 text-base ${errors.linkedin ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.linkedin && <p className="text-xs text-red-500" role="alert">{errors.linkedin}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-github" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Github className="size-3.5" /> GitHub
          </Label>
          <Input
            id="basics-github"
            type="url"
            placeholder="https://github.com/..."
            value={basics.github}
            onChange={(e) => updateBasics("github", e.target.value)}
            onBlur={(e) => validateField("github", e.target.value)}
            aria-invalid={!!errors.github}
            className={`h-12 text-base ${errors.github ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.github && <p className="text-xs text-red-500" role="alert">{errors.github}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="basics-telegram" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Send className="size-3.5" /> Telegram
          </Label>
          <Input
            id="basics-telegram"
            type="url"
            placeholder="https://t.me/username"
            value={basics.telegram}
            onChange={(e) => updateBasics("telegram", e.target.value)}
            onBlur={(e) => validateField("telegram", e.target.value)}
            aria-invalid={!!errors.telegram}
            className={`h-12 text-base ${errors.telegram ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.telegram && <p className="text-xs text-red-500" role="alert">{errors.telegram}</p>}
        </div>
      </div>
    </fieldset>
  );
}
