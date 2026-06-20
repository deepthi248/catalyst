import { createContext } from "react";
import type { Job } from "../../types/jobs";

type JobsContextType = {
  jobs: Job[];
  changeStatus: ({ id, status }: { id: string; status: Job["status"] }) => void;
  addJob: (job: Job) => void;
};

export const JobsContext = createContext<JobsContextType | null>(null);
