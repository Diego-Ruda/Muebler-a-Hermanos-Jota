const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        loading="lazy"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">
            {currencyFormatter.format(product.price)}
          </span>
          <button
            className="btn-primary"
            type="button"
            onClick={() => onAddToCart?.(product)}
          >
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;