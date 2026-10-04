import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setProduct(null);

      try {
        const response = await fetch(`/api/productos/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error al cargar el producto: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="status">
          Cargando producto…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="alert">
          No pudimos cargar el producto: {error}
        </p>
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="status">
          Producto no encontrado.
        </p>
      </section>
    );
  }

  return (
    <section className="producto-detalle-container">
      <div className="producto-detalle-grid">
        <img
          className="producto-detalle-imagen"
          src={product.imagen}
          alt={product.nombre}
        />
        <div className="producto-detalle-info">
          <Link to="/productos" className="product-link">
            Volver al catálogo
          </Link>
          <h1>{product.nombre}</h1>
          <p className="producto-detalle-precio">
            {currencyFormatter.format(product.precio)}
          </p>
          <p>{product.descripcion}</p>
          <button
            className="btn-primary anadir-al-carrito"
            type="button"
            onClick={() => onAddToCart?.(product)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
