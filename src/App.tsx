import { useState } from "react";
import { JobBoard } from "./pages/JobBoard";
import { SAMPLE_JOBS, type Job } from "./types/jobs";

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);

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

  return (
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Catalyst</h1>
        <JobBoard bucketed_jobs={bucketed_jobs} change_status={change_status}  />
      </div>
  );
}
