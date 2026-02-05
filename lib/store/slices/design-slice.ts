import type {
  TemplateId,
  FontFamily,
  FontSize,
  LineSpacing,
  SectionSpacing,
  PageMargins,
} from "../../types";
import { defaultDesignSettings } from "../../defaults";
import type { StoreSet } from "../types";

export function createDesignSlice(set: StoreSet) {
  return {
    selectedTemplate: "modern" as TemplateId,
    designSettings: { ...defaultDesignSettings },

    setTemplate: (template: TemplateId) => set({ selectedTemplate: template, isDirty: true }),

    setAccentColor: (color: string) =>
      set((state) => ({
        designSettings: { ...state.designSettings, accentColor: color },
        isDirty: true,
      })),

    setFontFamily: (font: FontFamily) =>
      set((state) => ({
        designSettings: { ...state.designSettings, fontFamily: font },
        isDirty: true,
      })),

    setFontSize: (size: FontSize) =>
      set((state) => ({
        designSettings: { ...state.designSettings, fontSize: size },
        isDirty: true,
      })),

    setLineSpacing: (spacing: LineSpacing) =>
      set((state) => ({
        designSettings: { ...state.designSettings, lineSpacing: spacing },
        isDirty: true,
      })),

    setSectionSpacing: (spacing: SectionSpacing) =>
      set((state) => ({
        designSettings: { ...state.designSettings, sectionSpacing: spacing },
        isDirty: true,
      })),

    setMargins: (margins: PageMargins) =>
      set((state) => ({
        designSettings: { ...state.designSettings, margins },
        isDirty: true,
      })),

    setShowPhoto: (show: boolean) =>
      set((state) => ({
        designSettings: { ...state.designSettings, showPhoto: show },
        isDirty: true,
      })),
  };
}
