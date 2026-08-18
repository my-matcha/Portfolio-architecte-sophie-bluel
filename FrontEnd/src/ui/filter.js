const filters = document.querySelector(".filter-buttons");

export function displayFilters(categories, onCategorySelected) {
  categories.forEach((category) => {
    const button = document.createElement("button");

    button.classList.add("filter-button");

    button.textContent = category.name;
    button.dataset.category = category.id;

    button.addEventListener("click", () => {
      onCategorySelected(category.id);
    });

    filters.appendChild(button);
  });
}
