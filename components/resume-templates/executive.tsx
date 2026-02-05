import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Send } from "lucide-react";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

export function ExecutiveTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;

  const padding = marginsMap[designSettings.margins];
  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];

  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;
  const SIDEBAR_SECTIONS = new Set<SectionKey>(["skills", "languages", "certifications"]);
  const MAIN_SECTIONS = new Set<SectionKey>(["summary", "experience", "education", "projects"]);
  const sidebarOrder = order.filter(k => SIDEBAR_SECTIONS.has(k));
  const mainOrder = order.filter(k => MAIN_SECTIONS.has(k));

  const mainRenderers: Partial<Record<SectionKey, () => React.ReactNode>> = {
    summary: () =>
      sectionVisibility.summary && summary ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>О себе</h2>
          <p className="leading-relaxed text-zinc-600 break-words overflow-hidden">{summary}</p>
        </div>
      ) : null,

    experience: () =>
      sectionVisibility.experience && experience.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Опыт работы</h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{exp.position}</p>
                    <p className="text-xs text-zinc-500 truncate">{exp.company}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-400">{exp.startDate} — {exp.endDate}</p>
                </div>
                <p className="mt-1 leading-relaxed text-zinc-600 break-words overflow-hidden">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    education: () =>
      sectionVisibility.education && education.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Образование</h2>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{edu.degree}</p>
                    <p className="text-xs text-zinc-500 truncate">{edu.institution}</p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-400">{edu.startDate} — {edu.endDate}</p>
                </div>
                <p className="mt-0.5 text-zinc-600 break-words overflow-hidden">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    projects: () =>
      sectionVisibility.projects && projects.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Проекты</h2>
          <div className="space-y-3">
            {projects.map((project, i) => (
              <div key={i} className="overflow-hidden">
                <p className="font-semibold text-zinc-900 truncate">{project.name}</p>
                <p className="text-xs text-zinc-600 break-words overflow-hidden">{project.description}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full px-2 py-0.5 text-[10px]" style={{ backgroundColor: accent + "15", color: accent }}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null,
  };

  const sidebarRenderers: Partial<Record<SectionKey, () => React.ReactNode>> = {
    skills: () =>
      sectionVisibility.skills && skills.length > 0 ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Навыки</h2>
          <div className="space-y-3">
            {skills.map((group, i) => (
              <div key={i}>
                <p className="mb-1 text-xs font-medium text-zinc-500">{group.category}</p>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span key={item} className="rounded bg-white px-1.5 py-0.5 text-[10px] text-zinc-700 border border-zinc-200">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    languages: () =>
      sectionVisibility.languages && languages.length > 0 ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Языки</h2>
          <div className="space-y-1 text-xs">
            {languages.map((lang, i) => (
              <div key={i} className="flex justify-between text-zinc-600">
                <span>{lang.language}</span>
                <span className="text-zinc-400">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    certifications: () =>
      sectionVisibility.certifications && certifications.length > 0 ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Сертификаты</h2>
          <div className="space-y-2 text-xs">
            {certifications.map((cert, i) => (
              <div key={i}>
                <p className="font-medium text-zinc-900">{cert.name}</p>
                <p className="text-zinc-400">{cert.organization} &middot; {cert.date}</p>
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
      }}
    >
      {/* Header — full width */}
      {sectionVisibility.basics && (
        <div className="overflow-hidden" style={{ padding, paddingBottom: "16px", borderBottom: `3px solid ${accent}` }}>
          <div className="flex items-center gap-3">
            {designSettings.showPhoto && basics.photo && (
              <img src={basics.photo} alt="" className="size-12 shrink-0 rounded-full object-cover" />
            )}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-zinc-900 break-words">{basics.name}</h1>
              <p className="mt-0.5 text-base font-medium truncate" style={{ color: accent }}>{basics.title}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1 break-all"><Mail className="size-3 shrink-0" />{basics.email}</span>
            <span className="flex items-center gap-1"><Phone className="size-3 shrink-0" />{basics.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="size-3 shrink-0" />{basics.location}</span>
            {basics.website && <span className="flex items-center gap-1 break-all"><Globe className="size-3 shrink-0" />{basics.website}</span>}
            {basics.linkedin && <span className="flex items-center gap-1 break-all"><Linkedin className="size-3 shrink-0" />{basics.linkedin}</span>}
            {basics.github && <span className="flex items-center gap-1 break-all"><Github className="size-3 shrink-0" />{basics.github}</span>}
            {basics.telegram && <span className="flex items-center gap-1 break-all"><Send className="size-3 shrink-0" />{basics.telegram}</span>}
          </div>
        </div>
      )}

      {/* Two columns */}
      <div className="flex">
        {/* Main content — left 65% */}
        <div className="w-[65%]" style={{ padding }}>
          <div style={{ display: "flex", flexDirection: "column", gap: sSpacing }}>
            {mainOrder.map(key => {
              const node = mainRenderers[key]?.();
              return node ? <Fragment key={key}>{node}</Fragment> : null;
            })}
          </div>
        </div>

        {/* Sidebar — right 35% */}
        <div className="w-[35%] bg-zinc-50" style={{ padding }}>
          <div style={{ display: "flex", flexDirection: "column", gap: sSpacing }}>
            {sidebarOrder.map(key => {
              const node = sidebarRenderers[key]?.();
              return node ? <Fragment key={key}>{node}</Fragment> : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
