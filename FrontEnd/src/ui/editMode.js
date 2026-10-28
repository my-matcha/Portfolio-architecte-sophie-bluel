// Affiche ou masque le mode édition.
// isEditMode : true pour afficher le mode édition, false pour le masquer.
// onLogout : fonction à appeler quand l'utilisatrice se déconnecte (clic sur "logout").
export function displayEditMode(isEditMode, onLogout) {
  // Le bandeau noir et le bouton "modifier" : visibles seulement en mode édition
  document.querySelector("#edit-banner").hidden = !isEditMode;
  document.querySelector("#edit-button").hidden = !isEditMode;
  document.querySelector("#filter-buttons").hidden = isEditMode;

  const loginLink = document.querySelector("#login-link");

  if (isEditMode) {
    loginLink.textContent = "logout";
    loginLink.onclick = (event) => {
      event.preventDefault(); // on reste sur la page au lieu d'aller sur login.html
      onLogout(); // on prévient main.js que l'utilisatrice veut se déconnecter
    };
  } else {
    loginLink.textContent = "login";
    loginLink.onclick = null; // le lien redirige normalement vers login.html
  }
}
