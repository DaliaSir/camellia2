import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./utils/displayMessage.js";
import { noUsername, noPassword, badLogin } from "./components/messages.js";
import { saveToken, saveUser } from "./utils/saveUser.js";
import { createLoginLink } from "./utils/dynamicMenu.js";

const loginForm = document.querySelector(".login-form");
const formMessage = document.querySelector(".form-message");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const loginButton = document.querySelector(".loginButton");

createLoginLink();

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.innerHTML = "";
  usernameError.innerHTML = "";
  passwordError.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0) {
    return displayMessage("form-warning", noUsername, "#usernameError");
  } else if (passwordValue.length === 0) {
    return displayMessage("form-warning", noPassword, "#passwordError");
  }
  successfulLogin(usernameValue, passwordValue);
});

async function successfulLogin(username, password) {
  const loginUrl = baseUrl + "auth/local";
  const userData = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: userData,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    loginButton.innerHTML = "Logging in...";
    const response = await fetch(loginUrl, options);
    const json = await response.json();

    if (json.user.username) {
      saveToken(json.jwt);
      saveUser(json.user.username);
      location.href = "/";
    }

    if (json.message) {
      return displayMessage("error", json.message, ".form-message");
    }

  } catch (error) {
    console.log(error);
    displayMessage("error", badLogin, ".form-message");
  }
}