const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const ADMIN_API_ROUTE = "/api/admin/programs";

// /search/movies
export async function fetchTmdbMovies() {
  const response = await fetch(`${API_BASE_URL}${ADMIN_API_ROUTE}/search/movies`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Tmdb Movies: ${response.status}`);
  }

  return response.json();
}