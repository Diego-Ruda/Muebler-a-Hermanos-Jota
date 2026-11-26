import { useState } from 'react';
import { useAlerts } from './AlertsProvider';
import { CONTACT_API_URL } from '../config/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOMBRE_LENGTH = 120;
const MAX_MENSAJE_LENGTH = 2000;
const EMPTY_FORM = { nombre: '', email: '', mensaje: '' };

function validateContact({ nombre, email, mensaje }) {
  const errors = {};

  if (!nombre.trim()) {
    errors.nombre = 'Ingresá tu nombre.';
  } else if (nombre.trim().length > MAX_NOMBRE_LENGTH) {
    errors.nombre = `El nombre no puede superar los ${MAX_NOMBRE_LENGTH} caracteres.`;
  }

  if (!email.trim()) {
    errors.email = 'Ingresá tu correo electrónico.';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Ingresá un correo electrónico válido.';
  }

  if (!mensaje.trim()) {
    errors.mensaje = 'Ingresá tu mensaje.';
  } else if (mensaje.trim().length > MAX_MENSAJE_LENGTH) {
    errors.mensaje = `El mensaje no puede superar los ${MAX_MENSAJE_LENGTH} caracteres.`;
  }

  return errors;
}

function ContactForm() {
  const { showAlert } = useAlerts();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateContact(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showAlert({
        severity: 'warning',
        title: 'Revisá los datos',
        message: 'Hay campos incompletos o incorrectos en el formulario.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          mensaje: formData.mensaje.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const details = Array.isArray(data?.errores)
          ? data.errores.join('. ')
          : '';
        throw new Error(
          details
            ? `${data?.mensaje || 'Datos inválidos'}: ${details}`
            : data?.mensaje || 'No se pudo enviar el mensaje.'
        );
      }

      showAlert({
        severity: 'success',
        title: 'Mensaje enviado correctamente.',
        message: 'Te vamos a responder a la brevedad.',
      });
      setFormData(EMPTY_FORM);
    } catch (submitError) {
      showAlert({
        severity: 'error',
        title: 'No se pudo enviar el mensaje',
        message:
          submitError instanceof TypeError
            ? 'No pudimos conectarnos con el servidor. Intentá nuevamente.'
            : submitError.message || 'Intentá nuevamente en unos minutos.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-layout">
      <aside className="contact-card">
        <h2>Hablemos de tu espacio</h2>
        <p>Estamos para ayudarte a encontrar la pieza indicada.</p>
        <ul className="contact-list">
          <li>
            <strong>Showroom</strong>
            <br />
            Av. San Juan 2847, CABA
          </li>
          <li>
            <strong>Email</strong>
            <br />
            <a href="mailto:info@hermanosjota.com.ar">
              info@hermanosjota.com.ar
            </a>
          </li>
        </ul>
      </aside>
      <section className="form-card">
        <h2>Contacto</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="contact-name">Nombre</label>
            <input
              id="contact-name"
              name="nombre"
              type="text"
              autoComplete="name"
              maxLength={MAX_NOMBRE_LENGTH}
              value={formData.nombre}
              onChange={handleChange}
              aria-invalid={Boolean(errors.nombre)}
              aria-describedby={
                errors.nombre ? 'contact-name-error' : undefined
              }
              required
            />
            {errors.nombre && (
              <span className="error" id="contact-name-error">
                {errors.nombre}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'contact-email-error' : undefined
              }
              required
            />
            {errors.email && (
              <span className="error" id="contact-email-error">
                {errors.email}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              name="mensaje"
              rows="5"
              maxLength={MAX_MENSAJE_LENGTH}
              value={formData.mensaje}
              onChange={handleChange}
              aria-invalid={Boolean(errors.mensaje)}
              aria-describedby={
                errors.mensaje ? 'contact-message-error' : undefined
              }
              required
            />
            {errors.mensaje && (
              <span className="error" id="contact-message-error">
                {errors.mensaje}
              </span>
            )}
          </div>
          <button className="btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
