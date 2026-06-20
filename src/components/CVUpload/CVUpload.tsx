import { IconUpload } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { toast } from "sonner";
import "./CVUplaod.css";

export const CvUpload = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>(360);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large — max 5MB");
      return;
    }
    setPdfError(false);
    setCvFile(file);
  };

  const handleReplace = () => {
    setCvFile(null);
    setPdfError(false);
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const updateSize = () => {
      if (contentRef.current) {
        setPageWidth(contentRef.current.offsetWidth - 32);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [cvFile]);

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
        <div className="pdf_preview" ref={contentRef}>
          <div className="pdf_preview_top">
            <span className="pdf_filename">{cvFile.name}</span>
            <button className="pdf_replace_btn" onClick={handleReplace}>
              Replace
            </button>
          </div>

          {pdfError ? (
            <div className="pdf_error">
              <p className="pdf_error_msg">
                Could not load this PDF — it may be corrupted or
                password-protected.
              </p>
              <button className="browse_cv" onClick={handleReplace}>
                Try another file
              </button>
            </div>
          ) : (
            <>
              <div className="pdf_content">
                <Document
                  file={cvFile}
                  onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
                  onLoadError={() => setPdfError(true)}
                >
                  <Page pageNumber={currentPage} width={pageWidth} />
                </Document>
              </div>
              <div className="pdf_nav">
                <button
                  className="nav_button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  ← Prev
                </button>
                <span className="page_indicator">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="nav_button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
