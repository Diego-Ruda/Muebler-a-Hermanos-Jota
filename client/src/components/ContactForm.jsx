function ContactForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(event);
  }

  return (
    <div className="contact-layout">
      <aside className="contact-card">
        <h2>Hablemos de tu espacio</h2>
        <p>Estamos para ayudarte a encontrar la pieza indicada.</p>
        <ul className="contact-list">
          <li>
            <strong>Showroom</strong>
            <br />
            Av. San Juan 2847, CABA
          </li>
          <li>
            <strong>Email</strong>
            <br />
            <a href="mailto:info@hermanosjota.com.ar">
              info@hermanosjota.com.ar
            </a>
          </li>
        </ul>
      </aside>
      <section className="form-card">
        <h2>Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="contact-name">Nombre</label>
            <input id="contact-name" name="name" type="text" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Mensaje</label>
            <textarea id="contact-message" name="message" rows="5" required />
          </div>
          <button className="btn-primary" type="submit">
            Enviar mensaje
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
