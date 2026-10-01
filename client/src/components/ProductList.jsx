import ProductCard from './ProductCard';

function ProductList({ products = [], onAddToCart }) {
  if (products.length === 0) {
    return (
      <p className="producto-loading" role="status">
        Todavía no hay productos para mostrar.
      </p>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;