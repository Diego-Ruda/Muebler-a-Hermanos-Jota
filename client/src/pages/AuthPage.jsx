import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Link,
  Separator,
  Tabs,
  TextField,
} from '@heroui/react';
import { useAlerts } from '../components/AlertsProvider';
import { useAuth } from '../auth/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthField({
  autoComplete,
  description,
  error,
  id,
  label,
  minLength,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}) {
  return (
    <TextField
      className="auth-field"
      fullWidth
      isInvalid={Boolean(error)}
      isRequired
      minLength={minLength}
      name={name}
      onChange={(nextValue) => onChange(name, nextValue)}
      type={type}
      value={value}
      variant="secondary"
    >
      <Label className="auth-label">{label}</Label>
      <Input
        autoComplete={autoComplete}
        className="auth-input"
        id={id}
        placeholder={placeholder}
      />
      {description && (
        <Description className="auth-field-description">
          {description}
        </Description>
      )}
      {error && <FieldError>{error}</FieldError>}
    </TextField>
  );
}

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

function AuthPage() {
  const { clearJustLoggedOut, justLoggedOut, login, register } = useAuth();
  const { showAlert } = useAlerts();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const logoutAlertHandledRef = useRef(false);
  const selectedTab = location.pathname === '/registro' ? 'register' : 'login';

  useEffect(() => {
    if (logoutAlertHandledRef.current) {
      return;
    }

    if (justLoggedOut) {
      logoutAlertHandledRef.current = true;
      clearJustLoggedOut();
      return;
    }

    if (location.pathname === '/login' && location.state?.from) {
      showAlert({
        severity: 'info',
        title: 'Iniciá sesión para continuar',
        message: 'Necesitás una cuenta para acceder a esa sección.',
      });
    }
  }, [
    clearJustLoggedOut,
    justLoggedOut,
    location.pathname,
    location.state,
    showAlert,
  ]);

  function handleLoginChange(name, value) {
    setLoginData((currentData) => ({ ...currentData, [name]: value }));
    setLoginErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  function handleRegisterChange(name, value) {
    setRegisterData((currentData) => ({ ...currentData, [name]: value }));
    setRegisterErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
      ...(name === 'password' ? { confirmPassword: '' } : {}),
    }));
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const errors = {};

    if (!loginData.email.trim()) {
      errors.email = 'Ingresá tu correo electrónico.';
    } else if (!EMAIL_REGEX.test(loginData.email.trim())) {
      errors.email = 'Ingresá un correo electrónico válido.';
    }

    if (!loginData.password) {
      errors.password = 'Ingresá tu contraseña.';
    }

    setLoginErrors(errors);

    if (Object.keys(errors).length > 0) {
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
        email: loginData.email.trim(),
        password: loginData.password,
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

  async function handleRegisterSubmit(event) {
    event.preventDefault();
    const errors = validateRegistration(registerData);
    setRegisterErrors(errors);

    if (Object.keys(errors).length > 0) {
      showAlert({
        severity: 'warning',
        title: 'Revisá los datos',
        message: 'Hay campos incompletos o incorrectos en el formulario.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await register({
        nombre: registerData.nombre.trim(),
        email: registerData.email.trim(),
        password: registerData.password,
      });
      showAlert({
        severity: 'success',
        title: '¡Cuenta creada!',
        message: (
          <>
            {response.mensaje || 'Tu cuenta se creó correctamente.'} Ya podés{' '}
            <RouterLink to="/login">iniciar sesión</RouterLink>.
          </>
        ),
      });
      setRegisterData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setRegisterErrors({});
    } catch (error) {
      showAlert({
        severity: 'error',
        title: 'No se pudo completar el registro',
        message:
          error instanceof TypeError
            ? 'No pudimos conectarnos con el servidor. Intentá nuevamente.'
            : error.message || 'Intentá nuevamente en unos minutos.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <section className="auth-editorial" aria-label="Hermanos Jota">
          <div className="auth-editorial-copy">
            <span className="auth-brand">HERMANOS JOTA</span>
            <h1>Espacios pensados para quedarse.</h1>
            <p>
              Guardá tus favoritos, hacé seguimiento de tus pedidos y accedé a
              piezas exclusivas.
            </p>
          </div>
          <Link className="auth-home-link" href="/">
            Volver a la tienda
          </Link>
        </section>

        <Card.Content className="auth-content">
          <header className="auth-heading">
            <span className="section-tag">MI CUENTA</span>
            <h2>Tu espacio, a tu manera</h2>
            <p>Ingresá o creá una cuenta para continuar.</p>
          </header>
          <Separator className="auth-divider" />

          <Tabs
            align="start"
            className="auth-tabs"
            selectedKey={selectedTab}
            onSelectionChange={(key) =>
              navigate(key === 'register' ? '/registro' : '/login')
            }
            variant="secondary"
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label="Opciones de cuenta">
                <Tabs.Tab id="login">
                  Iniciar sesión
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="register">
                  Crear cuenta
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel className="auth-panel" id="login">
              <Form
                className="auth-form"
                onSubmit={handleLoginSubmit}
                validationBehavior="aria"
              >
                <AuthField
                  autoComplete="email"
                  error={loginErrors.email}
                  id="login-email"
                  label="Correo electrónico"
                  name="email"
                  onChange={handleLoginChange}
                  placeholder="tu@email.com"
                  type="email"
                  value={loginData.email}
                />
                <AuthField
                  autoComplete="current-password"
                  error={loginErrors.password}
                  id="login-password"
                  label="Contraseña"
                  name="password"
                  onChange={handleLoginChange}
                  placeholder="Tu contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                />
                <Checkbox
                  className="auth-password-toggle"
                  isSelected={showPassword}
                  onChange={setShowPassword}
                >
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    Mostrar contraseña
                  </Checkbox.Content>
                </Checkbox>
                <Button
                  className="auth-submit"
                  fullWidth
                  isDisabled={isSubmitting}
                  size="lg"
                  type="submit"
                >
                  {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
                </Button>
              </Form>
            </Tabs.Panel>

            <Tabs.Panel className="auth-panel" id="register">
              <Form
                className="auth-form"
                onSubmit={handleRegisterSubmit}
                validationBehavior="aria"
              >
                <AuthField
                  autoComplete="name"
                  error={registerErrors.nombre}
                  id="register-name"
                  label="Nombre completo"
                  name="nombre"
                  onChange={handleRegisterChange}
                  placeholder="Tu nombre"
                  value={registerData.nombre}
                />
                <AuthField
                  autoComplete="email"
                  error={registerErrors.email}
                  id="register-email"
                  label="Correo electrónico"
                  name="email"
                  onChange={handleRegisterChange}
                  placeholder="tu@email.com"
                  type="email"
                  value={registerData.email}
                />
                <AuthField
                  autoComplete="new-password"
                  description="Usá al menos 8 caracteres."
                  error={registerErrors.password}
                  id="register-password"
                  label="Contraseña"
                  minLength={8}
                  name="password"
                  onChange={handleRegisterChange}
                  placeholder="Al menos 8 caracteres"
                  type={showPassword ? 'text' : 'password'}
                  value={registerData.password}
                />
                <AuthField
                  autoComplete="new-password"
                  error={registerErrors.confirmPassword}
                  id="register-confirm-password"
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  onChange={handleRegisterChange}
                  placeholder="Repetí tu contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={registerData.confirmPassword}
                />
                <Checkbox
                  className="auth-password-toggle"
                  isSelected={showPassword}
                  onChange={setShowPassword}
                >
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    Mostrar contraseña
                  </Checkbox.Content>
                </Checkbox>
                <Button
                  className="auth-submit"
                  fullWidth
                  isDisabled={isSubmitting}
                  size="lg"
                  type="submit"
                >
                  {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
                </Button>
              </Form>
            </Tabs.Panel>
          </Tabs>
        </Card.Content>
      </Card>
    </main>
  );
}

export default AuthPage;
