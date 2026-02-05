import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey } from "@/lib/types";
import {
  Mail, Phone, MapPin, Globe, Briefcase, GraduationCap,
  Code2, FolderOpen, Languages, Award, Linkedin, Github, Send,
} from "lucide-react";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

export function CreativeTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;

  const padding = marginsMap[designSettings.margins];
  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];

  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basics: () => null,

    summary: () => {
      if (!sectionVisibility.summary || !summary) return null;
      return (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <Briefcase className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>О себе</h2>
          </div>
          <p className="leading-relaxed text-zinc-600 break-words overflow-hidden">{summary}</p>
        </div>
      );
    },

    experience: () => {
      if (!sectionVisibility.experience || experience.length === 0) return null;
      return (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <Briefcase className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Опыт работы</h2>
          </div>
          <div className="space-y-4 pl-4" style={{ borderLeft: `2px solid ${accent}30` }}>
            {experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-1 size-2.5 rounded-full" style={{ backgroundColor: accent }} />
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{exp.position}</p>
                    <p className="text-xs truncate" style={{ color: accent }}>{exp.company}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-zinc-600 break-words overflow-hidden">{exp.description}</p>
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
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <GraduationCap className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Образование</h2>
          </div>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="rounded-lg border p-3 overflow-hidden" style={{ borderColor: accent + "20", backgroundColor: accent + "08" }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{edu.degree}</p>
                    <p className="text-xs text-zinc-500 truncate">{edu.institution}</p>
                  </div>
                  <p className="text-xs text-zinc-400">{edu.startDate} — {edu.endDate}</p>
                </div>
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
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <Code2 className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Навыки</h2>
          </div>
          <div className="space-y-2">
            {skills.map((group, i) => (
              <div key={i}>
                <p className="mb-1 text-xs font-medium text-zinc-500">{group.category}</p>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: accent + "30", backgroundColor: accent + "10", color: accent }}>{item}</span>
                  ))}
                </div>
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
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <FolderOpen className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Проекты</h2>
          </div>
          <div className="space-y-2">
            {projects.map((p, i) => (
              <div key={i}>
                <p className="font-medium text-zinc-900">{p.name}</p>
                <p className="text-[10px] text-zinc-500">{p.technologies.join(" · ")}</p>
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
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <Languages className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Языки</h2>
          </div>
          <div className="space-y-1 text-xs">
            {languages.map((l, i) => (
              <div key={i} className="flex justify-between text-zinc-600">
                <span>{l.language}</span>
                <span className="text-zinc-400">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },

    certifications: () => {
      if (!sectionVisibility.certifications || certifications.length === 0) return null;
      return (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded" style={{ backgroundColor: accent + "20" }}>
              <Award className="size-3" style={{ color: accent }} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Сертификаты</h2>
          </div>
          <div className="space-y-1 text-xs">
            {certifications.map((c, i) => (
              <div key={i}>
                <p className="font-medium text-zinc-700">{c.name}</p>
                <p className="text-[10px] text-zinc-400">{c.organization}</p>
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
      }}
    >
      {sectionVisibility.basics && (
        <div className="text-white overflow-hidden" style={{ background: `linear-gradient(to right, ${accent}, ${accent}dd)`, padding }}>
          <div className="flex items-center gap-4">
            {designSettings.showPhoto && basics.photo ? (
              <img src={basics.photo} alt="" className="size-16 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                {basics.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-xl font-bold break-words">{basics.name}</h1>
              <p className="opacity-80 truncate">{basics.title}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs opacity-80">
                <span className="flex items-center gap-1"><Mail className="size-3" />{basics.email}</span>
                <span className="flex items-center gap-1"><Phone className="size-3" />{basics.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" />{basics.location}</span>
                {basics.website && <span className="flex items-center gap-1"><Globe className="size-3" />{basics.website}</span>}
                {basics.linkedin && <span className="flex items-center gap-1"><Linkedin className="size-3" />{basics.linkedin}</span>}
                {basics.github && <span className="flex items-center gap-1"><Github className="size-3" />{basics.github}</span>}
                {basics.telegram && <span className="flex items-center gap-1"><Send className="size-3" />{basics.telegram}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding, display: "flex", flexDirection: "column", gap: sSpacing }}>
        {order.filter(k => k !== "basics").map(key => {
          const node = sectionRenderers[key]?.();
          return node ? <Fragment key={key}>{node}</Fragment> : null;
        })}
      </div>
    </div>
  );
}
