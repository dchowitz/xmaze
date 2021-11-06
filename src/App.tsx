import * as React from "react";
import xmas from "./merry-xmas.png";
import DemoController from "./DemoController";
import demoMask from "./demoMaskedMaze";

export default function App() {
  const [showFooter, setShowFooter] = React.useState(false);

  return (
    <div id="logo">
      <div className="canvas">
        <DemoController
          demoFac={(ctx) => demoMask(ctx, xmas, () => setShowFooter(true))}
        />
      </div>
      <footer>
        <div style={{ visibility: showFooter ? "visible" : "hidden" }}>
          ...&nbsp;from&nbsp;
          <a href="https://github.com/dchowitz/xmaze">dchowitz</a> (aka foobar
          (fka prensen))
        </div>
        <pre>
          build {import.meta.env.VITE_DATE} (
          {import.meta.env.VITE_NETLIFY_GITHASH || import.meta.env.VITE_GITHASH}
          )
        </pre>
      </footer>
    </div>
  );
}
