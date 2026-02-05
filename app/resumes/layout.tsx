import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мои резюме — Resume Builder",
  description: "Управляйте своими резюме: создавайте, редактируйте и удаляйте.",
};

export default function ResumesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
