import { loadCategories } from "./api/category.js";
import { loadWorks } from "./api/work.js";
import { displayWorks } from "./ui/gallery.js";
import { createWorkState } from "./models/workState.js";
import { displayFilters } from "./ui/filter.js";
import { createCategoryState } from "./models/categoryState.js";
import { isAuthenticated, logout } from "./api/auth.js";
import { displayEditMode } from "./ui/editMode.js";

let categoryState;
let workState;

// Appelée quand on clique sur "logout" :
// on supprime le token, puis on remet l'affichage visiteur (sans recharger la page)
function handleLogout() {
  logout();
  displayEditMode(isAuthenticated(), handleLogout);
}

async function init() {
  displayEditMode(isAuthenticated(), handleLogout);

  const apiCategories = await loadCategories();

  categoryState = createCategoryState([
    { id: null, name: "Tous" },
    ...apiCategories,
  ]);

  workState = createWorkState(await loadWorks());

  displayWorks(workState.all());

  // Les filtres ne s'affichent que pour les visiteurs connectés (mode édition)
  if (!isLoggedIn) {
    displayFilters(categoryState.all(), (categoryId) => {
      displayWorks(workState.fromCategory(categoryId));
    });
  }
}

init();
