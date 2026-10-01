import ContactForm from '../components/ContactForm';

function ContactPage() {
  return (
    <main>
      <section className="page-hero container">
        <span className="section-tag">CONTACTO</span>
        <h1>HABLEMOS DE TU ESPACIO</h1>
        <p className="section-description">
          Escribinos y te ayudamos a encontrar la pieza indicada.
        </p>
      </section>
      <div className="container">
        <ContactForm />
      </div>
    </main>
  );
}

export default ContactPage;