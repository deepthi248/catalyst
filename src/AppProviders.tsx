import { JobsProvider } from "./context/jobsContext";

export function AppProviders({ children }) {
  return <JobsProvider>{children}</JobsProvider>;
}
