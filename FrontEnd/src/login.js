// ------------------------------------------------------
// 1. IMPORT : récupérer l'adresse de l'API
// ------------------------------------------------------
// On va chercher la variable BASE_URL dans un autre fichier (api/baseUrl.js).
// Elle contient l'adresse du serveur qui est "http://localhost:5678/api"
import BASE_URL from "./api/baseUrl.js";
import login from "./api/login.js";

// ------------------------------------------------------
// 2. SÉLECTION DES ÉLÉMENTS HTML
// ------------------------------------------------------
// document.querySelector() permet de récupérer un élément HTML à partir de son sélecteur CSS.
// Le "#" indique qu'on cherche un élément par son id.
// On garde ces éléments dans des variables pour pouvoir les utiliser plus tard.
const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#login-error");

// ------------------------------------------------------
// 3. ÉCOUTER LA SOUMISSION DU FORMULAIRE
// ------------------------------------------------------
// addEventListener() permet d'ajouter un écouteur d'événement sur un élément HTML.
// Ici on surveille l'événement "submit" qui se déclenche quand on clique sur "Se connecter".
// Quand ça arrive,, la fonction fléchée d'exécute.
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  // ------------------------------------------------------
  // 4. RÉCUPÉRER CE QUE L'UTILISATRICE A TAPÉ
  // ------------------------------------------------------
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // ------------------------------------------------------
  // 5. ENVOYER LES DONNÉES À L'API
  // ------------------------------------------------------
  // On utilise fetch() pour envoyer une requête HTTP à l'API.
  // On utilise try/catch pour gérer les erreurs qui peuvent arriver lors de la requête.
  // On utilise await pour attendre la réponse de l'API avant de continuer.
  try {
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

    // ------------------------------------------------------
    // 6. CAS D'ERREUR : identifiant ou mot de passe incorrect
    // ------------------------------------------------------
    if (!response.ok) {
      errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    // redirection vers la page d'accueil après une connexion réussie
    window.location.href = "index.html";
  } catch (error) {
    errorMessage.textContent =
      "Une erreur est survenue. Veuillez réessayer plus tard.";
    console.error("Erreur lors de la connexion :", error);
  }
});
