import { getBadgeColor, type Job } from "../../types/jobs";
import { JobCard } from "../JobCard/JobCard";


type props = {
    jobCards: Job[],
    status: string;
}

export const KanbanColumn = ( {jobCards,status}:props) => {
  return (
    <div className="cards_list">
      <div className="cards_list_header">
        <div className="status_div">
          <div className={`dot ${getBadgeColor(status)}_bg`}></div>
        <span className="cards_list_status">{status}</span></div>

        <span className="cards_list_count">{jobCards.length}</span>
      </div>
      <div className="card_body">
        {
          jobCards.map((job)=>(
            <JobCard jobCard={job} key={job.id} />
          ))
        }
      </div>
    </div>
  );
};
