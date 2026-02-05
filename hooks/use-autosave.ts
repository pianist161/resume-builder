"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/lib/store";

export function useAutosave() {
  const isDirty = useResumeStore((s) => s.isDirty);
  const saveCurrentResume = useResumeStore((s) => s.saveCurrentResume);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isDirty) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      saveCurrentResume();
    }, 1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDirty, saveCurrentResume]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (useResumeStore.getState().isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
}
