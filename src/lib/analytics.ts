/**
 * Analytics loader — Google Analytics 4 + Google Tag Manager + Meta Pixel
 *
 * Para activar (cualquier combinación):
 * 1. Agregar a Vercel env vars:
 *    - VITE_GA4_ID=G-XXXXXXXXXX            (Measurement ID de GA4 — recomendado)
 *    - VITE_GTM_ID=GTM-XXXXXXX             (Google Tag Manager — alternativa avanzada)
 *    - VITE_META_PIXEL_ID=1234567890       (Meta Pixel para Facebook/IG ads)
 *    - VITE_GOOGLE_SITE_VERIFICATION=xyz   (Search Console verification — opcional, mejor TXT en DNS)
 * 2. Redeploy. Los scripts se cargan automáticamente solo si las vars existen.
 *
 * Para track de eventos personalizados desde el código:
 *   import { track, trackLead } from '@/lib/analytics';
 *   trackLead('whatsapp', 'lutron');
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

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

function loadGA4(id: string) {
  // gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  }
  // Hacer gtag disponible globalmente
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', id, {
    send_page_view: true,
    anonymize_ip: false
  });
}

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

  if (GA4_ID && /^G-/.test(GA4_ID)) {
    loadGA4(GA4_ID);
  }
  if (GTM_ID && GTM_ID.startsWith('GTM-')) {
    loadGTM(GTM_ID);
  }
  if (META_PIXEL_ID && /^\d+$/.test(META_PIXEL_ID)) {
    loadMetaPixel(META_PIXEL_ID);
  }
}

/**
 * Evento genérico — push a GA4 y Meta.
 */
export function track(eventName: string, params: Record<string, any> = {}) {
  // GA4 / GTM
  window.gtag?.('event', eventName, params);
  window.dataLayer?.push({ event: eventName, ...params });
  // Meta Pixel
  window.fbq?.('trackCustom', eventName, params);
}

/**
 * Evento de lead — el más importante. Cualquier click a WhatsApp o email
 * dispara una conversión que GA4 y Meta van a usar para optimizar.
 */
export function trackLead(channel: 'whatsapp' | 'email' | 'phone', source: string) {
  const params = { channel, source };
  // GA4 conversion event
  window.gtag?.('event', 'generate_lead', {
    currency: 'MXN',
    value: 1, // valor placeholder, se ajusta en GA4 dashboard
    ...params
  });
  // GTM dataLayer
  window.dataLayer?.push({
    event: 'lead',
    lead_channel: channel,
    lead_source: source
  });
  // Meta Pixel — evento estándar Lead
  window.fbq?.('track', 'Lead', params);
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path });
  window.dataLayer?.push({ event: 'page_view', page_path: path });
  window.fbq?.('track', 'PageView');
}
