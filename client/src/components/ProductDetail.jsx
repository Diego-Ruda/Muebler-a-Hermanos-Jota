const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function ProductDetail({ product, onAddToCart, onBack }) {
  if (!product) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="status">
          Producto no encontrado.
        </p>
      </section>
    );
  }

  return (
    <section className="producto-detalle-container">
      <div className="producto-detalle-grid">
        <img
          className="producto-detalle-imagen"
          src={product.image}
          alt={product.title}
        />
        <div className="producto-detalle-info">
          {onBack && (
            <button className="product-link" type="button" onClick={onBack}>
              Volver al catálogo
            </button>
          )}
          <h1>{product.title}</h1>
          <p className="producto-detalle-precio">
            {currencyFormatter.format(product.price)}
          </p>
          <p>{product.description}</p>
          <button
            className="btn-primary anadir-al-carrito"
            type="button"
            onClick={() => onAddToCart?.(product)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;