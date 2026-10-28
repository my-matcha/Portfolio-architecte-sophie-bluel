// Affiche ou masque le mode édition.
// isEditMode : true pour afficher le mode édition, false pour le masquer.
// onLogout : fonction à appeler quand l'utilisatrice se déconnecte (clic sur "logout").

let onLogoutCallback = function() {}

function onLogout(event) {
  event.preventDefault();
  console.log('EVENEMENT CLICK SUR LOGOUT LINK')
  onLogoutCallback();
}

export function displayEditMode(isEditMode, callback) {
  if (callback) onLogoutCallback = callback;

  // Le bandeau noir et le bouton "modifier" : visibles seulement en mode édition
  const editBannerElement = document.querySelector("#edit-banner"),
    editButtonElement = document.querySelector("#edit-button"),
    filterButtonsElement = document.querySelector("#filter-buttons");

  editBannerElement.hidden = !isEditMode;
  editButtonElement.hidden = !isEditMode;
  
  if (filterButtonsElement)
    filterButtonsElement.hidden = isEditMode;

  const loginLink = document.querySelector("#login-link");

  if (isEditMode) {
    loginLink.textContent = "logout";
    
    loginLink.removeEventListener("click", onLogout) // On évite que plusieurs évènements se lancent
    loginLink.addEventListener("click", onLogout);
  } else {
    loginLink.textContent = "login";
    loginLink.onclick = null; // le lien redirige normalement vers login.html
  }
}
