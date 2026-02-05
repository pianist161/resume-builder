import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey } from "@/lib/types";
import { Linkedin, Github, Send } from "lucide-react";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

export function ClassicTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;

  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];
  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basics: () => {
      if (!sectionVisibility.basics) return null;
      return (
        <div className="border-b-2 border-zinc-800 pb-3 text-center overflow-hidden">
          {designSettings.showPhoto && basics.photo && (
            <img src={basics.photo} alt="" className="mx-auto mb-2 size-11 rounded-lg object-cover" />
          )}
          <h1 className="text-2xl font-bold uppercase tracking-wide text-zinc-900 break-words">{basics.name}</h1>
          <p className="mt-1 text-zinc-600 truncate">{basics.title}</p>
          <p className="mt-1 text-xs text-zinc-500 break-words">
            {[
              basics.email,
              basics.phone,
              basics.location,
              basics.website,
            ].filter(Boolean).join(" \u2022 ")}
          </p>
          {(basics.linkedin || basics.github || basics.telegram) && (
            <p className="mt-0.5 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
              {basics.linkedin && <span className="flex items-center gap-1"><Linkedin className="size-3" />{basics.linkedin}</span>}
              {basics.github && <span className="flex items-center gap-1"><Github className="size-3" />{basics.github}</span>}
              {basics.telegram && <span className="flex items-center gap-1"><Send className="size-3" />{basics.telegram}</span>}
            </p>
          )}
        </div>
      );
    },

    summary: () => {
      if (!sectionVisibility.summary || !summary) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Профессиональный профиль</h2>
          <p className="mt-2 leading-relaxed text-zinc-700 break-words overflow-hidden">{summary}</p>
        </div>
      );
    },

    experience: () => {
      if (!sectionVisibility.experience || experience.length === 0) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Опыт работы</h2>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-zinc-900 truncate">{exp.position}</p>
                    <p className="italic text-zinc-600 truncate">{exp.company}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-500">{exp.startDate} — {exp.endDate}</p>
                </div>
                <p className="mt-1 leading-relaxed text-zinc-700 break-words overflow-hidden">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },

    education: () => {
      if (!sectionVisibility.education || education.length === 0) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Образование</h2>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-zinc-900 truncate">{edu.institution}</p>
                    <p className="italic text-zinc-600 truncate">{edu.degree}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-500">{edu.startDate} — {edu.endDate}</p>
                </div>
                <p className="mt-0.5 text-xs text-zinc-600 break-words overflow-hidden">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },

    skills: () => {
      if (!sectionVisibility.skills || skills.length === 0) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Навыки</h2>
          <div className="space-y-1">
            {skills.map((group, i) => (
              <p key={i} className="text-zinc-700">
                <span className="font-bold">{group.category}:</span> {group.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      );
    },

    projects: () => {
      if (!sectionVisibility.projects || projects.length === 0) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Проекты</h2>
          <div className="space-y-2">
            {projects.map((project, i) => (
              <div key={i} className="overflow-hidden">
                <p className="font-bold text-zinc-900 truncate">{project.name}</p>
                <p className="text-zinc-700 break-words overflow-hidden">{project.description}</p>
                <p className="text-xs italic text-zinc-500">Технологии: {project.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },

    languages: () => {
      if (!sectionVisibility.languages || languages.length === 0) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Языки</h2>
          <div className="mt-1 space-y-0.5">
            {languages.map((lang, i) => (
              <p key={i} className="text-zinc-700">{lang.language} — {lang.level}</p>
            ))}
          </div>
        </div>
      );
    },

    certifications: () => {
      if (!sectionVisibility.certifications || certifications.length === 0) return null;
      return (
        <div style={{ marginTop: sSpacing }}>
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Сертификаты</h2>
          <div className="mt-1 space-y-1">
            {certifications.map((cert, i) => (
              <div key={i}>
                <p className="font-bold text-zinc-900">{cert.name}</p>
                <p className="text-xs text-zinc-500">{cert.organization}, {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },
  };

  return (
    <div
      style={{
        fontFamily: designSettings.fontFamily === "inter" ? "'Times New Roman', 'Georgia', serif" : fontFamilyMap[designSettings.fontFamily],
        fontSize: fontSizeMap[designSettings.fontSize],
        lineHeight: lineSpacingMap[designSettings.lineSpacing],
        padding: marginsMap[designSettings.margins],
      }}
    >
      {order.map((key) => {
        const node = sectionRenderers[key]?.();
        return node ? <Fragment key={key}>{node}</Fragment> : null;
      })}
    </div>
  );
}
