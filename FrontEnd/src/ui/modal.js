const modal = document.querySelector("#modal");
const closeButton = modal.querySelector(".modal-close-button");
const backButton = modal.querySelector(".modal-back-button");
const galleryView = document.querySelector("#modal-gallery-view");
const formView = document.querySelector("#modal-form-view");
const gallery = galleryView.querySelector("#modal-gallery");
const addButton = galleryView.querySelector("#modal-add");
const form = formView.querySelector("#add-work-form");
const imageInput = form.querySelector("#work-image");
const preview = form.querySelector("#work-image-preview");
const placeholder = form.querySelector("#photo-upload-placeholder");
const categorySelect = form.querySelector("#work-category");

//  Affiche une vue (gallery ou form) dans la modale et masque l'autre
// Le bouton retour n'apparaît que dans la vue form
export function showView(name) {
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

// Remplit le select avec les catégories reçues de l'API
export function displayCategoryOptions(categories) {
  categorySelect.innerHTML = ""; // On vide le select avant de le remplir

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "Sélectionner une catégorie";
  categorySelect.appendChild(emptyOption);

  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  }
}
// Affiche l'aperçu de l'image sélectionnée dans le formulaire
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) return; // Si aucun fichier n'est sélectionné, on ne fait rien

  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  placeholder.hidden = true;
});

// Vide le formulaire et réinitialise l'aperçu de l'image
export function resetForm() {
  form.reset();
  preview.src = "";
  preview.hidden = true;
  placeholder.hidden = false;
}
