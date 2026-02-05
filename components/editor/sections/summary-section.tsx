"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { AlignLeft } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SummarySection() {
  const summary = useResumeStore((s) => s.resume.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);

  return (
    <AccordionItem value="summary">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <AlignLeft className="size-4 text-blue-600" />
          <span className="font-medium">О себе</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <fieldset>
          <legend className="sr-only">О себе</legend>
          <div>
            <Label htmlFor="summary" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Краткое описание <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => updateSummary(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={500}
            />
            <div className="mt-1 flex items-center justify-between">
              {summary.length > 0 && summary.length < 50 && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400">Добавьте больше деталей для ATS</p>
              )}
              <p className="ml-auto text-right text-xs text-zinc-400">
                {summary.length}/500
              </p>
            </div>
          </div>
        </fieldset>
      </AccordionContent>
    </AccordionItem>
  );
}
