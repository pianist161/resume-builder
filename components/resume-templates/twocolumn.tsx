import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Send } from "lucide-react";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

const LEFT_SECTIONS = new Set<SectionKey>(["experience", "projects"]);
const RIGHT_SECTIONS = new Set<SectionKey>(["education", "skills", "languages", "certifications"]);

export function TwoColumnTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;
  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];
  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basics: () =>
      sectionVisibility.basics ? (
        <div className="overflow-hidden">
          <div className="flex items-center gap-3">
            {designSettings.showPhoto && basics.photo && (
              <img src={basics.photo} alt="" className="size-12 shrink-0 rounded-full object-cover" />
            )}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-zinc-900 break-words">{basics.name}</h1>
              <p className="mt-0.5 text-base" style={{ color: accent }}>{basics.title}</p>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><Mail className="size-3 shrink-0" />{basics.email}</span>
            <span className="flex items-center gap-1"><Phone className="size-3 shrink-0" />{basics.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="size-3 shrink-0" />{basics.location}</span>
            {basics.website && <span className="flex items-center gap-1 break-all"><Globe className="size-3 shrink-0" />{basics.website}</span>}
            {basics.linkedin && <span className="flex items-center gap-1 break-all"><Linkedin className="size-3 shrink-0" />{basics.linkedin}</span>}
            {basics.github && <span className="flex items-center gap-1 break-all"><Github className="size-3 shrink-0" />{basics.github}</span>}
            {basics.telegram && <span className="flex items-center gap-1 break-all"><Send className="size-3 shrink-0" />{basics.telegram}</span>}
          </div>
        </div>
      ) : null,

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
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className="overflow-hidden">
                <p className="font-semibold text-zinc-900 truncate">{exp.position}</p>
                <p className="text-xs text-zinc-500 truncate">{exp.company}</p>
                <p className="text-[10px] text-zinc-400">{exp.startDate} — {exp.endDate}</p>
                <p className="mt-1 leading-relaxed text-zinc-600 break-words overflow-hidden text-xs">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    education: () =>
      sectionVisibility.education && education.length > 0 ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Образование</h2>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div key={i} className="overflow-hidden">
                <p className="font-semibold text-zinc-900 text-xs truncate">{edu.degree}</p>
                <p className="text-xs text-zinc-500 truncate">{edu.institution}</p>
                <p className="text-[10px] text-zinc-400">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    skills: () =>
      sectionVisibility.skills && skills.length > 0 ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Навыки</h2>
          <div className="space-y-1.5">
            {skills.map((group, i) => (
              <div key={i}>
                <p className="text-[10px] font-medium text-zinc-500">{group.category}</p>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full px-1.5 py-0.5 text-[9px] font-medium" style={{ backgroundColor: accent + "15", color: accent }}>{item}</span>
                  ))}
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
                    <span key={tech} className="rounded-full px-1.5 py-0.5 text-[9px]" style={{ backgroundColor: accent + "15", color: accent }}>{tech}</span>
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
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Языки</h2>
          <div className="space-y-0.5">
            {languages.map((lang, i) => (
              <div key={i} className="flex justify-between text-xs text-zinc-600">
                <span className="font-medium text-zinc-700">{lang.language}</span>
                <span className="text-zinc-400">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    certifications: () =>
      sectionVisibility.certifications && certifications.length > 0 ? (
        <div>
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Сертификаты</h2>
          <div className="space-y-1">
            {certifications.map((cert, i) => (
              <div key={i}>
                <p className="font-medium text-zinc-900 text-xs">{cert.name}</p>
                <p className="text-[10px] text-zinc-400">{cert.organization}, {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null,
  };

  const topSections = order.filter(k => k === "basics" || k === "summary");
  const leftSections = order.filter(k => LEFT_SECTIONS.has(k));
  const rightSections = order.filter(k => RIGHT_SECTIONS.has(k));

  return (
    <div
      style={{
        fontFamily: fontFamilyMap[designSettings.fontFamily],
        fontSize: fontSizeMap[designSettings.fontSize],
        lineHeight: lineSpacingMap[designSettings.lineSpacing],
        padding: marginsMap[designSettings.margins],
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: sSpacing }}>
        {topSections.map((key) => {
          const node = sectionRenderers[key]?.();
          return node ? <Fragment key={key}>{node}</Fragment> : null;
        })}
      </div>

      <div style={{ display: "flex", gap: "24px", marginTop: sSpacing }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: sSpacing }}>
          {leftSections.map((key) => {
            const node = sectionRenderers[key]?.();
            return node ? <Fragment key={key}>{node}</Fragment> : null;
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: sSpacing }}>
          {rightSections.map((key) => {
            const node = sectionRenderers[key]?.();
            return node ? <Fragment key={key}>{node}</Fragment> : null;
          })}
        </div>
      </div>
    </div>
  );
}
