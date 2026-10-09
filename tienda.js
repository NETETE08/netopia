const productos = [
    {
        id: 1, nombre: "VIP", precio: 5, icono: "⭐", color: "#4caf50",
        beneficios: ["Prefijo [VIP] en el chat", "Kit diario", "2 hogares (/sethome)"],
    },
    {
        id: 2, nombre: "VIP+", precio: 8, icono: "✨", color: "#26c6da",
        beneficios: ["Todo lo del VIP", "Kit semanal", "4 hogares", "Color de chat"],
    },
    {
        id: 3, nombre: "MVP", precio: 12, icono: "💎", color: "#4fc3f7", popular: true,
        beneficios: ["Todo lo del VIP+", "Comandos /fly y /feed", "Reserva de cupo en el servidor"],
    },
    {
        id: 4, nombre: "MVP+", precio: 18, icono: "🔮", color: "#7c4dff",
        beneficios: ["Todo lo del MVP", "Cosméticos de partículas", "8 hogares", "Cofre mensual"],
    },
    {
        id: 5, nombre: "Elite", precio: 25, icono: "🔥", color: "#ff7043",
        beneficios: ["Todo lo del MVP+", "Pets exclusivas", "Kit especial en cada modo"],
    },
    {
        id: 6, nombre: "Legend", precio: 40, icono: "👑", color: "#ffb300",
        beneficios: ["Todos los beneficios", "Prefijo personalizado", "Acceso anticipado a modos nuevos", "Soporte prioritario"],
    },
    {
        id: 7, nombre: "Cofre cosmético", precio: 3, icono: "🎁", color: "#ef5350",
        beneficios: ["Un cosmético al azar"],
    },
];

let carrito = [];

const contenedor = document.getElementById("productos");
const lista = document.getElementById("carrito-lista");
const totalEl = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar");

// ---------- Productos ----------
function mostrarProductos() {
    contenedor.innerHTML = productos
        .map(
            (p) => `
      <article class="producto" style="--color: ${p.color}">
        ${p.popular ? '<span class="etiqueta">Popular</span>' : ""}
        <span class="icono">${p.icono}</span>
        <h3>${p.nombre}</h3>
        <ul class="beneficios">
          ${p.beneficios.map((b) => `<li>${b}</li>`).join("")}
        </ul>
        <p class="precio">$${p.precio}</p>
        <button class="boton" data-id="${p.id}">Agregar</button>
      </article>`
        )
        .join("");
}

// ---------- Carrito ----------
function agregar(id) {
    const existente = carrito.find((item) => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        const producto = productos.find((p) => p.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizar();
}

function quitar(id) {
    const item = carrito.find((i) => i.id === id);
    if (!item) return;

    item.cantidad--;
    if (item.cantidad === 0) {
        carrito = carrito.filter((i) => i.id !== id);
    }

    actualizar();
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        lista.innerHTML = "<li class='vacio'>Todavía no agregaste nada.</li>";
    } else {
        lista.innerHTML = carrito
            .map(
                (item) => `
        <li>
          <span>${item.icono} ${item.nombre} x${item.cantidad}</span>
          <span>$${item.precio * item.cantidad}</span>
          <button class="quitar" data-quitar="${item.id}" aria-label="Quitar uno">−</button>
        </li>`
            )
            .join("");
    }

    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    totalEl.textContent = `$${total}`;
}

function guardar() {
    try {
        localStorage.setItem("carrito-netopia", JSON.stringify(carrito));
    } catch (error) {
        // si el navegador no deja guardar, la tienda sigue funcionando igual
    }
}

function cargar() {
    try {
        const guardado = localStorage.getItem("carrito-netopia");
        if (guardado) carrito = JSON.parse(guardado);
    } catch (error) {
        carrito = [];
    }
}

function actualizar() {
    mostrarCarrito();
    guardar();
}

// ---------- Eventos ----------
contenedor.addEventListener("click", (e) => {
    const boton = e.target.closest("button[data-id]");
    if (boton) agregar(Number(boton.dataset.id));
});

lista.addEventListener("click", (e) => {
    const boton = e.target.closest("button[data-quitar]");
    if (boton) quitar(Number(boton.dataset.quitar));
});

vaciarBtn.addEventListener("click", () => {
    carrito = [];
    actualizar();
});

// ---------- Menú del celular ----------
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    menuBtn.classList.toggle("activo", abierto);
    menuBtn.textContent = abierto ? "✕" : "☰";
});

// ---------- Inicio ----------
cargar();
mostrarProductos();
mostrarCarrito();