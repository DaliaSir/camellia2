import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./utils/displayMessage.js";
import { createLoginLink } from "./utils/dynamicMenu.js";
import { noName, noDescription, noPrice, noCategory } from "./components/messages.js";
import { formMessageContainer } from "./components/elements.js";
import { getToken } from "./utils/saveUser.js";
import deleteButton from "./utils/deleteBtn.js";

createLoginLink();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/edit-products.html";
}

let formData = new FormData();

const productUrl = baseUrl + "products/" + id;

const editForm = document.querySelector(".edit-form");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const description = document.querySelector("#description");
const descriptionError = document.querySelector("#descriptionError");
const price = document.querySelector("#price");
const priceError = document.querySelector("#priceError");
const image = document.querySelector("#image");
const imageContainer = document.querySelector(".image-container__image");
const category = document.querySelector("#category");
const categoryError = document.querySelector("#categoryError");
const idInput = document.querySelector("#id");
const featured = document.querySelector("#featuredCheck");
const formMessage = document.querySelector(".form-message");
const updateButton = document.querySelector(".updateButton");
const loader = document.querySelector(".loader");

(async function () {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();

    document.title = "Camellia | Edit " + product.name;
    const breadcrumbName = document.querySelector(".breadcrumb-item.active");
    breadcrumbName.innerHTML = `${product.name}`;

    name.value = product.name;
    price.value = product.price;
    description.value = product.description;
    category.value = product.category.id;
    idInput.value = product.id;

    if (product.featured === true) {
      featured.checked = true;
    }

    imageContainer.innerHTML = `
    <h5>Product Image</h5>
    <div class="image-container__image--product-image" style="background-image: url('${product.image.url}');"></div>
    `

    deleteButton(product.id);

  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".edit-product-container");
  } finally {
    loader.style.display = "none";
    editForm.style.display = "block";
  }
})();

editForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.innerHTML = "";

  nameError.innerHTML = "";
  descriptionError.innerHTML = "";
  priceError.innerHTML = "";
  categoryError.innerHTML = "";

  const nameValue = name.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();
  const categoryValue = category.value.trim();
  const featured = featuredCheck.checked;
  const idValue = idInput.value;

  if (nameValue.length === 0) {
    return displayMessage("form-warning", noName, "#nameError");
  } else if (descriptionValue.length === 0) {
    return displayMessage("form-warning", noDescription, "#descriptionError");
  } else if (priceValue.length === 0 || isNaN(priceValue)) {
    return displayMessage("form-warning", noPrice, "#priceError");
  } else if (categoryValue.length === 0) {
    return displayMessage("form-warning", noCategory, "#categoryError");
  }

  updateProduct(nameValue, descriptionValue, priceValue, featured, categoryValue, idValue);
});

image.addEventListener("change", (e) => {
  const chosenImage = e.target.files;
  console.log(chosenImage);
  if (e.target && e.target.files) {
    formData.append("files.image", chosenImage[0]);
  }
})

async function updateProduct(name, description, price, featured, category, id) {

  const url = baseUrl + "products/" + id;

  const productData = JSON.stringify({ name: name, description: description, price: price, featured: featured, category: category });

  const token = getToken();
  formData.append("data", productData);

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    updateButton.innerHTML = "Updating...";

    if (json.updated_at) {
      displayMessage("success", `Product &quot;${json.name}&quot; Updated&excl;`, formMessageContainer);
      updateButton.innerHTML = "Update";
      window.scrollTo(top);
    }

    if (json.message) {
      displayMessage("error", json.message, formMessageContainer);
      window.scrollTo(top);
    }

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, formMessageContainer);
    window.scrollTo(top);
  }
}