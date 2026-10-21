import { loadCategories } from "./api/category.js";
import { loadWorks } from "./api/work.js";
import { displayWorks } from "./ui/gallery.js";
import { createWorkState } from "./models/workState.js";
import { displayFilters } from "./ui/filter.js";
import { createCategoryState } from "./models/categoryState.js";
import { setupEditMode } from "./ui/editMode.js";

let categoryState;
let workState;

// Exemple d'orchestration par main.js pour l'affichage des filtres avec un callback pour être prévenu de quand une catégorie est cliquée
// filterUI.init(categories, function(category_id) {
//   displayWorks(workState.fromCategory(category_id));
// });

// filterUI.init(categories);
// filterUI.onCategorySelected(function(category_id) {
//   displayWorks(workState.fromCategory(category_id));
// })

async function init() {
  const isLoggedIn = setupEditMode();

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
