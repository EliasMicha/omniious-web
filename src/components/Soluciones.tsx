interface Solution {
  idx: string;
  name: string;
  desc: string;
  items: string;
}

const SOLUTIONS: Solution[] = [
  {
    idx: 'I / IV',
    name: 'Iluminación',
    desc: 'Diseño de iluminación arquitectónica desde el concepto hasta la puesta en obra. Desarrollamos conceptuales, cálculos DiaLux, detalles constructivos y suministro.',
    items: 'Concepto · Cálculo · Decorativa · Custom · Importación'
  },
  {
    idx: 'II / IV',
    name: 'Instalaciones',
    desc: 'Ingeniería eléctrica e ingenierías especiales. Diseñamos, suministramos e instalamos — coordinando cada sistema con la arquitectura.',
    items: 'Eléctrica · Especiales · Solares · Suministro'
  },
  {
    idx: 'III / IV',
    name: 'Automatización',
    desc: 'Sistemas que se integran con naturalidad al espacio. Control de iluminación, audio, CCTV, accesos, redes y cortinas motorizadas.',
    items: 'Lutron · Sonos · Ubiquiti · Hikvision'
  },
  {
    idx: 'IV / IV',
    name: 'Ejecución',
    desc: 'Coordinación integral de obra con técnicos especializados. De la planeación semanal al arranque final, con precisión quirúrgica.',
    items: 'Dirección · Supervisión · Puesta en marcha'
  }
];

export default function Soluciones() {
  return (
    <section id="soluciones">
      <div className="section-header">
        <div className="section-num">II — Soluciones</div>
        <h2 className="section-title">Cuatro disciplinas,<br />un <em>mismo</em> oficio.</h2>
      </div>

      <div className="solutions-grid">
        {SOLUTIONS.map(s => (
          <div className="solution" key={s.idx}>
            <div className="idx">{s.idx}</div>
            <div className="name">{s.name}</div>
            <div className="desc">{s.desc}</div>
            <div className="items">{s.items}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
