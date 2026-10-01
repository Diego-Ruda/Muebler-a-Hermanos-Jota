import ProductList from '../components/ProductList';

function CatalogPage({ products, onAddToCart }) {
  return (
    <main>
      <section className="page-hero container">
        <span className="section-tag">CATÁLOGO</span>
        <h1>PIEZAS PARA DURAR</h1>
        <p className="section-description">
          Muebles hechos en nuestro taller con materiales nobles y atención a
          cada detalle.
        </p>
      </section>
      <section className="destacados">
        <div className="container">
          <ProductList products={products} onAddToCart={onAddToCart} />
        </div>
      </section>
    </main>
  );
}

export default CatalogPage;