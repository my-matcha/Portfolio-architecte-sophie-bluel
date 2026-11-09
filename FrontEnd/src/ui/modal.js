const modal = document.querySelector("#modal");
const galleryView = document.querySelector("#modal-gallery-view");
const formView = document.querySelector("#modal-form-view");
const closeButton = document.querySelector("#modal-close-button");

//  Affiche une vue (gallery ou form) dans la modale et masque l'autre
// Le bouton retour n'apparaît que dans la vue form
function showView(name) {
  gallerView.hidden = name !== "gallery";
  formView.hidden = name !== "form";
  backButton.hidden = name !== "form";
}

export function openModal() {
  showView("gallery"); //on ouvre toujours sur la liste des projets
  modal.hidden = false;
}

export function closeModal() {
  modal.hidden = true;
}
