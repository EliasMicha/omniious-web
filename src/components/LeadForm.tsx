import { useState } from 'react';
import { supabase, hasSupabaseCredentials } from '../lib/supabase';
import { obtenerAtribucion } from '../lib/attribution';
import { trackLead } from '../lib/analytics';

/**
 * Formulario adaptativo de contacto.
 *  1. `servicioOrigen` viaja con el lead: sin esto no se puede contestar
 *     qué vertiente atrae más clientela.
 *  2. Los campos de calificación son INTERNOS: se preguntan en lenguaje
 *     neutro y nunca se muestra un criterio ni un monto.
 *  3. "¿Cómo nos encontraste?" con opción de IA — la señal más confiable,
 *     porque mucho tráfico de IA llega sin referrer.
 *
 * Regla que no se rompe: ningún precio, rango ni mínimo.
 */

interface Props {
  servicioOrigen: string;
  titulo?: string;
  cta?: string;
}

const COMO_NOS_ENCONTRO = [
  'Búsqueda en Google',
  'ChatGPT, Claude, Perplexity u otro asistente de IA',
  'Recomendación de un arquitecto o despacho',
  'Recomendación de un cliente o conocido',
  'Ya trabajamos juntos antes',
  'Redes sociales',
  'Otro'
];

const ROLES = [
  'Dueño o director de la empresa',
  'Arquitecto o despacho de diseño',
  'Gerencia de proyecto o constructora',
  'Administrador de inmueble o facilities',
  'Área técnica o de mantenimiento',
  'Otro'
];

export default function LeadForm({ servicioOrigen, titulo, cta }: Props) {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    const fd = new FormData(e.currentTarget);
    const attr = obtenerAtribucion();

    const lead = {
      nombre: String(fd.get('nombre') || ''),
      empresa: String(fd.get('empresa') || ''),
      email: String(fd.get('email') || ''),
      telefono: String(fd.get('telefono') || ''),
      rol: String(fd.get('rol') || ''),
      mensaje: String(fd.get('mensaje') || ''),
      sitios: String(fd.get('sitios') || ''),
      instalacion: String(fd.get('instalacion') || ''),
      servicio_origen: servicioOrigen,
      como_nos_encontro: String(fd.get('como_nos_encontro') || ''),
      canal: attr?.canal ?? 'directo',
      motor_ia: attr?.motor_ia ?? null,
      gclid: attr?.gclid ?? null,
      referrer: attr?.referrer ?? null,
      landing_page: attr?.landing_page ?? null,
      utm_source: attr?.utm_source ?? null,
      utm_campaign: attr?.utm_campaign ?? null,
      utm_term: attr?.utm_term ?? null
    };

    try {
      if (hasSupabaseCredentials()) {
        const { error: dbError } = await supabase.from('leads').insert(lead);
        if (dbError) throw dbError;
      } else {
        console.warn('[LeadForm] Sin credenciales de Supabase; el lead no se guardó.', lead);
      }
      trackLead('formulario', `/${servicioOrigen}`, servicioOrigen);
      setEnviado(true);
    } catch (err) {
      console.error('[LeadForm]', err);
      setError('No pudimos enviar el formulario. Escríbenos a elias@omniious.com o por WhatsApp y lo resolvemos.');
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="lead-form lead-form--ok" role="status">
        <h3>Recibido.</h3>
        <p>Te contactamos en menos de 24 horas hábiles. Si es urgente, escríbenos por WhatsApp.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      {titulo && <h3>{titulo}</h3>}

      <div className="lead-form__row">
        <label>Nombre*<input name="nombre" required autoComplete="name" /></label>
        <label>Empresa o despacho<input name="empresa" autoComplete="organization" /></label>
      </div>

      <div className="lead-form__row">
        <label>Correo*<input name="email" type="email" required autoComplete="email" /></label>
        <label>Teléfono<input name="telefono" type="tel" autoComplete="tel" /></label>
      </div>

      <label>
        ¿Cuál es tu rol en el proyecto?
        <select name="rol" defaultValue="">
          <option value="" disabled>Selecciona…</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>

      <label>
        ¿Es un solo sitio o varios?
        <select name="sitios" defaultValue="">
          <option value="" disabled>Selecciona…</option>
          <option value="1">Un solo sitio</option>
          <option value="2-4">Entre 2 y 4</option>
          <option value="5+">5 o más</option>
          <option value="rollout">Es un rollout o cadena en crecimiento</option>
        </select>
      </label>

      <label>
        ¿Es instalación nueva o ya tienen algo funcionando?
        <select name="instalacion" defaultValue="">
          <option value="" disabled>Selecciona…</option>
          <option value="nueva">Obra nueva</option>
          <option value="remodelacion">Remodelación o adecuación</option>
          <option value="existente">Ya tenemos instalación y necesitamos quien la atienda</option>
          <option value="no_se">Todavía no lo sé</option>
        </select>
      </label>

      <label>
        Cuéntanos del proyecto
        <textarea name="mensaje" rows={4} placeholder="Tipo de espacio, superficie aproximada, en qué etapa va." />
      </label>

      <label>
        ¿Cómo nos encontraste?
        <select name="como_nos_encontro" defaultValue="">
          <option value="" disabled>Selecciona…</option>
          {COMO_NOS_ENCONTRO.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>

      {error && <p className="lead-form__error" role="alert">{error}</p>}

      <button type="submit" disabled={enviando}>{enviando ? 'Enviando…' : (cta || 'Enviar')}</button>
      <p className="lead-form__nota">Respondemos en menos de 24 horas hábiles.</p>
    </form>
  );
}
