"use client";

import { useCompletion } from "@ai-sdk/react";
import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, X, RefreshCw, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useState, useCallback } from "react";

type Section =
  | "basics"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "certifications";

interface AiSuggestionPanelProps {
  section: Section;
  context: Record<string, unknown>;
  onAccept: (text: string) => void;
  disabled?: boolean;
}

export function AiSuggestionPanel({
  section,
  context,
  onAccept,
  disabled,
}: AiSuggestionPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const targetPosition = useResumeStore((s) => s.resume.basics.title);

  const { completion, isLoading, complete, setCompletion } = useCompletion({
    api: "/api/ai/suggest",
    streamProtocol: "text",
    body: { section, context, targetPosition },
    onError: () => {
      toast.error("Не удалось получить предложение");
    },
  });

  const handleGenerate = useCallback(() => {
    if (!targetPosition.trim()) {
      toast.warning("Укажите желаемую должность в разделе «Основное»");
      return;
    }
    if (isLoading) return;

    setIsOpen(true);
    complete("", { body: { section, context, targetPosition } });
  }, [targetPosition, isLoading, complete, section, context]);

  const handleAccept = useCallback(() => {
    if (completion) {
      onAccept(completion);
      toast.success("Предложение применено");
    }
    setIsOpen(false);
    setCompletion("");
  }, [completion, onAccept, setCompletion]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setCompletion("");
  }, [setCompletion]);

  const handleRegenerate = useCallback(() => {
    if (isLoading) return;
    complete("", { body: { section, context, targetPosition } });
  }, [isLoading, complete, section, context, targetPosition]);

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled || isLoading}
        onClick={handleGenerate}
        className="gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Sparkles className="size-4" />
        )}
        AI Подсказка
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-4 dark:border-indigo-800 dark:from-indigo-950/40 dark:to-purple-950/40">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                <Sparkles className="size-4" />
                Предложение AI
              </div>

              <div className="min-h-[60px] rounded-lg bg-white/80 p-3 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                {isLoading && !completion && (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Loader2 className="size-4 animate-spin" />
                    Генерация...
                  </div>
                )}
                {completion && (
                  <div className="whitespace-pre-wrap">{completion}</div>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  disabled={isLoading || !completion}
                  onClick={handleAccept}
                  className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Check className="size-3.5" />
                  Применить
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  onClick={handleRegenerate}
                  className="gap-1.5"
                >
                  <RefreshCw className="size-3.5" />
                  Ещё раз
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="gap-1.5 text-zinc-500"
                >
                  <X className="size-3.5" />
                  Отмена
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
