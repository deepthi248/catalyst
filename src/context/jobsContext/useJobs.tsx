import { useContext } from "react";
import { JobsContext } from "./JobsContext";

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used inside JobsProvider");
  }
  return context;
}