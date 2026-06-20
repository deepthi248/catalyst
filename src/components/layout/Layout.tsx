import { Outlet } from "react-router-dom";
import { SideBar } from "../sidebar/SideBar";

export function Layout() {
  return (
    <div className="app-shell">
      <SideBar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
