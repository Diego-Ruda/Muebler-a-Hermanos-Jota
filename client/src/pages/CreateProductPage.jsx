import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_API_URL } from '../config/api';

function CreateProductPage({ onProductCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '0',
    imagenUrl: '',
    medidas: '',
    detallesFabricacion: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const product = {
      ...formData,
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: Number(formData.precio),
      stock: Number(formData.stock || 0),
      imagenUrl: formData.imagenUrl.trim(),
      medidas: formData.medidas.trim(),
      detallesFabricacion: formData.detallesFabricacion.trim(),
    };

    try {
      const response = await fetch(PRODUCTS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const createdProduct = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          createdProduct?.mensaje || 'No se pudo crear el producto.'
        );
      }

      if (!createdProduct || typeof createdProduct._id !== 'string') {
        throw new Error('El servidor devolvió una respuesta inválida.');
      }

      onProductCreated(createdProduct);
      navigate('/productos');
    } catch (submitError) {
      setError(
        submitError instanceof TypeError
          ? 'No pudimos conectar con el servidor. Intentá nuevamente.'
          : submitError instanceof Error
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
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="product-name">Nombre</label>
              <input
                id="product-name"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="product-description">Descripción</label>
              <textarea
                id="product-description"
                name="descripcion"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="product-price">Precio</label>
              <input
                id="product-price"
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="product-stock">Stock</label>
              <input
                id="product-stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="product-image">URL de imagen</label>
              <input
                id="product-image"
                name="imagenUrl"
                type="url"
                value={formData.imagenUrl}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="product-measurements">Medidas</label>
              <input
                id="product-measurements"
                name="medidas"
                value={formData.medidas}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="product-manufacturing">
                Detalles de fabricación
              </label>
              <textarea
                id="product-manufacturing"
                name="detallesFabricacion"
                rows="4"
                value={formData.detallesFabricacion}
                onChange={handleChange}
              />
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando…' : 'Crear producto'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreateProductPage;
