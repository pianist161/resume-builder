import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { ResumePreview } from "@/components/landing/resume-preview";

export const metadata: Metadata = {
  title: "Resume Builder — Конструктор резюме",
  description: "Создайте профессиональное резюме за минуты. Бесплатный онлайн-конструктор с готовыми шаблонами.",
  openGraph: {
    title: "Resume Builder — Конструктор резюме",
    description: "Создайте профессиональное резюме за минуты. Бесплатный онлайн-конструктор с готовыми шаблонами.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <ResumePreview />
      </main>
      <Footer />
    </div>
  );
}
