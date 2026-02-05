"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { User } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^https?:\/\/.+/;

export function BasicsSection() {
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
    <AccordionItem value="basics">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <User className="size-4 text-blue-600" />
          <span className="font-medium">Основное</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <fieldset>
          <legend className="sr-only">Основная информация</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="basics-name" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Имя <span className="text-red-500">*</span>
              </Label>
              <Input id="basics-name" value={basics.name} onChange={(e) => updateBasics("name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="basics-title" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Должность <span className="text-red-500">*</span>
              </Label>
              <Input id="basics-title" value={basics.title} onChange={(e) => updateBasics("title", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="basics-email" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="basics-email"
                type="email"
                value={basics.email}
                onChange={(e) => updateBasics("email", e.target.value)}
                onBlur={(e) => validateField("email", e.target.value)}
                aria-invalid={!!errors.email}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500" role="alert">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="basics-phone" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Телефон</Label>
              <Input
                id="basics-phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={basics.phone}
                onChange={(e) => updateBasics("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="basics-location" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Локация</Label>
              <Input id="basics-location" value={basics.location} onChange={(e) => updateBasics("location", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="basics-website" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Сайт</Label>
              <Input
                id="basics-website"
                type="url"
                placeholder="https://..."
                value={basics.website}
                onChange={(e) => updateBasics("website", e.target.value)}
                onBlur={(e) => validateField("website", e.target.value)}
                aria-invalid={!!errors.website}
                className={errors.website ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.website && <p className="mt-1 text-xs text-red-500" role="alert">{errors.website}</p>}
            </div>
          </div>
        </fieldset>
      </AccordionContent>
    </AccordionItem>
  );
}
