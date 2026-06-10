import { KanbanColumn } from "./components/KanbanColumn/KanbanColumn";
import { SAMPLE_JOBS } from "./types/jobs";


export default function App() {
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500">Catalyst</h1>
      <KanbanColumn jobCards={SAMPLE_JOBS}/>
    </div>
  );
}
