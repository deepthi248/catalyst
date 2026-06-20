import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="app-sidebar">
      <div className="app-logo">
        Cat<span>a</span>lyst
      </div>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "sidebar-item active" : "sidebar-item"
        }
      >
        <span className="sidebar-icon">⊞</span>
        My Pipeline
      </NavLink>

      <div className="sidebar-divider" />

      <div className="ai_tools">
        <div className="sidebar-section-label">AI Tools</div>
        <NavLink
          to="/documents"
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <span className="sidebar-icon">◻</span>
          Documents
        </NavLink>
      </div>
    </div>
  );
};
