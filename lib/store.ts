import { create } from "zustand";
import { persist } from "zustand/middleware";
import { temporal } from "zundo";
import type {
  ResumeData,
  TemplateId,
  DesignSettings,
  SectionVisibility,
  FontFamily,
  FontSize,
  Experience,
  Education,
  Project,
  Language,
  Certification,
} from "./types";
import { mockResume } from "@/data/mock-resume";
import { emptyResume } from "@/data/empty-resume";

interface ResumeStore {
  // Data
  resume: ResumeData;
  selectedTemplate: TemplateId;
  designSettings: DesignSettings;
  sectionVisibility: SectionVisibility;
  zoomLevel: number;
  isDirty: boolean;
  lastSaved: Date | null;
  _hasHydrated: boolean;
  isFirstVisit: boolean;

  // Basics
  updateBasics: (field: keyof ResumeData["basics"], value: string) => void;

  // Summary
  updateSummary: (value: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (index: number, field: keyof Experience, value: string | boolean) => void;
  removeExperience: (index: number) => void;
  reorderExperience: (from: number, to: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  removeEducation: (index: number) => void;
  reorderEducation: (from: number, to: number) => void;

  // Skills
  addSkill: (categoryIndex: number, skill: string) => void;
  removeSkill: (categoryIndex: number, skill: string) => void;

  // Projects
  addProject: () => void;
  updateProject: (index: number, field: keyof Project, value: string | string[]) => void;
  removeProject: (index: number) => void;
  reorderProjects: (from: number, to: number) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (index: number, field: keyof Language, value: string) => void;
  removeLanguage: (index: number) => void;
  reorderLanguages: (from: number, to: number) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (index: number, field: keyof Certification, value: string) => void;
  removeCertification: (index: number) => void;
  reorderCertifications: (from: number, to: number) => void;

  // Design
  setTemplate: (template: TemplateId) => void;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: FontSize) => void;

  // Visibility
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;

  // Zoom
  zoomIn: () => void;
  zoomOut: () => void;
  setZoomLevel: (level: number) => void;

  // Save
  markSaved: () => void;

  // Hydration & onboarding
  setHasHydrated: (v: boolean) => void;
  setFirstVisitDone: () => void;
  loadSampleData: () => void;
  clearAllData: () => void;
  importResumeData: (data: ResumeData) => void;
}

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    temporal(
      (set) => ({
        resume: mockResume,
        selectedTemplate: "modern",
        designSettings: {
          accentColor: "#2563eb",
          fontFamily: "inter",
          fontSize: "medium",
        },
        sectionVisibility: {
          basics: true,
          summary: true,
          experience: true,
          education: true,
          skills: true,
          projects: true,
          languages: true,
          certifications: true,
        },
        zoomLevel: 100,
        isDirty: false,
        lastSaved: null,
        _hasHydrated: false,
        isFirstVisit: true,

        updateBasics: (field, value) =>
          set((state) => ({
            resume: {
              ...state.resume,
              basics: { ...state.resume.basics, [field]: value },
            },
            isDirty: true,
          })),

        updateSummary: (value) =>
          set((state) => ({
            resume: { ...state.resume, summary: value },
            isDirty: true,
          })),

        addExperience: () =>
          set((state) => ({
            resume: {
              ...state.resume,
              experience: [
                ...state.resume.experience,
                { company: "", position: "", startDate: "", endDate: "", description: "", isCurrentJob: false },
              ],
            },
            isDirty: true,
          })),

        updateExperience: (index, field, value) =>
          set((state) => ({
            resume: {
              ...state.resume,
              experience: state.resume.experience.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
              ),
            },
            isDirty: true,
          })),

        removeExperience: (index) =>
          set((state) => ({
            resume: {
              ...state.resume,
              experience: state.resume.experience.filter((_, i) => i !== index),
            },
            isDirty: true,
          })),

        reorderExperience: (from, to) =>
          set((state) => ({
            resume: {
              ...state.resume,
              experience: arrayMove(state.resume.experience, from, to),
            },
            isDirty: true,
          })),

        addEducation: () =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: [
                ...state.resume.education,
                { institution: "", degree: "", startDate: "", endDate: "", description: "" },
              ],
            },
            isDirty: true,
          })),

        updateEducation: (index, field, value) =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: state.resume.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
              ),
            },
            isDirty: true,
          })),

        removeEducation: (index) =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: state.resume.education.filter((_, i) => i !== index),
            },
            isDirty: true,
          })),

        reorderEducation: (from, to) =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: arrayMove(state.resume.education, from, to),
            },
            isDirty: true,
          })),

        addSkill: (categoryIndex, skill) =>
          set((state) => ({
            resume: {
              ...state.resume,
              skills: state.resume.skills.map((group, i) =>
                i === categoryIndex
                  ? { ...group, items: [...group.items, skill] }
                  : group
              ),
            },
            isDirty: true,
          })),

        removeSkill: (categoryIndex, skill) =>
          set((state) => ({
            resume: {
              ...state.resume,
              skills: state.resume.skills.map((group, i) =>
                i === categoryIndex
                  ? { ...group, items: group.items.filter((s) => s !== skill) }
                  : group
              ),
            },
            isDirty: true,
          })),

        addProject: () =>
          set((state) => ({
            resume: {
              ...state.resume,
              projects: [
                ...state.resume.projects,
                { name: "", description: "", technologies: [], link: "" },
              ],
            },
            isDirty: true,
          })),

        updateProject: (index, field, value) =>
          set((state) => ({
            resume: {
              ...state.resume,
              projects: state.resume.projects.map((p, i) =>
                i === index ? { ...p, [field]: value } : p
              ),
            },
            isDirty: true,
          })),

        removeProject: (index) =>
          set((state) => ({
            resume: {
              ...state.resume,
              projects: state.resume.projects.filter((_, i) => i !== index),
            },
            isDirty: true,
          })),

        reorderProjects: (from, to) =>
          set((state) => ({
            resume: {
              ...state.resume,
              projects: arrayMove(state.resume.projects, from, to),
            },
            isDirty: true,
          })),

        addLanguage: () =>
          set((state) => ({
            resume: {
              ...state.resume,
              languages: [...state.resume.languages, { language: "", level: "" }],
            },
            isDirty: true,
          })),

        updateLanguage: (index, field, value) =>
          set((state) => ({
            resume: {
              ...state.resume,
              languages: state.resume.languages.map((l, i) =>
                i === index ? { ...l, [field]: value } : l
              ),
            },
            isDirty: true,
          })),

        removeLanguage: (index) =>
          set((state) => ({
            resume: {
              ...state.resume,
              languages: state.resume.languages.filter((_, i) => i !== index),
            },
            isDirty: true,
          })),

        reorderLanguages: (from, to) =>
          set((state) => ({
            resume: {
              ...state.resume,
              languages: arrayMove(state.resume.languages, from, to),
            },
            isDirty: true,
          })),

        addCertification: () =>
          set((state) => ({
            resume: {
              ...state.resume,
              certifications: [
                ...state.resume.certifications,
                { name: "", organization: "", date: "" },
              ],
            },
            isDirty: true,
          })),

        updateCertification: (index, field, value) =>
          set((state) => ({
            resume: {
              ...state.resume,
              certifications: state.resume.certifications.map((c, i) =>
                i === index ? { ...c, [field]: value } : c
              ),
            },
            isDirty: true,
          })),

        removeCertification: (index) =>
          set((state) => ({
            resume: {
              ...state.resume,
              certifications: state.resume.certifications.filter((_, i) => i !== index),
            },
            isDirty: true,
          })),

        reorderCertifications: (from, to) =>
          set((state) => ({
            resume: {
              ...state.resume,
              certifications: arrayMove(state.resume.certifications, from, to),
            },
            isDirty: true,
          })),

        setTemplate: (template) => set({ selectedTemplate: template, isDirty: true }),
        setAccentColor: (color) =>
          set((state) => ({
            designSettings: { ...state.designSettings, accentColor: color },
            isDirty: true,
          })),
        setFontFamily: (font) =>
          set((state) => ({
            designSettings: { ...state.designSettings, fontFamily: font },
            isDirty: true,
          })),
        setFontSize: (size) =>
          set((state) => ({
            designSettings: { ...state.designSettings, fontSize: size },
            isDirty: true,
          })),

        toggleSectionVisibility: (section) =>
          set((state) => ({
            sectionVisibility: {
              ...state.sectionVisibility,
              [section]: !state.sectionVisibility[section],
            },
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
        setZoomLevel: (level) => set({ zoomLevel: Math.min(200, Math.max(50, level)) }),

        markSaved: () => set({ isDirty: false, lastSaved: new Date() }),

        setHasHydrated: (v) => set({ _hasHydrated: v }),
        setFirstVisitDone: () => set({ isFirstVisit: false }),
        loadSampleData: () =>
          set({
            resume: mockResume,
            designSettings: {
              accentColor: "#2563eb",
              fontFamily: "inter",
              fontSize: "medium",
            },
            sectionVisibility: {
              basics: true,
              summary: true,
              experience: true,
              education: true,
              skills: true,
              projects: true,
              languages: true,
              certifications: true,
            },
            isDirty: true,
          }),
        clearAllData: () =>
          set({
            resume: emptyResume,
            designSettings: {
              accentColor: "#2563eb",
              fontFamily: "inter",
              fontSize: "medium",
            },
            sectionVisibility: {
              basics: true,
              summary: true,
              experience: true,
              education: true,
              skills: true,
              projects: true,
              languages: true,
              certifications: true,
            },
            isDirty: true,
          }),
        importResumeData: (data) =>
          set({
            resume: data,
            isDirty: true,
          }),
      }),
      {
        limit: 50,
        partialize: (state) => ({
          resume: state.resume,
          selectedTemplate: state.selectedTemplate,
          designSettings: state.designSettings,
          sectionVisibility: state.sectionVisibility,
        }),
      }
    ),
    {
      name: "resume-builder-data",
      version: 1,
      partialize: (state) => ({
        resume: state.resume,
        selectedTemplate: state.selectedTemplate,
        designSettings: state.designSettings,
        sectionVisibility: state.sectionVisibility,
        isFirstVisit: state.isFirstVisit,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
