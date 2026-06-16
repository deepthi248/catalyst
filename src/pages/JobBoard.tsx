import { KanbanColumn } from "../components/KanbanColumn/KanbanColumn";
import { COLUMN_CONFIG, type Job } from "../types/jobs";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

type props = {
  bucketed_jobs: Record<string, Job[]>;
  change_status: ({ id, status }: { id: string; status: string }) => void;
  setOpenAddJobModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const JobBoard = ({
  bucketed_jobs,
  change_status,
  setOpenAddJobModal,
}: props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const jobId = active.id as string;
    const newStatus = over.id as string;
    change_status({ id: jobId, status: newStatus });
  };

  return (
    <div className="pipeline_page">
      <div className="pipeline_header">
        <h1 className="pipeline_title">My pipeline</h1>
        <button
          className="btn btn_primary"
          onClick={() => setOpenAddJobModal(true)}
        >
          + Add job
        </button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="board_section">
          {COLUMN_CONFIG.map((col) => (
            <KanbanColumn
              jobCards={bucketed_jobs[col.id] || []}
              status={col.id}
              key={col.id}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};
