import { useEffect, useState } from 'react';
import { PRODUCTS_API_URL } from '../config/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(PRODUCTS_API_URL, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => {
          throw new Error('El servidor devolvió una respuesta inválida.');
        });

        if (!response.ok) {
          throw new Error(
            data?.mensaje || `Error al cargar los productos: ${response.status}`
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            'El servidor devolvió una lista de productos inválida.'
          );
        }

        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            err instanceof TypeError
              ? 'No pudimos conectar con el servidor. Intentá nuevamente.'
              : err instanceof Error
                ? err.message
                : 'Error desconocido'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  function addProduct(product) {
    setProducts((currentProducts) => [...currentProducts, product]);
  }

  function updateProduct(updatedProduct) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  }

  function removeProduct(productId) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product._id !== productId)
    );
  }

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    removeProduct,
  };
}
