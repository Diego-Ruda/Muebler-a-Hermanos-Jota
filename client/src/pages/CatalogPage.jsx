import { useLocation } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import ProductList from '../components/ProductList';

function CatalogPage({ products, loading, error, onAddToCart }) {
  const location = useLocation();
  const flashMessage = location.state?.flash;
  const flashType = location.state?.flashType;

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
          <FlashMessage message={flashMessage} variant={flashType} />
          {loading && (
            <p className="producto-loading" role="status">
              Cargando productos…
            </p>
          )}
          {!loading && error && (
            <p className="producto-loading" role="alert">
              No pudimos cargar los productos: {error}
            </p>
          )}
          {!loading && !error && (
            <ProductList products={products} onAddToCart={onAddToCart} />
          )}
        </div>
      </section>
    </main>
  );
}

export default CatalogPage;
