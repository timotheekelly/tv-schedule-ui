import { toProgramCard } from "./programMapper";

export function toWeeklySchedule(days) {
  return days.map(toDailySchedule);
}

function toDailySchedule(day) {
  const entries = (day.entries ?? [])
    .filter((entry) => entry.content)
    .map((entry) => ({
      slotType: entry.slotType,
      slotLabel: toSlotLabel(entry.slotType),
      content: toProgramCard(entry.content)
    }));

  return {
    day: day.day,
    dayLabel: toDayLabel(day.day),
    entries,
    featureMovie:
      entries.find((entry) => entry.slotType === "FEATURE_MOVIE")?.content ??
      null,
    primaryTvShow:
      entries.find((entry) => entry.slotType === "TV_SHOW_PRIMARY")?.content ??
      null,
    secondaryTvShow:
      entries.find((entry) => entry.slotType === "TV_SHOW_SECONDARY")?.content ??
      null
  };
}

function toSlotLabel(slotType) {
  switch (slotType) {
    case "FEATURE_MOVIE":
      return "Feature Movie";
    case "TV_SHOW_PRIMARY":
      return "First TV Show";
    case "TV_SHOW_SECONDARY":
      return "Second TV Show";
    default:
      return "Scheduled";
  }
}

function toDayLabel(day) {
  switch (day) {
    case "MONDAY":
      return "Monday";
    case "TUESDAY":
      return "Tuesday";
    case "WEDNESDAY":
      return "Wednesday";
    case "THURSDAY":
      return "Thursday";
    case "FRIDAY":
      return "Friday";
    case "SATURDAY":
      return "Saturday";
    case "SUNDAY":
      return "Sunday";
    default:
      return day;
  }
}