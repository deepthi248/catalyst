import { JobBoard } from "./pages/JobBoard";
import { SAMPLE_JOBS, type Job } from "./types/jobs";

export default function App() {
  const bucketed_jobs  = SAMPLE_JOBS.reduce<Record<string, Job[]>>((acc, job)=>{
    const key = job.status
    acc[key] = [...(acc[key]||[]), job]
    return acc
  },{})

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500">Catalyst</h1>
      <JobBoard bucketed_jobs={bucketed_jobs} />
    </div>
  );
}
