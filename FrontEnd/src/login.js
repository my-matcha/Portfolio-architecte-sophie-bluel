// ------------------------------------------------------
// 1. IMPORT : récupérer l'adresse de l'API
// ------------------------------------------------------
// On va chercher la variable BASE_URL dans un autre fichier (api/baseUrl.js).
// Elle contient l'adresse du serveur qui est "http://localhost:5678/api"
import { login } from "./api/auth.js";

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

  try {
    // ------------------------------------------------------
    // 5. APPELER L'API (via api/login.js)
    // ------------------------------------------------------
    const data = await login(email, password);

    // ------------------------------------------------------
    // 6. CAS D'ERREUR : identifiant ou mot de passe incorrect
    // ------------------------------------------------------
    if (!data) {
      errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
      return;
    }

    // ------------------------------------------------------
    // 7. CAS DE SUCCÈS : connexion réussie
    // ------------------------------------------------------
    // Le token a déjà été stocké dans le localStorage par la fonction login() de api/auth.js
    window.location.href = "index.html";
  } catch (error) {
    // ───────────────────────────────────────
    // 8. CAS DE PANNE : problème technique
    // ───────────────────────────────────────
    errorMessage.textContent =
      "Une erreur est survenue. Veuillez réessayer plus tard.";
    console.error("Erreur lors de la connexion :", error);
  }
});
