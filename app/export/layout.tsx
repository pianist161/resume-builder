import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Экспорт резюме — Resume Builder",
  description: "Скачайте готовое резюме в формате PDF или JSON.",
  openGraph: {
    title: "Экспорт резюме — Resume Builder",
    description: "Скачайте готовое резюме в формате PDF или JSON.",
    type: "website",
  },
};

export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
