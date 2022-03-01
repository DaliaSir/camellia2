import { getFromStorage, saveToStorage } from "./utils/localStorage.js";
import getCartBadge from "./utils/cartBadge.js";

export function addToCart() {
  const addToCartBtn = document.querySelector("#addToCartBtn");

  addToCartBtn.addEventListener("click", handleClick);

  function handleClick() {
    this.classList.add("in-cart");

    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentCart = getFromStorage("cart-list");

    const isInCart = currentCart.find((item) => {
      return item.id === id;
    });

    if (!isInCart) {
      const product = { id: id, name: name, price: price, image: image };
      currentCart.push(product);
      saveToStorage("cart-list", currentCart);
      getCartBadge();
    } else {
      addAnother();
      getCartBadge();
    }

    function addAnother() {
      if (confirm(`Are you sure you want to add another ${name}?`)) {
        const product = { id: id, name: name, price: price, image: image };
        currentCart.push(product);
        saveToStorage("cart-list", currentCart);
      }
    }
  }
}

