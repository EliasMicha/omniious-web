import { Link } from 'react-router-dom';

export default function LutronBand() {
  return (
    <section className="lutron-band-section">
      <div className="lutron-band">
        <div>
          <div className="band-eye">— Especialidad destacada</div>
          <div className="band-title">Integradores Lutron certificados.</div>
          <p>HomeWorks · RA2 · Athena · Caséta · Vive — con programadores propios, no freelance.</p>
        </div>
        <Link to="/lutron" className="band-link">
          Ver línea Lutron <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span>
        </Link>
      </div>
    </section>
  );
}
