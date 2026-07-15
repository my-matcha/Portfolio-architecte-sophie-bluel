document.addEventListener("DOMContentLoaded", () => {
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
});

// const categories = [
//   {
//     id: 1,
//     name: "Landscape",
//   },
//   {
//     id: 2,
//     name: "Portrait",
//   },
//   {
//     id: 3,
//     name: "Accomodation",
//   },
// ];

// const works = [
//   {
//     id: 1,
//     title: "Landscape",
//     image: "assets/landscape.jpg",
//     categoryId: 1,
//   },
//   {
//     id: 2,
//     title: "Portrait",
//     image: "assets/portrait.jpg",
//     categoryId: 2,
//   },
//   {
//     id: 3,
//     title: "Accomodation",
//     image: "assets/accomodation.jpg",
//     categoryId: 3,
//   },
// ];
