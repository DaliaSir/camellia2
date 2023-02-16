import { renderProducts } from "./renderProducts.js";
import { displayMessage } from "./displayMessage.js";
import { noResults } from "../components/messages.js";

const search = document.querySelector("#search");

export function filterProducts(products) {
  search.onkeyup = (e) => {
    const searchValue = e.target.value.replace(/\s/g, "").toLowerCase();

    const filteredValues = products.data.filter((product) => {
      if (product.attributes.name.replace(/\s/g, "").toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    const data = filteredValues;
    renderProducts({ data });

    if (filteredValues.length === 0) {
      displayMessage("", noResults, ".products-container__products");
    }
  }
  renderProducts(products);
}
