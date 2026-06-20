import { IconUpload } from "@tabler/icons-react";
import { useState, useRef } from "react";
import { Document, Page } from "react-pdf";

export const CvUpload = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large — max 5MB");
      return;
    }
    setCvFile(file);
  };
  return (
    <div className="cv_section">
      <p className="cv_label">YOUR CV</p>
      {cvFile === null ? (
        <div
          className={`cv_upload_section ${isDragOver ? "drag_over" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (!file) return;
            handleFile(file);
          }}
        >
          <IconUpload size={28} color="var(--ink3)" />
          <h3 className="upload_title">Drop your CV here</h3>
          <p className="upload_sub">PDF only · max 5MB</p>
          <button
            className="browse_cv"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse file
          </button>
          <input
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="pdf_preview">
          <div className="pdf_preview_top">
            <span className="pdf_filename">{cvFile.name}</span>
            <button className="pdf_replace_btn" onClick={() => setCvFile(null)}>
              Replace
            </button>
          </div>
          <div className="pdf_content">
            <Document file={cvFile}>
              <Page pageNumber={1} width={360} />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};
