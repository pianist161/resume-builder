"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/lib/store";
import { toast } from "sonner";

export function useKeyboardShortcuts(onOpenShortcuts?: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key === "s") {
        e.preventDefault();
        toast.success("Данные сохраняются автоматически");
      }

      if (ctrl && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        useResumeStore.temporal.getState().undo();
        toast.info("Отменено");
      }

      if (ctrl && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        useResumeStore.temporal.getState().redo();
        toast.info("Повторено");
      }

      if (ctrl && e.key === "/") {
        e.preventDefault();
        onOpenShortcuts?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenShortcuts]);
}
