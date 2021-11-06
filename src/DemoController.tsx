import * as React from "react";
import Canvas from "./Canvas";
import { Demo } from "./util";

export default function DemoController(props: {
  demoFac: (ctx: CanvasRenderingContext2D) => Demo;
}) {
  const demo = React.useRef<Demo>();
  const raf = React.useRef<number>();

  React.useEffect(
    () => () => {
      raf.current && cancelAnimationFrame(raf.current);
    },
    []
  );

  function startAnimation(ctx: CanvasRenderingContext2D) {
    demo.current = props.demoFac(ctx);
    raf.current = requestAnimationFrame(animate);
  }

  function animate() {
    demo.current?.next();
    raf.current = requestAnimationFrame(animate);
  }

  return (
    <Canvas
      contextAvailable={startAnimation}
      onClick={(p) => demo.current?.mouseClick(p)}
      onMove={(p) => demo.current?.mouseMove(p)}
    />
  );
}
