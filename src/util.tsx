export interface Point {
  x: number;
  y: number;
}

export interface Demo {
  next(): void;
  mouseClick(p: Point): void;
  mouseMove(p: Point): void;
}

export function randomPop<T>(items: T[]) {
  if (items.length === 0) return undefined;
  const idx = Math.floor(Math.random() * items.length);
  const tmp = items[items.length - 1];
  items[items.length - 1] = items[idx];
  items[idx] = tmp;
  return items.pop();
}

export function sample<T>(items: T[]) {
  return items.length > 0
    ? items[Math.floor(Math.random() * items.length)]
    : undefined;
}

export async function pixelsFromImage(logo: string): Promise<ImageData> {
  const img = new Image();
  img.src = logo;
  return new Promise((resolve) => {
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext("2d")!;
      context.drawImage(img, 0, 0);
      resolve(context.getImageData(0, 0, img.width, img.height));
    };
  });
}
