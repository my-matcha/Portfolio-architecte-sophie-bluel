// Affiche les élements d'édition si l'utilsatrice est connectée.
// Retourne true si elle est connectée, false sinon.
export function setupEditMode() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  // On révèle les éléments d'édition si l'utilisatrice est connectée (cachés par défaut dans le HTML avec l'attribut hidden)
  document.querySelector("#edit-banner").hidden = false;
  document.querySelector("#edit-button").hidden = false;

  // "login" devient "logout" et on supprime le token du localStorage quand on clique dessus
  const logoutLink = document.querySelector("#login-link");

  logoutLink.textContent = "logout";
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  });

  return true;
}
