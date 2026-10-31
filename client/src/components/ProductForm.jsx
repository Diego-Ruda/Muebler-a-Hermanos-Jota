import { useState } from 'react';

const EMPTY_PRODUCT = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: 0,
  imagenUrl: '',
  medidas: '',
  detallesFabricacion: '',
};

function getInitialValues(product) {
  return {
    nombre: product.nombre ?? '',
    descripcion: product.descripcion ?? '',
    precio: product.precio ?? '',
    stock: product.stock ?? 0,
    imagenUrl: product.imagenUrl ?? '',
    medidas: product.medidas ?? '',
    detallesFabricacion: product.detallesFabricacion ?? '',
  };
}

function validateProduct(product) {
  if (!product.nombre) {
    return 'El nombre es obligatorio.';
  }

  if (!Number.isFinite(product.precio) || product.precio < 0) {
    return 'El precio debe ser un número mayor o igual a 0.';
  }

  if (!Number.isInteger(product.stock) || product.stock < 0) {
    return 'El stock debe ser un número entero mayor o igual a 0.';
  }

  return '';
}

function ProductForm({
  initialProduct = EMPTY_PRODUCT,
  onSubmit,
  isSubmitting = false,
  error = '',
  successMessage = '',
  submitLabel = 'Crear producto',
  submittingLabel = 'Guardando…',
}) {
  const [values, setValues] = useState(() => getInitialValues(initialProduct));
  const [validationError, setValidationError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const product = {
      nombre: values.nombre.trim(),
      descripcion: values.descripcion.trim(),
      precio: values.precio === '' ? Number.NaN : Number(values.precio),
      stock: values.stock === '' ? 0 : Number(values.stock),
      imagenUrl: values.imagenUrl.trim(),
      medidas: values.medidas.trim(),
      detallesFabricacion: values.detallesFabricacion.trim(),
    };

    const nextValidationError = validateProduct(product);

    if (nextValidationError) {
      setValidationError(nextValidationError);
      return;
    }

    setValidationError('');
    onSubmit(product);
  }

  const feedbackMessage = validationError || error;

  return (
    <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <div className="form-field">
        <label htmlFor="product-name">Nombre</label>
        <input
          id="product-name"
          name="nombre"
          value={values.nombre}
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
          value={values.descripcion}
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
          value={values.precio}
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
          value={values.stock}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="product-image">URL de imagen</label>
        <input
          id="product-image"
          name="imagenUrl"
          type="text"
          inputMode="url"
          placeholder="/img/producto.png"
          value={values.imagenUrl}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="product-measurements">Medidas</label>
        <input
          id="product-measurements"
          name="medidas"
          value={values.medidas}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="product-manufacturing">Detalles de fabricación</label>
        <textarea
          id="product-manufacturing"
          name="detallesFabricacion"
          rows="4"
          value={values.detallesFabricacion}
          onChange={handleChange}
        />
      </div>
      {successMessage && (
        <p className="form-success" role="status">
          {successMessage}
        </p>
      )}
      {feedbackMessage && (
        <p className="error" role="alert">
          {feedbackMessage}
        </p>
      )}
      <button className="btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
