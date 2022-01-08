import { Point, sample } from "./util";
import grid, { Cell } from "./grid";
import pixelsFromImage from "./pixelsFromImage";
import xmas from "./merry-xmas.png";
import pixelsFromText from "./pixelsFromText";

export default function maskedMaze(
  ctx: CanvasRenderingContext2D,
  text: string | undefined,
  onFinish: () => void
) {
  const { width, height } = ctx.canvas;
  const cellSize = 4;
  const halfCellSize = cellSize / 2;
  const pathWidth = halfCellSize;
  const maze = grid(width, height, cellSize);

  const stack = [] as Cell[];
  const visited = new Set<Cell>();

  let maskResolved = false;
  let mask: string[];

  (text ? pixelsFromText(text) : pixelsFromImage(xmas)).then((imageData) => {
    const {
      width: logoWidth,
      height: logoHeight,
      data: logoPixels,
    } = imageData;
    const factor = Math.max(logoWidth / width, logoHeight / height);

    const colors = new Set<string>();

    mask = maze.cells().map((c) => {
      const x = Math.floor(c.x * factor);
      const y = Math.floor(c.y * factor);
      if (x >= logoWidth || y >= logoHeight) return "";

      const pixelIdx = (y * logoWidth + x) * 4;
      const [r, g, b, a] = logoPixels.slice(pixelIdx, pixelIdx + 4);

      const notWhite = r + g + b < 600;
      const color = (notWhite && `rgba(${r}, ${g}, ${b}, ${a})`) || "";
      colors.add(color);
      return color;
    });

    //console.log(colors);

    maskResolved = true;
    init();
  });

  function next() {
    if (!maskResolved) return;

    let i = 20;
    while (--i > 0) {
      const current = stack[stack.length - 1];
      if (!current) {
        init();
        return;
      }

      const nextCell = sample(
        current.neighbors().filter((n) => !visited.has(n) && mask[n.idx])
      );
      if (nextCell) {
        drawPath(current, nextCell, "lightgray");
        stack.push(nextCell);
        visited.add(nextCell);
      } else {
        stack.pop();
        let previous: Cell;
        if ((previous = stack[stack.length - 1])) {
          drawPath(current, previous, "white");
        }
      }
    }
  }

  function drawPath(a: Cell, b: Cell, color: string) {
    drawCell(a, mask[a.idx]);
    drawCell(b, mask[b.idx]);
    ctx.lineWidth = pathWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(a.x + halfCellSize, a.y + halfCellSize);
    ctx.lineTo(b.x + halfCellSize, b.y + halfCellSize);
    ctx.stroke();
  }

  function drawCell(c: Cell, color: string) {
    if (visited.has(c)) return;
    ctx.fillStyle = color;
    ctx.fillRect(c.x, c.y, cellSize, cellSize);
  }

  function init() {
    stack.length = 0;
    const start = sample(
      maze.cells().filter((c) => !visited.has(c) && mask[c.idx])
    );

    if (start) {
      stack.push(start);
      visited.add(start);
    } else {
      onFinish();
    }
  }

  return {
    next,
    mouseClick(_p: Point) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      visited.clear();
      init();
    },
    mouseMove(_p: Point) {},
  };
}
