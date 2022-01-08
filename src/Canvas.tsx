import * as React from "react";
import { Point } from "./util";

export default function Canvas(props: {
  contextAvailable: (ctx: CanvasRenderingContext2D) => void;
  onClick: (p: Point) => void;
  onMove: (p: Point) => void;
  width?: number;
  height?: number;
}) {
  const { width, height, contextAvailable, onClick, onMove } = props;
  const offsetLeft = React.useRef(0);
  const offsetTop = React.useRef(0);
  const called = React.useRef(false);

  return (
    <canvas
      id="demo-canvas"
      width={width}
      height={height}
      ref={(node) => {
        if (called.current) return;
        if (!node) return;
        const logoNode = document.getElementById("logo")!;

        if (!width) node.width = logoNode.offsetWidth;
        if (!height) node.height = logoNode.offsetHeight;

        offsetLeft.current = node.offsetLeft;
        offsetTop.current = node.offsetTop;
        contextAvailable(node.getContext("2d")!);
        called.current = true;
      }}
      onClick={(e) => {
        onClick({
          x: e.pageX - offsetLeft.current,
          y: e.pageY - offsetTop.current,
        });
      }}
      onMouseMove={(e) => {
        onMove({
          x: e.pageX - offsetLeft.current,
          y: e.pageY - offsetTop.current,
        });
      }}
    />
  );
}
