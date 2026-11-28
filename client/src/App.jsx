import { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  CircleTree,
  House,
  LayoutList,
  QuoteOpen,
  Sparkles,
  Video,
} from '@gravity-ui/icons';
import { Button, Card, Chip } from '@heroui/react';
import CartPanel from './components/CartPanel';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ProtectedRoute from './components/ProtectedRoute';
import StoreMap from './components/StoreMap';
import { ROLES } from './auth/roles';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { useProducts } from './hooks/useProducts';

const sustainabilityFeatures = [
  {
    id: '01',
    Icon: CircleTree,
    title: 'MADERA NOBLE',
    description:
      'Nogal, roble, paraíso y guatambú de proveedores con cadena de custodia. El veteado queda a la vista: no hay dos iguales.',
  },
  {
    id: '02',
    Icon: Sparkles,
    title: 'ACABADOS LIMPIOS',
    description:
      'Aceites de tung y linaza, lacas al agua y ceras vegetales. Menos VOC, más tacto y un envejecimiento honesto.',
  },
  {
    id: '03',
    Icon: House,
    title: 'HECHO EN CABA',
    description:
      'Taller y showroom en San Juan y Boedo. Podés ver las piezas, preguntar por medidas a medida y llevarte muestras de madera.',
  },
];

const CAROUSEL_SPEED = 70;
const CAROUSEL_ITEM_COUNT = 12;
const TESTIMONIAL_VIDEO_URL = '/videos/testimonio-cliente.mp4';

function HomePage({ products, loading, error, onAddToCart }) {
  const navigate = useNavigate();
  const featuredProducts = useMemo(
    () => products.filter((product) => product.destacado),
    [products]
  );
  const [carouselItems, setCarouselItems] = useState([]);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselViewportRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const carouselOffsetRef = useRef(0);
  const carouselInstanceRef = useRef(0);
  const heroHeadingInnerRef = useRef(null);
  const heroTitleRef = useRef(null);

  useEffect(() => {
    if (featuredProducts.length === 0) {
      setCarouselItems([]);
      return;
    }

    carouselOffsetRef.current = 0;
    setCarouselItems(
      Array.from({ length: CAROUSEL_ITEM_COUNT }, (_, index) => {
        const product = featuredProducts[index % featuredProducts.length];
        carouselInstanceRef.current += 1;
        return {
          id: `${product._id}-${carouselInstanceRef.current}`,
          product,
        };
      })
    );

    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transform = 'translateX(0)';
    }
  }, [featuredProducts]);

  useEffect(() => {
    if (
      isCarouselPaused ||
      carouselItems.length === 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    let lastTime = 0;
    let frameId = 0;

    const animate = (time) => {
      if (!lastTime) {
        lastTime = time;
      }

      const elapsed = Math.min(time - lastTime, 64);
      lastTime = time;

      const track = carouselTrackRef.current;
      const firstCard = track?.querySelector('.product-card');

      if (track && firstCard) {
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
        const stepWidth = firstCard.getBoundingClientRect().width + gap;

        carouselOffsetRef.current += (elapsed / 1000) * CAROUSEL_SPEED;

        if (carouselOffsetRef.current >= stepWidth) {
          carouselOffsetRef.current -= stepWidth;
          setCarouselItems((items) => {
            const [first, ...rest] = items;
            carouselInstanceRef.current += 1;
            return [
              ...rest,
              {
                id: `${first.product._id}-${carouselInstanceRef.current}`,
                product: first.product,
              },
            ];
          });
        }

        track.style.transform = `translateX(${-carouselOffsetRef.current}px)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [carouselItems.length, isCarouselPaused]);

  useEffect(() => {
    const inner = heroHeadingInnerRef.current;
    const title = heroTitleRef.current;

    if (!inner || !title) {
      return undefined;
    }

    const alignDescription = () => {
      const offset =
        title.getBoundingClientRect().left - inner.getBoundingClientRect().left;
      inner.style.setProperty(
        '--hero-title-offset',
        `${Math.max(offset, 0)}px`
      );
    };

    alignDescription();

    const observer = new ResizeObserver(alignDescription);
    observer.observe(inner);
    observer.observe(title);

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero" id="inicio">
        <div
          className="hero-bg"
          style={{ backgroundImage: 'url(/img/fondo.jfif)' }}
          aria-hidden="true"
        />
        <div className="hero-overlay">
          <div className="container hero-content hero-heading">
            <div className="hero-heading-inner" ref={heroHeadingInnerRef}>
              <span className="hero-subtitle">BUENOS AIRES, DESDE 1982.</span>
              <h1 className="hero-title" ref={heroTitleRef}>
                MUEBLES QUE SE QUEDAN{' '}
                <span className="hero-title-underline">PARA SIEMPRE</span>.
              </h1>
              <p className="hero-description">
                Creamos muebles atemporales con maderas nobles y origen
                responsable. Cada pieza, hecha a mano en nuestro taller, combina
                diseño, calidez y durabilidad para acompañarte por generaciones.
                Elegimos cada tablero por su veteado único y aplicamos aceites y
                ceras vegetales que protegen la madera sin opacarla. Así, cada
                mueble envejece con vos y sigue contando la misma historia.
              </p>
            </div>
          </div>

          <section className="destacados hero-destacados">
            <div className="container">
              <div className="hero-destacados-header">
                <span className="section-tag">SELECCIÓN</span>
                <h2 className="section-title">PIEZAS DESTACADAS</h2>
              </div>
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
                  aria-label="Productos destacados"
                  className="featured-carousel"
                  onBlurCapture={() => setIsCarouselPaused(false)}
                  onFocusCapture={() => setIsCarouselPaused(true)}
                  onMouseEnter={() => setIsCarouselPaused(true)}
                  onMouseLeave={() => setIsCarouselPaused(false)}
                  ref={carouselViewportRef}
                >
                  <div
                    className="featured-carousel-track"
                    ref={carouselTrackRef}
                  >
                    {carouselItems.map((item, index) => (
                      <div className="featured-carousel-item" key={item.id}>
                        <ProductCard
                          badge={index % 2 === 0 ? 'HOT' : 'ON DEMAND'}
                          product={item.product}
                          onAddToCart={onAddToCart}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="container hero-content hero-bottom">
            <Button
              className="hero-cta-button"
              size="lg"
              onPress={() => navigate('/productos')}
            >
              <LayoutList aria-hidden="true" />
              MIRA NUESTRO CATÁLOGO COMPLETO
            </Button>
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
            {sustainabilityFeatures.map(({ id, Icon, title, description }) => (
              <Card key={id} className="feature-card">
                <Card.Header className="feature-card-header">
                  <Chip className="feature-number" size="sm">
                    {id}
                  </Chip>
                  <Icon aria-hidden="true" className="feature-icon" />
                </Card.Header>
                <Card.Content className="feature-card-content">
                  <Card.Title className="feature-card-title">
                    {title}
                  </Card.Title>
                  <Card.Description className="feature-card-desc">
                    {description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonios" id="testimonios">
        <div className="container">
          <span className="section-tag">
            <QuoteOpen className="testimonios-icon" aria-hidden="true" />
            TESTIMONIOS
          </span>
          <h2 className="section-title">
            <Video
              className="testimonios-icon testimonios-icon--title"
              aria-hidden="true"
            />
            HISTORIAS QUE SE QUEDAN
          </h2>
          <p className="section-description">
            No hablamos por nosotros, escuchá a un cliente contar cómo vivió el
            proceso de elegir sus muebles y cómo quedaron en su casa.
          </p>
          <div className="testimonio-video">
            <div className="testimonio-video-preview">
              <video
                aria-label="Testimonio en video de una cliente"
                controls
                preload="auto"
                src={`${TESTIMONIAL_VIDEO_URL}#t=0.1`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="visitanos">
        <div className="container">
          <StoreMap />
        </div>
      </section>
    </main>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { products, loading, error, addProduct, updateProduct, removeProduct } =
    useProducts();

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.producto._id === product._id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.producto._id === product._id
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
          item.producto._id === productId
            ? { ...item, cantidad: item.cantidad + delta }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.producto._id !== productId)
    );
  }

  function handleProductDeleted(productId) {
    removeProduct(productId);
    removeFromCart(productId);
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
        <Route path="/registro" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/:id"
          element={
            <ProductDetail
              onAddToCart={handleAddToCart}
              onProductDeleted={handleProductDeleted}
            />
          }
        />
        <Route
          path="/admin/crear-producto"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <CreateProductPage onProductCreated={addProduct} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editar-producto/:id"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <EditProductPage onProductUpdated={updateProduct} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/:id/editar"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <EditProductPage onProductUpdated={updateProduct} />
            </ProtectedRoute>
          }
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
