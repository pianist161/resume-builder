import { Fragment } from "react";
import { DEFAULT_SECTION_ORDER } from "@/lib/types";
import type { SectionKey } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Send } from "lucide-react";
import {
  fontFamilyMap, fontSizeMap, lineSpacingMap, sectionSpacingMap, marginsMap,
  type TemplateProps,
} from "@/lib/template-constants";

const languageLevelPercent: Record<string, number> = {
  A1: 17, A2: 33, B1: 50, B2: 67, C1: 83, C2: 92,
  "Родной": 100, "Native": 100, "Носитель": 100,
};

function getLanguagePercent(level: string): number {
  return languageLevelPercent[level] ?? 50;
}

export function InfographicTemplate({ data, designSettings, sectionVisibility, sectionOrder }: TemplateProps) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;
  const padding = marginsMap[designSettings.margins];
  const sSpacing = sectionSpacingMap[designSettings.sectionSpacing];
  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basics: () => null,

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
          <div className="relative" style={{ paddingLeft: "20px" }}>
            <div className="absolute left-[5px] top-1 bottom-1" style={{ width: "2px", backgroundColor: accent + "30" }} />
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="relative overflow-hidden">
                  <div className="absolute -left-[17px] top-1.5" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: accent, border: "2px solid white", boxShadow: `0 0 0 2px ${accent}40` }} />
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-zinc-900 truncate">{exp.position}</p>
                      <p className="text-xs" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] text-zinc-500" style={{ backgroundColor: accent + "10" }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="mt-1 leading-relaxed text-zinc-600 break-words overflow-hidden">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null,

    education: () =>
      sectionVisibility.education && education.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Образование</h2>
          <div className="relative" style={{ paddingLeft: "20px" }}>
            <div className="absolute left-[5px] top-1 bottom-1" style={{ width: "2px", backgroundColor: accent + "30" }} />
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="relative overflow-hidden">
                  <div className="absolute -left-[17px] top-1.5" style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: accent, border: "2px solid white", boxShadow: `0 0 0 2px ${accent}40` }} />
                  <p className="font-semibold text-zinc-900 truncate">{edu.degree}</p>
                  <p className="text-xs text-zinc-500 truncate">{edu.institution}</p>
                  <p className="text-[10px] text-zinc-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null,

    skills: () =>
      sectionVisibility.skills && skills.length > 0 ? (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Навыки</h2>
          <div className="space-y-2.5">
            {skills.map((group, i) => (
              <div key={i}>
                <p className="mb-1.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wide">{group.category}</p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-20 shrink-0 text-xs text-zinc-700 truncate">{item}</span>
                      <div className="flex-1 rounded-full" style={{ height: "6px", backgroundColor: accent + "15" }}>
                        <div className="rounded-full" style={{ height: "6px", width: "80%", backgroundColor: accent, transition: "width 0.3s ease" }} />
                      </div>
                    </div>
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
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Проекты</h2>
          <div className="space-y-2">
            {projects.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-lg border p-2.5" style={{ borderColor: accent + "20" }}>
                <p className="font-semibold text-zinc-900 truncate">{p.name}</p>
                <p className="text-xs text-zinc-600 break-words overflow-hidden">{p.description}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.technologies.map((tech) => (
                    <span key={tech} className="rounded-full px-1.5 py-0.5 text-[9px] font-medium" style={{ backgroundColor: accent + "15", color: accent }}>{tech}</span>
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
          <div className="space-y-1.5">
            {languages.map((lang, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-xs text-zinc-700">{lang.language}</span>
                <div className="flex-1 rounded-full" style={{ height: "6px", backgroundColor: accent + "15" }}>
                  <div className="rounded-full" style={{ height: "6px", width: `${getLanguagePercent(lang.level)}%`, backgroundColor: accent, transition: "width 0.3s ease" }} />
                </div>
                <span className="text-[10px] text-zinc-400 w-8 text-right">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    certifications: () =>
      sectionVisibility.certifications && certifications.length > 0 ? (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Сертификаты</h2>
          <div className="space-y-1.5">
            {certifications.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="mt-1.5 shrink-0" style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: accent }} />
                <div>
                  <p className="font-medium text-zinc-900 text-xs">{c.name}</p>
                  <p className="text-[10px] text-zinc-400">{c.organization}, {c.date}</p>
                </div>
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
      {sectionVisibility.basics && (
        <div className="text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, padding }}>
          <div className="flex items-center gap-4">
            {designSettings.showPhoto && basics.photo ? (
              <img src={basics.photo} alt="" className="size-14 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-bold" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
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
