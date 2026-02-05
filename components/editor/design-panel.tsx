"use client";

import { useState } from "react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Palette } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import type { FontFamily, FontSize } from "@/lib/types";
import { toast } from "sonner";

const accentColors = [
  { name: "Blue", value: "#2563eb" },
  { name: "Emerald", value: "#059669" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Rose", value: "#e11d48" },
  { name: "Orange", value: "#ea580c" },
  { name: "Slate", value: "#475569" },
  { name: "Cyan", value: "#0891b2" },
  { name: "Amber", value: "#d97706" },
  { name: "Pink", value: "#db2777" },
  { name: "Indigo", value: "#4f46e5" },
];

const fontLabels: Record<FontFamily, string> = {
  inter: "Inter",
  georgia: "Georgia",
  roboto: "Roboto",
};

const sizeLabels: Record<FontSize, string> = {
  small: "Мелкий",
  medium: "Средний",
  large: "Крупный",
};

export function DesignPanel() {
  const accentColor = useResumeStore((s) => s.designSettings.accentColor);
  const fontFamily = useResumeStore((s) => s.designSettings.fontFamily);
  const fontSize = useResumeStore((s) => s.designSettings.fontSize);
  const setAccentColor = useResumeStore((s) => s.setAccentColor);
  const setFontFamily = useResumeStore((s) => s.setFontFamily);
  const setFontSize = useResumeStore((s) => s.setFontSize);
  const [showCustomColor, setShowCustomColor] = useState(false);

  const isPresetColor = accentColors.some((c) => c.value === accentColor);

  return (
    <div className="flex flex-wrap items-center gap-3 border-t bg-white px-4 py-2.5 md:gap-4 dark:bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Цвет:</span>
        <div className="flex flex-wrap gap-1">
          {accentColors.map((color) => (
            <Tooltip key={color.name}>
              <TooltipTrigger asChild>
                <button
                  className="size-5 rounded-full border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: color.value,
                    borderColor: accentColor === color.value ? color.value : "transparent",
                    boxShadow: accentColor === color.value ? `0 0 0 2px var(--color-background, white), 0 0 0 4px ${color.value}` : "none",
                  }}
                  onClick={() => {
                    setAccentColor(color.value);
                    setShowCustomColor(false);
                  }}
                  aria-label={`Цвет: ${color.name}`}
                  aria-pressed={accentColor === color.value}
                />
              </TooltipTrigger>
              <TooltipContent>{color.name}</TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex size-5 items-center justify-center rounded-full border-2 transition-all hover:scale-110"
                style={{
                  borderColor: !isPresetColor && !showCustomColor ? accentColor : "transparent",
                  boxShadow: !isPresetColor ? `0 0 0 2px var(--color-background, white), 0 0 0 4px ${accentColor}` : "none",
                  backgroundColor: !isPresetColor ? accentColor : undefined,
                }}
                onClick={() => setShowCustomColor(!showCustomColor)}
                aria-label="Свой цвет"
              >
                {isPresetColor && <Palette className="size-3 text-zinc-400" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>Свой цвет</TooltipContent>
          </Tooltip>
        </div>
        {showCustomColor && (
          <Input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="h-7 w-8 cursor-pointer border-0 p-0"
            aria-label="Выбрать свой цвет"
          />
        )}
      </div>
      <div className="hidden h-4 w-px bg-zinc-200 md:block dark:bg-zinc-700" />
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Шрифт:</span>
        <Select
          value={fontFamily}
          onValueChange={(v) => {
            setFontFamily(v as FontFamily);
            toast.success(`Шрифт: ${fontLabels[v as FontFamily]}`);
          }}
        >
          <SelectTrigger className="h-7 w-full min-w-[100px] text-xs md:w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter"><span style={{ fontFamily: "Inter, sans-serif" }}>Inter</span></SelectItem>
            <SelectItem value="georgia"><span style={{ fontFamily: "Georgia, serif" }}>Georgia</span></SelectItem>
            <SelectItem value="roboto"><span style={{ fontFamily: "Roboto, sans-serif" }}>Roboto</span></SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="hidden h-4 w-px bg-zinc-200 md:block dark:bg-zinc-700" />
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Размер:</span>
        <Select
          value={fontSize}
          onValueChange={(v) => {
            setFontSize(v as FontSize);
            toast.success(`Размер: ${sizeLabels[v as FontSize]}`);
          }}
        >
          <SelectTrigger className="h-7 w-full min-w-[90px] text-xs md:w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Мелкий</SelectItem>
            <SelectItem value="medium">Средний</SelectItem>
            <SelectItem value="large">Крупный</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
