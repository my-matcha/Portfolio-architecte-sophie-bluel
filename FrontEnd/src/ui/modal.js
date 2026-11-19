const modal = document.querySelector("#modal");
const closeButton = modal.querySelector(".modal-close-button");
const backButton = modal.querySelector(".modal-back-button");
const galleryView = document.querySelector("#modal-gallery-view");
const formView = document.querySelector("#modal-form-view");
const gallery = galleryView.querySelector("#modal-gallery");
const addButton = galleryView.querySelector("#modal-add");

//  Affiche une vue (gallery ou form) dans la modale et masque l'autre
// Le bouton retour n'apparaît que dans la vue form
function showView(name) {
  switch (name) {
    case "gallery":
      galleryView.hidden = false;
      formView.hidden = true;
      backButton.hidden = true;
      break;
    case "form":
      galleryView.hidden = true;
      formView.hidden = false;
      backButton.hidden = false;
      break;
  }
}

export function displayModalWorks(works, onDeleteWork) {
  gallery.innerHTML = ""; // On vide la galerie avant de la remplir

  for (const work of works) {
    const figure = document.createElement("figure");
    figure.classList.add("modal-work");

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("modal-delete");
    deleteButton.setAttribute("aria-label", "Supprimer le projet");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.addEventListener("click", () => {
      onDeleteWork(work.id);
    });

    figure.appendChild(image);
    figure.appendChild(deleteButton);

    gallery.appendChild(figure);
  }
}

export function openModal() {
  showView("gallery"); //on ouvre toujours sur la liste des projets
  modal.hidden = false;
}

export function closeModal() {
  modal.hidden = true;
}

// Les boutons de la modale
closeButton.addEventListener("click", closeModal);
backButton.addEventListener("click", () => showView("gallery"));
addButton.addEventListener("click", () => showView("form"));
