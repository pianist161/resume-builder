import type { SavedResume } from "../../types";
import { DEFAULT_SECTION_ORDER } from "../../types";
import { defaultDesignSettings, defaultSectionVisibility } from "../../defaults";
import { emptyResume } from "@/data/empty-resume";
import { generateId } from "../../utils";
import type { StoreSet, StoreGet } from "../types";

export function createMultiResumeSlice(set: StoreSet, get: StoreGet) {
  return {
    savedResumes: [] as SavedResume[],
    activeResumeId: null as string | null,

    saveCurrentResume: () => {
      const state = get();
      const now = new Date().toISOString();
      if (!state.activeResumeId) return;
      set({
        isDirty: false,
        lastSaved: new Date(),
        savedResumes: state.savedResumes.map((r) =>
          r.id === state.activeResumeId
            ? {
                ...r,
                updatedAt: now,
                resume: state.resume,
                selectedTemplate: state.selectedTemplate,
                designSettings: state.designSettings,
                sectionVisibility: state.sectionVisibility,
                sectionOrder: state.sectionOrder,
              }
            : r
        ),
      });
    },

    loadResume: (id: string) => {
      const state = get();
      const target = state.savedResumes.find((r) => r.id === id);
      if (!target) return;

      const now = new Date().toISOString();
      const updatedResumes = state.activeResumeId
        ? state.savedResumes.map((r) =>
            r.id === state.activeResumeId
              ? {
                  ...r,
                  updatedAt: now,
                  resume: state.resume,
                  selectedTemplate: state.selectedTemplate,
                  designSettings: state.designSettings,
                  sectionVisibility: state.sectionVisibility,
                  sectionOrder: state.sectionOrder,
                }
              : r
          )
        : state.savedResumes;

      const freshTarget = updatedResumes.find((r) => r.id === id)!;

      set({
        activeResumeId: id,
        resume: freshTarget.resume,
        selectedTemplate: freshTarget.selectedTemplate,
        designSettings: freshTarget.designSettings,
        sectionVisibility: freshTarget.sectionVisibility,
        sectionOrder: freshTarget.sectionOrder ?? [...DEFAULT_SECTION_ORDER],
        savedResumes: updatedResumes,
        isDirty: false,
        lastSaved: new Date(),
      });
    },

    createNewResume: (name?: string) => {
      const state = get();
      const now = new Date().toISOString();
      const newId = generateId();

      const updatedResumes = state.activeResumeId
        ? state.savedResumes.map((r) =>
            r.id === state.activeResumeId
              ? {
                  ...r,
                  updatedAt: now,
                  resume: state.resume,
                  selectedTemplate: state.selectedTemplate,
                  designSettings: state.designSettings,
                  sectionVisibility: state.sectionVisibility,
                  sectionOrder: state.sectionOrder,
                }
              : r
          )
        : state.savedResumes;

      set({
        activeResumeId: newId,
        resume: emptyResume,
        selectedTemplate: "modern",
        designSettings: { ...defaultDesignSettings },
        sectionVisibility: { ...defaultSectionVisibility },
        sectionOrder: [...DEFAULT_SECTION_ORDER],
        isDirty: false,
        lastSaved: new Date(),
        savedResumes: [
          ...updatedResumes,
          {
            id: newId,
            name: name || "Новое резюме",
            createdAt: now,
            updatedAt: now,
            resume: emptyResume,
            selectedTemplate: "modern",
            designSettings: { ...defaultDesignSettings },
            sectionVisibility: { ...defaultSectionVisibility },
            sectionOrder: [...DEFAULT_SECTION_ORDER],
          },
        ],
      });
    },

    duplicateResume: (id: string) => {
      const state = get();
      const source = state.savedResumes.find((r) => r.id === id);
      if (!source) return;
      const now = new Date().toISOString();
      const newId = generateId();
      set({
        savedResumes: [
          ...state.savedResumes,
          {
            ...source,
            id: newId,
            name: `${source.name} (копия)`,
            createdAt: now,
            updatedAt: now,
          },
        ],
      });
    },

    deleteResume: (id: string) => {
      const state = get();
      if (state.savedResumes.length <= 1) return;
      const filtered = state.savedResumes.filter((r) => r.id !== id);

      if (id === state.activeResumeId) {
        const next = filtered[0];
        set({
          savedResumes: filtered,
          activeResumeId: next.id,
          resume: next.resume,
          selectedTemplate: next.selectedTemplate,
          designSettings: next.designSettings,
          sectionVisibility: next.sectionVisibility,
          sectionOrder: next.sectionOrder ?? [...DEFAULT_SECTION_ORDER],
          isDirty: false,
          lastSaved: new Date(),
        });
      } else {
        set({ savedResumes: filtered });
      }
    },

    renameResume: (id: string, name: string) =>
      set((state) => ({
        savedResumes: state.savedResumes.map((r) =>
          r.id === id ? { ...r, name, updatedAt: new Date().toISOString() } : r
        ),
      })),
  };
}
