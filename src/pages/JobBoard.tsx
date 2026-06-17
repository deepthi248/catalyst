import { IconSearch } from "@tabler/icons-react";
import { KanbanColumn } from "../components/KanbanColumn/KanbanColumn";
import { COLUMN_CONFIG, type Job } from "../types/jobs";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

type props = {
  bucketed_jobs: Record<string, Job[]>;
  change_status: ({ id, status }: { id: string; status: string }) => void;
  setOpenAddJobModal: React.Dispatch<React.SetStateAction<boolean>>;
  showFilterInput: boolean;
  setShowFilterInput: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterKeyWord: React.Dispatch<React.SetStateAction<string>>;
  filterKeyWord: string
};

export const JobBoard = ({
  bucketed_jobs,
  change_status,
  setOpenAddJobModal,
  showFilterInput,
  setShowFilterInput,
  setFilterKeyWord,
  filterKeyWord,
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
        <div className="pipeline_actions">
          <button
            className={`btn filter_btn ${showFilterInput ? "filter_btn_active" : ""}`}
            onClick={() => setShowFilterInput((prev) => !prev)}
          >
            {showFilterInput ? "Filter X" : "Filter"}
          </button>
          <button
            className="btn btn_primary"
            onClick={() => setOpenAddJobModal(true)}
          >
            + Add job
          </button>
        </div>
      </div>
      <div
        className="filter_input_div"
        style={{ display: showFilterInput ? "flex" : "none" }}
      >
        <span className="filter_search_box">
          <IconSearch size={16} color="var(--ink3)" />
          <input
            type="text"
            name="filter_jobs"
            className="form_input"
            onChange={(e) => {
              setFilterKeyWord(e.target.value);
            }}
          />
        </span>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="board_section">
          {COLUMN_CONFIG.map((col) => (
            <KanbanColumn
              jobCards={bucketed_jobs[col.id] || []}
              status={col.id}
              key={col.id}
              filterKeyWord={filterKeyWord}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};
