export function logout() {
  const logoutbutton = document.querySelector("#logout");

  if (logoutbutton) {
    logoutbutton.onclick = () => {
      if (confirm("Are you sure you want to leave?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.href = "/login.html";
      }
    };
  }
}