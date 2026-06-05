const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function parseResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Program request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchPrograms(type) {
  const params = new URLSearchParams();

  if (type && type !== "ALL") {
    params.set("type", type);
  }

  const queryString = params.toString();

  const url = queryString
    ? `${API_BASE_URL}/api/programs?${queryString}`
    : `${API_BASE_URL}/api/programs`;

  const response = await fetch(url);
  return parseResponse(response);
}

export async function updateProgram(id, program) {
  const response = await fetch(`${API_BASE_URL}/api/programs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(program)
  });

  return parseResponse(response);
}