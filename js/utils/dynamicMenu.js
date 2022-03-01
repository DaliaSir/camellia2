import { getUsername } from "./saveUser.js";
import { logout } from "./logoutButton.js";
import getCartBadge from "./cartBadge.js";

export function createLoginLink() {
  const loginLinkContainer = document.querySelector(".loginLink");
  getCartBadge();

  const { pathname } = document.location;

  const username = getUsername();

  let loginLink = `<a class="nav-link  ${pathname === "/login.html" ? "active" : ""}" href="login.html">Login</a>`;

  if (typeof (username) === "string") {
    loginLink = `    
    <li class="dropdown">
    <a class="nav-link dropdown-toggle 
              ${pathname === "/add.html" ? "active" : ""} 
              ${pathname === "/edit-products.html" ? "active" : ""}
              ${pathname === "/edit.html" ? "active" : ""}"
              id="navbarDropdown" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
              Hello! ${username}
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><a class="dropdown-item  ${pathname === "/add.html" ? "active" : ""}" href="add.html">Add Product</a></li>
      <li><a class="dropdown-item  ${pathname === "/edit-products.html" ? "active" : ""}" href="edit-products.html">Edit Products</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><button id="logout" type="button" class="dropdown-item btn">Logout</button></li>
    </ul>
  </li>`;
  }

  loginLinkContainer.innerHTML = `${loginLink}`;

  logout();
}