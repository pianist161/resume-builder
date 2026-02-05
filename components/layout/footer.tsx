import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-blue-600" />
            <span className="font-semibold">ResumeBuilder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 ResumeBuilder. Создано для демонстрации.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              О проекте
            </Link>
            <Link href="/about#contacts" className="hover:text-foreground transition-colors">
              Контакты
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
