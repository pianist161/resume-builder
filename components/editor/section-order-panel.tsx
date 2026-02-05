"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { GripVertical, Eye, EyeOff, Lock } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import type { SectionKey } from "@/lib/types";

const sectionLabels: Record<SectionKey, string> = {
  basics: "Основное",
  summary: "О себе",
  experience: "Опыт работы",
  education: "Образование",
  skills: "Навыки",
  projects: "Проекты",
  languages: "Языки",
  certifications: "Сертификаты",
};

function SortableSectionItem({ id, isLocked }: { id: SectionKey; isLocked: boolean }) {
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const isVisible = sectionVisibility[id];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: isLocked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : ("auto" as const),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
        isDragging ? "bg-blue-50 dark:bg-blue-950" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
      }`}
      {...attributes}
    >
      {isLocked ? (
        <Lock className="size-3 shrink-0 text-zinc-300 dark:text-zinc-600" />
      ) : (
        <button
          {...listeners}
          type="button"
          className="cursor-grab touch-none text-zinc-400 hover:text-zinc-600 active:cursor-grabbing dark:text-zinc-500 dark:hover:text-zinc-300"
          aria-label="Перетащить"
        >
          <GripVertical className="size-3" />
        </button>
      )}
      <span className={`flex-1 ${isVisible ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-600"}`}>
        {sectionLabels[id]}
      </span>
      {isVisible ? (
        <Eye className="size-3 text-zinc-400 dark:text-zinc-500" />
      ) : (
        <EyeOff className="size-3 text-zinc-300 dark:text-zinc-600" />
      )}
    </div>
  );
}

export function SectionOrderPanel() {
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const reorderSections = useResumeStore((s) => s.reorderSections);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionOrder.indexOf(active.id as SectionKey);
    const newIndex = sectionOrder.indexOf(over.id as SectionKey);
    if (oldIndex === -1 || newIndex === -1) return;
    // Don't allow moving anything to position 0 (basics is locked there)
    if (newIndex === 0) return;
    reorderSections(oldIndex, newIndex);
  };

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Порядок секций</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="space-y-0.5">
            {sectionOrder.map((key) => (
              <SortableSectionItem key={key} id={key} isLocked={key === "basics"} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
