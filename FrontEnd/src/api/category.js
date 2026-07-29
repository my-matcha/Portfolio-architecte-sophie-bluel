import BASE_URL from "./baseUrl.js";

export async function loadCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return response.json();
}
