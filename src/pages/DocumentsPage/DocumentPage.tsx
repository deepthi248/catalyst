import { useState } from "react";
import { CvUpload } from "../../components/CVUpload/CVUpload";
import { JobDescriptionModal } from "../../components/JobDescriptionModal/JobDescriptionModal";
import "./DocumentPage.css";
import { CoverLetterEditor } from "../../components/TextEditor/TextEditor";
import { IconDownload, IconRotateClockwise } from "@tabler/icons-react";

export const DocumentsPage = () => {
  const [openJDModal, setOpenJDModal] = useState<boolean>(false);
  const [jd, setJD] = useState<string>("");

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
        <div className="documents_col_left">
          <CvUpload />
          <div className="jd_section">
            <p className="panel_label">JOB DESCRIPTION</p>
            <div className="jd_card">
              {jd === "" ? (
                <div className="jd_empty_state">
                  <p className="jd_empty_title">No job description attached</p>
                  <p className="jd_empty_sub">
                    Paste the JD for this role to unlock AI analysis
                  </p>
                </div>
              ) : (
                <div className="jd_filled_state">
                  <div className="jd_filled_header">
                    <span className="jd_filled_title">Attached JD</span>
                    <span className="jd_badge">Attached</span>
                  </div>
                  <div className="jd_preview_wrapper">
                    <p className="jd_preview_text">{jd}</p>
                  </div>
                </div>
              )}
              <button
                className="open_jd_modal"
                onClick={() => setOpenJDModal(true)}
              >
                {jd ? "Change JD" : "+ Add JD"}
              </button>
            </div>
          </div>
        </div>

        <div className="documents_col_right">
          <div className="cover_letter_section">
            <div className="cl_header">
              <p className="panel_label">COVER LETTER</p>
              <div className="cl_actions">
                <button className="cl_btn cl_btn_primary">
                  <IconRotateClockwise
                    stroke={2}
                    size={20}
                    style={{ marginRight: "5px" }}
                  />
                  Regenerate
                </button>

                <button className="cl_btn cl_btn_secondary">
                  <IconDownload
                    size={20}
                    color="var(--ink3)"
                    style={{ marginRight: "5px" }}
                  />
                  PDF
                </button>
              </div>
            </div>
            <CoverLetterEditor />
          </div>
        </div>
      </div>
      <JobDescriptionModal
        openJDModal={openJDModal}
        setOpenJDModal={setOpenJDModal}
        currentJD={jd}
        saveJD={setJD}
      />
    </div>
  );
};
