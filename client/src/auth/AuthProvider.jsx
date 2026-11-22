import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { ROLES } from './roles';
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  LOGIN_API_URL,
  PROFILE_API_URL,
  REGISTER_API_URL,
  getAuthHeaders,
} from '../config/api';

function readStoredUser() {
  const storedUser = window.localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    window.localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

async function readResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.mensaje || fallbackMessage);
    error.status = response.status;
    throw error;
  }

  return data;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem(AUTH_TOKEN_KEY)
  );
  const [user, setUser] = useState(() =>
    window.localStorage.getItem(AUTH_TOKEN_KEY) ? readStoredUser() : null
  );
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
  );
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const storedToken = window.localStorage.getItem(AUTH_TOKEN_KEY);

    if (!storedToken) {
      setUser(null);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    async function validateSession() {
      try {
        const response = await fetch(PROFILE_API_URL, {
          headers: getAuthHeaders(storedToken),
          signal: controller.signal,
        });
        const data = await readResponse(
          response,
          'No se pudo validar la sesión.'
        );
        const authenticatedUser = data.usuario;

        if (
          !authenticatedUser?.id ||
          !Object.values(ROLES).includes(authenticatedUser.role)
        ) {
          throw new Error('El servidor devolvió un perfil inválido.');
        }

        if (!controller.signal.aborted) {
          setUser(authenticatedUser);
          window.localStorage.setItem(
            AUTH_USER_KEY,
            JSON.stringify(authenticatedUser)
          );
          setAuthError('');
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (error.status === 401) {
          window.localStorage.removeItem(AUTH_TOKEN_KEY);
          setToken(null);
        }

        setUser(null);
        window.localStorage.removeItem(AUTH_USER_KEY);

        if (error instanceof TypeError) {
          setAuthError('No pudimos validar tu sesión con el servidor.');
        } else {
          setAuthError(
            error instanceof Error
              ? error.message
              : 'No se pudo validar la sesión.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    validateSession();

    return () => controller.abort();
  }, []);

  async function login(credentials) {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await readResponse(response, 'No se pudo iniciar sesión.');

    if (
      !data.token ||
      !data.usuario?.id ||
      !Object.values(ROLES).includes(data.usuario.role)
    ) {
      throw new Error('El servidor devolvió una respuesta de sesión inválida.');
    }

    window.localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.usuario));
    setToken(data.token);
    setUser(data.usuario);
    setAuthError('');

    return data.usuario;
  }

  async function register(userData) {
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    return readResponse(response, 'No se pudo completar el registro.');
  }

  function logout() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
    setUser(null);
    setAuthError('');
    setIsLoading(false);
  }

  const value = useMemo(
    () => ({
      user: isLoading ? null : user,
      token,
      role: isLoading ? null : (user?.role ?? null),
      isLoading,
      authError,
      isAuthenticated: !isLoading && Boolean(user),
      isAdmin: !isLoading && user?.role === ROLES.ADMIN,
      isUser: !isLoading && user?.role === ROLES.USER,
      login,
      register,
      logout,
    }),
    [authError, isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
