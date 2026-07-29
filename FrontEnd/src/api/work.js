import BASE_URL from "./baseUrl.js";

export async function loadWorks() {
  const response = await fetch(`${BASE_URL}/works`);
  return response.json();
}
