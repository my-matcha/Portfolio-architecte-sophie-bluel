const modal = document.querySelector("#modal");
const closeButton = modal.querySelector(".modal-close-button");

const galleryView = document.querySelector("#modal-gallery-view");
const formView = document.querySelector("#modal-form-view");

//  Affiche une vue (gallery ou form) dans la modale et masque l'autre
// Le bouton retour n'apparaît que dans la vue form
function showView(name) {
  switch (name) {
    case "gallery":
      galleryView.hidden = false;
      closeButton.hidden = false;
      formView.hidden = true;
      break;
    case "form":
      galleryView.hidden = true;
      closeButton.hidden = true;
      formView.hidden = false;
      break;
  }
}

export function openModal() {
  showView("gallery"); //on ouvre toujours sur la liste des projets
  modal.hidden = false;
}

export function closeModal() {
  modal.hidden = true;
}
