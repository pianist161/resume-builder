import type {
  ResumeData,
  DesignSettings,
  SectionVisibility,
  SectionKey,
  FontFamily,
  FontSize,
  LineSpacing,
  SectionSpacing,
  PageMargins,
} from "./types";

export const fontFamilyMap: Record<FontFamily, string> = {
  inter: "'Inter', sans-serif",
  georgia: "'Georgia', serif",
  roboto: "'Roboto', sans-serif",
};

export const fontSizeMap: Record<FontSize, string> = {
  small: "12px",
  medium: "14px",
  large: "16px",
};

export const lineSpacingMap: Record<LineSpacing, string> = {
  compact: "1.3",
  normal: "1.5",
  relaxed: "1.8",
};

export const sectionSpacingMap: Record<SectionSpacing, string> = {
  compact: "12px",
  normal: "20px",
  relaxed: "28px",
};

export const marginsMap: Record<PageMargins, string> = {
  narrow: "24px",
  normal: "32px",
  wide: "48px",
};

export interface TemplateProps {
  data: ResumeData;
  designSettings: DesignSettings;
  sectionVisibility: SectionVisibility;
  sectionOrder?: SectionKey[];
}
