import type { DesignSettings, SectionVisibility } from "./types";

export const defaultDesignSettings: DesignSettings = {
  accentColor: "#2563eb",
  fontFamily: "inter",
  fontSize: "medium",
  lineSpacing: "normal",
  sectionSpacing: "normal",
  margins: "normal",
  showPhoto: true,
};

export const defaultSectionVisibility: SectionVisibility = {
  basics: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  languages: true,
  certifications: true,
};
