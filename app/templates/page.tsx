import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TemplateGrid } from "@/components/templates/template-grid";

export const metadata: Metadata = {
  title: "Шаблоны резюме — Resume Builder",
  description: "Выберите один из профессиональных шаблонов резюме: Modern, Professional, Creative или Classic.",
  openGraph: {
    title: "Шаблоны резюме — Resume Builder",
    description: "Выберите один из профессиональных шаблонов резюме: Modern, Professional, Creative или Classic.",
    type: "website",
  },
};

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-zinc-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold text-zinc-900">
              Выберите шаблон
            </h1>
            <p className="text-lg text-zinc-600">
              Выберите подходящий дизайн и начните создавать своё резюме
            </p>
          </div>
          <TemplateGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
