import { getBadgeColor, type Job } from "../../types/jobs";

type props = {
  jobCard: Job;
};


const getDateDiff = (createdAt)=>{
    const millisecondsInDay: number = 1000 * 60 * 60 * 24;
    const  timeDiff: number =  Date.now() -createdAt.getTime() 
    const differenceInDays: number = 
    Math.floor(timeDiff / millisecondsInDay);
    return differenceInDays
}

export const JobCard = ({ jobCard }: props) => {
    const badgeColor = getBadgeColor(jobCard.status)
  return (
    <div className={`card ${badgeColor}`} key={jobCard.id}>
      <div className="card_header">
        <span className="company_name">{jobCard.companyName}</span>
        <span className="days_posted">{getDateDiff(jobCard.createdAt)}d</span>
      </div>
        <span className="role">{jobCard.role}</span>
    </div>
  );
};
