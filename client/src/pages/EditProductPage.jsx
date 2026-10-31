import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { PRODUCTS_API_URL } from '../config/api';

function EditProductPage({ onProductUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      setLoading(true);
      setLoadError('');
      setNotFound(false);

      try {
        const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(
            data?.mensaje || `Error al cargar el producto: ${response.status}`
          );
        }

        if (!controller.signal.aborted) {
          setProduct(data);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadError(
            error instanceof TypeError
              ? 'No pudimos conectar con el servidor. Intentá nuevamente.'
              : error instanceof Error
                ? error.message
                : 'No pudimos cargar el producto. Intentá nuevamente.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [id]);

  async function handleSubmit(updatedProduct) {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.mensaje ||
            data?.errores?.join(' ') ||
            'No se pudo actualizar el producto.'
        );
      }

      onProductUpdated?.(data);
      navigate(`/productos/${id}`, {
        state: { flash: 'Producto actualizado correctamente.' },
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'No se pudo actualizar el producto.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main>
        <section className="container">
          <p className="producto-loading" role="status">
            Cargando producto…
          </p>
        </section>
      </main>
    );
  }

  if (loadError) {
    return (
      <main>
        <section className="container">
          <p className="producto-loading" role="alert">
            No pudimos cargar el producto: {loadError}
          </p>
          <Link to="/productos" className="product-link">
            Volver al catálogo
          </Link>
        </section>
      </main>
    );
  }

  if (notFound) {
    return (
      <main>
        <section className="container">
          <p className="producto-loading" role="status">
            Producto no encontrado.
          </p>
          <Link to="/productos" className="product-link">
            Volver al catálogo
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero container">
        <span className="section-tag">ADMINISTRACIÓN</span>
        <h1>EDITAR PRODUCTO</h1>
        <p className="section-description">
          Actualizá los datos de la pieza seleccionada.
        </p>
      </section>
      <section className="container">
        <div className="form-card">
          <ProductForm
            key={product._id}
            initialProduct={product}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={submitError}
            submitLabel="Guardar cambios"
            submittingLabel="Actualizando…"
          />
          <Link to={`/productos/${id}`} className="product-link">
            Volver al detalle
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
