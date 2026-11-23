import BASE_URL from "./baseUrl.js";
import { getToken } from "./auth.js";

export async function loadWorks() {
  const response = await fetch(`${BASE_URL}/works`);
  return response.json();
}

export async function deleteWork(workId) {
  const response = await fetch(`${BASE_URL}/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du projet");
  }
}

export async function addWork(formData) {
  const response = await fetch(`${BASE_URL}/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // pas de "Content-Type" ici car on envoie un FormData, le navigateur gère ça automatiquement
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du projet");
  }

  return response.json();
}
