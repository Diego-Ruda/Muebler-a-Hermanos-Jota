import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch('/api/productos', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Error al cargar los productos: ${response.status}`);
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading, error };
}
