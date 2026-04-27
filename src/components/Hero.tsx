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
          <p>Iluminación arquitectónica, ingeniería eléctrica e instalaciones especiales — bajo un mismo equipo, coordinadas con tu obra desde el día uno.</p>
        </div>
        <div>
          <div className="tag">02 — Método</div>
          <p>Del concepto a la puesta en marcha. Diseño, suministro y ejecución sin intermediarios. Una sola conversación, un solo responsable.</p>
        </div>
        <div className="scroll">
          <span>Ver disciplinas</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
}
