import { Dialog } from "@base-ui/react";
import { IconX, IconClipboard } from "@tabler/icons-react";
import { toast } from "sonner";
import "./JobDescriptionModal.css";

type Props = {
  openJDModal: boolean;
  setOpenJDModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentJD: string;
  saveJD: React.Dispatch<React.SetStateAction<string>>;
};

export const JobDescriptionModal = ({
  openJDModal,
  setOpenJDModal,
  currentJD,
  saveJD,
}: Props) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      saveJD(text);
    } catch {
      toast.error("Could not read clipboard — please paste manually");
    }
  };

  return (
    <Dialog.Root
      open={openJDModal}
      onOpenChange={(open) => setOpenJDModal(open)}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="jd_backdrop" />
        <Dialog.Popup className="jd_popup">
          <div className="jd_modal_header">
            <h2 className="jd_modal_title">Job Description</h2>
            <Dialog.Close className="jd_modal_close">
              <IconX size={16} />
            </Dialog.Close>
          </div>

          <div className="jd_modal_body">
            <textarea
              className="jd_textarea"
              placeholder="Paste the job description here..."
              value={currentJD}
              onChange={(e) => saveJD(e.target.value)}
            />
            <div className="jd_textarea_footer">
              <button className="jd_paste_btn" onClick={handlePaste}>
                <IconClipboard size={14} />
                Paste from clipboard
              </button>
              <span
                className={`jd_char_count ${currentJD.length > 0 ? "active" : ""}`}
              >
                {currentJD.length} characters
              </span>
            </div>
          </div>

          <div className="jd_modal_footer">
            <button className="jd_cancel_btn" onClick={() => saveJD("")}>
              Clear Text
            </button>
            <Dialog.Close
              className="jd_save_btn"
              onClick={() => setOpenJDModal(false)}
            >
              {" "}
              Save
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
