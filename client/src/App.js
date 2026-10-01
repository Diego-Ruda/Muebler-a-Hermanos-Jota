import { useRef, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import products from './data/products';

const featuredProducts = products.filter((product) => product.featured);

function HomePage({ onAddToCart }) {
  const featuredCarouselRef = useRef(null);

  function scrollFeaturedProducts(direction) {
    const productsGrid = featuredCarouselRef.current?.querySelector(
      '.products-grid',
    );

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
      <section className="hero" id="inicio">
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
            <a href="/productos.html" className="btn-primary">
              VER CATÁLOGO
            </a>
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
        </div>
      </section>
    </main>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart() {
    setCartCount((count) => count + 1);
  }

  const currentPath = window.location.pathname.toLowerCase();
  const page = currentPath.endsWith('/productos.html') ? (
    <CatalogPage products={products} onAddToCart={handleAddToCart} />
  ) : currentPath.endsWith('/contacto.html') ? (
    <ContactPage />
  ) : (
    <HomePage onAddToCart={handleAddToCart} />
  );

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} />
      {page}
      <Footer />
    </div>
  );
}

export default App;