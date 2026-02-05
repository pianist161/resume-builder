"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus, MoreHorizontal, FileText, Pencil, Copy, Trash2, Loader2, ExternalLink,
} from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { templateMeta } from "@/lib/template-registry";
import { toast } from "sonner";

export default function ResumesPage() {
  const router = useRouter();
  const hasHydrated = useResumeStore((s) => s._hasHydrated);
  const savedResumes = useResumeStore((s) => s.savedResumes);
  const activeResumeId = useResumeStore((s) => s.activeResumeId);
  const loadResume = useResumeStore((s) => s.loadResume);
  const createNewResume = useResumeStore((s) => s.createNewResume);
  const duplicateResume = useResumeStore((s) => s.duplicateResume);
  const deleteResume = useResumeStore((s) => s.deleteResume);
  const renameResume = useResumeStore((s) => s.renameResume);

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </main>
      </div>
    );
  }

  const handleOpen = (id: string) => {
    loadResume(id);
    useResumeStore.temporal.getState().clear();
    router.push("/editor");
  };

  const handleCreate = () => {
    createNewResume();
    useResumeStore.temporal.getState().clear();
    router.push("/editor");
    toast.success("Новое резюме создано");
  };

  const handleRenameOpen = (id: string, currentName: string) => {
    setRenameId(id);
    setRenameName(currentName);
    setRenameDialogOpen(true);
  };

  const handleRenameConfirm = () => {
    if (renameId && renameName.trim()) {
      renameResume(renameId, renameName.trim());
      toast.success("Резюме переименовано");
    }
    setRenameDialogOpen(false);
  };

  const handleDuplicate = (id: string) => {
    duplicateResume(id);
    toast.success("Резюме дублировано");
  };

  const handleDeleteOpen = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteResume(deleteId);
      toast.success("Резюме удалено");
    }
    setDeleteDialogOpen(false);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-zinc-50">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Мои резюме</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {savedResumes.length}{" "}
                {savedResumes.length === 1 ? "резюме" : savedResumes.length < 5 ? "резюме" : "резюме"}
              </p>
            </div>
            <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="size-4" />
              Создать новое
            </Button>
          </div>

          {savedResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white p-16 text-center">
              <FileText className="mb-4 size-12 text-zinc-300" />
              <h2 className="mb-2 text-lg font-semibold">Нет резюме</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Создайте первое резюме, чтобы начать работу
              </p>
              <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="size-4" />
                Создать резюме
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedResumes.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleOpen(r.id)}
                  className="group cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FileText className="size-5 shrink-0 text-blue-600" />
                      <h3 className="truncate font-semibold">{r.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="size-7 shrink-0 opacity-0 group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onClick={() => handleOpen(r.id)}>
                          <ExternalLink className="size-4" />
                          Открыть
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRenameOpen(r.id, r.name)}>
                          <Pencil className="size-4" />
                          Переименовать
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(r.id)}>
                          <Copy className="size-4" />
                          Дублировать
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          disabled={savedResumes.length <= 1}
                          onClick={() => handleDeleteOpen(r.id)}
                        >
                          <Trash2 className="size-4" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {templateMeta[r.selectedTemplate].name}
                    </Badge>
                    {r.id === activeResumeId && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs hover:bg-blue-100">
                        Активное
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Обновлено: {formatDate(r.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Rename dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Переименовать резюме</DialogTitle>
          </DialogHeader>
          <Input
            value={renameName}
            onChange={(e) => setRenameName(e.target.value)}
            placeholder="Название резюме"
            onKeyDown={(e) => e.key === "Enter" && handleRenameConfirm()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleRenameConfirm} disabled={!renameName.trim()}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить резюме?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Резюме будет удалено навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
