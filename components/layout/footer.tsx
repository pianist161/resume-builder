"use client";

import { FileText } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const handleDeadLink = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Раздел в разработке");
  };

  return (
    <footer className="border-t bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-blue-600" />
            <span className="font-semibold">ResumeBuilder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2025 ResumeBuilder. Создано для демонстрации.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" onClick={handleDeadLink} className="hover:text-foreground transition-colors">
              О проекте
            </a>
            <a href="#" onClick={handleDeadLink} className="hover:text-foreground transition-colors">
              Контакты
            </a>
            <a href="#" onClick={handleDeadLink} className="hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
