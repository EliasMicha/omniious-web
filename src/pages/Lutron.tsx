import Nav from '../components/Nav';
import Ficha from '../components/Ficha';
import Contacto from '../components/Contacto';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import { organizationLd, serviceLd, breadcrumbLd, graphLd } from '../lib/seo';
import { trackLead } from '../lib/analytics';

const WA_MESSAGE = 'Hola Omniious, soy [arquitecto / cliente]. Mi proyecto está [en diseño / en obra / casa terminada con problemas Lutron] en [ciudad]. Me interesa [HomeWorks / RA2 / Caséta / Athena / no estoy seguro cuál]. Cuéntenme.';
const WA_HREF = `https://wa.me/525555011014?text=${encodeURIComponent(WA_MESSAGE)}`;

interface LutronLine {
  name: string;
  tagline: string;
  desc: string;
  fit: string;
}

const LINES: LutronLine[] = [
  {
    name: 'HomeWorks',
    tagline: 'La insignia',
    desc: 'Control total: iluminación, cortinas, escenas, audio y temperatura desde keypads, app y voz. Programable a granularidad máxima.',
    fit: 'Residencial alto · Casas grandes · Penthouses'
  },
  {
    name: 'RA2 Select / RadioRA 3',
    tagline: 'Inalámbrico flexible',
    desc: 'Control de iluminación y cortinas sin cablear. Escenas, programación y app móvil. Crece por etapas.',
    fit: 'Residencial medio · Oficinas pequeñas · Remodelaciones'
  },
  {
    name: 'Caséta',
    tagline: 'Punto de entrada',
    desc: 'Solución compacta para upgrades parciales. Dimmers, persianas y app — sin obra mayor.',
    fit: 'Departamentos · Upgrades selectivos'
  },
  {
    name: 'Vive',
    tagline: 'Comercial wireless',
    desc: 'Sensores de presencia y luz natural, control por zonas, dashboard de consumo. Cumplimiento de códigos energéticos.',
    fit: 'Oficinas · Comercio · Espacios corporativos'
  },
  {
    name: 'Athena',
    tagline: 'Comercial premium',
    desc: 'La nueva plataforma de Lutron para corporativos grandes. Control granular, integración profunda con BMS y AV.',
    fit: 'Corporativos · Edificios grandes · Hotelería'
  },
  {
    name: 'Cortinas motorizadas',
    tagline: 'Triathlon · QSWS · Sivoia QS',
    desc: 'Motores Lutron para cortinas y persianas — desde recargables hasta cableados de alto torque. Integradas con escenas.',
    fit: 'Cualquier sistema Lutron'
  }
];

const SERVICES = [
  { name: 'Diseño del sistema', desc: 'Definición de líneas, sembrado de keypads, lógica de escenas, integración con audio y BMS.' },
  { name: 'Suministro', desc: 'Distribución directa de Lutron — equipos originales, garantía vigente.' },
  { name: 'Instalación', desc: 'Equipo propio con experiencia en cada línea de Lutron, no contratistas externos.' },
  { name: 'Programación in-house', desc: 'Nuestros propios programadores. Sin freelancers. Sin retrasos por agenda de terceros.' },
  { name: 'Integración', desc: 'Audio (Sonos, McIntosh), BMS (Niagara, Honeywell), seguridad, cortinas, climatización.' },
  { name: 'Capacitación y soporte', desc: 'Entrega documentada y soporte post-instalación con tiempo de respuesta acotado.' }
];

export default function Lutron() {
  const url = 'https://omniious.com/lutron';
  const jsonLd = graphLd(
    organizationLd(),
    serviceLd({
      name: 'Integrador Lutron certificado en México',
      description: 'Diseño, suministro, instalación y programación de Lutron HomeWorks, RA2, Caséta, Vive y Athena. Programadores propios, no freelance.',
      url,
      serviceType: 'Lutron HomeWorks · RA2 · Athena · Caséta · Vive'
    }),
    breadcrumbLd([
      { name: 'OMNIIOUS', url: 'https://omniious.com' },
      { name: 'Lutron', url }
    ])
  );

  return (
    <>
      <Seo
        title="Integrador Lutron México — HomeWorks · Athena · RA2 | OMNIIOUS"
        description="Uno de los integradores Lutron más grandes de México. Diseñamos, instalamos y programamos HomeWorks, RA2, Caséta, Vive y Athena con programadores propios."
        path="/lutron"
        jsonLd={jsonLd}
      />
      <Nav />
      <Ficha />

      {/* HERO */}
      <section className="discipline-hero">
        <div>
          <div className="discipline-eyebrow">Integrador Lutron certificado · México</div>
          <h1 className="discipline-title">El control de la luz,<br /><em>al detalle</em>.</h1>
          <p className="discipline-lead">Un sistema Lutron es tan bueno como quien lo programa.</p>
          <div className="discipline-cta-row">
            <a
              className="btn-primary"
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead('whatsapp', '/lutron')}
            >
              Cotizar Lutron
            </a>
            <a className="btn-secondary" href="#lineas">Ver líneas Lutron</a>
          </div>
        </div>
      </section>

      {/* INTRO BLOCK */}
      <section className="lutron-intro">
        <div className="lutron-intro-grid">
          <div className="lutron-intro-lead">
            Somos uno de los <em>integradores Lutron más grandes</em> de México. Diseñamos, instalamos y programamos todas las líneas — con programadores propios, no freelance.
          </div>
          <div className="lutron-intro-detail">
            <p>Lutron mal instalado o mal programado es Lutron desperdiciado. La diferencia entre un sistema que el cliente disfruta todos los días y uno que termina en un cajón está en el equipo que lo armó.</p>
            <p>HomeWorks es nuestra línea más grande. Pero también especificamos RA2, Caséta, Vive y la nueva Athena según la dimensión y exigencia de cada proyecto.</p>
          </div>
        </div>
      </section>

      {/* LÍNEAS LUTRON */}
      <section id="lineas" className="lutron-lines-block">
        <div className="section-header">
          <div className="section-num">— Líneas Lutron</div>
          <h2 className="section-title">Seis plataformas.<br /><em>Una</em> para cada proyecto.</h2>
        </div>

        <div className="lutron-lines-grid">
          {LINES.map((l, i) => (
            <div className="lutron-line-card" key={l.name}>
              <div className="ll-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="ll-name">{l.name}</div>
              <div className="ll-tagline">{l.tagline}</div>
              <p className="ll-desc">{l.desc}</p>
              <div className="ll-fit">{l.fit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="lutron-services-block">
        <div className="section-header">
          <div className="section-num">— Servicios</div>
          <h2 className="section-title">De extremo a extremo.<br />Por <em>un</em> solo equipo.</h2>
        </div>
        <div className="lutron-services-list">
          {SERVICES.map((s, i) => (
            <div className="lutron-service-row" key={s.name}>
              <span className="ls-idx">{String(i + 1).padStart(2, '0')}</span>
              <div className="ls-name">{s.name}</div>
              <div className="ls-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUÉ OMM */}
      <section className="lutron-why">
        <div className="section-header">
          <div className="section-num">— Por qué OMM con Lutron</div>
          <h2 className="section-title">La diferencia <em>está</em> en el detalle.</h2>
        </div>

        <div className="lutron-why-grid">
          <div className="lwhy-card">
            <div className="lwhy-num">I</div>
            <div className="lwhy-title">Programadores propios</div>
            <p>No freelance, no externos. Nuestros programadores conocen el código de cada proyecto que tocamos y están disponibles para mantenimiento.</p>
          </div>
          <div className="lwhy-card">
            <div className="lwhy-num">II</div>
            <div className="lwhy-title">Certificación Lutron</div>
            <p>Specifier + Installer certificados en HomeWorks y demás líneas. Garantía vigente, parts y soporte directos del fabricante.</p>
          </div>
          <div className="lwhy-card">
            <div className="lwhy-num">III</div>
            <div className="lwhy-title">Integración real</div>
            <p>Lutron no vive solo. Lo coordinamos con audio, BMS, seguridad, cortinas y HVAC desde el primer plano — en lugar de pegarlos al final.</p>
          </div>
          <div className="lwhy-card">
            <div className="lwhy-num">IV</div>
            <div className="lwhy-title">Soporte post-instalación</div>
            <p>El cliente puede llamar a la misma firma que diseñó, instaló y programó. Sin pasarte de mano en mano cuando algo necesita ajuste.</p>
          </div>
        </div>
      </section>

      <Contacto />
      <WhatsAppButton phone="525555011014" message={WA_MESSAGE} />
    </>
  );
}
