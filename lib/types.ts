export interface ResumeBasics {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  telegram: string;
  photo: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentJob?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface Certification {
  name: string;
  organization: string;
  date: string;
}

export interface ResumeData {
  basics: ResumeBasics;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
}

export type TemplateId = "modern" | "professional" | "creative" | "classic" | "minimal" | "executive" | "tech" | "twocolumn" | "academic" | "infographic";

export type FontFamily = "inter" | "georgia" | "roboto";

export type FontSize = "small" | "medium" | "large";

export type ExportFormat = "pdf" | "json" | "docx";

export type LineSpacing = "compact" | "normal" | "relaxed";
export type SectionSpacing = "compact" | "normal" | "relaxed";
export type PageMargins = "narrow" | "normal" | "wide";

export interface DesignSettings {
  accentColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineSpacing: LineSpacing;
  sectionSpacing: SectionSpacing;
  margins: PageMargins;
  showPhoto: boolean;
}

export interface SectionVisibility {
  basics: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  languages: boolean;
  certifications: boolean;
}

export type SectionKey = keyof SectionVisibility;

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "basics", "summary", "experience", "education",
  "skills", "projects", "languages", "certifications",
];

export interface SavedResume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  resume: ResumeData;
  selectedTemplate: TemplateId;
  designSettings: DesignSettings;
  sectionVisibility: SectionVisibility;
  sectionOrder?: SectionKey[];
}
