import { Button, Card } from '@heroui/react';
import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function ProductCard({ product, onAddToCart, badge }) {
  const productPath = `/productos/${product._id}`;
  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;

  return (
    <Card className="product-card h-full w-full">
      {badge && <span className="product-badge">{badge}</span>}
      <Link
        to={productPath}
        className="product-image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={product.imagenUrl}
          alt={product.nombre}
          className="product-image"
          loading="lazy"
          width="640"
          height="440"
        />
      </Link>

      <Card.Content className="product-info">
        <Card.Title className="product-title">
          <Link to={productPath} className="hover:underline">
            {product.nombre}
          </Link>
        </Card.Title>
        <Card.Description className="product-desc">
          {product.descripcion}
        </Card.Description>
      </Card.Content>

      <Card.Footer className="product-footer">
        <div className="product-details">
          <span className="product-price">
            {currencyFormatter.format(product.precio)}
          </span>
          <span className="product-stock">
            {isOutOfStock ? 'Sin stock' : `Stock: ${stock}`}
          </span>
        </div>
        <Button
          className="product-add-button"
          color="primary"
          size="md"
          isDisabled={isOutOfStock}
          onPress={() => onAddToCart?.(product)}
        >
          {isOutOfStock ? 'Agotado' : 'Añadir'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
