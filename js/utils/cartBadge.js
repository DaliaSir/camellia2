import { getFromStorage } from "./localStorage.js";

export default function getCartBadge() {
  const cartBadgeContainer = document.querySelector(".cart-nav-link span");
  const inCart = getFromStorage("cart-list");
  let cartBadge = 0;
  cartBadge = inCart.length;
  cartBadgeContainer.innerHTML = cartBadge;

  if (inCart.length === 0) {
    cartBadgeContainer.style.backgroundColor = "rgba(0, 0, 0, 0.55)";
  } else {
    cartBadgeContainer.style.backgroundColor = "#1b1c1e";
  }

};