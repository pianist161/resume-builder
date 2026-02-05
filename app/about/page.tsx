import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FileText, Palette, Eye, Download, Sparkles, Save, Undo2, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "О проекте — Resume Builder",
  description: "Resume Builder — демо-проект конструктора резюме с живым предпросмотром, экспортом в PDF и AI подсказками.",
};

const features = [
  { icon: Palette, title: "4 шаблона", desc: "Modern, Professional, Creative и Classic на любой вкус" },
  { icon: Eye, title: "Live-preview", desc: "Мгновенный предпросмотр изменений в реальном времени" },
  { icon: Download, title: "PDF / JSON экспорт", desc: "Скачивайте резюме в PDF одним кликом или экспортируйте данные в JSON" },
  { icon: Sparkles, title: "AI подсказки", desc: "Умные рекомендации для улучшения текста резюме" },
  { icon: Save, title: "Автосохранение", desc: "Данные сохраняются автоматически в браузере" },
  { icon: Undo2, title: "Undo / Redo", desc: "Отменяйте и возвращайте изменения без потери данных" },
];

const techBadges = [
  "Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4",
  "Zustand", "Framer Motion", "Radix UI", "Shadcn/ui",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-100 mb-6">
              <FileText className="size-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              О проекте ResumeBuilder
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Демо-проект онлайн-конструктора резюме с современным стеком технологий,
              живым предпросмотром и экспортом в PDF.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-2xl font-bold">Возможности</h2>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border bg-white p-5 shadow-sm">
                  <f.icon className="mb-3 size-6 text-blue-600" />
                  <h3 className="mb-1 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-t bg-zinc-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-2xl font-bold">Технологии</h2>
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
              {techBadges.map((t) => (
                <span
                  key={t}
                  className="rounded-full border bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" className="scroll-mt-24 border-t py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold">Контакты</h2>
            <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
              Если у вас есть вопросы или предложения по проекту, свяжитесь со мной.
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Mail className="size-4" />
              Написать письмо
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
