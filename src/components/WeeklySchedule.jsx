import { ProgramCard } from "./ProgramCard";
import "./WeeklySchedule.css";

export function WeeklySchedule({ schedule }) {
  return (
    <section className="weekly-schedule" aria-label="Weekly schedule">
      {schedule.map((daySchedule) => (
        <article className="schedule-day" key={daySchedule.day}>
          <header className="schedule-day-header">
            <p className="eyebrow">Now showing</p>
            <h2>{daySchedule.dayLabel}</h2>
          </header>

          <div className="schedule-row">
            <div className="schedule-feature">
              <p className="schedule-label">Feature Movie</p>

              {daySchedule.featureMovie ? (
                <ProgramCard program={daySchedule.featureMovie} />
              ) : (
                <div className="schedule-missing">
                  <p>No feature movie scheduled.</p>
                </div>
              )}
            </div>

            <div className="schedule-tv-list">
              <p className="schedule-label">TV Shows</p>

              <div className="schedule-tv-grid">
                {daySchedule.primaryTvShow ? (
                  <ProgramCard program={daySchedule.primaryTvShow} />
                ) : (
                  <div className="schedule-missing">
                    <p>No primary TV show scheduled.</p>
                  </div>
                )}

                {daySchedule.secondaryTvShow ? (
                  <ProgramCard program={daySchedule.secondaryTvShow} />
                ) : (
                  <div className="schedule-missing">
                    <p>No secondary TV show scheduled.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}