"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^https?:\/\/.+/;

export function BasicsFormContent() {
  const basics = useResumeStore((s) => s.resume.basics);
  const updateBasics = useResumeStore((s) => s.updateBasics);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    if (field === "email" && value && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Некорректный email" }));
    } else if (field === "website" && value && !urlRegex.test(value)) {
      setErrors((prev) => ({ ...prev, website: "URL должен начинаться с http:// или https://" }));
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
            Сайт / LinkedIn / GitHub
          </Label>
          <Input
            id="basics-website"
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={basics.website}
            onChange={(e) => updateBasics("website", e.target.value)}
            onBlur={(e) => validateField("website", e.target.value)}
            aria-invalid={!!errors.website}
            className={`h-12 text-base ${errors.website ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.website && <p className="text-xs text-red-500" role="alert">{errors.website}</p>}
        </div>
      </div>
    </fieldset>
  );
}
