import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, MapPin, Route } from '@gravity-ui/icons';
import { useAuth } from '../auth/AuthContext';
import {
  Description,
  Input,
  Label,
  ListBox,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@heroui/react';
import FlashMessage from '../components/FlashMessage';
import ProductList from '../components/ProductList';
import {
  CATEGORY_OPTIONS,
  filterProducts,
  hasProductsWithinMaxPrice,
  sanitizeMaxPrice,
  SORT_OPTIONS,
} from '../utils/catalogFilters';

const STORE_ADDRESS = 'Av. San Juan 2847, CABA';
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  STORE_ADDRESS
)}&output=embed`;
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STORE_ADDRESS
)}`;

function CatalogPage({ products = [], loading, error, onAddToCart }) {
  const location = useLocation();
  const { user } = useAuth();
  const welcomeName = user?.nombre?.trim().toLocaleUpperCase('es-AR');
  const flashMessage = location.state?.flash;
  const flashType = location.state?.flashType;
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('ninguno');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('todas');
  const visibleProducts = filterProducts(products, {
    query,
    sort,
    maxPrice,
    category,
  });
  const showClosestNotice =
    maxPrice.trim() !== '' && !hasProductsWithinMaxPrice(products, maxPrice);

  return (
    <main>
      <section className="page-hero catalog-hero container">
        <div className="catalog-hero-copy">
          <span className="section-tag">CATÁLOGO</span>
          <h1 className="catalog-hero-title">
            ¡TE DAMOS LA BIENVENIDA{' '}
            {welcomeName && (
              <span className="catalog-hero-name">{welcomeName}</span>
            )}
            {welcomeName ? ' ' : ''}A NUESTRO CATÁLOGO ONLINE!
          </h1>
          <p className="section-description">
            ¿Estás listo para descubrir piezas que{' '}
            <span className="catalog-hero-highlight">
              transforman tu espacio y lo harán único
            </span>
            ?
          </p>
        </div>
        <div className="catalog-visit-card">
          <div className="catalog-visit-map">
            <iframe
              title="Mapa de nuestro local"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="catalog-visit-info">
            <span className="section-tag">
              ¡VISITANOS TAMBIÉN EN NUESTRO LOCAL FÍSICO!
            </span>
            <p>
              Te recordamos que también podés visitarnos en nuestro local físico
              y descubrir las piezas en persona y llevarte una gran experiencia.
            </p>
            <strong className="catalog-visit-address">
              <MapPin aria-hidden="true" />
              {STORE_ADDRESS}
            </strong>
            <div className="catalog-visit-hours">
              <strong>
                <Clock aria-hidden="true" />
                Horarios:
              </strong>
              <span>Lunes a Viernes: 10:00 - 19:00.</span>
              <span>Sábados: 10:00 - 14:00.</span>
            </div>
            <a href={MAP_LINK_URL} target="_blank" rel="noreferrer">
              <Route aria-hidden="true" />
              Te mostramos cómo llegar
            </a>
          </div>
        </div>
      </section>
      <section className="destacados catalog-destacados">
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
            <>
              <section
                className="catalog-search-panel"
                aria-label="Búsqueda de productos"
              >
                <TextField
                  className="catalog-search"
                  fullWidth
                  value={query}
                  onChange={setQuery}
                >
                  <Label className="catalog-search-label">
                    Buscar productos
                  </Label>
                  <Input
                    className="catalog-search-input"
                    placeholder="Buscar por nombre o SKU"
                    variant="secondary"
                  />
                </TextField>
                <div className="catalog-controls">
                  <Select
                    className="catalog-sort"
                    variant="secondary"
                    value={sort}
                    onChange={(key) => setSort(key ? String(key) : null)}
                  >
                    <Label className="catalog-search-label">
                      Ordenar por precio
                    </Label>
                    <Select.Trigger className="catalog-sort-trigger">
                      <Select.Value className="catalog-sort-value" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {SORT_OPTIONS.map((option) => (
                          <ListBox.Item
                            className="catalog-sort-option"
                            id={option.id}
                            key={option.id}
                          >
                            {option.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                  <TextField
                    className="catalog-price-filter"
                    fullWidth
                    value={maxPrice}
                    onChange={(value) => setMaxPrice(sanitizeMaxPrice(value))}
                  >
                    <Label className="catalog-search-label">
                      ORDENAR POR PRESUPUESTO DISPONIBLE
                    </Label>
                    <Input
                      className="catalog-price-input"
                      inputMode="numeric"
                      placeholder="Ingrese un monto"
                      type="text"
                      variant="secondary"
                    />
                  </TextField>
                </div>
              </section>
              <div className="catalog-layout">
                <aside className="catalog-sidebar">
                  <RadioGroup
                    aria-label="Filtrar por categoría"
                    className="catalog-categories"
                    name="categoria"
                    value={category}
                    onChange={setCategory}
                    variant="secondary"
                  >
                    <Label className="catalog-search-label catalog-category-label">
                      Categorías
                    </Label>
                    <Description className="catalog-category-group-description">
                      Elegí el tipo de pieza que buscás.
                    </Description>
                    {CATEGORY_OPTIONS.map((option) => (
                      <Radio
                        className="catalog-category-option"
                        key={option.id}
                        value={option.id}
                      >
                        <Radio.Content>
                          <Radio.Control>
                            <Radio.Indicator />
                          </Radio.Control>
                          {option.label}
                        </Radio.Content>
                        <Description className="catalog-category-item-description">
                          {option.description}
                        </Description>
                      </Radio>
                    ))}
                  </RadioGroup>
                </aside>
                <div className="catalog-results">
                  {showClosestNotice && (
                    <p className="catalog-notice" role="status">
                      No hay productos hasta ese monto. Mostramos los más
                      cercanos.
                    </p>
                  )}
                  {visibleProducts.length > 0 ? (
                    <ProductList
                      products={visibleProducts}
                      onAddToCart={onAddToCart}
                    />
                  ) : (
                    <p className="catalog-notice" role="status">
                      {products.length === 0
                        ? 'Todavía no hay productos para mostrar.'
                        : category !== 'todas'
                          ? 'No encontramos productos con esa categoría.'
                          : 'No encontramos productos con ese nombre o SKU.'}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default CatalogPage;
