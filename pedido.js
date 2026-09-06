document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DEL MENÚ HAMBURGUESA ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  nav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Abrir menú');
    });
  });

  // --- LÓGICA DE LA FACTURA Y CARRITO ---
  let cart = JSON.parse(localStorage.getItem('cart_hj')) || [];
  const contenedor = document.getElementById('factura-contenido');
  const totalElem = document.getElementById('factura-total-monto');
  const numeroFacturaElem = document.getElementById('factura-numero');
  const fechaElem = document.getElementById('factura-fecha');
  const btnPagar = document.getElementById('btn-pagar');

  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  if (fechaElem) {
    fechaElem.textContent = `Fecha: ${new Date().toLocaleDateString('es-AR')}`;
  }
  if (numeroFacturaElem) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    numeroFacturaElem.textContent = `Comprobante #HJ-${randomNum}`;
  }

  if (cart.length === 0) {
    if (contenedor) {
      contenedor.innerHTML = '<p style="padding: 15px 0;">No hay productos en el pedido actual.</p>';
    }
    if (totalElem) {
      totalElem.textContent = formatter.format(0);
    }
    if (btnPagar) {
      btnPagar.disabled = true;
      btnPagar.style.opacity = '0.5';
      btnPagar.style.cursor = 'not-allowed';
    }
  } else {
    let total = 0;
    let html = `
      <table class="factura-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th class="monto">Precio Unit.</th>
            <th class="monto">Subtotal</th>
            <th style="width: 40px;"></th>
          </tr>
        </thead>
        <tbody>
    `;

    cart.forEach((item, index) => {
      const subtotal = item.precio * item.quantity;
      total += subtotal;

      html += `
        <tr>
          <td>${item.nombre}</td>
          <td>${item.quantity}</td>
          <td class="monto">${formatter.format(item.precio)}</td>
          <td class="monto">${formatter.format(subtotal)}</td>
          <td style="text-align: center;">
            <button 
              type="button" 
              class="btn-eliminar-factura" 
              data-index="${index}" 
              title="Eliminar producto"
              style="color: #c94a29; border: none; background: none; cursor: pointer; font-size: 1.1rem;"
            >
              &times;
            </button>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    if (contenedor) {
      contenedor.innerHTML = html;

      // Evento para eliminar un producto
      contenedor.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.btn-eliminar-factura');
        if (targetBtn) {
          const index = parseInt(targetBtn.getAttribute('data-index'), 10);
          cart.splice(index, 1);
          localStorage.setItem('cart_hj', JSON.stringify(cart));
          location.reload();
        }
      });
    }

    if (totalElem) {
      totalElem.textContent = formatter.format(total);
    }
  }

  if (btnPagar && cart.length > 0) {
    btnPagar.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('cart_hj');
      alert('¡Gracias por tu compra! Redirigiendo al catálogo...');
      window.location.href = 'productos.html';
    });
  }
});