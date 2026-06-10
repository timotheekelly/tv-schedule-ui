const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function fetchSchedule() {
  const response = await fetch(`${API_BASE_URL}/api/schedules`, { credentials: "include" });

  if (!response.ok) {
    throw new Error(`Failed to fetch schedule: ${response.status}`);
  }

  return response.json();
}