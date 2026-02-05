"use client";

import { useState, useCallback } from "react";
import { EditorHeader } from "./editor-header";
import { ResumePreviewPanel } from "./resume-preview";
import { DesignPanel } from "./design-panel";
import { WelcomeDialog } from "@/components/onboarding/welcome-dialog";
import { KeyboardShortcutsModal } from "./keyboard-shortcuts-modal";
import { WizardProvider, StepIndicator, WizardNavigation, WizardStepContent } from "./wizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAutosave } from "@/hooks/use-autosave";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useResumeStore } from "@/lib/store";
import { Eye, Edit3 } from "lucide-react";

export function EditorLayout() {
  useAutosave();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const hasHydrated = useResumeStore((s) => s._hasHydrated);
  const isFirstVisit = useResumeStore((s) => s.isFirstVisit);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const openShortcuts = useCallback(() => setShortcutsOpen(true), []);
  useKeyboardShortcuts(openShortcuts);

  // Loading skeleton
  if (!hasHydrated) {
    return (
      <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
        <div className="flex h-16 items-center gap-4 border-b bg-white px-6 dark:bg-zinc-950 dark:border-zinc-800">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="ml-auto flex gap-3">
            <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col bg-zinc-50 p-6 dark:bg-zinc-900">
            <div className="mb-6 h-2 w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
                  <div className="space-y-2">
                    <div className="h-6 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-48 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="space-y-2">
                      <div className="h-4 w-20 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                      <div className="h-12 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {isDesktop && (
            <div className="w-[45%] border-l bg-zinc-100 p-6 dark:bg-zinc-950 dark:border-zinc-800">
              <div className="h-full animate-pulse rounded-lg bg-white shadow dark:bg-zinc-900" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile layout with tabs
  if (!isDesktop) {
    return (
      <WizardProvider>
        <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
          <div className="no-print">
            <EditorHeader onOpenShortcuts={openShortcuts} />
          </div>
          {isFirstVisit && <WelcomeDialog />}
          <KeyboardShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />

          <Tabs defaultValue="form" className="flex flex-1 flex-col overflow-hidden">
            <TabsList className="mx-4 mt-3 grid w-auto grid-cols-2 bg-zinc-100 dark:bg-zinc-800">
              <TabsTrigger value="form" className="gap-2">
                <Edit3 className="h-4 w-4" />
                Редактор
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Превью
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="flex flex-1 flex-col overflow-hidden mt-0">
              <div className="px-4 pt-4">
                <StepIndicator />
              </div>
              <WizardStepContent />
              <div className="no-print">
                <WizardNavigation />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-hidden mt-0">
              <div className="flex h-full flex-col">
                <ResumePreviewPanel />
                <div className="no-print">
                  <DesignPanel />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </WizardProvider>
    );
  }

  // Desktop layout with side-by-side view
  return (
    <WizardProvider>
      <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
        <div className="no-print">
          <EditorHeader onOpenShortcuts={openShortcuts} />
        </div>
        {isFirstVisit && <WelcomeDialog />}
        <KeyboardShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />

        <div className="flex flex-1 overflow-hidden">
          {/* Left side - Wizard Form */}
          <div className="flex w-[55%] min-w-[500px] flex-col border-r bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="px-6 pt-6">
              <StepIndicator />
            </div>
            <WizardStepContent />
            <div className="no-print">
              <WizardNavigation onPreview={() => setShowPreview(!showPreview)} />
            </div>
          </div>

          {/* Right side - Preview */}
          <div className="flex flex-1 flex-col bg-zinc-100 dark:bg-zinc-950">
            <ResumePreviewPanel />
            <div className="no-print">
              <DesignPanel />
            </div>
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}
