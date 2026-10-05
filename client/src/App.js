import { useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CartPanel from './components/CartPanel';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import { useProducts } from './hooks/useProducts';

function HomePage({ products, loading, error, onAddToCart }) {
  const featuredCarouselRef = useRef(null);
  const featuredProducts = products.filter((product) => product.destacado);

  function scrollFeaturedProducts(direction) {
    const productsGrid =
      featuredCarouselRef.current?.querySelector('.products-grid');

    if (!productsGrid) {
      return;
    }

    const firstCard = productsGrid.querySelector('.product-card');
    const gap = Number.parseFloat(getComputedStyle(productsGrid).gap) || 0;
    const distance =
      (firstCard?.getBoundingClientRect().width || productsGrid.clientWidth) +
      gap;

    productsGrid.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  }

  return (
    <main>
      <section
        className="hero"
        id="inicio"
        style={{ backgroundImage: 'url(/img/fondo.jfif)' }}
      >
        <div className="hero-overlay">
          <div className="container hero-content">
            <span className="hero-subtitle">BUENOS AIRES DESDE 1982</span>
            <h1 className="hero-title">
              MUEBLES QUE
              <br />
              SE QUEDAN
            </h1>
            <p className="hero-description">
              Diseño atemporal y madera de origen responsable. Piezas para
              habitar despacio, hechas en el taller de Hermanos Jota.
            </p>
            <Link to="/productos" className="btn-primary">
              VER CATÁLOGO
            </Link>
          </div>
        </div>
      </section>

      <section className="sustentabilidad">
        <div className="container">
          <span className="section-tag">SUSTENTABILIDAD</span>
          <h2 className="section-title">OFICIO, NO MODA</h2>
          <p className="section-description">
            Trabajamos maderas certificadas, aceites naturales y herrajes
            pensados para durar décadas. Cada pieza se puede restaurar; ninguna
            está hecha para desecharse.
          </p>
          <div className="features-grid">
            <article className="feature-card">
              <span className="feature-number">01</span>
              <h3>MADERA NOBLE</h3>
              <p>
                Nogal, roble, paraíso y guatambú de proveedores con cadena de
                custodia. El veteado queda a la vista: no hay dos iguales.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-number">02</span>
              <h3>ACABADOS LIMPIOS</h3>
              <p>
                Aceites de tung y linaza, lacas al agua y ceras vegetales. Menos
                VOC, más tacto y un envejecimiento honesto.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-number">03</span>
              <h3>HECHO EN CABA</h3>
              <p>
                Taller y showroom en San Juan y Boedo. Podés ver las piezas,
                preguntar por medidas a medida y llevarte muestras de madera.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="destacados">
        <div className="container">
          <span className="section-tag">SELECCIÓN</span>
          <h2 className="section-title">PIEZAS DESTACADAS</h2>
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
            <div
              className="featured-carousel"
              aria-label="Productos destacados"
              ref={featuredCarouselRef}
            >
              <button
                className="carousel-button carousel-button-prev"
                type="button"
                aria-label="Producto anterior"
                onClick={() => scrollFeaturedProducts(-1)}
              >
                ‹
              </button>
              <ProductList
                products={featuredProducts}
                onAddToCart={onAddToCart}
              />
              <button
                className="carousel-button carousel-button-next"
                type="button"
                aria-label="Producto siguiente"
                onClick={() => scrollFeaturedProducts(1)}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { products, loading, error } = useProducts();

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.producto.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.producto.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...currentCart, { producto: product, cantidad: 1 }];
    });
  }

  function changeQuantity(productId, delta) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.producto.id === productId
            ? { ...item, cantidad: item.cantidad + delta }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.producto.id !== productId)
    );
  }

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="app-shell">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen((open) => !open)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="/productos"
          element={
            <CatalogPage
              products={products}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route path="/contacto" element={<ContactPage />} />
        <Route
          path="/producto/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />
      </Routes>
      <Footer />
      <CartPanel
        isOpen={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
        onCheckout={() => setCart([])}
      />
    </div>
  );
}

export default App;
