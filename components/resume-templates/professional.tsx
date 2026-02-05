import type { ResumeData, DesignSettings, SectionVisibility } from "@/lib/types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const fontFamilyMap = {
  inter: "'Inter', sans-serif",
  georgia: "'Georgia', serif",
  roboto: "'Roboto', sans-serif",
};
const fontSizeMap = { small: "12px", medium: "14px", large: "16px" };

interface Props {
  data: ResumeData;
  designSettings: DesignSettings;
  sectionVisibility: SectionVisibility;
}

export function ProfessionalTemplate({ data, designSettings, sectionVisibility }: Props) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const accent = designSettings.accentColor;

  return (
    <div
      className="flex h-full"
      style={{
        fontFamily: fontFamilyMap[designSettings.fontFamily],
        fontSize: fontSizeMap[designSettings.fontSize],
      }}
    >
      {/* Sidebar */}
      <div className="w-[35%] bg-zinc-800 p-6 text-white overflow-hidden">
        {sectionVisibility.basics && (
          <>
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-zinc-600 text-2xl font-bold text-zinc-300">
              {basics.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h1 className="mb-1 text-center text-lg font-bold break-words">{basics.name}</h1>
            <p className="mb-6 text-center text-xs truncate" style={{ color: accent }}>{basics.title}</p>
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Контакты</h2>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2"><Mail className="size-3 shrink-0" /><span className="break-all">{basics.email}</span></div>
                <div className="flex items-center gap-2"><Phone className="size-3 shrink-0" /><span>{basics.phone}</span></div>
                <div className="flex items-center gap-2"><MapPin className="size-3 shrink-0" /><span>{basics.location}</span></div>
                <div className="flex items-center gap-2"><Globe className="size-3 shrink-0" /><span className="break-all">{basics.website}</span></div>
              </div>
            </div>
          </>
        )}

        {sectionVisibility.skills && skills.length > 0 && (
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
        )}

        {sectionVisibility.languages && languages.length > 0 && (
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
        )}

        {sectionVisibility.certifications && certifications.length > 0 && (
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
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {sectionVisibility.summary && summary && (
          <div className="mb-5">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>О себе</h2>
            <p className="leading-relaxed text-zinc-600 break-words overflow-hidden">{summary}</p>
          </div>
        )}

        {sectionVisibility.experience && experience.length > 0 && (
          <div className="mb-5">
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
        )}

        {sectionVisibility.education && education.length > 0 && (
          <div className="mb-5">
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
        )}

        {sectionVisibility.projects && projects.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
