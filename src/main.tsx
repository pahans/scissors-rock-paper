import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { GameProvider } from "./context/GameProvider.tsx";
import "./index.css";
import Game from "./Game.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <Game />
    </GameProvider>
  </React.StrictMode>,
);
