import { useState } from 'react';
import logo from '../assets/logo.svg';

function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = window.location.pathname.toLowerCase();
  const isCatalogPage = currentPath.endsWith('/productos.html');
  const isContactPage = currentPath.endsWith('/contacto.html');

  return (
    <header className="header">
      <div className="container header-content">
        <a
          href="/index.html"
          className="logo"
          aria-label="Hermanos Jota, inicio"
        >
          <img src={logo} alt="" className="logo-img" />
          <span className="logo-text">HERMANOS JOTA</span>
        </a>
        <nav
          className={`nav${isMenuOpen ? ' is-open' : ''}`}
          id="site-nav"
          aria-label="Navegación principal"
        >
          <a
            href="/index.html"
            className={`nav-link${!isCatalogPage && !isContactPage ? ' active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            INICIO
          </a>
          <a
            href="/productos.html"
            className={`nav-link${isCatalogPage ? ' active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            CATÁLOGO
          </a>
          <a
            href="/contacto.html"
            className={`nav-link${isContactPage ? ' active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACTO
          </a>
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
        <button
          className="btn-carrito"
          type="button"
          aria-label={`Carrito, ${cartCount} productos`}
        >
          <span className="cart-icon" aria-hidden="true">
            &#128722;
          </span>
          <span className="cart-label">Carrito</span>
          <span className="cart-count" hidden={cartCount === 0}>
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;