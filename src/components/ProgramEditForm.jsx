import { useState } from "react";
import "./ProgramEditForm.css";

export function ProgramEditForm({ program, onCancel, onSave }) {
  const [form, setForm] = useState({
    type: program.type ?? "MOVIE",
    title: program.title ?? "",
    description: program.description ?? "",
    posterPath: program.posterPath ?? "",
    backdropPath: program.backdropPath ?? "",
    rottenTomatoesUrl: program.rottenTomatoesUrl ?? "",
    streamingPlatform: program.streamingPlatform ?? ""
  });

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(program.id, form);
  }

  return (
    <section className="program-edit-panel">
      <div className="program-edit-header">
        <div>
          <p className="eyebrow">Edit program</p>
          <h2>{program.title}</h2>
        </div>

        <button type="button" className="secondary-action" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <form className="program-edit-form" onSubmit={handleSubmit}>
        <label>
          <span>Type</span>
          <select
            value={form.type}
            onChange={(event) => updateField("type", event.target.value)}
          >
            <option value="MOVIE">Movie</option>
            <option value="TV_SHOW">TV Show</option>
          </select>
        </label>

        <label>
          <span>Title</span>
          <input
            required
            type="text"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        <label className="full-width">
          <span>Description</span>
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </label>

        <label>
          <span>Poster Path</span>
          <input
            type="text"
            placeholder="/abc123.jpg"
            value={form.posterPath}
            onChange={(event) => updateField("posterPath", event.target.value)}
          />
        </label>

        <label>
          <span>Backdrop Path</span>
          <input
            type="text"
            placeholder="/xyz789.jpg"
            value={form.backdropPath}
            onChange={(event) => updateField("backdropPath", event.target.value)}
          />
        </label>

        <label>
          <span>Rotten Tomatoes URL</span>
          <input
            type="url"
            value={form.rottenTomatoesUrl}
            onChange={(event) =>
              updateField("rottenTomatoesUrl", event.target.value)
            }
          />
        </label>

        <label>
          <span>Streaming Platform</span>
          <input
            type="text"
            placeholder="NETFLIX"
            value={form.streamingPlatform}
            onChange={(event) =>
              updateField("streamingPlatform", event.target.value)
            }
          />
        </label>

        <div className="program-edit-actions full-width">
          <button type="submit" className="primary-action">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}