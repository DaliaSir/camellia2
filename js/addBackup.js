import { createLoginLink } from "./utils/dynamicMenu.js";
import { baseUrl } from "./components/baseUrl.js";
import { formMessageContainer } from "./components/elements.js";
import { displayMessage } from "./utils/displayMessage.js";
import { noName, noDescription, noPrice, noImage, addedProduct } from "./components/messages.js";
import { getToken } from "./utils/saveUser.js";

createLoginLink();

const addForm = document.querySelector(".add-form");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const featured = document.querySelector("#featuredCheck");
const image = document.querySelector("#image");
const category = document.querySelector("#category");
const formMessage = document.querySelector(".form-message");

image.addEventListener("change", (e) => {
  const chosenImage = e.target.files;
  console.log(chosenImage);
})

addForm.addEventListener("submit", e => {
  e.preventDefault();

  formMessage.innerHTML = "";

  const nameValue = name.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();
  const imageValue = chosenImage[0];
  const featured = featuredCheck.checked;
  const categoryValue = category.value.trim();


  if (nameValue.length === 0) {
    return displayMessage("warning", noName, formMessageContainer);
  } else if (descriptionValue.length === 0) {
    return displayMessage("warning", noDescription, formMessageContainer);
  } else if (priceValue.length === 0 || isNaN(priceValue)) {
    return displayMessage("warning", noPrice, formMessageContainer);
  } else if (imageValue.length === 0) {
    return displayMessage("warning", noImage, formMessageContainer);
  } else if (categoryValue.length === 0) {
    return displayMessage("warning", noName, formMessageContainer);
  }

  addProduct(nameValue, descriptionValue, priceValue, featured, imageValue, category);

});

async function addProduct(name, description, price, featured, image, category) {
  const url = baseUrl + "products";

  const productData = JSON.stringify({ name: name, description: description, price: price, featured: featured, image: image, category: category });

  const token = getToken();

  const options = {
    method: "POST",
    body: productData,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    // if (featured) {
    //   json.categories[0].name = "featured";
    //   json.categories[0].slug = "featured";
    // }

    if (json.date_created) {
      displayMessage("success", addedProduct, formMessageContainer);
      addForm.reset();
    }

    if (json.message) {
      displayMessage("error", json.message, formMessageContainer);
    }

  } catch (error) {
    console.log(error);
    displayMessage("error", error, formMessageContainer);
  }

}