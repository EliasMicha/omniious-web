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

function setMeta(selector: string, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    const isProperty = selector.includes('property=');
    const m = selector.match(/(?:name|property)="([^"]+)"/);
    if (m) {
      el.setAttribute(isProperty ? 'property' : 'name', m[1]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function Seo({ title, description, path = '/', image, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);

    const url = `${BASE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', img);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', img);

    // canonical
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

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
