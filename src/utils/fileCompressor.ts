import { VALIDATION_RULES } from "@/constants/validationRules";

export interface CompressedFile {
  file: File;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
}

export async function compressImage(
  file: File,
  maxWidthPx: number = 1200,
  quality: number = 0.8
): Promise<CompressedFile> {
  return new Promise((resolve, reject) => {
    if (!VALIDATION_RULES.ACCEPTED_IMAGE_TYPES.includes(file.type as never)) {
      reject(new Error("Invalid file type. Please upload JPEG, PNG, or WebP."));
      return;
    }
    if (file.size > VALIDATION_RULES.IMAGE_MAX_SIZE_MB * 1024 * 1024) {
      reject(new Error(`File too large. Maximum allowed size is ${VALIDATION_RULES.IMAGE_MAX_SIZE_MB}MB.`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxWidthPx) {
          height = (height * maxWidthPx) / width;
          width = maxWidthPx;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("Compression failed")); return; }
            const compressedFile = new File([blob], file.name, { type: file.type });
            resolve({
              file: compressedFile,
              dataUrl: canvas.toDataURL(file.type, quality),
              originalSize: file.size,
              compressedSize: blob.size,
            });
          },
          file.type,
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
