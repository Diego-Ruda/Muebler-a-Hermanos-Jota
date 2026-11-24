import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegistration({ nombre, email, password, confirmPassword }) {
  const errors = {};

  if (!nombre.trim()) {
    errors.nombre = 'Ingresá tu nombre.';
  }

  if (!email.trim()) {
    errors.email = 'Ingresá tu correo electrónico.';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Ingresá un correo electrónico válido.';
  }

  if (!password) {
    errors.password = 'Ingresá una contraseña.';
  } else if (password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Repetí tu contraseña.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }

  return errors;
}

function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
      ...(name === 'password' ? { confirmPassword: '' } : {}),
    }));
    setServerError('');
    setSuccessMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateRegistration(formData);
    setErrors(validationErrors);
    setServerError('');
    setSuccessMessage('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await register({
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      setSuccessMessage(
        response.mensaje ||
          'Tu cuenta se creó correctamente. Ya podés iniciar sesión.'
      );
      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setServerError(
        error instanceof TypeError
          ? 'No pudimos conectarnos con el servidor. Intentá nuevamente.'
          : error.message || 'No se pudo completar el registro.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="page-hero container">
        <span className="section-tag">MI CUENTA</span>
        <h1>CREAR CUENTA</h1>
      </section>
      <section className="container auth-container">
        <div className="form-card">
          <h2>Registrate</h2>
          {serverError && (
            <p className="error form-alert" role="alert">
              {serverError}
            </p>
          )}
          {successMessage && (
            <p className="form-success" role="status">
              {successMessage} <Link to="/login">Iniciar sesión</Link>
            </p>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="register-name">Nombre</label>
              <input
                id="register-name"
                name="nombre"
                type="text"
                autoComplete="name"
                value={formData.nombre}
                onChange={handleChange}
                aria-invalid={Boolean(errors.nombre)}
                aria-describedby={
                  errors.nombre ? 'register-name-error' : undefined
                }
                required
              />
              {errors.nombre && (
                <span className="error" id="register-name-error">
                  {errors.nombre}
                </span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="register-email">Correo electrónico</label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'register-email-error' : undefined
                }
                required
              />
              {errors.email && (
                <span className="error" id="register-email-error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="register-password">Contraseña</label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? 'register-password-error' : undefined
                }
                minLength={8}
                required
              />
              {errors.password && (
                <span className="error" id="register-password-error">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="register-confirm-password">
                Confirmar contraseña
              </label>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? 'register-confirm-password-error'
                    : undefined
                }
                required
              />
              {errors.confirmPassword && (
                <span className="error" id="register-confirm-password-error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </form>
          <p className="auth-alternate">
            ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
