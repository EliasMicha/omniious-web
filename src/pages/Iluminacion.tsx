import DisciplineLanding, { type DisciplineConfig } from '../components/DisciplineLanding';

const config: DisciplineConfig = {
  slug: 'iluminacion',
  eyebrow: 'Disciplina I — Iluminación arquitectónica',
  title: <>La luz como <em>material</em><br />de arquitectura.</>,
  lead: 'Una iluminación bien hecha no se nota. Una mala, siempre.',
  scopeFilter: 'iluminacion',
  whatsappMessage: 'Hola Omniious, me interesa cotizar iluminación arquitectónica.',
  seo: {
    title: 'Diseño de Iluminación Arquitectónica CDMX — OMNIIOUS',
    description: 'Diseño e implementación de iluminación arquitectónica para residencial, hotelería, corporativo y comercial. Mismo equipo, mismo responsable.'
  },
  designServices: [
    { name: 'Diseño conceptual', desc: 'Propuesta de iluminación coordinada con la arquitectura, atmósferas y tipos de fuente por espacio.' },
    { name: 'Cálculos lumínicos', desc: 'Cálculos DiaLux por área. Niveles, uniformidades, deslumbramiento, eficiencia energética.' },
    { name: 'Diseño ejecutivo', desc: 'Planos de sembrado, detalles constructivos, especificación final por luminaria.' },
    { name: 'Carpeta de fichas técnicas', desc: 'Documentación completa para revisión, cotización y obra.' },
    { name: 'Memoria técnica', desc: 'Memoria de cálculo y entrega para verificador y trámite cuando aplica.' },
    { name: 'Iluminación decorativa', desc: 'Curaduría y especificación de luminarias decorativas según el tono del proyecto.' }
  ],
  implementationServices: [
    { name: 'Suministro y logística', desc: 'Compra, almacenaje y entrega coordinada con el cronograma de obra.' },
    { name: 'Importación', desc: 'Coordinación de importación de luminarias internacionales — logística, aduana y entrega a obra.' },
    { name: 'Coordinación con obra', desc: 'Revisión de instalación con el contratista de obra civil y eléctrica antes de tirar plafón.' },
    { name: 'Instalación y montaje', desc: 'Equipo propio para colgar, alinear y dejar lista cada luminaria — sobre todo las que requieren atención técnica.' },
    { name: 'Programación y arranque', desc: 'Ajuste fino in-situ, programación de escenas, recepción del sistema con el cliente.' },
    { name: 'Capacitación al cliente', desc: 'Entrega documentada y entrenamiento al equipo de mantenimiento del cliente final.' }
  ],
  brandsBlurb: 'Para arquitectónica trabajamos con Illux, Estevez, Birot y NULED, entre otras marcas nacionales. La iluminación decorativa europea — Flos, Vibia, Penta — la traemos a México via Casa Luce, parte del mismo ecosistema.'
};

export default function Iluminacion() {
  return <DisciplineLanding config={config} />;
}
