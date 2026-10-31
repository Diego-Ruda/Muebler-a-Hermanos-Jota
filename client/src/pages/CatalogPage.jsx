import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

function CatalogPage({ products, loading, error, onAddToCart }) {
  const location = useLocation();
  const flashMessage = location.state?.flash;

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
          {flashMessage && (
            <p className="form-success" role="status">
              {flashMessage}
            </p>
          )}
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
