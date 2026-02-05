"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { EditorHeader } from "./editor-header";
import { EditorSidebar } from "./editor-sidebar";
import { ResumePreviewPanel } from "./resume-preview";
import { DesignPanel } from "./design-panel";
import { WelcomeDialog } from "@/components/onboarding/welcome-dialog";
import { KeyboardShortcutsModal } from "./keyboard-shortcuts-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAutosave } from "@/hooks/use-autosave";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useResumeStore } from "@/lib/store";


export function EditorLayout() {
  useAutosave();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [leftWidth, setLeftWidth] = useState(40);
  const isResizing = useRef(false);
  const hasHydrated = useResumeStore((s) => s._hasHydrated);
  const isFirstVisit = useResumeStore((s) => s.isFirstVisit);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const openShortcuts = useCallback(() => setShortcutsOpen(true), []);
  useKeyboardShortcuts(openShortcuts);

  const handleMouseDown = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const pct = (e.clientX / window.innerWidth) * 100;
      setLeftWidth(Math.min(60, Math.max(25, pct)));
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!hasHydrated) {
    return (
      <div className="flex h-screen flex-col">
        <div className="flex h-14 items-center gap-4 border-b bg-white px-4 dark:bg-zinc-950 dark:border-zinc-800">
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="ml-auto flex gap-2">
            <div className="h-8 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden w-[40%] min-w-[360px] border-r bg-white p-4 md:block dark:bg-zinc-950 dark:border-zinc-800">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-9 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                  <div className="h-9 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 items-start justify-center bg-zinc-100 p-8 dark:bg-zinc-900">
            <div className="h-[842px] w-[595px] max-w-full animate-pulse rounded bg-white shadow dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <div className="flex h-screen flex-col">
        <div className="no-print">
          <EditorHeader onOpenShortcuts={openShortcuts} />
        </div>
        {isFirstVisit && <WelcomeDialog />}
        <KeyboardShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
        <Tabs defaultValue="form" className="flex flex-1 flex-col overflow-hidden no-print">
          <TabsList className="mx-4 mt-2 grid w-auto grid-cols-2">
            <TabsTrigger value="form">Форма</TabsTrigger>
            <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="flex-1 overflow-hidden mt-0">
            <div className="h-full overflow-y-auto">
              <EditorSidebar />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="flex-1 overflow-hidden mt-0">
            <div className="flex h-full flex-col">
              <ResumePreviewPanel />
              <DesignPanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="no-print">
        <EditorHeader onOpenShortcuts={openShortcuts} />
      </div>
      {isFirstVisit && <WelcomeDialog />}
      <KeyboardShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <div className="flex flex-1 overflow-hidden">
        <div className="no-print overflow-y-auto border-r dark:border-zinc-800" style={{ width: `${leftWidth}%`, minWidth: "360px" }}>
          <EditorSidebar />
        </div>

        <div
          className="no-print flex w-1.5 cursor-col-resize items-center justify-center bg-zinc-200 hover:bg-blue-300 transition-colors dark:bg-zinc-700 dark:hover:bg-blue-600"
          onMouseDown={handleMouseDown}
          role="separator"
          aria-label="Изменить размер панелей"
        >
          <div className="h-8 w-0.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
        </div>

        <div className="flex flex-1 flex-col">
          <ResumePreviewPanel />
          <div className="no-print">
            <DesignPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
