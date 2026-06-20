import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SAMPLE_JOBS, type Job } from "../../types/jobs";
import { JobsContext } from "./JobsContext";

export const JobsProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", SAMPLE_JOBS);

  const changeStatus = ({
    id,
    status,
  }: {
    id: string;
    status: Job["status"];
  }) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job)),
    );
  };

  const addJob = (job_to_be_added: Job) => {
    setJobs((prev) => [...prev, job_to_be_added]);
  };

  const value = { jobs, changeStatus, addJob };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
