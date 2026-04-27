/**
 * Analytics loader — Google Tag Manager + Meta Pixel
 *
 * Para activar:
 * 1. Agregar a Vercel env vars:
 *    - VITE_GTM_ID=GTM-XXXXXXX        (de tagmanager.google.com)
 *    - VITE_META_PIXEL_ID=1234567890   (de business.facebook.com)
 * 2. Redeploy. Los scripts se cargan automáticamente solo si las vars existen.
 *
 * Para track de eventos personalizados desde el código:
 *   import { track } from '@/lib/analytics';
 *   track('cotizar_click', { disciplina: 'iluminacion' });
 */

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: any;
    _fbq?: any;
    gtag?: (...args: any[]) => void;
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

function loadGTM(id: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

function loadMetaPixel(id: string) {
  if (window.fbq) return;
  const w = window as any;
  const n: any = function () {
    if (n.callMethod) n.callMethod.apply(n, arguments);
    else n.queue.push(arguments);
  };
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  w.fbq = n;

  const t = document.createElement('script');
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode?.insertBefore(t, s);

  w.fbq('init', id);
  w.fbq('track', 'PageView');
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (GTM_ID && GTM_ID.startsWith('GTM-')) {
    loadGTM(GTM_ID);
  }
  if (META_PIXEL_ID && /^\d+$/.test(META_PIXEL_ID)) {
    loadMetaPixel(META_PIXEL_ID);
  }
}

export function track(eventName: string, params: Record<string, any> = {}) {
  window.dataLayer?.push({ event: eventName, ...params });
  window.fbq?.('trackCustom', eventName, params);
}

export function trackPageView(path: string) {
  window.dataLayer?.push({ event: 'page_view', page_path: path });
  window.fbq?.('track', 'PageView');
}
