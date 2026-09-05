// 1. Obtener carrito almacenado o iniciar vacío
let cart = JSON.parse(localStorage.getItem('cart_hj')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Controles de Apertura / Cierre del Drawer
  const openCartBtn = document.querySelector('[data-open-cart]');
  const closeCartBtn = document.querySelector('[data-close-cart]');
  const cartDrawer = document.querySelector('[data-cart-drawer]');
  const cartOverlay = document.querySelector('[data-cart-overlay]');

  const openCart = () => {
    cartDrawer?.setAttribute('aria-hidden', 'false');
    cartOverlay?.classList.add('is-active');
  };

  const closeCart = () => {
    cartDrawer?.setAttribute('aria-hidden', 'true');
    cartOverlay?.classList.remove('is-active');
  };

  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Manejador para el botón Finalizar Compra
  const checkoutBtn = document.querySelector('.cart-footer a');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Detiene la navegación por defecto

      if (cart.length === 0) {
        alert('Tu carrito está vacío. Agregá al menos un producto para continuar.');
        return;
      }

      // Aseguramos los datos en localStorage y redirigimos a pedido.html
      localStorage.setItem('cart_hj', JSON.stringify(cart));
      window.location.href = 'pedido.html';
    });
  }

  // Inicializar renderizado del carrito si existen items previos
  updateCartUI();
});

// Función global para agregar producto al carrito desde cualquier parte
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveAndRefresh();
}

// Guardar en localStorage y actualizar la vista
function saveAndRefresh() {
  localStorage.setItem('cart_hj', JSON.stringify(cart));
  updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
  const cartList = document.querySelector('[data-cart-list]');
  const cartTotal = document.querySelector('[data-cart-total]');
  const cartCount = document.querySelector('[data-cart-count]');

  if (!cartList) return;

  // Formateador de moneda
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  // Limpiar lista actual
  cartList.innerHTML = '';

  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {
    total += item.precio * item.quantity;
    totalItems += item.quantity;

    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br>
        <small>${item.quantity} x ${formatter.format(item.precio)}</small>
      </div>
    `;
    cartList.appendChild(li);
  });

  // Actualizar totales y contador
  if (cartTotal) cartTotal.textContent = formatter.format(total);
  
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.hidden = totalItems === 0;
  }
}