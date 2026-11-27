import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../cart/CartContext';

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

function Navbar({ onCartClick }) {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authError, isAdmin, isAuthenticated, isLoading, logout } = useAuth();

  const cartButton = (extraClass = '') => (
    <button
      className={`btn-carrito${extraClass ? ` ${extraClass}` : ''}`}
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
  );

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
          {navLinks.flatMap(({ to, label, end }, index) => [
            index > 0 && (
              <span
                key={`nav-separator-${to}`}
                className="nav-separator"
                aria-hidden="true"
              >
                |
              </span>
            ),
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
            </NavLink>,
          ])}
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
          {isLoading && cartButton()}
          {!isLoading && !isAuthenticated && (
            <>
              <Link
                to="/registro"
                className="nav-link account-link"
                onClick={() => setIsMenuOpen(false)}
              >
                REGISTRARME
              </Link>
              <span className="auth-separator" aria-hidden="true">
                | o |
              </span>
              <Link
                to="/login"
                className="nav-link account-link"
                onClick={() => setIsMenuOpen(false)}
              >
                INICIAR SESIÓN
              </Link>
              {cartButton('cart-button-header')}
            </>
          )}
          {!isLoading && isAuthenticated && (
            <>
              {cartButton()}
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
