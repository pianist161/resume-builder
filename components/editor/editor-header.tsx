"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Download, FileText, Check, Loader2, MoreHorizontal, Sparkles, Trash2, Upload, Undo2, Redo2, Keyboard } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import type { TemplateId, ResumeData } from "@/lib/types";
import { templateMeta } from "@/lib/template-registry";
import { toast } from "sonner";
import { CompletionIndicator } from "./completion-indicator";
import { AtsTips } from "./ats-tips";
import { ThemeToggle } from "./theme-toggle";

interface EditorHeaderProps {
  onOpenShortcuts?: () => void;
}

export function EditorHeader({ onOpenShortcuts }: EditorHeaderProps) {
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const isDirty = useResumeStore((s) => s.isDirty);
  const lastSaved = useResumeStore((s) => s.lastSaved);
  const loadSampleData = useResumeStore((s) => s.loadSampleData);
  const clearAllData = useResumeStore((s) => s.clearAllData);
  const importResumeData = useResumeStore((s) => s.importResumeData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUndo = () => {
    useResumeStore.temporal.getState().undo();
    toast.info("Отменено");
  };

  const handleRedo = () => {
    useResumeStore.temporal.getState().redo();
    toast.info("Повторено");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as ResumeData;
        if (data.basics && data.experience && data.education) {
          importResumeData(data);
          toast.success("Данные импортированы");
        } else {
          toast.error("Неверный формат файла");
        }
      } catch {
        toast.error("Ошибка чтения файла");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3 dark:bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/templates">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Назад</span>
          </Link>
        </Button>
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-blue-600" />
          <span className="hidden text-sm font-medium sm:inline">Редактор</span>
        </div>
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-xs" onClick={handleUndo} aria-label="Отменить (Ctrl+Z)" className="size-7">
                <Undo2 className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Отменить (Ctrl+Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-xs" onClick={handleRedo} aria-label="Повторить (Ctrl+Y)" className="size-7">
                <Redo2 className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Повторить (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </div>

        <div className="hidden h-6 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />

        {/* Save status */}
        <div className="hidden items-center gap-1.5 text-xs text-zinc-400 sm:flex" role="status" aria-live="polite">
          {isDirty ? (
            <>
              <Loader2 className="size-3 animate-spin" />
              <span>Несохранённые изменения</span>
            </>
          ) : lastSaved ? (
            <>
              <Check className="size-3 text-green-500" />
              <span className="text-green-600">Сохранено</span>
            </>
          ) : null}
        </div>

        <div className="hidden h-6 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />
        <CompletionIndicator />
        <div className="hidden h-6 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />
        <AtsTips />
      </div>

      <div className="flex items-center gap-2">
        {/* Keyboard shortcuts */}
        {onOpenShortcuts && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-xs" onClick={onOpenShortcuts} aria-label="Горячие клавиши (Ctrl+/)" className="size-8">
                <Keyboard className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Горячие клавиши (Ctrl+/)</TooltipContent>
          </Tooltip>
        )}

        <ThemeToggle />

        <Select
          value={selectedTemplate}
          onValueChange={(v) => {
            setTemplate(v as TemplateId);
            toast.success(`Шаблон изменён на ${templateMeta[v as TemplateId].name}`);
          }}
        >
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue placeholder="Шаблон" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
          </SelectContent>
        </Select>

        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  loadSampleData();
                  toast.success("Пример данных загружен");
                }}
              >
                <Sparkles className="size-4" />
                Загрузить пример данных
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="size-4" />
                  Очистить все данные
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <Upload className="size-4" />
                Импорт из JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Очистить все данные?</AlertDialogTitle>
              <AlertDialogDescription>
                Все введённые данные будут удалены. Это действие можно отменить через Ctrl+Z.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  clearAllData();
                  toast.success("Все данные очищены");
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Очистить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImportJSON}
        />

        <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/export">
            <Download className="size-4" />
            <span className="hidden sm:inline">Экспорт</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
