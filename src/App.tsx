import { useState } from "react";
import { JobBoard } from "./pages/JobBoard";
import { SAMPLE_JOBS, type Job } from "./types/jobs";
import { AddJobModal } from "./components/AddJobModal/AddJobModal";
import { Toaster } from "sonner";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", SAMPLE_JOBS);
  const [openAddJobModal, setOpenAddJobModal] = useState<boolean>(false);
  const [showFilterInput, setShowFilterInput] = useState<boolean>(false);
  const [filterKeyWord, setFilterKeyWord] = useState<string>("");

  const bucketed_jobs = jobs.reduce<Record<string, Job[]>>((acc, job) => {
    const key = job.status;
    acc[key] = [...(acc[key] || []), job];
    return acc;
  }, {});

  const change_status = ({ id, status }) => {
    setJobs((prev) => {
      return prev.map((current_job) => {
        return current_job.id === id
          ? { ...current_job, status: status }
          : current_job;
      });
    });
  };
  const AddJobCard = (job_to_be_added: Job) => {
    setJobs((prev) => [...prev, job_to_be_added]);
  };

  return (
    <div>
      <AddJobModal
        AddJobCard={AddJobCard}
        setOpenAddJobModal={setOpenAddJobModal}
        openAddJobModal={openAddJobModal}
      />
      <JobBoard
        bucketed_jobs={bucketed_jobs}
        change_status={change_status}
        setOpenAddJobModal={setOpenAddJobModal}
        showFilterInput={showFilterInput}
        setShowFilterInput={setShowFilterInput}
        setFilterKeyWord={setFilterKeyWord}
        filterKeyWord={filterKeyWord}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}
