import type { Job } from "../../types/jobs";
import { JobCard } from "../JobCard/JobCard";


type props = {
    jobCards: Job[]
}
export const KanbanColumn = ( {jobCards}:props) => {
  return (
    <div className="cards_list">
      {jobCards.map((card) => (
        <JobCard jobCard={card}  key={card.id}      
        />
      ))}
    </div>
  );
};
