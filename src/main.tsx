import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./styles/theme.css";
import "./styles/App.css";
import "./components/JobCard/JobCard.css";
import "./components/KanbanColumn/KanbanColumn.css";
import App from "./App.tsx";
import "./practice";
import "./pages/JobBoard/JobBoard.css";
import "./components/sidebar/SideBar.css";
import "./pages/DocumentsPage/DocumentPage.css";
import './components/CVUpload/CVUplaod.css'
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
