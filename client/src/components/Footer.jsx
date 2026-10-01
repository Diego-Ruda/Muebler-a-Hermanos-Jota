import { NavLink } from 'react-router-dom';

const logo = '/img/logo.svg';

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="container footer-content">
        <div className="footer-brand">
          <NavLink to="/" className="logo logo-footer" aria-label="Inicio">
            <img src={logo} alt="" className="logo-img" />
            <span className="logo-text">HERMANOS JOTA</span>
          </NavLink>
          <p>
            Mueblería de diseño atemporal y sustentable.
            <br />
            Showroom abierto de Lunes a Sábado.
          </p>
        </div>
        <div className="footer-info">
          <h4>Showroom</h4>
          <p>Av. San Juan 2847, CABA</p>
          <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
        </div>
        <div className="footer-info">
          <h4>Redes</h4>
          <p>@hermanosjota_ba</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
