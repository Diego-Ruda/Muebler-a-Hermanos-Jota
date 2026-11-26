import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRightFromSquare,
  ArrowRightToSquare,
  Envelope,
  House,
  LayoutList,
  Person,
  ShoppingCart,
} from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import { useAuth } from '../auth/AuthContext';
import { useAlerts } from './AlertsProvider';

const logo = '/img/logo.svg';

const navLinks = [
  { to: '/', label: 'INICIO', end: true, Icon: House },
  { to: '/productos', label: 'CATÁLOGO', Icon: LayoutList },
  { to: '/contacto', label: 'CONTACTO', Icon: Envelope },
];

const adminLink = {
  to: '/admin/crear-producto',
  label: 'PANEL DE ADMINISTRACIÓN',
};

function Navbar({ cartCount = 0, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authError, isAdmin, isAuthenticated, isLoading, logout } = useAuth();
  const { showAlert } = useAlerts();
  const location = useLocation();
  const navigate = useNavigate();

  const isNavActive = ({ to, end }) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  const cartButton = (extraClass = '') => (
    <Button
      className={`nav-button cart-nav-button${extraClass ? ` ${extraClass}` : ''}`}
      variant="ghost"
      aria-label={`Carrito, ${cartCount} productos`}
      onPress={onCartClick}
    >
      <ShoppingCart aria-hidden="true" />
      <span className="cart-label">CARRITO</span>
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </Button>
  );

  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="logo" aria-label="Hermanos Jota, inicio">
          <img src={logo} alt="" className="logo-img" />
          <span className="logo-text">HERMANOS JOTA</span>
        </NavLink>
        <nav
          className={`nav${isMenuOpen ? ' is-open' : ''}`}
          id="site-nav"
          aria-label="Navegación principal"
        >
          {navLinks.flatMap(({ to, label, end, Icon }, index) => {
            const active = isNavActive({ to, end });
            const items = [];

            if (index > 0) {
              items.push(
                <span
                  key={`nav-separator-${to}`}
                  className="nav-separator"
                  aria-hidden="true"
                >
                  |
                </span>
              );
            }

            items.push(
              <Button
                key={to}
                className={`nav-button${active ? ' nav-button--active' : ''}`}
                variant={active ? 'primary' : 'ghost'}
                onPress={() => {
                  navigate(to);
                  setIsMenuOpen(false);
                }}
              >
                <Icon aria-hidden="true" />
                {label}
              </Button>
            );

            return items;
          })}
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
              <Button
                className={`nav-button account-nav-button${
                  location.pathname === '/login' ? ' nav-button--active' : ''
                }`}
                variant={location.pathname === '/login' ? 'primary' : 'ghost'}
                onPress={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                <ArrowRightToSquare aria-hidden="true" />
                INICIAR SESIÓN
              </Button>
              <span className="auth-separator" aria-hidden="true">
                |
              </span>
              {cartButton('cart-button-header')}
            </>
          )}
          {!isLoading && isAuthenticated && (
            <>
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
              <Button
                className={`nav-button account-nav-button profile-nav-button${
                  location.pathname === '/perfil' ? ' nav-button--active' : ''
                }`}
                variant={location.pathname === '/perfil' ? 'primary' : 'ghost'}
                onPress={() => {
                  navigate('/perfil');
                  setIsMenuOpen(false);
                }}
              >
                <Person aria-hidden="true" />
                MI PERFIL
              </Button>
              <Button
                className="nav-button account-nav-button logout-nav-button"
                variant="ghost"
                onPress={() => {
                  logout();
                  showAlert({
                    severity: 'success',
                    title: 'Sesión cerrada',
                    message: 'Cerraste sesión correctamente.',
                  });
                  setIsMenuOpen(false);
                }}
              >
                <ArrowRightFromSquare aria-hidden="true" />
                CERRAR SESIÓN
              </Button>
              <span className="auth-separator" aria-hidden="true">
                |
              </span>
              {cartButton('cart-button-header')}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
