import { loadCategories } from "./api/category.js";
import { loadWorks } from "./api/work.js";
import { displayWorks } from "./ui/gallery.js";
import { createWorkState } from "./models/workState.js";
import { displayFilters } from "./ui/filter.js";
import { createCategoryState } from "./models/categoryState.js";
import { setupEditMode } from "./ui/editMode.js";

let categoryState;
let workState;

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
