import "./ProgramCard.css";

export function ProgramCard({ program, onEdit, onDelete }) {
  return (
    <article className="program-card">
      <div className="program-poster-frame">
        {program.posterUrl ? (
          <img
            src={program.posterUrl}
            alt={`${program.title} poster`}
            className="program-poster"
          />
        ) : (
          <div className="program-poster-placeholder">
            <span>{program.typeLabel}</span>
          </div>
        )}
      </div>

      <div className="program-card-body">
        <div className="program-card-meta">
          <p className="program-type">{program.typeLabel}</p>

          {program.streamingPlatformLabel && (
            <p className="program-platform">{program.streamingPlatformLabel}</p>
          )}
        </div>

        <h2>{program.title}</h2>

        {program.description && (
          <p className="program-description">{program.description}</p>
        )}

        <div className="program-card-footer">
          {program.rottenTomatoesUrl && (
            <a
              href={program.rottenTomatoesUrl}
              target="_blank"
              rel="noreferrer"
              className="program-link"
            >
              Rotten Tomatoes
            </a>
          )}

          {(onEdit || onDelete) && (
            <div className="program-card-actions">
              {onEdit && (
                <button
                  type="button"
                  className="program-card-action"
                  onClick={() => onEdit(program)}
                >
                  Edit
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  className="program-card-action danger"
                  onClick={() => onDelete(program)}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}