const CLIENTS = [
  'Niz + Chauvet', 'Archetonic', 'Habitación 116', 'Esrawe',
  'IZ Arquitectos', 'C Cúbica', 'Artigas Arquitectos', 'Pérez Palacios',
  'Nodo Arquitectura', 'Carranza Ruiz', 'Shamosh Studio', 'GICSA',
  'Cinépolis', 'Grupo Chedraui', 'BBVA', 'Alsea'
];

export default function Clientes() {
  return (
    <section id="clientes">
      <div className="clients-title">— Colaboraciones selectas</div>
      <div className="clients-list">
        {CLIENTS.map(c => <span key={c}>{c}</span>)}
      </div>
    </section>
  );
}
