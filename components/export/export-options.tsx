"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Download, FileJson, FileText, File, Info, Loader2 } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { templateMeta } from "@/lib/template-registry";
import { toast } from "sonner";
import type { ExportFormat } from "@/lib/types";

export function ExportOptions() {
  const resume = useResumeStore((s) => s.resume);
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const [format, setFormat] = useState<ExportFormat>("pdf");
  const [fileName, setFileName] = useState(
    () => `${resume.basics.name.replace(/\s+/g, "_")}_Resume`
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadJSON = () => {
    setIsDownloading(true);
    try {
      const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("JSON файл скачан");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
    toast.info("Диалог печати открыт");
  };

  const handleDownload = () => {
    if (isDownloading) return;
    if (format === "json") {
      handleDownloadJSON();
    } else {
      handleDownloadPDF();
    }
  };

  return (
    <div className="w-full border-t md:border-t-0 md:w-[340px] md:border-l bg-white p-6 dark:bg-zinc-950 dark:border-zinc-800">
      <h2 className="mb-6 text-lg font-bold text-zinc-900 dark:text-zinc-100">Экспорт резюме</h2>

      <div className="mb-6">
        <Label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Формат</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
              format === "pdf"
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
            }`}
            onClick={() => setFormat("pdf")}
            aria-pressed={format === "pdf"}
            aria-label="Формат PDF"
          >
            <FileText className="size-4" />
            PDF
          </button>
          <button
            className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
              format === "json"
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
            }`}
            onClick={() => setFormat("json")}
            aria-pressed={format === "json"}
            aria-label="Формат JSON"
          >
            <FileJson className="size-4" />
            JSON
          </button>
        </div>
      </div>

      {format === "pdf" && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
          <Info className="mt-0.5 size-4 shrink-0 text-blue-600" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            В диалоге печати выберите &laquo;Сохранить как PDF&raquo;, чтобы скачать файл. Убедитесь, что поля (margins) установлены на &laquo;Нет&raquo;.
          </p>
        </div>
      )}

      <div className="mb-6">
        <Label htmlFor="filename" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Имя файла
        </Label>
        <Input
          id="filename"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>

      <Separator className="my-6" />

      <div className="mb-6 space-y-3">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Параметры документа</h3>
        <div className="rounded-lg bg-zinc-50 p-3 space-y-2 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Формат</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">A4 (210 x 297 мм)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Размер</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">~125 KB</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Шаблон</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{templateMeta[selectedTemplate].name}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Страниц</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">1</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-3">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          Скачать {format.toUpperCase()}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={format === "pdf" ? handleDownloadJSON : handleDownloadPDF}
          disabled={isDownloading}
        >
          <File className="size-4" />
          Скачать {format === "pdf" ? "JSON" : "PDF"}
        </Button>
      </div>
    </div>
  );
}
