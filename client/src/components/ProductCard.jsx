import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function ProductCard({ product, onAddToCart }) {
  const productPath = `/producto/${product.id}`;

  return (
    <article className="product-card">
      <Link to={productPath}>
        <img
          src={product.imagen}
          alt={product.nombre}
          className="product-image"
          loading="lazy"
        />
      </Link>
      <div className="product-info">
        <h3 className="product-title">
          <Link to={productPath}>{product.nombre}</Link>
        </h3>
        <p className="product-desc">{product.descripcion}</p>
        <div className="product-footer">
          <span className="product-price">
            {currencyFormatter.format(product.precio)}
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
