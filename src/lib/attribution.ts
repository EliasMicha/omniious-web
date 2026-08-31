/**
 * Atribución de origen — se captura en la PRIMERA visita y se guarda.
 *
 * Por qué persistir: cuando alguien llena el formulario ya navegó varias
 * páginas y el `document.referrer` original se perdió.
 *
 * Por qué importa la parte de IA: GA4 mete chatgpt.com, perplexity.ai y
 * claude.ai en "Referral" y ahí se pierden. Además buena parte del tráfico
 * de asistentes llega SIN referrer — por eso el formulario también pregunta.
 */

export type Canal =
  | 'ia' | 'google_ads' | 'busqueda_organica' | 'referido' | 'social' | 'directo';

export interface Attribution {
  canal: Canal;
  motor_ia?: string;
  referrer?: string;
  landing_page: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  primera_visita: string;
}

const STORAGE_KEY = 'omniious_attr';

const MOTORES_IA: Array<[RegExp, string]> = [
  [/(^|\.)chatgpt\.com$/i, 'ChatGPT'],
  [/(^|\.)chat\.openai\.com$/i, 'ChatGPT'],
  [/(^|\.)openai\.com$/i, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/i, 'Perplexity'],
  [/(^|\.)claude\.ai$/i, 'Claude'],
  [/(^|\.)anthropic\.com$/i, 'Claude'],
  [/(^|\.)copilot\.microsoft\.com$/i, 'Copilot'],
  [/(^|\.)gemini\.google\.com$/i, 'Gemini'],
  [/(^|\.)bard\.google\.com$/i, 'Gemini'],
  [/(^|\.)you\.com$/i, 'You.com'],
  [/(^|\.)poe\.com$/i, 'Poe'],
  [/(^|\.)phind\.com$/i, 'Phind'],
  [/(^|\.)grok\.com$/i, 'Grok'],
  [/(^|\.)x\.ai$/i, 'Grok'],
  [/(^|\.)mistral\.ai$/i, 'Mistral'],
  [/(^|\.)deepseek\.com$/i, 'DeepSeek']
];

const BUSCADORES = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./i;
const SOCIAL = /(^|\.)(facebook|instagram|linkedin|t|twitter|x|pinterest|youtube|tiktok|wa|whatsapp)\.(com|me|co)$/i;

function detectarMotorIA(host: string, utmSource?: string): string | undefined {
  for (const [re, nombre] of MOTORES_IA) if (re.test(host)) return nombre;
  if (utmSource) {
    for (const [re, nombre] of MOTORES_IA) {
      if (re.test(utmSource.replace(/^https?:\/\//, ''))) return nombre;
    }
  }
  return undefined;
}

function clasificar(host: string, gclid?: string, utm?: Record<string, string | undefined>): {
  canal: Canal; motor_ia?: string;
} {
  const motor = detectarMotorIA(host, utm?.utm_source);
  if (motor) return { canal: 'ia', motor_ia: motor };
  if (gclid || utm?.utm_medium === 'cpc' || utm?.utm_medium === 'ppc') return { canal: 'google_ads' };
  if (BUSCADORES.test(host)) return { canal: 'busqueda_organica' };
  if (SOCIAL.test(host)) return { canal: 'social' };
  if (host) return { canal: 'referido' };
  return { canal: 'directo' };
}

function leerGuardado(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch { return null; }
}

/**
 * Captura la atribución si es la primera visita; si ya existe, la respeta.
 * Excepción: si en una visita posterior llega un GCLID, se actualiza.
 */
export function capturarAtribucion(): Attribution | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const utm = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined
  };
  const gclid = params.get('gclid') || undefined;

  const previa = leerGuardado();
  if (previa && !gclid) return previa;

  let host = '';
  try { host = document.referrer ? new URL(document.referrer).hostname : ''; } catch { host = ''; }
  if (host && host.replace(/^www\./, '') === window.location.hostname.replace(/^www\./, '')) host = '';

  const { canal, motor_ia } = clasificar(host, gclid, utm);

  const attr: Attribution = {
    canal, motor_ia,
    referrer: document.referrer || undefined,
    landing_page: previa?.landing_page || window.location.pathname,
    gclid: gclid || previa?.gclid,
    ...utm,
    primera_visita: previa?.primera_visita || new Date().toISOString()
  };

  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(attr)); } catch { /* modo privado */ }
  return attr;
}

export function obtenerAtribucion(): Attribution | null {
  if (typeof window === 'undefined') return null;
  return leerGuardado() || capturarAtribucion();
}
