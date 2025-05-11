import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="biohacker-theme">
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
);
