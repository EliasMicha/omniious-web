export default function Marcas() {
  return (
    <section id="marcas">
      <div className="section-header">
        <div className="section-num">IV — Marcas</div>
        <h2 className="section-title">Un <em>ecosistema</em><br />de marcas afines.</h2>
      </div>

      <div className="brands-grid">
        <div className="brand">
          <div>
            <div className="mark">OMM<br /><em>Technologies</em></div>
            <div className="descr">Ingeniería eléctrica, instalaciones especiales e iluminación para arquitectura.</div>
          </div>
          <div className="meta"><span>Est. 2019</span><span className="plus">+</span></div>
        </div>
        <div className="brand">
          <div>
            <div className="mark">NULED</div>
            <div className="descr">Marca propia de luminarias arquitectónicas. Diseño y fabricación a la medida.</div>
          </div>
          <div className="meta"><span>Manufactura</span><span className="plus">+</span></div>
        </div>
        <div className="brand">
          <div>
            <div className="mark">Casa <em>Luce</em></div>
            <div className="descr">Distribución de marcas europeas de iluminación decorativa. Flos, Vibia, Penta.</div>
          </div>
          <div className="meta"><span>Distribución</span><span className="plus">+</span></div>
        </div>
      </div>
    </section>
  );
}
