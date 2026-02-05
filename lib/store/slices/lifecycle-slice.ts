import type { ResumeData } from "../../types";
import { DEFAULT_SECTION_ORDER } from "../../types";
import { defaultDesignSettings, defaultSectionVisibility } from "../../defaults";
import { mockResume } from "@/data/mock-resume";
import { emptyResume } from "@/data/empty-resume";
import { generateId } from "../../utils";
import type { StoreSet, StoreGet } from "../types";

export function createLifecycleSlice(set: StoreSet, get: StoreGet) {
  return {
    setFirstVisitDone: () => {
      const state = get();
      const id = generateId();
      const now = new Date().toISOString();
      set({
        isFirstVisit: false,
        activeResumeId: id,
        savedResumes: [
          {
            id,
            name: state.resume.basics.name
              ? `Резюме — ${state.resume.basics.name}`
              : "Моё резюме",
            createdAt: now,
            updatedAt: now,
            resume: state.resume,
            selectedTemplate: state.selectedTemplate,
            designSettings: state.designSettings,
            sectionVisibility: state.sectionVisibility,
            sectionOrder: state.sectionOrder,
          },
        ],
      });
    },

    loadSampleData: () => {
      const state = get();
      const now = new Date().toISOString();
      set({
        resume: mockResume,
        designSettings: { ...defaultDesignSettings },
        sectionVisibility: { ...defaultSectionVisibility },
        sectionOrder: [...DEFAULT_SECTION_ORDER],
        isDirty: true,
        savedResumes: state.activeResumeId
          ? state.savedResumes.map((r) =>
              r.id === state.activeResumeId
                ? {
                    ...r,
                    updatedAt: now,
                    resume: mockResume,
                    designSettings: { ...defaultDesignSettings },
                    sectionVisibility: { ...defaultSectionVisibility },
                    sectionOrder: [...DEFAULT_SECTION_ORDER],
                  }
                : r
            )
          : state.savedResumes,
      });
    },

    clearAllData: () => {
      const state = get();
      const now = new Date().toISOString();
      set({
        resume: emptyResume,
        designSettings: { ...defaultDesignSettings },
        sectionVisibility: { ...defaultSectionVisibility },
        sectionOrder: [...DEFAULT_SECTION_ORDER],
        isDirty: true,
        savedResumes: state.activeResumeId
          ? state.savedResumes.map((r) =>
              r.id === state.activeResumeId
                ? {
                    ...r,
                    updatedAt: now,
                    resume: emptyResume,
                    designSettings: { ...defaultDesignSettings },
                    sectionVisibility: { ...defaultSectionVisibility },
                    sectionOrder: [...DEFAULT_SECTION_ORDER],
                  }
                : r
            )
          : state.savedResumes,
      });
    },

    importResumeData: (data: ResumeData) =>
      set({
        resume: {
          ...data,
          basics: { ...data.basics, photo: data.basics.photo ?? "" },
        },
        isDirty: true,
      }),
  };
}
