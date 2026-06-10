import type { Job } from "../../types/jobs";

type props = {
  jobCard: Job;
};

const getBadgeColor =(status:string)=> {
    let card_color = ""
    
    switch (status){
        case 'applied':
            card_color ="purple"
            break;
            case 'interviewing':
            card_color ="amber"
            break;
            case 'offered':
            card_color ="green"
            break;
            case 'rejected':
            card_color ="red"
    }
    return card_color;
}

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
