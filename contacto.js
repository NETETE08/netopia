const btnEmail = document.getElementById("btn-email");

if (btnEmail) {
  btnEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btnEmail.dataset.email);
      btnEmail.textContent = "¡Copiado!";
    } catch (error) {
      btnEmail.textContent = "Copialo a mano";
    }

    setTimeout(() => {
      btnEmail.textContent = "Copiar email";
    }, 2000);
  });
}