import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey, SectionSpacing } from "@/lib/types";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

const sectionSpacingMap: Record<SectionSpacing, string> = {
  compact: "16px",
  normal: "24px",
  relaxed: "32px",
};

export function MinimalTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;

  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];

  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basics: () => {
      if (!sectionVisibility.basics) return null;
      return (
        <div className="overflow-hidden">
          <div className="flex items-center gap-3">
            {designSettings.showPhoto && basics.photo && (
              <img src={basics.photo} alt="" className="size-10 shrink-0 rounded-full object-cover" />
            )}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold break-words" style={{ color: accent }}>{basics.name}</h1>
              <p className="mt-0.5 text-sm text-zinc-500 truncate">{basics.title}</p>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.location && <span>{basics.location}</span>}
            {basics.website && <span className="break-all">{basics.website}</span>}
            {basics.linkedin && <span className="break-all">{basics.linkedin}</span>}
            {basics.github && <span className="break-all">{basics.github}</span>}
            {basics.telegram && <span className="break-all">{basics.telegram}</span>}
          </div>
        </div>
      );
    },

    summary: () => {
      if (!sectionVisibility.summary || !summary) return null;
      return (
        <div>
          <h2 className="mb-1.5 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>О себе</h2>
          <p className="text-zinc-600 break-words overflow-hidden">{summary}</p>
        </div>
      );
    },

    experience: () => {
      if (!sectionVisibility.experience || experience.length === 0) return null;
      return (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Опыт работы</h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{exp.position}</p>
                    <p className="text-zinc-400 truncate">{exp.company}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-300">{exp.startDate} — {exp.endDate}</p>
                </div>
                <p className="mt-1 text-zinc-600 break-words overflow-hidden">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },

    education: () => {
      if (!sectionVisibility.education || education.length === 0) return null;
      return (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Образование</h2>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{edu.degree}</p>
                    <p className="text-zinc-400 truncate">{edu.institution}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-300">{edu.startDate} — {edu.endDate}</p>
                </div>
                <p className="mt-0.5 text-zinc-600 break-words overflow-hidden">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },

    skills: () => {
      if (!sectionVisibility.skills || skills.length === 0) return null;
      return (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Навыки</h2>
          <div className="space-y-1.5">
            {skills.map((group, i) => (
              <div key={i}>
                <span className="font-medium text-zinc-700">{group.category}: </span>
                <span className="text-zinc-500">{group.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },

    projects: () => {
      if (!sectionVisibility.projects || projects.length === 0) return null;
      return (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Проекты</h2>
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={i} className="overflow-hidden">
                <p className="font-semibold text-zinc-900 truncate">{project.name}</p>
                <p className="text-zinc-600 break-words overflow-hidden">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="mt-0.5 text-xs text-zinc-400">{project.technologies.join(" · ")}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    },

    languages: () => {
      if (!sectionVisibility.languages || languages.length === 0) return null;
      return (
        <div>
          <h2 className="mb-1.5 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Языки</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {languages.map((lang, i) => (
              <span key={i} className="text-zinc-600">
                <span className="font-medium text-zinc-700">{lang.language}</span> — {lang.level}
              </span>
            ))}
          </div>
        </div>
      );
    },

    certifications: () => {
      if (!sectionVisibility.certifications || certifications.length === 0) return null;
      return (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Сертификаты</h2>
          <div className="space-y-1.5">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-zinc-900">{cert.name}</p>
                  <p className="text-xs text-zinc-400">{cert.organization}</p>
                </div>
                <p className="text-xs text-zinc-300">{cert.date}</p>
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
        fontFamily: fontFamilyMap[designSettings.fontFamily],
        fontSize: fontSizeMap[designSettings.fontSize],
        lineHeight: lineSpacingMap[designSettings.lineSpacing],
        padding: marginsMap[designSettings.margins],
        display: "flex",
        flexDirection: "column",
        gap: sSpacing,
      }}
    >
      {order.map((key) => {
        const node = sectionRenderers[key]?.();
        return node ? <Fragment key={key}>{node}</Fragment> : null;
      })}
    </div>
  );
}
