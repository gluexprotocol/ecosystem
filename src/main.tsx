import { createRoot } from "react-dom/client";

import App from "./app";
import "./styles/main.css";
import "./styles/button.css";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
