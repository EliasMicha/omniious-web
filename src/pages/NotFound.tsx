import Seo from '../components/Seo';

/**
 * 404 real. Antes cualquier ruta inexistente devolvía 200 con el shell del SPA,
 * lo que producía soft-404 masivo: un crawler siempre recibía "éxito".
 */
export default function NotFound() {
  return (
    <>
      <Seo
        title="Página no encontrada | OMNIIOUS"
        description="La página que buscas no existe o cambió de dirección."
        path="/404"
      />
      <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div>
          <p style={{ opacity: 0.6, letterSpacing: '0.1em', fontSize: '0.8rem' }}>ERROR 404</p>
          <h1 style={{ margin: '0.5rem 0 1rem' }}>Esta página no existe</h1>
          <p style={{ opacity: 0.75, maxWidth: '38ch', margin: '0 auto 2rem' }}>
            Puede que haya cambiado de dirección. Desde el inicio puedes llegar a todo.
          </p>
          <a href="/">Volver al inicio</a>
        </div>
      </main>
    </>
  );
}
