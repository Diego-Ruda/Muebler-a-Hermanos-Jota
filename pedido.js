document.addEventListener('DOMContentLoaded', () => {
  // --- Lógica del menú hamburguesa ---
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

  // --- Lógica de la factura y el carrito ---
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
      contenedor.innerHTML = '<p class="factura-vacia-msg">No hay productos en el pedido actual.</p>';
    }
    if (totalElem) {
      totalElem.textContent = formatter.format(0);
    }
    if (btnPagar) {
      btnPagar.disabled = true; // El CSS se encarga del cursor y la opacidad al estar deshabilitado
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
            <th class="col-acciones"></th>
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
          <td class="celda-accion">
            <button 
              type="button" 
              class="btn-eliminar-factura" 
              data-index="${index}" 
              title="Eliminar producto"
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




  
  // --- Botón Pagar: pregunta si querés descargar la factura, y después vacía el carrito y redirige ---
  if (btnPagar && cart.length > 0) {
    btnPagar.addEventListener('click', (e) => {
      e.preventDefault();

      const quiereDescargar = confirm('¿Querés descargar la factura de tu compra?');

      const continuarCompra = () => {
        localStorage.removeItem('cart_hj');
        alert('¡Gracias por tu compra! Redirigiendo al catálogo...');
        window.location.href = 'productos.html';
      };

      if (quiereDescargar) {
        btnPagar.disabled = true;
        btnPagar.textContent = 'Generando recibo...';
        descargarReciboPNG().finally(continuarCompra);
      } else {
        continuarCompra();
      }
    });
  }

  // --- Genera y descarga el recibo como PNG ---
  function descargarReciboPNG() {
    const contenedorFactura = document.querySelector('.pedido-container');
    if (!contenedorFactura || typeof html2canvas === 'undefined') {
      return Promise.resolve();
    }

    const acciones = contenedorFactura.querySelector('.factura-acciones');
    const columnasAccion = contenedorFactura.querySelectorAll('.col-acciones, .celda-accion');

    if (acciones) acciones.style.display = 'none';
    columnasAccion.forEach(c => c.style.display = 'none');

    return html2canvas(contenedorFactura, {
      backgroundColor: '#f4ecd8',
      scale: 2
    }).then(canvas => {
      if (acciones) acciones.style.display = '';
      columnasAccion.forEach(c => c.style.display = '');

      const numeroFactura = numeroFacturaElem?.textContent.trim() || 'recibo';
      const link = document.createElement('a');
      link.download = numeroFactura.replace('#', '').replace(/\s+/g, '-') + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      console.error('Error generando el recibo:', err);
      if (acciones) acciones.style.display = '';
      columnasAccion.forEach(c => c.style.display = '');
    });
  }
});