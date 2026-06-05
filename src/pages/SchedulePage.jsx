import { WeeklySchedule } from "../components/WeeklySchedule";

export function SchedulePage({ schedule }) {
  if (schedule.length === 0) {
    return (
      <section className="empty-state">
        <p className="eyebrow">No schedule</p>
        <h2>No schedule generated</h2>
        <p>The backend returned an empty schedule.</p>
      </section>
    );
  }

  return <WeeklySchedule schedule={schedule} />;
}