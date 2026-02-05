import type {
  ResumeData,
  TemplateId,
  DesignSettings,
  SectionVisibility,
  SectionKey,
  FontFamily,
  FontSize,
  LineSpacing,
  SectionSpacing,
  PageMargins,
  Experience,
  Education,
  Project,
  Language,
  Certification,
  SavedResume,
} from "../types";

export type StoreSet = (
  partial: Partial<ResumeStore> | ((state: ResumeStore) => Partial<ResumeStore>),
) => void;
export type StoreGet = () => ResumeStore;

export interface ResumeStore {
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

  // Multiple resumes
  savedResumes: SavedResume[];
  activeResumeId: string | null;

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
  reorderSkillGroups: (from: number, to: number) => void;

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
  setLineSpacing: (spacing: LineSpacing) => void;
  setSectionSpacing: (spacing: SectionSpacing) => void;
  setMargins: (margins: PageMargins) => void;
  setShowPhoto: (show: boolean) => void;

  // Photo
  setPhoto: (dataUrl: string) => void;
  removePhoto: () => void;

  // Visibility
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;

  // Section order
  sectionOrder: SectionKey[];
  setSectionOrder: (order: SectionKey[]) => void;
  reorderSections: (from: number, to: number) => void;

  // Zoom
  zoomIn: () => void;
  zoomOut: () => void;
  setZoomLevel: (level: number) => void;

  // Save
  markSaved: () => void;
  saveCurrentResume: () => void;

  // Hydration & onboarding
  setHasHydrated: (v: boolean) => void;
  setFirstVisitDone: () => void;
  loadSampleData: () => void;
  clearAllData: () => void;
  importResumeData: (data: ResumeData) => void;

  // Multiple resumes actions
  loadResume: (id: string) => void;
  createNewResume: (name?: string) => void;
  duplicateResume: (id: string) => void;
  deleteResume: (id: string) => void;
  renameResume: (id: string, name: string) => void;
}
