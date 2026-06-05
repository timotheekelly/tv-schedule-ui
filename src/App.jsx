import { useEffect, useState } from "react";
import { fetchPrograms } from "./api/programsApi";
import { fetchSchedule } from "./api/schedulesApi";
import { toProgramCards } from "./mappers/programMapper";
import { toWeeklySchedule } from "./mappers/scheduleMapper";
import { AppHeader } from "./components/AppHeader";
import { ViewTabs } from "./components/ViewTabs";
import { SchedulePage } from "./pages/SchedulePage";
import { LibraryPage } from "./pages/LibraryPage";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/status.css";

function replaceProgram(program, updatedProgram) {
  if (program?.id !== updatedProgram.id) {
    return program;
  }

  return {
    ...program,
    ...updatedProgram
  };
}

function App() {
  const [programs, setPrograms] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [activeView, setActiveView] = useState("SCHEDULE");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [programData, scheduleData] = await Promise.all([
          fetchPrograms(),
          fetchSchedule()
        ]);

        setPrograms(toProgramCards(programData));
        setSchedule(toWeeklySchedule(scheduleData));
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  function handleProgramUpdated(updatedProgram) {
    setPrograms((currentPrograms) =>
      currentPrograms.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program
      )
    );

    setSchedule((currentSchedule) =>
      currentSchedule.map((day) => {
        const updatedEntries = day.entries.map((entry) => ({
          ...entry,
          content: replaceProgram(entry.content, updatedProgram)
        }));

        return {
          ...day,
          entries: updatedEntries,
          featureMovie: replaceProgram(day.featureMovie, updatedProgram),
          primaryTvShow: replaceProgram(day.primaryTvShow, updatedProgram),
          secondaryTvShow: replaceProgram(day.secondaryTvShow, updatedProgram)
        };
      })
    );
  }

  if (loading) {
    return (
      <main className="page">
        <section className="status-panel">
          <p className="eyebrow">Media Scheduler</p>
          <h1>Loading your schedule...</h1>
          <p>Checking the shelves and setting up the week.</p>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="page">
        <section className="status-panel">
          <p className="eyebrow">Media Scheduler</p>
          <h1>Something went wrong</h1>
          <p>{errorMessage}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <AppHeader
        activeView={activeView}
        scheduleCount={schedule.length}
        programCount={programs.length}
      />

      <ViewTabs activeView={activeView} onViewChange={setActiveView} />

      {activeView === "SCHEDULE" ? (
        <SchedulePage schedule={schedule} />
      ) : (
        <LibraryPage
          programs={programs}
          onProgramUpdated={handleProgramUpdated}
        />
      )}
    </main>
  );
}

export default App;