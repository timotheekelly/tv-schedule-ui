import "./ViewTabs.css";

export function ViewTabs({ activeView, onViewChange }) {
  return (
    <div className="view-tabs" aria-label="View selector">
      <button
        className={activeView === "SCHEDULE" ? "active" : ""}
        type="button"
        onClick={() => onViewChange("SCHEDULE")}
      >
        Schedule
      </button>

      <button
        className={activeView === "LIBRARY" ? "active" : ""}
        type="button"
        onClick={() => onViewChange("LIBRARY")}
      >
        Library
      </button>
    </div>
  );
}