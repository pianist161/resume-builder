import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  TabStopPosition,
  TabStopType,
} from "docx";
import type { ResumeData, DesignSettings, SectionVisibility, SectionKey } from "./types";
import { DEFAULT_SECTION_ORDER } from "./types";

const fontFamilyDocx: Record<string, string> = {
  inter: "Calibri",
  georgia: "Georgia",
  roboto: "Arial",
};

const fontSizeDocx: Record<string, number> = {
  small: 20, // 10pt in half-points
  medium: 22, // 11pt
  large: 24, // 12pt
};

export async function generateDocx(
  data: ResumeData,
  sectionVisibility: SectionVisibility,
  sectionOrder: SectionKey[],
  designSettings: DesignSettings
): Promise<Blob> {
  const { basics, summary, experience, education, skills, projects, languages, certifications } = data;
  const font = fontFamilyDocx[designSettings.fontFamily] || "Calibri";
  const fontSize = fontSizeDocx[designSettings.fontSize] || 22;
  const accent = designSettings.accentColor;
  const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

  const children: Paragraph[] = [];

  const sectionBuilders: Record<SectionKey, () => void> = {
    basics: () => {
      if (!sectionVisibility.basics) return;
      if (designSettings.showPhoto && basics.photo) {
        try {
          const base64Data = basics.photo.split(",")[1];
          if (base64Data) {
            const binaryStr = atob(base64Data);
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [
                  new ImageRun({
                    data: bytes,
                    transformation: { width: 80, height: 80 },
                    type: "jpg",
                  }),
                ],
              })
            );
          }
        } catch {
          // skip photo on error
        }
      }
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({ text: basics.name, bold: true, size: fontSize + 10, font }),
          ],
        })
      );
      if (basics.title) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({ text: basics.title, size: fontSize, font, color: accent.replace("#", "") }),
            ],
          })
        );
      }
      const contactParts: string[] = [];
      if (basics.email) contactParts.push(basics.email);
      if (basics.phone) contactParts.push(basics.phone);
      if (basics.location) contactParts.push(basics.location);
      if (basics.website) contactParts.push(basics.website);
      if (basics.linkedin) contactParts.push(basics.linkedin);
      if (basics.github) contactParts.push(basics.github);
      if (basics.telegram) contactParts.push(basics.telegram);
      if (contactParts.length > 0) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: contactParts.join("  |  "), size: fontSize - 4, font, color: "666666" }),
            ],
          })
        );
      }
    },

    summary: () => {
      if (!sectionVisibility.summary || !summary) return;
      addSectionHeading("О СЕБЕ");
      children.push(
        new Paragraph({
          spacing: { after: 160 },
          children: [new TextRun({ text: summary, size: fontSize, font })],
        })
      );
    },

    experience: () => {
      if (!sectionVisibility.experience || experience.length === 0) return;
      addSectionHeading("ОПЫТ РАБОТЫ");
      experience.forEach((exp) => {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: exp.position, bold: true, size: fontSize, font }),
              new TextRun({ text: "\t", size: fontSize, font }),
              new TextRun({ text: `${exp.startDate} — ${exp.endDate}`, size: fontSize - 4, font, color: "999999" }),
            ],
          })
        );
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: exp.company, italics: true, size: fontSize, font, color: "555555" }),
            ],
          })
        );
        if (exp.description) {
          children.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [new TextRun({ text: exp.description, size: fontSize, font })],
            })
          );
        }
      });
    },

    education: () => {
      if (!sectionVisibility.education || education.length === 0) return;
      addSectionHeading("ОБРАЗОВАНИЕ");
      education.forEach((edu) => {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: edu.degree, bold: true, size: fontSize, font }),
              new TextRun({ text: "\t", size: fontSize, font }),
              new TextRun({ text: `${edu.startDate} — ${edu.endDate}`, size: fontSize - 4, font, color: "999999" }),
            ],
          })
        );
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: edu.institution, italics: true, size: fontSize, font, color: "555555" }),
            ],
          })
        );
        if (edu.description) {
          children.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [new TextRun({ text: edu.description, size: fontSize, font })],
            })
          );
        }
      });
    },

    skills: () => {
      if (!sectionVisibility.skills || skills.length === 0) return;
      addSectionHeading("НАВЫКИ");
      skills.forEach((group) => {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: `${group.category}: `, bold: true, size: fontSize, font }),
              new TextRun({ text: group.items.join(", "), size: fontSize, font }),
            ],
          })
        );
      });
    },

    projects: () => {
      if (!sectionVisibility.projects || projects.length === 0) return;
      addSectionHeading("ПРОЕКТЫ");
      projects.forEach((project) => {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({ text: project.name, bold: true, size: fontSize, font }),
            ],
          })
        );
        if (project.description) {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              children: [new TextRun({ text: project.description, size: fontSize, font })],
            })
          );
        }
        if (project.technologies.length > 0) {
          children.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({ text: "Технологии: ", italics: true, size: fontSize - 2, font, color: "666666" }),
                new TextRun({ text: project.technologies.join(", "), size: fontSize - 2, font, color: "666666" }),
              ],
            })
          );
        }
      });
    },

    languages: () => {
      if (!sectionVisibility.languages || languages.length === 0) return;
      addSectionHeading("ЯЗЫКИ");
      languages.forEach((lang) => {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `${lang.language} — ${lang.level}`, size: fontSize, font }),
            ],
          })
        );
      });
    },

    certifications: () => {
      if (!sectionVisibility.certifications || certifications.length === 0) return;
      addSectionHeading("СЕРТИФИКАТЫ");
      certifications.forEach((cert) => {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({ text: cert.name, bold: true, size: fontSize, font }),
            ],
          })
        );
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: `${cert.organization}, ${cert.date}`, size: fontSize - 2, font, color: "666666" }),
            ],
          })
        );
      });
    },
  };

  function addSectionHeading(title: string) {
    children.push(
      new Paragraph({
        spacing: { before: 240, after: 80 },
        border: {
          bottom: {
            color: accent.replace("#", ""),
            space: 4,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        children: [
          new TextRun({
            text: title,
            bold: true,
            size: fontSize + 2,
            font,
            color: accent.replace("#", ""),
            allCaps: true,
          }),
        ],
      })
    );
  }

  for (const key of order) {
    sectionBuilders[key]?.();
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4 in twentieths of a point
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}
