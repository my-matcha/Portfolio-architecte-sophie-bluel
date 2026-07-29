import { loadCategories } from "./api/category.js";
import { loadWorks } from "./api/work.js";
import { displayWorks } from "./ui/gallery.js";
import { createWorkState } from "./models/workState.js";

const filters = document.querySelector(".filter-buttons");

let categories = [{ id: null, name: "Tous" }];
let workState;

function displayCategories(categories) {
  categories.forEach((category) => {
    const button = document.createElement("button");
    console.log(button);

    button.classList.add("filter-button");

    button.textContent = category.name;
    button.dataset.category = category.id;

    button.addEventListener("click", () => {
      displayWorks(workState.fromCategory(category.id));
    });

    filters.appendChild(button);
  });
}

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
  displayCategories(categories);
}

init();
