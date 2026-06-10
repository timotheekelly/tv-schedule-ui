const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export function getLoginUrl() {
  return `${API_BASE_URL}/oauth2/authorization/google`;
}

export async function fetchCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
    credentials: "include"
  });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

export async function logout() {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
}
