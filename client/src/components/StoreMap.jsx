import { Clock, MapPin, Route } from '@gravity-ui/icons';

const STORE_ADDRESS = 'Av. San Juan 2847, CABA';
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  STORE_ADDRESS
)}&output=embed`;
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STORE_ADDRESS
)}`;

export default function StoreMap() {
  return (
    <>
      <div className="ubicacion-header">
        <h2 className="section-title ubicacion-title">
          <MapPin className="ubicacion-icon" aria-hidden="true" />
          UBICACIÓN
        </h2>
      </div>
      <div className="catalog-visit-card">
        <div className="catalog-visit-map">
          <iframe
            title="Mapa de nuestro local"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="catalog-visit-info">
          <span className="section-tag">
            ¡VISITANOS TAMBIÉN EN NUESTRO LOCAL FÍSICO!
          </span>
          <p>
            Te recordamos que también podés visitarnos en nuestro local físico y
            descubrir las piezas en persona y llevarte una gran experiencia.
          </p>
          <strong className="catalog-visit-address">
            <MapPin aria-hidden="true" />
            {STORE_ADDRESS}
          </strong>
          <div className="catalog-visit-hours">
            <strong>
              <Clock aria-hidden="true" />
              Horarios:
            </strong>
            <span>Lunes a Viernes: 10:00 - 19:00.</span>
            <span>Sábados: 10:00 - 14:00.</span>
          </div>
          <a href={MAP_LINK_URL} target="_blank" rel="noreferrer">
            <Route aria-hidden="true" />
            Te mostramos cómo llegar
          </a>
        </div>
      </div>
    </>
  );
}
