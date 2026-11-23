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
} from "./ui/modal.js";
import { loadWorks, deleteWork } from "./api/work.js";

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
    alert("La su.");
  }
}

init();
