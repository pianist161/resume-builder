"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: ["Ctrl", "S"], description: "Сохранить (авто)" },
  { keys: ["Ctrl", "Z"], description: "Отменить" },
  { keys: ["Ctrl", "Y"], description: "Повторить" },
  { keys: ["Ctrl", "Shift", "Z"], description: "Повторить (альт.)" },
  { keys: ["Ctrl", "/"], description: "Горячие клавиши" },
  { keys: ["Enter"], description: "Добавить навык/технологию" },
  { keys: ["Esc"], description: "Закрыть диалог" },
];

export function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" showCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="size-5 text-blue-600" />
            Горячие клавиши
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 pt-2">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.description}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
