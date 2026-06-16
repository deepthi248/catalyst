import { useState } from "react";
import { JobBoard } from "./pages/JobBoard";
import { SAMPLE_JOBS, type Job } from "./types/jobs";
import { AddJobModal } from "./components/AddJobModal/AddJobModal";
import { Toaster } from "sonner";

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);
  const [openAddJobModal, setOpenAddJobModal]= useState<boolean>(false)

  const bucketed_jobs = jobs.reduce<Record<string, Job[]>>((acc, job) => {
    const key = job.status;
    acc[key] = [...(acc[key] || []), job];
    return acc;
  }, {});

  const change_status = ({ id, status }) => {
    const changed_jobs = jobs.map((current_job) => {
      return current_job.id === id
        ? { ...current_job, status: status }
        : current_job;
    });

    setJobs(changed_jobs);
  };
  const AddJobCard = (job_to_be_added)=>{
    setJobs((prev)=>[...prev, job_to_be_added])
  } 
  return (
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Catalyst</h1>
        <AddJobModal AddJobCard={AddJobCard} setOpenAddJobModal={setOpenAddJobModal} openAddJobModal={openAddJobModal}  />
        <JobBoard bucketed_jobs={bucketed_jobs} change_status={change_status} setOpenAddJobModal={setOpenAddJobModal} />
                <Toaster position="bottom-right" />

      </div>
  );
}
