import type { Metadata } from "next";
import { EditorLayout } from "@/components/editor/editor-layout";

export const metadata: Metadata = {
  title: "Редактор резюме — Resume Builder",
  description: "Создайте и отредактируйте своё резюме в удобном онлайн-редакторе.",
  openGraph: {
    title: "Редактор резюме — Resume Builder",
    description: "Создайте и отредактируйте своё резюме в удобном онлайн-редакторе.",
    type: "website",
  },
};

export default function EditorPage() {
  return <EditorLayout />;
}
