/**
 * Compresses an image to max 800px width and reduces quality
 * to keep base64 payload small for Vercel serverless limits
 */
export function compressImage(
  dataUrl: string,
  maxWidth = 800,
  quality = 0.7
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // Scale down if too large
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));

      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = "image/jpeg";
      const compressed = canvas.toDataURL(mimeType, quality);
      const base64 = compressed.split(",")[1];

      resolve({ base64, mimeType });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}