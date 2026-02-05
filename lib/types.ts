export interface ResumeBasics {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
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

export type TemplateId = "modern" | "professional" | "creative" | "classic";

export type FontFamily = "inter" | "georgia" | "roboto";

export type FontSize = "small" | "medium" | "large";

export type ExportFormat = "pdf" | "json";

export interface DesignSettings {
  accentColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
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
