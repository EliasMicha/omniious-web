import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;
  if (!url || !anonKey) {
    throw new Error('[supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
  }
  client = createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true }
  });
  return client;
}

/**
 * Cliente perezoso: no se construye al importar el módulo, sino en el primer uso.
 *  1. El prerender importa el árbol completo sin credenciales y no debe tronar.
 *  2. Un deploy con una variable faltante no tumba el sitio público entero.
 * El API es idéntico: se sigue usando `supabase.from(...)` igual que antes.
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_t, prop: string | symbol) {
    const value = (getClient() as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === 'function' ? value.bind(getClient()) : value;
  }
});

export function hasSupabaseCredentials(): boolean {
  return Boolean(url && anonKey);
}
