import { loadCategories } from "./api/category.js";
import { displayWorks } from "./ui/gallery.js";
import { createWorkState } from "./models/workState.js";
import { displayFilters } from "./ui/filter.js";
import { createCategoryState } from "./models/categoryState.js";
import { isAuthenticated, logout } from "./api/auth.js";
import { displayEditMode } from "./ui/editMode.js";
import {
  openModal,
  displayModalWorks,
  displayCategoryOptions,
  showView,
  resetForm,
} from "./ui/modal.js";
import { loadWorks, deleteWork, addWork } from "./api/work.js";

let categoryState;
let workState;

// Appelée au clic sur le lien "login" ou "logout" :
// si on est connecté, on supprime le token et on repasse en affichage visiteur
// (sans recharger la page)/ Sinon, le lien va vers login.html
function handleLoginLinkClick(event) {
  if (isAuthenticated()) {
    event.preventDefault(); //on reste sur la page
    logout();
    displayEditMode(false, handleLoginLinkClick);
  }
  // Sinon, on ne fait rien : le lien va rediriger vers login.html
}

async function init() {
  displayEditMode(isAuthenticated(), handleLoginLinkClick);

  const apiCategories = await loadCategories();

  displayCategoryOptions(apiCategories);

  categoryState = createCategoryState([
    { id: null, name: "Tous" },
    ...apiCategories,
  ]);

  workState = createWorkState(await loadWorks());

  displayWorks(workState.all());

  displayFilters(categoryState.all(), (categoryId) => {
    displayWorks(workState.fromCategory(categoryId));
  });

  const editButton = document.querySelector("#edit-button");
  editButton.addEventListener("click", openModal);
  displayModalWorks(workState.all(), handleDeleteWork);
  openModal(); // Ouvre la modale au chargement de la page

  document
    .querySelector("#add-work-form")
    .addEventListener("submit", handleAddWork); // On écoute la soumission du formulaire d'ajout de projet
}

async function handleDeleteWork(workId) {
  try {
    await deleteWork(workId);
    workState.remove(workId);
    displayWorks(workState.all());
    displayModalWorks(workState.all(), handleDeleteWork);
    displayWorks(workState.all());
  } catch (error) {
    console.error(error);
    alert("La suppression a échoué.");
  }
}

async function handleAddWork(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const errorMessage = document.querySelector("#add-work-error");
  const image = document.querySelector("#work-image").files[0];
  const title = document.querySelector("#work-title").value;
  const categoryId = document.querySelector("#work-category").value;

  // 1. Validation des champs du formulaire
  if (!image || !title || !categoryId) {
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    errorMessage.hidden = false;
    return;
  }

  if (image.size > 4 * 1024 * 1024) {
    errorMessage.textContent = "L'image ne doit pas dépasser 4 Mo.";
    errorMessage.hidden = false;
    return;
  }
  errorMessage.hidden = true; // On cache le message d'erreur si tout est bon

  // 2. Création d'un FormData pour envoyer les données à l'API
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", categoryId);

  try {
    await addWork(formData);

    // 3. Si l'ajout est réussi, on recharge la liste des travaux et on met à jour l'affichage
    workState = createWorkState(await loadWorks());
    displayWorks(workState.all());
    displayModalWorks(workState.all(), handleDeleteWork);

    resetForm();
    showView("gallery"); // On revient à la vue galerie après l'ajout
  } catch (error) {
    console.error(error);
    errorMessage.textContent =
      "Erreur lors de l'ajout du projet. Veuillez réessayer.";
    errorMessage.hidden = false;
  }
}

init();
