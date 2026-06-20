import { JobBoard } from "./pages/JobBoard/JobBoard";
import { JobsProvider } from "./context/jobsContext/JobsProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DocumentsPage } from "./pages/DocumentsPage/DocumentPage";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <JobsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<JobBoard />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" />
      </JobsProvider>
    </BrowserRouter>
  );
}
