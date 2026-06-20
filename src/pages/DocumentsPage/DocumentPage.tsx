import { pdfjs } from "react-pdf";
import { CvUpload } from "../../components/CVUpload/CVUpload";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export const DocumentsPage = () => {
  return (
    <div className="documents_page">
      <div className="documents_header">
        <div className="documents_eyebrow">DOCUMENTS</div>
        <h1 className="documents_title">Your CV, JD & Cover Letter</h1>
        <p className="documents_sub">
          Upload your CV once. Attach job descriptions per role. Generate
          tailored cover letters in one click.
        </p>
      </div>
      <div className="documents_grid">
        <CvUpload />
        <div className="jd_section">
          <p className="cv_label">JOB DESCRIPTION</p>
          <div className="jd_empty">
            <p>Coming next...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
