import { IconSearch } from "@tabler/icons-react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { AddJobModal } from "../../components/AddJobModal/AddJobModal";
import { useState } from "react";
import { COLUMN_CONFIG, type Job } from "../../types/jobs";
import { useJobs } from "../../context/jobsContext";
import { KanbanColumn } from "../../components/KanbanColumn/KanbanColumn";

export const JobBoard = () => {
  const [openAddJobModal, setOpenAddJobModal] = useState<boolean>(false);
  const [showFilterInput, setShowFilterInput] = useState<boolean>(false);
  const [filterKeyWord, setFilterKeyWord] = useState<string>("");
  const { jobs, changeStatus } = useJobs();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const jobId = active.id as string;
    const newStatus = over.id as Job["status"];
    changeStatus({ id: jobId, status: newStatus });
  };

  const bucketed_jobs = jobs.reduce<Record<string, Job[]>>((acc, job) => {
    const key = job.status;
    acc[key] = [...(acc[key] || []), job];
    return acc;
  }, {});

  return (
    <div className="div">
      <AddJobModal
        setOpenAddJobModal={setOpenAddJobModal}
        openAddJobModal={openAddJobModal}
      />

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
    </div>
  );
};
