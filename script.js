const boton = document.getElementById("btn-copiar");
const ip = document.getElementById("ip").textContent;

boton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(ip);
    boton.textContent = "¡Copiada!";
  } catch (error) {
    boton.textContent = "No se pudo copiar";
  }

  setTimeout(() => {
    boton.textContent = "Copiar IP";
  }, 2000);
});

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function cerrarMenu() {
  menu.classList.remove("abierto");
  menuBtn.classList.remove("activo");
  menuBtn.textContent = "☰";
}

menuBtn.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  menuBtn.classList.toggle("activo", abierto);
  menuBtn.textContent = abierto ? "✕" : "☰";
});

menu.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", cerrarMenu);
});

const IP_SERVIDOR = "mc.hypixel.net"; // cambialo por tu IP real cuando la tengas

const punto = document.getElementById("punto");
const estadoTexto = document.getElementById("estado-texto");

async function actualizarEstado() {
  try {
    const respuesta = await fetch(`https://api.mcsrvstat.us/3/${IP_SERVIDOR}`);
    const datos = await respuesta.json();

    if (datos.online) {
      punto.className = "punto online";
      estadoTexto.textContent = `${datos.players.online} / ${datos.players.max} jugadores online`;
    } else {
      punto.className = "punto offline";
      estadoTexto.textContent = "Servidor offline";
    }
  } catch (error) {
    punto.className = "punto offline";
    estadoTexto.textContent = "No se pudo consultar el estado";
  }
}

actualizarEstado();
setInterval(actualizarEstado, 60000); // se actualiza cada 60 segundos