const categories = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
const filters = document.querySelector(".filter-buttons");

categories.forEach((category) => {
  const button = document.createElement("button");
  console.log(button);

  button.classList.add("filter-button");

  button.textContent = category;

  filters.appendChild(button);
});

const gallery = document.querySelector(".gallery");

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();

  works.forEach((work) => {
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
