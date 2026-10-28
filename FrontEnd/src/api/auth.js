import BASE_URL from "./baseUrl.js";

const TOKEN_KEY = "token";

// Envoie email + mot de passe à l'API pour se connecter
// Retourne true si la connexion est réussie, false sinon
// Si le serveur est injoignable, fetch() lève une erreur
export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  return true;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}
