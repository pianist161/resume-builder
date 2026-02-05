"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { ExportPreview } from "@/components/export/export-preview";
import { ExportOptions } from "@/components/export/export-options";

export default function ExportPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/editor">
              <ArrowLeft className="size-4" />
              Назад к редактору
            </Link>
          </Button>
          <div className="h-6 w-px bg-zinc-200" />
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-blue-600" />
            <span className="text-sm font-medium">Экспорт</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <ExportPreview />
        <ExportOptions />
      </div>
    </div>
  );
}
