const categories = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
const filters = document.querySelector(".filter-buttons");

let works = [];

categories.forEach((category) => {
  const button = document.createElement("button");
  console.log(button);

  button.classList.add("filter-button");

  button.textContent = category;
  button.dataset.category = category;

  button.addEventListener("click", () => {
    if (category === "Tous") {
      displayWorks(works);
    } else {
      const filteredWorks = works.filter((work) => {
        return work.category.name === category;
      });

      displayWorks(filteredWorks);
    }
  });

  filters.appendChild(button);
});

const gallery = document.querySelector(".gallery");

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  displayWorks(works);
}

function displayWorks(worksToDisplay) {
  gallery.innerHTML = "";

  worksToDisplay.forEach((work) => {
    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(caption);

    gallery.appendChild(figure);
  });
}

getWorks();
