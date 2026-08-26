import BASE_URL from "./api/baseUrl.js";

const form = document.querySelector("#login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  console.log(email);
  console.log(password);
});
