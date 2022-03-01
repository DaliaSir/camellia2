import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./utils/displayMessage.js";
import { createLoginLink } from "./utils/dynamicMenu.js";

createLoginLink();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/edit-products.html";
}

const productUrl = baseUrl + "products/" + id;
console.log(productUrl);

(async function () {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();

    document.title = "Camellia | " + product.name;
    const breadcrumbName = document.querySelector(".breadcrumb-item.active");
    breadcrumbName.innerHTML = `${product.name}`;

    console.log(product.name);

  } catch (error) {
    displayMessage("error", error, ".details-container_product-details");
  }
})();
