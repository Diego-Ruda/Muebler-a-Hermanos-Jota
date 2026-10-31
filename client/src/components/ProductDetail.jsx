import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import FlashMessage from './FlashMessage';
import { PRODUCTS_API_URL } from '../config/api';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

function ProductDetail({ onAddToCart, onProductDeleted }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const flashMessage = location.state?.flash;
  const flashType = location.state?.flashType;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setProduct(null);

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

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          throw new Error('El servidor devolvió una respuesta inválida.');
        }

        if (controller.signal.aborted) {
          return;
        }

        setProduct(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            err instanceof TypeError
              ? 'No pudimos conectar con el servidor. Intentá nuevamente.'
              : err instanceof Error
                ? err.message
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

  async function handleDelete() {
    if (!product) {
      return;
    }

    setDeleteError('');
    setIsDeleting(true);

    try {
      const response = await fetch(`${PRODUCTS_API_URL}/${product._id}`, {
        method: 'DELETE',
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.mensaje || `Error al eliminar el producto: ${response.status}`
        );
      }

      onProductDeleted?.(product._id);
      navigate('/productos', {
        state: {
          flash: 'Producto eliminado correctamente.',
          flashType: 'delete',
        },
      });
    } catch (deleteFailure) {
      setDeleteError(
        deleteFailure instanceof TypeError
          ? 'No pudimos conectar con el servidor. Intentá nuevamente.'
          : deleteFailure instanceof Error
            ? deleteFailure.message
            : 'No pudimos eliminar el producto. Intentá nuevamente.'
      );
      setIsDeleting(false);
    }
  }

  if (loading) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="status">
          Cargando producto…
        </p>
        <Link to="/productos" className="product-link">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (error) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="alert">
          No pudimos cargar el producto: {error}
        </p>
        <Link to="/productos" className="product-link">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="producto-detalle-container">
        <p className="producto-loading" role="status">
          Producto no encontrado.
        </p>
        <Link to="/productos" className="product-link">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="producto-detalle-container">
      <div className="producto-detalle-grid">
        {product.imagenUrl ? (
          <img
            className="producto-detalle-imagen"
            src={product.imagenUrl}
            alt={product.nombre}
          />
        ) : (
          <div
            className="producto-detalle-sin-imagen"
            role="img"
            aria-label="Imagen no disponible"
          >
            Imagen no disponible
          </div>
        )}
        <div className="producto-detalle-info">
          <Link to="/productos" className="product-link">
            Volver al catálogo
          </Link>
          <FlashMessage message={flashMessage} variant={flashType} />
          <h1>{product.nombre}</h1>
          <p className="producto-detalle-precio">
            {currencyFormatter.format(product.precio)}
          </p>
          <p>{product.descripcion || 'Sin descripción disponible.'}</p>
          <p className="producto-detalle-stock">
            <strong>Stock:</strong> {product.stock ?? 0}
          </p>
          {product.medidas && (
            <p>
              <strong>Medidas:</strong> {product.medidas}
            </p>
          )}
          {product.detallesFabricacion && (
            <>
              <h2>Detalles de fabricación</h2>
              <p>{product.detallesFabricacion}</p>
            </>
          )}
          <div className="producto-detalle-acciones">
            <button
              className="btn-primary anadir-al-carrito"
              type="button"
              onClick={() => onAddToCart?.(product)}
            >
              Añadir al carrito
            </button>
            <Link
              className="btn-secondary editar-producto"
              to={`/admin/editar-producto/${product._id}`}
            >
              Editar producto
            </Link>
            <button
              className="btn-secondary eliminar-producto"
              type="button"
              disabled={isDeleting || isConfirmingDelete}
              onClick={() => {
                setDeleteError('');
                setIsConfirmingDelete(true);
              }}
            >
              Eliminar producto
            </button>
          </div>
          {isConfirmingDelete && (
            <div
              className="confirm-delete"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-confirm-title"
            >
              <p id="delete-confirm-title">
                ¿Seguro que querés eliminar “{product.nombre}”? Esta acción no
                se puede deshacer.
              </p>
              <div className="confirm-delete-actions">
                <button
                  className="btn-secondary"
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsConfirmingDelete(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn-primary"
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  {isDeleting ? 'Eliminando…' : 'Sí, eliminar'}
                </button>
              </div>
            </div>
          )}
          {deleteError && (
            <p className="error" role="alert">
              {deleteError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
