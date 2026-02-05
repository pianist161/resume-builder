"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "@/lib/store";
import { templateComponents } from "@/lib/template-registry";

const A4_WIDTH = 595;

export function ResumePreviewPanel() {
  const resume = useResumeStore((s) => s.resume);
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const designSettings = useResumeStore((s) => s.designSettings);
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const zoomLevel = useResumeStore((s) => s.zoomLevel);
  const zoomIn = useResumeStore((s) => s.zoomIn);
  const zoomOut = useResumeStore((s) => s.zoomOut);
  const setZoomLevel = useResumeStore((s) => s.setZoomLevel);

  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.5);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width - 64;
        const computed = Math.min(width / A4_WIDTH, 1);
        setAutoScale(Math.max(0.3, computed));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const effectiveScale = manualOverride ? zoomLevel / 100 : autoScale;

  const handleZoomIn = useCallback(() => {
    setManualOverride(true);
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    setManualOverride(true);
    zoomOut();
  }, [zoomOut]);

  const handleSliderChange = useCallback(([v]: number[]) => {
    setManualOverride(true);
    setZoomLevel(v);
  }, [setZoomLevel]);

  const handleResetZoom = useCallback(() => {
    setManualOverride(false);
  }, []);

  const Template = templateComponents[selectedTemplate];

  return (
    <div className="flex h-full flex-col bg-zinc-100 dark:bg-zinc-900">
      <div ref={containerRef} className="flex-1 overflow-auto p-4 md:p-8">
        <div className="mx-auto" style={{ width: `${A4_WIDTH}px`, maxWidth: "100%" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTemplate}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div
                id="resume-print-area"
                className="bg-white shadow-lg origin-top-left print:shadow-none print:border-0"
                style={{
                  width: `${A4_WIDTH}px`,
                  minHeight: "842px",
                  transform: `scale(${effectiveScale})`,
                  transformOrigin: "top left",
                }}
              >
                <Template data={resume} designSettings={designSettings} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="no-print flex items-center justify-center gap-3 border-t bg-white px-4 py-2 dark:bg-zinc-950 dark:border-zinc-800">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-xs" onClick={handleZoomOut} aria-label="Уменьшить масштаб">
              <Minus className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Уменьшить</TooltipContent>
        </Tooltip>
        <Slider
          value={[manualOverride ? zoomLevel : Math.round(autoScale * 100)]}
          onValueChange={handleSliderChange}
          min={30}
          max={200}
          step={10}
          className="w-32"
          aria-label="Масштаб предпросмотра"
        />
        <span className="min-w-[3rem] text-center text-xs text-zinc-600 dark:text-zinc-400">
          {manualOverride ? zoomLevel : Math.round(autoScale * 100)}%
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-xs" onClick={handleZoomIn} aria-label="Увеличить масштаб">
              <Plus className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Увеличить</TooltipContent>
        </Tooltip>
        {manualOverride && (
          <Button variant="ghost" size="xs" onClick={handleResetZoom} className="text-xs text-zinc-500">
            Авто
          </Button>
        )}
      </div>
    </div>
  );
}
