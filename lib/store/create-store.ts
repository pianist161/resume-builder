import { create } from "zustand";
import { persist } from "zustand/middleware";
import { temporal } from "zundo";
import { DEFAULT_SECTION_ORDER } from "../types";
import { generateId } from "../utils";
import type { ResumeStore, StoreSet, StoreGet } from "./types";
import { mockResume } from "@/data/mock-resume";
import { createResumeDataSlice } from "./slices/resume-data-slice";
import { createDesignSlice } from "./slices/design-slice";
import { createUiSlice } from "./slices/ui-slice";
import { createMultiResumeSlice } from "./slices/multi-resume-slice";
import { createLifecycleSlice } from "./slices/lifecycle-slice";

export const useResumeStore = create<ResumeStore>()(
  persist(
    temporal(
      (set, get) => {
        const s = set as unknown as StoreSet;
        const g = get as unknown as StoreGet;
        return {
          resume: mockResume,
          ...createResumeDataSlice(s),
          ...createDesignSlice(s),
          ...createUiSlice(s),
          ...createMultiResumeSlice(s, g),
          ...createLifecycleSlice(s, g),
        };
      },
      {
        limit: 50,
        partialize: (state) => ({
          resume: state.resume,
          selectedTemplate: state.selectedTemplate,
          designSettings: state.designSettings,
          sectionVisibility: state.sectionVisibility,
          sectionOrder: state.sectionOrder,
        }),
      }
    ),
    {
      name: "resume-builder-data",
      version: 5,
      partialize: (state) => ({
        resume: state.resume,
        selectedTemplate: state.selectedTemplate,
        designSettings: state.designSettings,
        sectionVisibility: state.sectionVisibility,
        sectionOrder: state.sectionOrder,
        isFirstVisit: state.isFirstVisit,
        savedResumes: state.savedResumes,
        activeResumeId: state.activeResumeId,
      }),
      migrate: (persisted: any, version: number) => {
        if (version < 2) {
          persisted.resume.basics.linkedin = persisted.resume.basics.linkedin ?? "";
          persisted.resume.basics.github = persisted.resume.basics.github ?? "";
          persisted.resume.basics.telegram = persisted.resume.basics.telegram ?? "";
          persisted.designSettings.lineSpacing = persisted.designSettings.lineSpacing ?? "normal";
          persisted.designSettings.sectionSpacing = persisted.designSettings.sectionSpacing ?? "normal";
          persisted.designSettings.margins = persisted.designSettings.margins ?? "normal";
        }
        if (version < 3) {
          const id = generateId();
          const now = new Date().toISOString();
          persisted.savedResumes = [
            {
              id,
              name: persisted.resume?.basics?.name
                ? `Резюме — ${persisted.resume.basics.name}`
                : "Моё резюме",
              createdAt: now,
              updatedAt: now,
              resume: persisted.resume,
              selectedTemplate: persisted.selectedTemplate,
              designSettings: persisted.designSettings,
              sectionVisibility: persisted.sectionVisibility,
            },
          ];
          persisted.activeResumeId = id;
        }
        if (version < 4) {
          persisted.sectionOrder = [...DEFAULT_SECTION_ORDER];
          if (persisted.savedResumes) {
            persisted.savedResumes = persisted.savedResumes.map((r: any) => ({
              ...r,
              sectionOrder: r.sectionOrder ?? [...DEFAULT_SECTION_ORDER],
            }));
          }
        }
        if (version < 5) {
          if (persisted.resume?.basics) {
            persisted.resume.basics.photo = persisted.resume.basics.photo ?? "";
          }
          if (persisted.designSettings) {
            persisted.designSettings.showPhoto = persisted.designSettings.showPhoto ?? true;
          }
          if (persisted.savedResumes) {
            persisted.savedResumes = persisted.savedResumes.map((r: any) => ({
              ...r,
              resume: {
                ...r.resume,
                basics: { ...r.resume?.basics, photo: r.resume?.basics?.photo ?? "" },
              },
              designSettings: {
                ...r.designSettings,
                showPhoto: r.designSettings?.showPhoto ?? true,
              },
            }));
          }
        }
        return persisted;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
