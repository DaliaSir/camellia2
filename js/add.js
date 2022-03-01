import { createLoginLink } from "./utils/dynamicMenu.js";
import { baseUrl } from "./components/baseUrl.js";
import { formMessageContainer } from "./components/elements.js";
import { displayMessage } from "./utils/displayMessage.js";
import { noName, noDescription, noPrice, noImage, noCategory, addedProduct, errorAddProduct } from "./components/messages.js";
import { getToken } from "./utils/saveUser.js";

createLoginLink();

const addForm = document.querySelector(".add-form");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const description = document.querySelector("#description");
const descriptionError = document.querySelector("#descriptionError");
const price = document.querySelector("#price");
const priceError = document.querySelector("#priceError");
const image = document.querySelector("#image");
const imageError = document.querySelector("#imageError");
const category = document.querySelector("#category");
const categoryError = document.querySelector("#categoryError");
const formMessage = document.querySelector(".form-message");
const addButton = document.querySelector(".addButton");

let formData = new FormData();

image.addEventListener("change", (e) => {
  const chosenImage = e.target.files;
  if (e.target && e.target.files) {
    formData.append("files.image", chosenImage[0]);
  }
})

addForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.innerHTML = "";

  nameError.innerHTML = "";
  descriptionError.innerHTML = "";
  priceError.innerHTML = "";
  imageError.innerHTML = "";
  categoryError.innerHTML = "";

  const nameValue = name.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();
  const featured = featuredCheck.checked;
  const categoryValue = category.value.trim();


  if (nameValue.length === 0) {
    return displayMessage("form-warning", noName, "#nameError");
  } else if (descriptionValue.length === 0) {
    return displayMessage("form-warning", noDescription, "#descriptionError");
  } else if (priceValue.length === 0 || isNaN(priceValue)) {
    return displayMessage("form-warning", noPrice, "#priceError");
  } else if (image.files.length === 0) {
    return displayMessage("form-warning", noImage, "#imageError");
  } else if (categoryValue.length === 0) {
    return displayMessage("form-warning", noCategory, "#categoryError");
  }

  addProduct(nameValue, descriptionValue, priceValue, featured, categoryValue);
});

async function addProduct(name, description, price, featured, category) {
  const url = baseUrl + "products";

  const productData = JSON.stringify({ name: name, description: description, price: price, featured: featured, category: category });

  const token = getToken();
  formData.append("data", productData);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    addButton.innerHTML = "Adding...";

    if (json.created_at) {
      displayMessage("success", addedProduct, formMessageContainer);
      addButton.innerHTML = "Add";
      window.scrollTo(top);
      addForm.reset();
    }

    if (json.message) {
      displayMessage("error", json.message, formMessageContainer);
      window.scrollTo(top);
    }

  } catch (error) {
    console.log(error);
    displayMessage("error", errorAddProduct, formMessageContainer);
    window.scrollTo(top);
  }

}