import "./LibraryToolbar.css";

export function LibraryToolbar({
  selectedType,
  onSelectedTypeChange,
  searchTerm,
  onSearchTermChange
}) {
  return (
    <section className="toolbar" aria-label="Library controls">
      <div className="filter-bar" aria-label="Filter by program type">
        <button
          className={selectedType === "ALL" ? "active" : ""}
          type="button"
          onClick={() => onSelectedTypeChange("ALL")}
        >
          All
        </button>

        <button
          className={selectedType === "MOVIE" ? "active" : ""}
          type="button"
          onClick={() => onSelectedTypeChange("MOVIE")}
        >
          Movies
        </button>

        <button
          className={selectedType === "TV_SHOW" ? "active" : ""}
          type="button"
          onClick={() => onSelectedTypeChange("TV_SHOW")}
        >
          TV Shows
        </button>
      </div>

      <label className="search-field">
        <span>Search library</span>
        <input
          type="search"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </label>
    </section>
  );
}