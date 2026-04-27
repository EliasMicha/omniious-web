import DisciplineLanding, { type DisciplineConfig } from '../components/DisciplineLanding';

const config: DisciplineConfig = {
  slug: 'iluminacion',
  eyebrow: 'Disciplina I — Iluminación arquitectónica',
  title: <>La luz como <em>material</em><br />de arquitectura.</>,
  lead: 'Diseñamos, calculamos y suministramos la iluminación para arquitectura residencial, comercial, hotelera y corporativa. Del concepto a la puesta en obra, sin intermediarios.',
  scopeFilter: 'iluminacion',
  whatsappMessage: 'Hola Omniious, me interesa cotizar un proyecto de iluminación.',
  seo: {
    title: 'Diseño de Iluminación Arquitectónica CDMX — OMNIIOUS',
    description: 'Diseño de iluminación arquitectónica en Ciudad de México. Conceptual, cálculos DiaLux, decorativa, custom NULED e importación europea. Cotiza tu proyecto.'
  },
  services: [
    { name: 'Diseño conceptual', desc: 'Propuesta de iluminación coordinada con la arquitectura, render lumínico, atmósferas por espacio.' },
    { name: 'Diseño ejecutivo', desc: 'Planos de sembrado, detalles constructivos, especificación final por luminaria, memoria técnica.' },
    { name: 'Cálculos lumínicos', desc: 'Cálculos DiaLux por área. Niveles, uniformidades, deslumbramiento y eficiencia energética verificados.' },
    { name: 'Iluminación decorativa', desc: 'Curaduría y especificación de luminarias decorativas — Flos, Vibia, Penta, Lumen Center y más vía Casa Luce.' },
    { name: 'Luminarias custom', desc: 'Diseño y fabricación de luminarias arquitectónicas a la medida con NULED — desde lineales hasta pendientes y baños de luz.' },
    { name: 'Importación', desc: 'Coordinación de importación de luminarias europeas y americanas. Logística, aduana y entrega a obra.' },
    { name: 'Suministro', desc: 'Compra, almacenaje y entrega coordinada con tu cronograma de obra. Una factura, un responsable.' },
    { name: 'Puesta en marcha', desc: 'Programación de escenas, ajuste fino in-situ, capacitación al equipo de mantenimiento del cliente.' }
  ]
};

export default function Iluminacion() {
  return <DisciplineLanding config={config} />;
}
