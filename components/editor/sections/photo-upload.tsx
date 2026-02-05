"use client";

import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useResumeStore } from "@/lib/store";
import { getCroppedImage } from "@/lib/image-utils";
import { Camera, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function PhotoUpload() {
  const photo = useResumeStore((s) => s.resume.basics.photo);
  const setPhoto = useResumeStore((s) => s.setPhoto);
  const removePhoto = useResumeStore((s) => s.removePhoto);

  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Файл слишком большой (макс. 10MB)");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Выберите изображение");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = "";
  }, []);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImage(imageSrc, croppedAreaPixels);
      setPhoto(cropped);
      setCropDialogOpen(false);
      setImageSrc(null);
      toast.success("Фото добавлено");
    } catch {
      toast.error("Ошибка при обработке фото");
    }
  }, [imageSrc, croppedAreaPixels, setPhoto]);

  const handleRemove = useCallback(() => {
    removePhoto();
    toast.success("Фото удалено");
  }, [removePhoto]);

  return (
    <div className="mb-4">
      <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Фото</p>
      <div className="flex items-center gap-3">
        {photo ? (
          <img
            src={photo}
            alt="Фото профиля"
            className="size-16 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700"
          />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex size-16 items-center justify-center rounded-full border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-400 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-500"
          >
            <Camera className="size-6" />
          </button>
        )}
        <div className="flex gap-2">
          {photo ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                <RefreshCw className="size-3.5 mr-1" />
                Заменить
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="size-3.5 mr-1" />
                Удалить
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Camera className="size-3.5 mr-1" />
              Загрузить фото
            </Button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Обрезка фото</DialogTitle>
          </DialogHeader>
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-zinc-900">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <div className="flex items-center gap-3 px-1">
            <span className="text-xs text-zinc-500 shrink-0">Масштаб</span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.01}
              onValueChange={([v]) => setZoom(v)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setCropDialogOpen(false);
                setImageSrc(null);
              }}
            >
              Отмена
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
