import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Send } from "lucide-react";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

export function ProfessionalTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;

  const sidebarPadding = marginsMap[designSettings.margins];
  const mainPadding = marginsMap[designSettings.margins];

  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;
  const SIDEBAR_SECTIONS = new Set<SectionKey>(["skills", "languages", "certifications"]);
  const MAIN_SECTIONS = new Set<SectionKey>(["summary", "experience", "education", "projects"]);
  const sidebarOrder = order.filter(k => SIDEBAR_SECTIONS.has(k));
  const mainOrder = order.filter(k => MAIN_SECTIONS.has(k));

  const sidebarRenderers: Partial<Record<SectionKey, () => React.ReactNode>> = {
    skills: () =>
      sectionVisibility.skills && skills.length > 0 ? (
        <div className="mb-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Навыки</h2>
          <div className="space-y-3">
            {skills.map((group, i) => (
              <div key={i}>
                <p className="mb-1 text-xs font-medium text-zinc-400">{group.category}</p>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span key={item} className="rounded bg-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-300">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    languages: () =>
      sectionVisibility.languages && languages.length > 0 ? (
        <div className="mb-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Языки</h2>
          <div className="space-y-1 text-xs">
            {languages.map((lang, i) => (
              <div key={i} className="flex justify-between text-zinc-300">
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
                <p className="font-medium text-zinc-200">{cert.name}</p>
                <p className="text-zinc-400">{cert.organization} &middot; {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,
  };

  const mainRenderers: Partial<Record<SectionKey, () => React.ReactNode>> = {
    summary: () =>
      sectionVisibility.summary && summary ? (
        <div style={{ marginBottom: sectionSpacingMap[designSettings.sectionSpacing] }}>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>О себе</h2>
          <p className="leading-relaxed text-zinc-600 break-words overflow-hidden">{summary}</p>
        </div>
      ) : null,

    experience: () =>
      sectionVisibility.experience && experience.length > 0 ? (
        <div style={{ marginBottom: sectionSpacingMap[designSettings.sectionSpacing] }}>
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
        <div style={{ marginBottom: sectionSpacingMap[designSettings.sectionSpacing] }}>
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

  return (
    <div
      className="flex h-full"
      style={{
        fontFamily: fontFamilyMap[designSettings.fontFamily],
        fontSize: fontSizeMap[designSettings.fontSize],
        lineHeight: lineSpacingMap[designSettings.lineSpacing],
      }}
    >
      {/* Sidebar */}
      <div className="w-[35%] bg-zinc-800 text-white overflow-hidden" style={{ padding: sidebarPadding }}>
        {sectionVisibility.basics && (
          <>
            {designSettings.showPhoto && basics.photo ? (
              <img src={basics.photo} alt="" className="mx-auto mb-4 size-20 rounded-full object-cover" />
            ) : (
              <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-zinc-600 text-2xl font-bold text-zinc-300">
                {basics.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <h1 className="mb-1 text-center text-lg font-bold break-words">{basics.name}</h1>
            <p className="mb-6 text-center text-xs truncate" style={{ color: accent }}>{basics.title}</p>
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Контакты</h2>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2"><Mail className="size-3 shrink-0" /><span className="break-all">{basics.email}</span></div>
                <div className="flex items-center gap-2"><Phone className="size-3 shrink-0" /><span>{basics.phone}</span></div>
                <div className="flex items-center gap-2"><MapPin className="size-3 shrink-0" /><span>{basics.location}</span></div>
                {basics.website && <div className="flex items-center gap-2"><Globe className="size-3 shrink-0" /><span className="break-all">{basics.website}</span></div>}
                {basics.linkedin && <div className="flex items-center gap-2"><Linkedin className="size-3 shrink-0" /><span className="break-all">{basics.linkedin}</span></div>}
                {basics.github && <div className="flex items-center gap-2"><Github className="size-3 shrink-0" /><span className="break-all">{basics.github}</span></div>}
                {basics.telegram && <div className="flex items-center gap-2"><Send className="size-3 shrink-0" /><span className="break-all">{basics.telegram}</span></div>}
              </div>
            </div>
          </>
        )}

        {sidebarOrder.map(key => {
          const node = sidebarRenderers[key]?.();
          return node ? <Fragment key={key}>{node}</Fragment> : null;
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1" style={{ padding: mainPadding }}>
        {mainOrder.map(key => {
          const node = mainRenderers[key]?.();
          return node ? <Fragment key={key}>{node}</Fragment> : null;
        })}
      </div>
    </div>
  );
}
