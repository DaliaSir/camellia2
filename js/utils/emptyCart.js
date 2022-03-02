import getCartBadge from "./cartBadge.js";

export function clearList(renderCart) {
  if (confirm(`Remove all the products in the cart?`)) {
    localStorage.removeItem("cart-list");
    renderCart();
    getCartBadge();
    window.scrollTo(top);
  }
}