import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const logo = '/img/logo.svg';

const navLinks = [
  { to: '/', label: 'INICIO', end: true },
  { to: '/productos', label: 'CATÁLOGO' },
  { to: '/contacto', label: 'CONTACTO' },
];

const adminLink = {
  to: '/admin/crear-producto',
  label: 'PANEL DE ADMINISTRACIÓN',
};

function Navbar({ cartCount = 0, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authError, isAdmin, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-content">
        <NavLink to="/" className="logo" aria-label="Hermanos Jota, inicio">
          <img src={logo} alt="" className="logo-img" />
          <span className="logo-text">HERMANOS JOTA</span>
        </NavLink>
        <nav
          className={`nav${isMenuOpen ? ' is-open' : ''}`}
          id="site-nav"
          aria-label="Navegación principal"
        >
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="header-actions">
          {authError && (
            <span className="auth-error" role="alert">
              {authError}
            </span>
          )}
          <button
            className="btn-carrito"
            type="button"
            aria-label={`Carrito, ${cartCount} productos`}
            onClick={onCartClick}
          >
            <span className="cart-icon" aria-hidden="true">
              &#128722;
            </span>
            <span className="cart-label">Carrito</span>
            <span className="cart-count" hidden={cartCount === 0}>
              {cartCount}
            </span>
          </button>
          {!isLoading && isAuthenticated && (
            <>
              <Link
                to="/perfil"
                className="nav-link account-link"
                onClick={() => setIsMenuOpen(false)}
              >
                MI PERFIL
              </Link>
              {isAdmin && (
                <NavLink
                  to={adminLink.to}
                  className={({ isActive }) =>
                    `nav-link admin-link${isActive ? ' active' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {adminLink.label}
                </NavLink>
              )}
              <button
                className="nav-link account-button"
                type="button"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                CERRAR SESIÓN
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
