"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store";
import { Award, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../sortable-item";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

export function CertificationsSection() {
  const certifications = useResumeStore((s) => s.resume.certifications);
  const addCertification = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);
  const reorderCertifications = useResumeStore((s) => s.reorderCertifications);
  const newItemRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderCertifications(Number(active.id), Number(over.id));
    }
  };

  const itemIds = certifications.map((_, i) => String(i));

  return (
    <AccordionItem value="certifications">
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <Award className="size-4 text-blue-600" />
          <span className="font-medium">Сертификаты</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{certifications.length}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <AnimatePresence initial={false}>
                {certifications.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg border-2 border-dashed border-zinc-200 p-6 text-center dark:border-zinc-700">
                    <Award className="mx-auto mb-2 size-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">Добавьте сертификат</p>
                    <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">Подтвердите свою квалификацию</p>
                  </motion.div>
                )}
                {certifications.map((cert, i) => (
                  <SortableItem key={i} id={String(i)} className="rounded-lg border bg-zinc-50/50 p-3 pl-8 dark:bg-zinc-900/50 dark:border-zinc-800">
                    <motion.div data-certification-item initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Сертификат {i + 1}</span>
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon-xs" className="text-zinc-400 hover:text-red-500" aria-label="Удалить сертификат">
                                  <Trash2 className="size-3" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Удалить</TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить сертификат?</AlertDialogTitle>
                              <AlertDialogDescription>Это действие можно отменить через Ctrl+Z.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemove(i)} className="bg-red-600 hover:bg-red-700">Удалить</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <fieldset>
                        <legend className="sr-only">Сертификат {i + 1}</legend>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <Label htmlFor={`cert-name-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Название <span className="text-red-500">*</span>
                            </Label>
                            <Input ref={i === certifications.length - 1 ? newItemRef : undefined} id={`cert-name-${i}`} value={cert.name} onChange={(e) => updateCertification(i, "name", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`cert-org-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Организация</Label>
                            <Input id={`cert-org-${i}`} value={cert.organization} onChange={(e) => updateCertification(i, "organization", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor={`cert-date-${i}`} className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Дата</Label>
                            <Input id={`cert-date-${i}`} placeholder="2024-01" value={cert.date} onChange={(e) => updateCertification(i, "date", e.target.value)} />
                          </div>
                        </div>
                      </fieldset>
                    </motion.div>
                  </SortableItem>
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
          <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
            <Plus className="size-4" />
            Добавить сертификат
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
