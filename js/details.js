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

const productUrl = baseUrl + "products/" + id + "?populate=*";

(async function () {
  try {
    const response = await fetch(productUrl);
    const json = await response.json();
    const details = json.data;
    console.log(details);

    document.title = "Camellia | " + details.attributes.name;
    const breadcrumbName = document.querySelector(".breadcrumb-item.active");
    breadcrumbName.innerHTML = `${details.attributes.name}`;

    const detailsContainer = document.querySelector(".details-container__product-details");


    detailsContainer.innerHTML = `
      <div class="col-12 col-md-8">
        <div class="details-container__product-details--image card-img-top" style="background-image: url('${details.attributes.image.data.attributes.url}');"></div>
      </div>
      <div class="col-12 col-md-4 details-container__product-details--text">
        <div>
          <h1>${details.attributes.name}</h1>
          <p>${details.attributes.description}</p>
          <p class="details-price">&#36; ${details.attributes.price} </p>
        </div>  
        <a class="btn details-container__product-details--addCart-btn" 
        id="addToCartBtn" data-bs-toggle="modal" 
        data-bs-target="#addCartModal" 
        data-id="${details.id}" 
        data-name="${details.attributes.name}" 
        data-price="${details.attributes.price}" 
        data-image="${details.attributes.image.data.attributes.url}">
          Add To Cart
        </a>
      </div>`;
    addToCart();

  } catch (error) {
    displayMessage("error", error, ".details-container__product-details");
  }
})();


