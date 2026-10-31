import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { PRODUCTS_API_URL } from '../config/api';

function CreateProductPage({ onProductCreated }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(product) {
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(PRODUCTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const createdProduct = await response.json();

      if (!response.ok) {
        throw new Error(
          createdProduct.mensaje || 'No se pudo crear el producto.'
        );
      }

      onProductCreated?.(createdProduct);
      navigate('/productos', {
        state: { flash: 'Producto creado correctamente.' },
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'No se pudo crear el producto.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="page-hero container">
        <span className="section-tag">ADMINISTRACIÓN</span>
        <h1>CREAR PRODUCTO</h1>
        <p className="section-description">
          Añadí una pieza nueva al catálogo.
        </p>
      </section>
      <section className="container">
        <div className="form-card">
          <ProductForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
            submitLabel="Crear producto"
            submittingLabel="Guardando…"
          />
        </div>
      </section>
    </main>
  );
}

export default CreateProductPage;
