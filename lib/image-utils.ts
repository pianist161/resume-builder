export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getCroppedImage(
  imageSrc: string,
  cropArea: CropArea,
  maxSize = 200,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = maxSize;
      canvas.height = maxSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        maxSize,
        maxSize
      );
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => reject(new Error("Failed to load image"));
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
  });
}
