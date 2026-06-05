import { useMemo, useState } from "react";
import { updateProgram } from "../api/programsApi";
import { toProgramCards } from "../mappers/programMapper";
import { ProgramCard } from "../components/ProgramCard";
import { ProgramEditForm } from "../components/ProgramEditForm";
import { LibraryToolbar } from "../components/LibraryToolbar";
import "./LibraryPage.css";

export function LibraryPage({ programs, onProgramUpdated }) {
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProgram, setEditingProgram] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const visiblePrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesType =
        selectedType === "ALL" || program.type === selectedType;

      const matchesSearch = (program.title ?? "")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [programs, selectedType, searchTerm]);

  function handleEditProgram(program) {
    setEditingProgram(program);
    setErrorMessage(null);
  }

  function handleCancelEdit() {
    setEditingProgram(null);
    setErrorMessage(null);
  }

  async function handleSaveProgram(id, form) {
    try {
      const updatedProgram = await updateProgram(id, form);
      const [updatedProgramCard] = toProgramCards([updatedProgram]);

      onProgramUpdated(updatedProgramCard);

      setEditingProgram(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <LibraryToolbar
        selectedType={selectedType}
        onSelectedTypeChange={setSelectedType}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      {errorMessage && (
        <section className="inline-error" role="alert">
          <p>{errorMessage}</p>
        </section>
      )}

      {editingProgram && (
        <ProgramEditForm
          program={editingProgram}
          onCancel={handleCancelEdit}
          onSave={handleSaveProgram}
        />
      )}

      {visiblePrograms.length === 0 ? (
        <section className="empty-state">
          <p className="eyebrow">No results</p>
          <h2>No programs found</h2>
          <p>
            Try changing the filter or clearing the search term to see more from
            the library.
          </p>
        </section>
      ) : (
        <section className="program-grid" aria-label="Program library">
          {visiblePrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onEdit={handleEditProgram}
            />
          ))}
        </section>
      )}
    </>
  );
}