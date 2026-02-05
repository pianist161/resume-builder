import type {
  ResumeData,
  Experience,
  Education,
  Project,
  Language,
  Certification,
} from "../../types";
import { arrayMove } from "../../utils";
import type { StoreSet } from "../types";

export function createResumeDataSlice(set: StoreSet) {
  return {
    updateBasics: (field: keyof ResumeData["basics"], value: string) =>
      set((state) => ({
        resume: {
          ...state.resume,
          basics: { ...state.resume.basics, [field]: value },
        },
        isDirty: true,
      })),

    updateSummary: (value: string) =>
      set((state) => ({
        resume: { ...state.resume, summary: value },
        isDirty: true,
      })),

    // Experience
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

    updateExperience: (index: number, field: keyof Experience, value: string | boolean) =>
      set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
          ),
        },
        isDirty: true,
      })),

    removeExperience: (index: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.filter((_, i) => i !== index),
        },
        isDirty: true,
      })),

    reorderExperience: (from: number, to: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          experience: arrayMove(state.resume.experience, from, to),
        },
        isDirty: true,
      })),

    // Education
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

    updateEducation: (index: number, field: keyof Education, value: string) =>
      set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.map((edu, i) =>
            i === index ? { ...edu, [field]: value } : edu
          ),
        },
        isDirty: true,
      })),

    removeEducation: (index: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.filter((_, i) => i !== index),
        },
        isDirty: true,
      })),

    reorderEducation: (from: number, to: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          education: arrayMove(state.resume.education, from, to),
        },
        isDirty: true,
      })),

    // Skills
    addSkill: (categoryIndex: number, skill: string) =>
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

    removeSkill: (categoryIndex: number, skill: string) =>
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

    reorderSkillGroups: (from: number, to: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          skills: arrayMove(state.resume.skills, from, to),
        },
        isDirty: true,
      })),

    // Projects
    addProject: () =>
      set((state) => ({
        resume: {
          ...state.resume,
          projects: [
            ...state.resume.projects,
            { name: "", description: "", technologies: [] as string[], link: "" },
          ],
        },
        isDirty: true,
      })),

    updateProject: (index: number, field: keyof Project, value: string | string[]) =>
      set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.map((p, i) =>
            i === index ? { ...p, [field]: value } : p
          ),
        },
        isDirty: true,
      })),

    removeProject: (index: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter((_, i) => i !== index),
        },
        isDirty: true,
      })),

    reorderProjects: (from: number, to: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          projects: arrayMove(state.resume.projects, from, to),
        },
        isDirty: true,
      })),

    // Languages
    addLanguage: () =>
      set((state) => ({
        resume: {
          ...state.resume,
          languages: [...state.resume.languages, { language: "", level: "" }],
        },
        isDirty: true,
      })),

    updateLanguage: (index: number, field: keyof Language, value: string) =>
      set((state) => ({
        resume: {
          ...state.resume,
          languages: state.resume.languages.map((l, i) =>
            i === index ? { ...l, [field]: value } : l
          ),
        },
        isDirty: true,
      })),

    removeLanguage: (index: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          languages: state.resume.languages.filter((_, i) => i !== index),
        },
        isDirty: true,
      })),

    reorderLanguages: (from: number, to: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          languages: arrayMove(state.resume.languages, from, to),
        },
        isDirty: true,
      })),

    // Certifications
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

    updateCertification: (index: number, field: keyof Certification, value: string) =>
      set((state) => ({
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.map((c, i) =>
            i === index ? { ...c, [field]: value } : c
          ),
        },
        isDirty: true,
      })),

    removeCertification: (index: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.filter((_, i) => i !== index),
        },
        isDirty: true,
      })),

    reorderCertifications: (from: number, to: number) =>
      set((state) => ({
        resume: {
          ...state.resume,
          certifications: arrayMove(state.resume.certifications, from, to),
        },
        isDirty: true,
      })),

    // Photo
    setPhoto: (dataUrl: string) =>
      set((state) => ({
        resume: {
          ...state.resume,
          basics: { ...state.resume.basics, photo: dataUrl },
        },
        isDirty: true,
      })),

    removePhoto: () =>
      set((state) => ({
        resume: {
          ...state.resume,
          basics: { ...state.resume.basics, photo: "" },
        },
        isDirty: true,
      })),
  };
}
