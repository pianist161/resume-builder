"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Award, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../sortable-item";
import { toast } from "sonner";
import { AiSuggestionPanel } from "../ai-suggestion-panel";
import { useDndList } from "@/hooks/use-dnd-list";
import { DeleteConfirmDialog } from "../delete-confirm-dialog";
import { EmptySectionState } from "../empty-section-state";

export function CertificationsFormContent() {
  const certifications = useResumeStore((s) => s.resume.certifications);
  const addCertification = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);
  const reorderCertifications = useResumeStore((s) => s.reorderCertifications);
  const newItemRef = useRef<HTMLInputElement>(null);
  const { sensors, itemIds, handleDragEnd } = useDndList(certifications.length, reorderCertifications);

  const handleAdd = () => {
    addCertification();
    toast.success("Сертификат добавлен");
    setTimeout(() => {
      newItemRef.current?.focus();
      const items = document.querySelectorAll("[data-certification-item]");
      items[items.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleRemove = (index: number) => {
    removeCertification(index);
    toast.success("Сертификат удалён");
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false}>
            {certifications.length === 0 && (
              <EmptySectionState
                icon={Award}
                title="Добавьте сертификаты"
                subtitle="Подтвердите вашу квалификацию и достижения"
              />
            )}
            {certifications.map((cert, i) => (
              <SortableItem key={i} id={String(i)} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 pl-10 dark:bg-zinc-900/50 dark:border-zinc-800">
                <motion.div
                  data-certification-item
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Сертификат {i + 1}</span>
                    <DeleteConfirmDialog title="Удалить сертификат?" onConfirm={() => handleRemove(i)} />
                  </div>
                  <fieldset>
                    <legend className="sr-only">Сертификат {i + 1}</legend>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor={`cert-name-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Название <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          ref={i === certifications.length - 1 ? newItemRef : undefined}
                          id={`cert-name-${i}`}
                          value={cert.name}
                          onChange={(e) => updateCertification(i, "name", e.target.value)}
                          placeholder="AWS Solutions Architect"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cert-org-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Организация
                        </Label>
                        <Input
                          id={`cert-org-${i}`}
                          value={cert.organization}
                          onChange={(e) => updateCertification(i, "organization", e.target.value)}
                          placeholder="Amazon Web Services"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cert-date-${i}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Дата получения
                        </Label>
                        <Input
                          id={`cert-date-${i}`}
                          placeholder="Январь 2024"
                          value={cert.date}
                          onChange={(e) => updateCertification(i, "date", e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </fieldset>
                </motion.div>
              </SortableItem>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-2 border-dashed hover:border-indigo-500 hover:text-indigo-600"
        onClick={handleAdd}
      >
        <Plus className="size-5" />
        Добавить сертификат
      </Button>

      <AiSuggestionPanel
        section="certifications"
        context={{ currentCerts: certifications.map((c) => `${c.name} (${c.organization})`).filter((s) => s !== " ()").join(", ") }}
        onAccept={() => { toast.info("Используйте рекомендации для добавления сертификатов вручную"); }}
      />

      <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/30">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm font-medium text-green-900 dark:text-green-100">Последний шаг!</p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              После заполнения сертификатов вы сможете экспортировать готовое резюме в PDF формате.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
