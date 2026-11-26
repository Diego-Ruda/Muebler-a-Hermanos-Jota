import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAlerts } from '../components/AlertsProvider';
import { useAuth } from '../auth/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const { clearJustLoggedOut, justLoggedOut, login } = useAuth();
  const { showAlert } = useAlerts();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logoutAlertHandledRef = useRef(false);

  useEffect(() => {
    if (logoutAlertHandledRef.current) {
      return;
    }

    if (justLoggedOut) {
      logoutAlertHandledRef.current = true;
      clearJustLoggedOut();
      return;
    }

    if (location.state?.from) {
      showAlert({
        severity: 'info',
        title: 'Iniciá sesión para continuar',
        message: 'Necesitás una cuenta para acceder a esa sección.',
      });
    }
  }, [clearJustLoggedOut, justLoggedOut, location.state, showAlert]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = 'Ingresá tu correo electrónico.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      validationErrors.email = 'Ingresá un correo electrónico válido.';
    }

    if (!formData.password) {
      validationErrors.password = 'Ingresá tu contraseña.';
    }

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
      const authenticatedUser = await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      showAlert({
        severity: 'success',
        title: 'Sesión iniciada correctamente.',
        message: `Bienvenido/a, ${authenticatedUser?.nombre ?? 'usuario.'}.`,
      });
      navigate(location.state?.from ?? '/', { replace: true });
    } catch (error) {
      showAlert({
        severity: 'error',
        title: 'No se pudo iniciar sesión',
        message:
          error instanceof TypeError
            ? 'No pudimos conectarnos con el servidor. Intentá nuevamente.'
            : error.message || 'Revisá tus credenciales e intentá de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="page-hero auth-hero container">
        <span className="section-tag">MI CUENTA</span>
        <h1>INICIAR SESIÓN</h1>
      </section>
      <section className="container auth-container">
        <div className="form-card">
          <h2>Bienvenido/a</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'login-email-error' : undefined
                }
                required
              />
              {errors.email && (
                <span className="error" id="login-email-error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? 'login-password-error' : undefined
                }
                required
              />
              {errors.password && (
                <span className="error" id="login-password-error">
                  {errors.password}
                </span>
              )}
            </div>
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>
          <p className="auth-alternate">
            ¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
