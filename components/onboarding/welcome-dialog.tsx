"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Sparkles } from "lucide-react";
import { useResumeStore } from "@/lib/store";

export function WelcomeDialog() {
  const isFirstVisit = useResumeStore((s) => s.isFirstVisit);
  const setFirstVisitDone = useResumeStore((s) => s.setFirstVisitDone);
  const loadSampleData = useResumeStore((s) => s.loadSampleData);
  const clearAllData = useResumeStore((s) => s.clearAllData);

  const handleStartEmpty = () => {
    clearAllData();
    setFirstVisitDone();
  };

  const handleLoadSample = () => {
    loadSampleData();
    setFirstVisitDone();
  };

  return (
    <Dialog open={isFirstVisit} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Добро пожаловать в ResumeBuilder
          </DialogTitle>
          <DialogDescription className="text-center">
            Как вы хотите начать?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          <button
            onClick={handleStartEmpty}
            className="group flex flex-col items-center gap-3 rounded-lg border-2 border-zinc-200 p-5 transition-all hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-blue-100">
              <FileText className="size-6 text-zinc-500 group-hover:text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-medium text-zinc-900">Начать с нуля</p>
              <p className="mt-1 text-xs text-zinc-500">Пустая форма для заполнения</p>
            </div>
          </button>
          <button
            onClick={handleLoadSample}
            className="group flex flex-col items-center gap-3 rounded-lg border-2 border-zinc-200 p-5 transition-all hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-blue-100">
              <Sparkles className="size-6 text-zinc-500 group-hover:text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-medium text-zinc-900">Посмотреть пример</p>
              <p className="mt-1 text-xs text-zinc-500">Заполненное резюме</p>
            </div>
          </button>
        </div>
        <p className="text-center text-xs text-zinc-400">
          Вы сможете очистить или загрузить пример позже через меню
        </p>
      </DialogContent>
    </Dialog>
  );
}
