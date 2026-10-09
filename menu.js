const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  menuBtn.classList.toggle("activo", abierto);
  menuBtn.textContent = abierto ? "✕" : "☰";
});