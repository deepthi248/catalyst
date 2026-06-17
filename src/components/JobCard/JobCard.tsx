import { getBadgeColor, type Job } from "../../types/jobs";
import { useDraggable } from "@dnd-kit/core";

type props = {
  jobCard: Job;
  filterKeyWord: string;
};

const getDateDiff = (createdAt: Date) => {
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const timeDiff = Date.now() - date.getTime();
  return Math.floor(timeDiff / millisecondsInDay);
};

export const JobCard = ({ jobCard, filterKeyWord }: props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: jobCard.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };
  const isMatch =
    !filterKeyWord ||
    jobCard.companyName.toLowerCase().includes(filterKeyWord.toLowerCase()) ||
    jobCard.role.toLowerCase().includes(filterKeyWord.toLowerCase());

  const badgeColor = getBadgeColor(jobCard.status);
  return (
    <div
      className={`card ${badgeColor} ${filterKeyWord && !isMatch ? "card_dimmed" : ""} ${filterKeyWord && isMatch ? "card_highlighted" : ""}`}
      key={jobCard.id}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className="card_header">
        <span className="company_name">{jobCard.companyName}</span>
        <span className="days_posted">{getDateDiff(jobCard.createdAt)}d</span>
      </div>
      <span className="role">{jobCard.role}</span>
    </div>
  );
};
