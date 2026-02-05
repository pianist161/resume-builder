import type { ResumeData } from "@/lib/types";

export const emptyResume: ResumeData = {
  basics: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [
    { category: "Frontend", items: [] },
    { category: "Backend", items: [] },
    { category: "Tools", items: [] },
  ],
  projects: [],
  languages: [],
  certifications: [],
};
