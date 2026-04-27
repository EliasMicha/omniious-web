export default function Contacto() {
  return (
    <section id="contacto">
      <div className="section-header">
        <div className="section-num">V — Contacto</div>
        <h2 className="section-title">Conversemos<br />sobre tu <em>próxima</em> obra.</h2>
      </div>

      <div className="contact-main">
        <p className="contact-lead">Cada proyecto comienza con una conversación. <em>Escríbenos.</em></p>

        <div className="contact-info">
          <div className="contact-block">
            <div className="role">Dirección General</div>
            <div className="person">Elias Gabriel Micha</div>
            <div className="detail">
              <a href="mailto:elias@omniious.com">elias@omniious.com</a><br />
              <a href="tel:+525555011014">+52 55 5501 1014</a>
            </div>
          </div>
          <div className="contact-block">
            <div className="role">Dirección de Iluminación</div>
            <div className="person">Juan Pablo Gómez</div>
            <div className="detail">
              <a href="mailto:juanpablo@omniious.com">juanpablo@omniious.com</a>
            </div>
          </div>
          <div className="contact-block">
            <div className="role">Dirección de Instalaciones</div>
            <div className="person">Manuel Casas</div>
            <div className="detail">
              <a href="mailto:manuel@omniious.com">manuel@omniious.com</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div>© OMNIIOUS MMXXVI</div>
        <div>Ciudad de México</div>
        <div>Arquitectura de Luz</div>
      </footer>
    </section>
  );
}
