import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./utils/displayMessage.js";
import { addToCart } from "./addToCart.js";
import { createLoginLink } from "./utils/dynamicMenu.js";

createLoginLink();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);

    document.title = "Camellia | " + details.name;
    const breadcrumbName = document.querySelector(".breadcrumb-item.active");
    breadcrumbName.innerHTML = `${details.name}`;

    const detailsContainer = document.querySelector(".details-container__product-details");

    detailsContainer.innerHTML = `
      <div class="col-12 col-md-8">
        <div class="details-container__product-details--image card-img-top" style="background-image: url('${details.image.url}');"></div>
      </div>
      <div class="col-12 col-md-4 details-container__product-details--text">
        <div>
          <h1>${details.name}</h1>
          <p>${details.description}</p>
          <p class="details-price">&#36; ${details.price}</p>
        </div>  
        <a class="btn details-container__product-details--addCart-btn" id="addToCartBtn" data-bs-toggle="modal" data-bs-target="#addCartModal" data-id="${details.id}" data-name="${details.name}" data-price="${details.price}" data-image="${details.image.url}">Add To Cart</a>
      </div>`;
    addToCart();

  } catch (error) {
    displayMessage("error", error, ".details-container_product-details");
  }
})();


