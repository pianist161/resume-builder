import type { SectionVisibility, SectionKey } from "../../types";
import { DEFAULT_SECTION_ORDER } from "../../types";
import { defaultSectionVisibility } from "../../defaults";
import { arrayMove } from "../../utils";
import type { StoreSet } from "../types";

export function createUiSlice(set: StoreSet) {
  return {
    sectionVisibility: { ...defaultSectionVisibility },
    sectionOrder: [...DEFAULT_SECTION_ORDER] as SectionKey[],
    zoomLevel: 100,
    isDirty: false,
    lastSaved: null as Date | null,
    _hasHydrated: false,
    isFirstVisit: true,

    toggleSectionVisibility: (section: keyof SectionVisibility) =>
      set((state) => ({
        sectionVisibility: {
          ...state.sectionVisibility,
          [section]: !state.sectionVisibility[section],
        },
        isDirty: true,
      })),

    setSectionOrder: (order: SectionKey[]) => set({ sectionOrder: order, isDirty: true }),

    reorderSections: (from: number, to: number) =>
      set((state) => ({
        sectionOrder: arrayMove(state.sectionOrder, from, to),
        isDirty: true,
      })),

    zoomIn: () =>
      set((state) => ({
        zoomLevel: Math.min(state.zoomLevel + 10, 200),
      })),

    zoomOut: () =>
      set((state) => ({
        zoomLevel: Math.max(state.zoomLevel - 10, 50),
      })),

    setZoomLevel: (level: number) => set({ zoomLevel: Math.min(200, Math.max(50, level)) }),

    markSaved: () => set({ isDirty: false, lastSaved: new Date() }),

    setHasHydrated: (v: boolean) => set({ _hasHydrated: v }),
  };
}
