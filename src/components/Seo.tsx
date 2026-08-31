import { Head } from 'vite-react-ssg';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: object;
}

/**
 * Host canónico. Producción redirige omniious.com -> www.omniious.com,
 * así que TODAS las señales (canonical, og:url, sitemap, @id del JSON-LD)
 * apuntan a www para no contradecir al servidor.
 */
const BASE_URL = 'https://www.omniious.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-default.jpg`;
const SITE_NAME = 'OMNIIOUS';
const LOCALE = 'es_MX';
const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;

/**
 * Emite los metadatos en el HTML servido, no después de ejecutar JS.
 * Antes esto vivía en un useEffect: funcionaba para el usuario y para Googlebot
 * (que sí renderiza), pero era invisible para GPTBot, ClaudeBot y PerplexityBot,
 * que no ejecutan JavaScript.
 */
export default function Seo({ title, description, path = '/', image, jsonLd }: SeoProps) {
  const url = `${BASE_URL}${path}`;
  const img = image || DEFAULT_IMAGE;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={LOCALE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      )}

      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="es-MX" href={url} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
