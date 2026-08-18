import { loadCategories } from "./api/category.js";
import { loadWorks } from "./api/work.js";
import { displayWorks } from "./ui/gallery.js";
import { createWorkState } from "./models/workState.js";
import { displayFilters } from "./ui/filter.js";

let categories = [{ id: null, name: "Tous" }];
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
  const apiCategories = await loadCategories();
  categories = [...categories, ...apiCategories];

  workState = createWorkState(await loadWorks());

  displayWorks(workState.all());
  displayFilters(categories, (categoryId) => {
    displayWorks(workState.fromCategory(categoryId));
  });
}

init();
