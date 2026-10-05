import { useState } from 'react';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function buildInvoiceHtml(invoice) {
  const rows = invoice.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.nombre)}</td>
          <td>${item.cantidad}</td>
          <td>${currencyFormatter.format(item.precio)}</td>
          <td>${currencyFormatter.format(item.subtotal)}</td>
        </tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Comprobante ${escapeHtml(invoice.numero)}</title>
    <style>
      body { max-width: 760px; margin: 3rem auto; padding: 0 1.5rem; color: #25221e; font: 16px/1.5 system-ui, sans-serif; }
      header { display: flex; justify-content: space-between; gap: 2rem; border-bottom: 2px solid #593d2e; padding-bottom: 1rem; }
      h1 { color: #593d2e; }
      .notice { margin: 2rem 0; padding: 1rem; background: #f7eedf; }
      table { width: 100%; border-collapse: collapse; text-align: left; }
      th, td { padding: .75rem .5rem; border-bottom: 1px solid #ddd; }
      th:not(:first-child), td:not(:first-child) { text-align: right; }
      .total { margin-top: 1.5rem; text-align: right; font-size: 1.3rem; font-weight: 700; }
      @media print { body { margin: 1rem auto; } }
      @media print { .print-button { display: none; } }
    </style>
  </head>
  <body>
    <button class="print-button" type="button" onclick="window.print()">Imprimir o guardar como PDF</button>
    <header>
      <div><h1>Hermanos Jota</h1><p>Comprobante de compra</p></div>
      <div><strong>${escapeHtml(invoice.numero)}</strong><br>${escapeHtml(invoice.fecha)}</div>
    </header>
    <p class="notice">Comprobante no fiscal. Esta compra es una simulación y no se realizó ningún pago.</p>
    <table>
      <thead><tr><th>Producto</th><th>Cant.</th><th>Precio unitario</th><th>Subtotal</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="total">Total: ${currencyFormatter.format(invoice.total)}</p>
  </body>
</html>`;
}

function CartPanel({
  isOpen,
  items,
  onClose,
  onChangeQuantity,
  onRemove,
  onCheckout,
}) {
  const [invoice, setInvoice] = useState(null);
  const cartTotal = items.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );

  function closePanel() {
    setInvoice(null);
    onClose();
  }

  function finishCheckout() {
    const orderDate = new Date();
    const completedInvoice = {
      numero: `HJ-${orderDate.getTime()}`,
      fecha: orderDate.toLocaleString('es-AR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }),
      items: items.map(({ producto, cantidad }) => ({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
        subtotal: producto.precio * cantidad,
      })),
      total: cartTotal,
    };

    setInvoice(completedInvoice);
    onCheckout();
  }

  function downloadInvoice() {
    const file = new Blob([buildInvoiceHtml(invoice)], {
      type: 'text/html;charset=utf-8',
    });
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = `comprobante-${invoice.numero}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  }

  return (
    <div
      className={`cart-overlay${isOpen ? ' is-active' : ''}`}
      onClick={closePanel}
    >
      <aside
        className="cart-drawer"
        aria-hidden={!isOpen}
        aria-label={invoice ? 'Comprobante de compra' : 'Carrito de compras'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <h2>{invoice ? 'Comprobante' : 'Carrito'}</h2>
          <button
            className="icon-btn"
            type="button"
            aria-label="Cerrar carrito"
            onClick={closePanel}
          >
            ×
          </button>
        </div>

        {invoice ? (
          <>
            <div className="cart-body">
              <div className="invoice-summary">
                <p className="invoice-notice">
                  Comprobante no fiscal: esta compra es una simulación y no se
                  realizó ningún pago.
                </p>
                <p>
                  <strong>Número de pedido:</strong> {invoice.numero}
                </p>
                <p>
                  <strong>Fecha:</strong> {invoice.fecha}
                </p>
                <p className="invoice-download-help">
                  El archivo descargado se puede imprimir o guardar como PDF
                  desde el navegador.
                </p>
                <ul className="cart-list invoice-list">
                  {invoice.items.map((item, index) => (
                    <li
                      className="invoice-item"
                      key={`${item.nombre}-${index}`}
                    >
                      <span>
                        {item.nombre} × {item.cantidad}
                      </span>
                      <strong>{currencyFormatter.format(item.subtotal)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="cart-total-wrapper">
                  <span>Total</span>
                  <strong>{currencyFormatter.format(invoice.total)}</strong>
                </div>
              </div>
            </div>
            <div className="cart-footer cart-footer-actions">
              <button
                className="btn-primary btn-block"
                type="button"
                onClick={downloadInvoice}
              >
                Descargar comprobante
              </button>
              <button
                className="btn-secondary btn-block"
                type="button"
                onClick={closePanel}
              >
                Seguir comprando
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cart-body">
              {items.length === 0 ? (
                <p className="cart-empty">Tu carrito está vacío</p>
              ) : (
                <ul className="cart-list">
                  {items.map((item) => {
                    const { producto, cantidad } = item;
                    const subtotal = producto.precio * cantidad;

                    return (
                      <li key={producto.id} className="cart-item">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="cart-item-image"
                        />
                        <div className="cart-item-details">
                          <h3 className="cart-item-name">{producto.nombre}</h3>
                          <p className="cart-item-price">
                            {currencyFormatter.format(producto.precio)}
                          </p>
                          <div className="cart-item-actions">
                            <div className="cart-qty">
                              <button
                                className="cart-qty-btn"
                                type="button"
                                aria-label={`Restar ${producto.nombre}`}
                                onClick={() =>
                                  onChangeQuantity(producto.id, -1)
                                }
                              >
                                −
                              </button>
                              <span className="cart-qty-value">{cantidad}</span>
                              <button
                                className="cart-qty-btn"
                                type="button"
                                aria-label={`Sumar ${producto.nombre}`}
                                onClick={() => onChangeQuantity(producto.id, 1)}
                              >
                                +
                              </button>
                            </div>
                            <span className="cart-item-subtotal">
                              {currencyFormatter.format(subtotal)}
                            </span>
                          </div>
                          <button
                            className="cart-item-remove"
                            type="button"
                            onClick={() => onRemove(producto.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total-wrapper">
                <span>Total</span>
                <strong>{currencyFormatter.format(cartTotal)}</strong>
              </div>
              <button
                className="btn-primary btn-block"
                type="button"
                onClick={finishCheckout}
                disabled={items.length === 0}
              >
                Finalizar compra
              </button>
              <button
                className="btn-secondary btn-block"
                type="button"
                onClick={closePanel}
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartPanel;
