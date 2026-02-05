"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, GripVertical } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import type { SectionVisibility, SectionKey } from "@/lib/types";
import { BasicsSection } from "./sections/basics-section";
import { SummarySection } from "./sections/summary-section";
import { ExperienceSection } from "./sections/experience-section";
import { EducationSection } from "./sections/education-section";
import { SkillsSection } from "./sections/skills-section";
import { ProjectsSection } from "./sections/projects-section";
import { LanguagesSection } from "./sections/languages-section";
import { CertificationsSection } from "./sections/certifications-section";
import { toast } from "sonner";
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

const sectionLabels: Record<keyof SectionVisibility, string> = {
  basics: "Основное",
  summary: "О себе",
  experience: "Опыт работы",
  education: "Образование",
  skills: "Навыки",
  projects: "Проекты",
  languages: "Языки",
  certifications: "Сертификаты",
};

const sectionComponents: Record<SectionKey, React.ComponentType> = {
  basics: BasicsSection,
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  languages: LanguagesSection,
  certifications: CertificationsSection,
};

function SortableSidebarSection({ id }: { id: SectionKey }) {
  const isLocked = id === "basics";
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

  const Section = sectionComponents[id];

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      {!isLocked && (
        <button
          {...listeners}
          type="button"
          className="absolute left-1 top-3 z-10 cursor-grab touch-none rounded p-0.5 text-zinc-300 hover:text-zinc-500 active:cursor-grabbing dark:text-zinc-600 dark:hover:text-zinc-400"
          aria-label="Перетащить секцию"
        >
          <GripVertical className="size-3.5" />
        </button>
      )}
      <Section />
    </div>
  );
}

export function EditorSidebar() {
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const toggleSectionVisibility = useResumeStore((s) => s.toggleSectionVisibility);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const reorderSections = useResumeStore((s) => s.reorderSections);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleToggle = (key: keyof SectionVisibility) => {
    const willBeVisible = !sectionVisibility[key];
    toggleSectionVisibility(key);
    toast.success(`${sectionLabels[key]}: ${willBeVisible ? "показана" : "скрыта"}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionOrder.indexOf(active.id as SectionKey);
    const newIndex = sectionOrder.indexOf(over.id as SectionKey);
    if (oldIndex === -1 || newIndex === -1) return;
    if (newIndex === 0) return;
    reorderSections(oldIndex, newIndex);
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
      <div className="border-b px-4 py-3 dark:border-zinc-800">
        <div className="mb-2 flex items-center gap-1.5">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Видимость секций</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-3.5 text-zinc-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Скрытые секции не отображаются в итоговом резюме
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {(Object.keys(sectionLabels) as (keyof SectionVisibility)[]).map((key) => (
            <div key={key} className="flex items-center gap-1.5">
              <Switch
                id={`vis-${key}`}
                checked={sectionVisibility[key]}
                onCheckedChange={() => handleToggle(key)}
                aria-pressed={sectionVisibility[key]}
                aria-label={`Секция ${sectionLabels[key]}: ${sectionVisibility[key] ? "видима" : "скрыта"}`}
              />
              <Label htmlFor={`vis-${key}`} className="text-xs text-zinc-600 dark:text-zinc-400">
                {sectionLabels[key]}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <Accordion type="multiple" defaultValue={["basics", "summary", "experience"]}>
            {sectionOrder.map((key) => (
              <SortableSidebarSection key={key} id={key} />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
    </div>
  );
}
