import type { ResumeData, DesignSettings, SectionVisibility } from "@/lib/types";

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

export function ClassicTemplate({ data, designSettings, sectionVisibility }: Props) {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;

  return (
    <div
      className="p-8"
      style={{
        fontFamily: designSettings.fontFamily === "inter" ? "'Times New Roman', 'Georgia', serif" : fontFamilyMap[designSettings.fontFamily],
        fontSize: fontSizeMap[designSettings.fontSize],
      }}
    >
      {sectionVisibility.basics && (
        <div className="border-b-2 border-zinc-800 pb-3 text-center overflow-hidden">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-zinc-900 break-words">{basics.name}</h1>
          <p className="mt-1 text-zinc-600 truncate">{basics.title}</p>
          <p className="mt-1 text-xs text-zinc-500 break-words">
            {basics.email} &bull; {basics.phone} &bull; {basics.location} &bull; {basics.website}
          </p>
        </div>
      )}

      {sectionVisibility.summary && summary && (
        <div className="mt-4">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Профессиональный профиль</h2>
          <p className="mt-2 leading-relaxed text-zinc-700 break-words overflow-hidden">{summary}</p>
        </div>
      )}

      {sectionVisibility.experience && experience.length > 0 && (
        <div className="mt-4">
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
      )}

      {sectionVisibility.education && education.length > 0 && (
        <div className="mt-4">
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
      )}

      {sectionVisibility.skills && skills.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Навыки</h2>
          <div className="space-y-1">
            {skills.map((group, i) => (
              <p key={i} className="text-zinc-700">
                <span className="font-bold">{group.category}:</span> {group.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      )}

      {sectionVisibility.projects && projects.length > 0 && (
        <div className="mt-4">
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
      )}

      <div className="mt-4 grid grid-cols-2 gap-4">
        {sectionVisibility.languages && languages.length > 0 && (
          <div>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-zinc-800 border-b border-zinc-300 pb-0.5">Языки</h2>
            <div className="mt-1 space-y-0.5">
              {languages.map((lang, i) => (
                <p key={i} className="text-zinc-700">{lang.language} — {lang.level}</p>
              ))}
            </div>
          </div>
        )}
        {sectionVisibility.certifications && certifications.length > 0 && (
          <div>
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
        )}
      </div>
    </div>
  );
}
