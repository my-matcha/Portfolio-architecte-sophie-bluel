import BASE_URL from "./baseUrl.js";
import { getToken } from "./auth.js";

//Fabrique une erreur qui garde le code de la réponse (401, 404, 500...)
function createRequestError(message, response) {
  const error = new Error(message);
  error.response = response.status;
  return error;
}

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
    throw createRequestError(
      "Erreur lors de la suppression du projet",
      response,
    );
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
    throw createRequestError("Erreur lors de l'ajout du projet", response);
  }

  return response.json();
}
