export default async function pixelsFromImage(
  imageUrl: string
): Promise<ImageData> {
  const img = new Image();
  img.src = imageUrl;
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
