import { Dialog, Field, Form } from "@base-ui/react";
import type { Job } from "../../types/jobs";
import styles from "./AddJobModal.module.css";
import { toast } from "sonner";

type props = {
  AddJobCard: (job_to_be_added: Job) => void;
  openAddJobModal: boolean;
  setOpenAddJobModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddJobModal = ({
  openAddJobModal,
  setOpenAddJobModal,
  AddJobCard,
}: props) => {
  return (
    <Dialog.Root
      open={openAddJobModal}
      onOpenChange={(open) => setOpenAddJobModal(open)}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.modal_backdrop} />
        <Dialog.Popup className={styles.modal_popup}>
          <div className={styles.modal_header}>
            <h2 className={styles.modal_title}>Add Job</h2>
          </div>

          <Form
            className={styles.modal_form}
            onFormSubmit={(formValues) => {
              const newJob: Job = {
                id: crypto.randomUUID(),
                companyName: formValues.company_name as string,
                role: formValues.role as string,
                url: formValues.url as string,
                status: formValues.status as Job["status"],
                notes: formValues.notes as string,
                createdAt: new Date(),
              };

              AddJobCard(newJob);
              toast.success(
                `${formValues.company_name} added to your pipeline!`,
              );

              setOpenAddJobModal(false);
            }}
          >
            <Field.Root name="company_name" className={styles.modal_field}>
              <Field.Label>Company Name</Field.Label>
              <Field.Control
                type="text"
                required
                placeholder="Stripe"
                className={styles.modal_input}
              ></Field.Control>
              <Field.Error match="valueMissing" className={styles.modal_error}>
                Required
              </Field.Error>
            </Field.Root>
            <Field.Root name="role" className={styles.modal_field}>
              <Field.Label>Role</Field.Label>
              <Field.Control
                type="text"
                required
                placeholder="Full Stack Engineer"
                className={styles.modal_input}
              ></Field.Control>
              <Field.Error match="valueMissing" className={styles.modal_error}>
                Required
              </Field.Error>
            </Field.Root>
            <Field.Root name="url" className={styles.modal_field}>
              <Field.Label>Job URL</Field.Label>
              <Field.Control
                type="url"
                defaultValue=""
                placeholder="https://example.com"
                pattern="https?://.*"
                className={styles.modal_input}
              />
              <Field.Error />
            </Field.Root>

            <Field.Root name="status" className={styles.modal_field}>
              <Field.Label>Status</Field.Label>
              <Field.Control
                render={<select />}
                required
                className={styles.modal_select}
              >
                <option value="">Select status</option>
                <option value="applied">applied</option>
                <option value="interviewing">interviewing</option>
                <option value="offered">offered</option>
                <option value="rejected">rejected</option>
              </Field.Control>
              <Field.Error match="valueMissing" className={styles.modal_error}>
                Pick a Status
              </Field.Error>
            </Field.Root>
            <Field.Root name="notes" className={styles.modal_field}>
              <Field.Label>Notes</Field.Label>
              <textarea
                placeholder="Any notes about this role..."
                className={styles.modal_textarea}
                defaultValue={""}
                name="notes"
              />
            </Field.Root>
            <hr className="modal_divider" />
            <div className={styles.modal_footer}>
              <Dialog.Close className="btn">Cancel</Dialog.Close>
              <button type="submit" className="btn btn_primary">
                Add job
              </button>
            </div>
          </Form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
