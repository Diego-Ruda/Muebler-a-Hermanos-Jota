const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function CartPanel({ isOpen, items, onClose, onChangeQuantity, onRemove }) {
  const cartTotal = items.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );

  return (
    <div
      className={`cart-overlay${isOpen ? ' is-active' : ''}`}
      onClick={onClose}
    >
      <aside
        className="cart-drawer"
        aria-hidden={!isOpen}
        aria-label="Carrito de compras"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Carrito</h2>
          <button
            className="icon-btn"
            type="button"
            aria-label="Cerrar carrito"
            onClick={onClose}
          >
            ×
          </button>
        </div>

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
                            onClick={() => onChangeQuantity(producto.id, -1)}
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
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartPanel;
