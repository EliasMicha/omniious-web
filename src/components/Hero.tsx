export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        <span className="line">Diseñamos,</span>
        <span className="line">instalamos,</span>
        <span className="line"><em>construimos.</em></span>
      </h1>

      <div className="hero-bottom">
        <div>
          <div className="tag">01 — Práctica</div>
          <p>Iluminación, ingeniería eléctrica e instalaciones especiales bajo un solo equipo. Llave en mano, o por disciplina.</p>
        </div>
        <div>
          <div className="tag">02 — Postura</div>
          <p>Una instalación bien hecha se siente, aunque no se vea. Eso es lo que perseguimos en cada obra.</p>
        </div>
        <div className="scroll">
          <span>Ver disciplinas</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
}
