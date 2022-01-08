export default function pixelsFromText(text: string) {
  const demoCanvas = document.getElementById(
    "demo-canvas"
  ) as HTMLCanvasElement;
  const canvas = document.createElement("canvas");
  canvas.width = demoCanvas.width;
  canvas.height = demoCanvas.height;
  const context = canvas.getContext("2d")!;

  const fontSize = getFontSize(context, text, 24, 2400);
  const measured = measure(context, text, fontSize);

  // white is ignored during maze generation - we leave a top and bottom border
  // for cleared canvas pixels the temporary maze path is shown, which gives a nice effect
  // alternative: make whole canvas white, before rendering text -> only characters are "mazed"
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.clearRect(
    0,
    canvas.height / 2 - measured.height / 4,
    canvas.width,
    measured.height / 2
  );

  drawText(context, text, fontSize, "black");

  return Promise.resolve(
    context.getImageData(0, 0, canvas.width, canvas.height)
  );
}

function drawText(
  context: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  fillStyle: string
) {
  const measured = measure(context, text, fontSize);
  context.fillStyle = fillStyle;
  context.fillText(
    text,
    Math.abs((context.canvas.width - measured.width) / 2),
    Math.abs((context.canvas.height - measured.height) / 2) +
      measured.fontBoundingBoxAscent
  );
}

// binary search the optimal font size (reg. width)
function getFontSize(
  context: CanvasRenderingContext2D,
  text: string,
  minSize: number,
  maxSize: number
): number {
  //console.log(minSize, maxSize, lastWidth, lastHeight);
  if (minSize > maxSize) {
    return getFontSize(context, text, maxSize, minSize);
  }

  if (maxSize - minSize < 2) {
    return maxSize;
  }

  const midSize = Math.floor((minSize + maxSize) / 2);
  const { width, height } = measure(context, text, midSize);

  if (width > context.canvas.width || height > context.canvas.height) {
    return getFontSize(context, text, minSize, midSize);
  }
  return getFontSize(context, text, midSize, maxSize);
}

function measure(
  context: CanvasRenderingContext2D,
  text: string,
  fontSize: number
) {
  context.font = getFont(fontSize);
  const measure = context.measureText(text);
  return {
    width: measure.width,
    height:
      Math.abs(measure.fontBoundingBoxAscent) +
      Math.abs(measure.fontBoundingBoxDescent),
    fontBoundingBoxAscent: measure.fontBoundingBoxAscent,
  };
}

function getFont(fontSize: number) {
  return `bold ${fontSize}px serif`;
}
