import { KanbanColumn } from "../components/KanbanColumn/KanbanColumn";
import type { Job } from "../types/jobs";

type props = {
  bucketed_jobs: Record<string, Job[]>;
};

export const JobBoard = ({ bucketed_jobs }: props) => {
  return <div className="board_section">{
    Object.entries(bucketed_jobs).map(([status, jobs])=>(
        <KanbanColumn jobCards={jobs} status={status}/>
    ))
  }</div>;
};
