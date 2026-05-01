import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: object;
}

const BASE_URL = 'https://omniious.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-default.jpg`;
const SITE_NAME = 'OMNIIOUS';
const LOCALE = 'es_MX';
const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;

function ensureMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

let verificationInjected = false;

export default function Seo({ title, description, path = '/', image, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const url = `${BASE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    // Standard
    ensureMeta('name', 'description', description);
    ensureMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');

    // Open Graph
    ensureMeta('property', 'og:title', title);
    ensureMeta('property', 'og:description', description);
    ensureMeta('property', 'og:url', url);
    ensureMeta('property', 'og:image', img);
    ensureMeta('property', 'og:type', 'website');
    ensureMeta('property', 'og:site_name', SITE_NAME);
    ensureMeta('property', 'og:locale', LOCALE);

    // Twitter
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', title);
    ensureMeta('name', 'twitter:description', description);
    ensureMeta('name', 'twitter:image', img);

    // Search Console verification (solo se inyecta una vez)
    if (!verificationInjected && GOOGLE_SITE_VERIFICATION) {
      ensureMeta('name', 'google-site-verification', GOOGLE_SITE_VERIFICATION);
      verificationInjected = true;
    }

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // hreflang
    let hreflang = document.head.querySelector('link[rel="alternate"][hreflang="es-MX"]') as HTMLLinkElement | null;
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', 'es-MX');
      document.head.appendChild(hreflang);
    }
    hreflang.setAttribute('href', url);

    // JSON-LD
    let ldEl = document.head.querySelector('script[type="application/ld+json"][data-seo="true"]') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!ldEl) {
        ldEl = document.createElement('script');
        ldEl.setAttribute('type', 'application/ld+json');
        ldEl.setAttribute('data-seo', 'true');
        document.head.appendChild(ldEl);
      }
      ldEl.textContent = JSON.stringify(jsonLd);
    } else if (ldEl) {
      ldEl.remove();
    }
  }, [title, description, path, image, jsonLd]);

  return null;
}
