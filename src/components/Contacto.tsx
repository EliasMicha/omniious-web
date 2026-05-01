import { useLocation } from 'react-router-dom';
import { trackLead } from '../lib/analytics';

export default function Contacto() {
  const location = useLocation();
  const source = location.pathname || '/';

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
              <a
                href="mailto:elias@omniious.com"
                onClick={() => trackLead('email', source)}
              >
                elias@omniious.com
              </a><br />
              <a
                href="tel:+525555011014"
                onClick={() => trackLead('phone', source)}
              >
                +52 55 5501 1014
              </a>
            </div>
          </div>
          <div className="contact-block">
            <div className="role">Dirección de Iluminación</div>
            <div className="person">Juan Pablo Gómez</div>
            <div className="detail">
              <a
                href="mailto:juanpablo@omniious.com"
                onClick={() => trackLead('email', source)}
              >
                juanpablo@omniious.com
              </a>
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
