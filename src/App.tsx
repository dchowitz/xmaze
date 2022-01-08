import * as React from "react";
import DemoController from "./DemoController";
import demoMask from "./demoMaskedMaze";

export default function App() {
  const [showFooter, setShowFooter] = React.useState(false);
  const gitHash = (import.meta.env.VITE_NETLIFY_GITHASH ||
    import.meta.env.VITE_GITHASH) as string;
  const [text, ..._] = new URLSearchParams(window.location.search).keys();

  return (
    <div id="logo">
      <div className="canvas">
        <DemoController
          demoFac={(ctx) =>
            demoMask(ctx, text?.replaceAll("-", " "), () => setShowFooter(true))
          }
        />
      </div>
      <footer>
        <div style={{ visibility: showFooter ? "visible" : "hidden" }}>
          greetings&nbsp;from&nbsp;
          <a href="https://github.com/dchowitz/xmaze">dchowitz</a>
        </div>
        <pre>
          build {import.meta.env.VITE_DATE} ({gitHash.slice(0, 6)})
        </pre>
      </footer>
    </div>
  );
}
