export function displayMessage(type, message, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `<div class="message ${type}">${message}</div>`;
}