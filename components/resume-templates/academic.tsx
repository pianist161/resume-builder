import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey, FontFamily } from "@/lib/types";
import {
  fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

const fontFamilyMap: Record<FontFamily, string> = {
  inter: "'Times New Roman', 'Georgia', serif",
  georgia: "'Georgia', serif",
  roboto: "'Roboto', sans-serif",
};

export function AcademicTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;
  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];
  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basics: () =>
      sectionVisibility.basics ? (
        <div className="relative text-center overflow-hidden" style={{ borderBottom: `2px solid ${accent}` }}>
          {designSettings.showPhoto && basics.photo && (
            <img src={basics.photo} alt="" className="absolute right-0 top-0 size-11 rounded-lg object-cover" />
          )}
          <h1 className="text-2xl font-bold text-zinc-900 break-words tracking-wide" style={{ fontVariant: "small-caps" }}>{basics.name}</h1>
          <p className="mt-0.5 text-sm italic text-zinc-600">{basics.title}</p>
          <div className="mt-2 mb-3 flex flex-wrap items-center justify-center gap-1 text-xs text-zinc-500">
            <span>{basics.email}</span>
            <span className="text-zinc-300">|</span>
            <span>{basics.phone}</span>
            <span className="text-zinc-300">|</span>
            <span>{basics.location}</span>
            {basics.website && (<><span className="text-zinc-300">|</span><span className="break-all">{basics.website}</span></>)}
            {basics.linkedin && (<><span className="text-zinc-300">|</span><span className="break-all">{basics.linkedin}</span></>)}
            {basics.github && (<><span className="text-zinc-300">|</span><span className="break-all">{basics.github}</span></>)}
            {basics.telegram && (<><span className="text-zinc-300">|</span><span className="break-all">{basics.telegram}</span></>)}
          </div>
        </div>
      ) : null,

    summary: () =>
      sectionVisibility.summary && summary ? (
        <div>
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Профессиональный профиль</h2>
          <p className="mt-2 leading-relaxed text-zinc-600 break-words overflow-hidden">{summary}</p>
        </div>
      ) : null,

    education: () =>
      sectionVisibility.education && education.length > 0 ? (
        <div>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Образование</h2>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-zinc-900 truncate">{edu.degree}</p>
                    <p className="italic text-zinc-600 truncate">{edu.institution}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-500">{edu.startDate} — {edu.endDate}</p>
                </div>
                {edu.description && (
                  <p className="mt-1 text-zinc-600 break-words overflow-hidden">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null,

    experience: () =>
      sectionVisibility.experience && experience.length > 0 ? (
        <div>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Опыт работы</h2>
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
                <p className="mt-1 leading-relaxed text-zinc-600 break-words overflow-hidden">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    skills: () =>
      sectionVisibility.skills && skills.length > 0 ? (
        <div>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Навыки</h2>
          <div className="space-y-1">
            {skills.map((group, i) => (
              <p key={i} className="text-zinc-700">
                <span className="font-bold">{group.category}:</span> {group.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      ) : null,

    projects: () =>
      sectionVisibility.projects && projects.length > 0 ? (
        <div>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Проекты</h2>
          <div className="space-y-2">
            {projects.map((project, i) => (
              <div key={i} className="overflow-hidden">
                <p className="font-bold text-zinc-900 truncate">{project.name}</p>
                <p className="text-zinc-600 break-words overflow-hidden">{project.description}</p>
                <p className="text-xs italic text-zinc-500">Технологии: {project.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    languages: () =>
      sectionVisibility.languages && languages.length > 0 ? (
        <div>
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Языки</h2>
          <div className="mt-1 space-y-0.5">
            {languages.map((lang, i) => (
              <p key={i} className="text-zinc-700">{lang.language} — {lang.level}</p>
            ))}
          </div>
        </div>
      ) : null,

    certifications: () =>
      sectionVisibility.certifications && certifications.length > 0 ? (
        <div>
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-800" style={{ borderBottom: `1px solid ${accent}`, paddingBottom: "2px" }}>Публикации и сертификаты</h2>
          <div className="mt-1 space-y-1">
            {certifications.map((cert, i) => (
              <div key={i}>
                <p className="font-bold text-zinc-900">{cert.name}</p>
                <p className="text-xs text-zinc-500">{cert.organization}, {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,
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
