const CARRITO_STORAGE_KEY = "cart_hj";
const DELAY_CARGA_MS = 800;

const formatterARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  cargarProducto();
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_STORAGE_KEY)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
}

function contarItemsCarrito(carrito) {
  return carrito.reduce((total, item) => total + (item.quantity || 0), 0);
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) {
    return;
  }

  contador.textContent = contarItemsCarrito(obtenerCarrito());
}

function obtenerIdDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function obtenerProductoPorId(id) {
  await delay(DELAY_CARGA_MS);
  return products.find((producto) => producto.id === id) || null;
}

async function cargarProducto() {
  const contenedor = document.getElementById("producto-contenedor");
  if (!contenedor) {
    return;
  }

  const id = obtenerIdDesdeURL();
  const producto = await obtenerProductoPorId(id);

  if (!producto) {
    renderizarError(contenedor);
    return;
  }

  renderizarProducto(contenedor, producto);
  asociarEventoCarrito(producto);
}

function renderizarError(contenedor) {
  contenedor.innerHTML = `
    <div class="producto-detalle-info">
      <h1>Producto no encontrado</h1>
      <p>No pudimos cargar el detalle. Volvé al catálogo e intentá de nuevo.</p>
      <a href="productos.html" class="product-link">Volver al catálogo</a>
    </div>
  `;
}

function renderizarProducto(contenedor, producto) {
  contenedor.innerHTML = `
    <img
      src="${producto.imagen}"
      alt="${producto.nombre}"
      class="producto-detalle-imagen"
    />
    <div class="producto-detalle-info">
      <h1>${producto.nombre}</h1>
      <p class="producto-detalle-precio">${formatterARS.format(producto.precio)}</p>
      <p>${producto.descripcion}</p>
      <p><strong>Medidas:</strong> ${producto.medidas}</p>
      <p><strong>Detalles de fabricación:</strong> ${producto.detallesFabricacion}</p>
      <button id="btn-anadir-carrito" class="btn-primary" type="button">
        Añadir al Carrito
      </button>
    </div>
  `;
}

function asociarEventoCarrito(producto) {
  const boton = document.getElementById("btn-anadir-carrito");
  if (!boton) {
    return;
  }

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto);
    actualizarContadorCarrito();
  });
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.quantity += 1;
  } else {
    carrito.push({ ...producto, quantity: 1 });
  }

  guardarCarrito(carrito);
}
