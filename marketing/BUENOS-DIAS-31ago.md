# Buenos días, Elias — lo de anoche

**31 de agosto de 2026** · Todo lo que se podía dejar hecho sin ti, quedó hecho.

---

## Las dos campañas están armadas, configuradas y verificadas

Cuenta **168-679-2509** (Omniious Tech - Showroom).

| Campaña | Presupuesto | Grupos | Estado |
|---|---|---|---|
| **C1 · Marca** | MX$49/día | Lutron · Notifier/Fire-Lite · Somfy · Omniious | ⏸️ Pausada |
| **C2 · Servicios** | MX$115/día | Subestación · Redes · Audio · Iluminación · Instalaciones especiales · CCTV | ⏸️ Pausada |

**204 palabras clave · 10 anuncios · 105 negativos.** La carga masiva entró con **226 de 226 cambios y 0 errores**.

**Configuración, verificada campaña por campaña:**

- Solo **Google Search** — sin Display, sin socios de búsqueda
- **CPC manual** (las automáticas sesgan el reparto mientras no hay datos)
- **Concordancia de frase y exacta. Amplia desactivada.**
- Ubicaciones: **CDMX · Estado de México · Quintana Roo · Los Cabos · Puerto Vallarta**, con la opción en **"Presencia"** — no "presencia o interés", que es lo que te trae clics de gente que solo estaba leyendo sobre el lugar
- Activos automáticos, expansión de URL y AI Max: **apagados**
- Cero menciones de precio en los 109 títulos y 37 descripciones (validado por script)

---

## El presupuesto quedó en $5,000, no en $15,000

Es la conclusión de los datos de Keyword Planner y quiero que la veas antes de encender.

Después de limpiar el volumen contaminado —estudiantes de ingeniería, gente buscando a CFE, compradores de detectores de humo de ferretería— **en CDMX quedan unas 1,000 a 2,000 búsquedas al mes en todo tu portafolio.** Eso son 100 a 250 clics. A $15 de CPC: **$1,500 a $3,750 al mes.** Con las otras plazas se llega a $5,000–6,000 y ahí se acaba.

Los $15,000 solo se "colocan" subiendo pujas, y eso no trae más leads: encarece los mismos. **Los otros $10,000 rinden más en las páginas que faltan, contenido para IA, y fotografía de proyectos** — que es exactamente por donde llegaron la Embajada y Playcity.

Si quieres los $15,000 de todos modos, se cambia en dos minutos. Pero quería que fuera decisión tuya con el dato enfrente.

---

## Lo que solo puedes hacer tú

**1 · Publicar el formulario** *(5 minutos, y es lo que más urge)*

El formulario de leads ya está escrito en las 5 páginas y el build pasa. **No está publicado** porque git necesita crear y borrar `.git/index.lock`, y yo no tengo permiso de borrado en tu Mac. Desde tu terminal:

```bash
cd ~/omniious-web
git add -A
git commit -m "feat: formulario de leads en las 5 paginas de servicio"
git push
```

Si prefieres que lo haga yo la próxima vez, aprueba el permiso de borrado cuando te salga el aviso en la Mac.

**2 · Método de pago en Google Ads** — no lo toco, ni dormido. Sin esto las campañas no pueden servir aunque las enciendas.

**3 · "Conversiones mejoradas"** — la dejé **sin marcar** a propósito. Manda los correos de tus clientes a Google. Es tu decisión, despierto.

**4 · Cancelar la cuenta duplicada `891-981-8262`** — se creó por el onboarding de Google. La buena es la `168-679-2509`.

---

## Cuando enciendas: solo la Ola 1

Los 10 grupos están pausados. **Enciende únicamente estos cuatro:**

**Lutron** → `/lutron` · **Omniious** → `/` · **Iluminación** → `/iluminacion` · **Instalaciones especiales** → `/instalaciones-especiales`

Tienen página propia y pertinente. Van a colocar $2,500–3,000 al mes, y eso está bien.

**Deja pausados** Subestación, Redes, Audio, CCTV y Notifier. Hoy caen en `/electrica` o `/instalaciones-especiales`, que no contestan esas búsquedas. Encenderlos antes de tener su página es quemar dinero.

---

## El sitio ya está arreglado y en producción

Verificado en vivo hace un rato:

| Ruta | Texto legible sin ejecutar JS |
|---|---|
| `/` | 2,656 caracteres |
| `/iluminacion` | 2,474 |
| `/electrica` | 3,000 |
| `/instalaciones-especiales` | 3,874 |
| `/lutron` | 3,694 |
| `/llave-en-mano` | 2,829 |

**Antes eran cero.** Las seis rutas devolvían el mismo archivo vacío de 1,551 bytes. La Embajada y Playcity te encontraron leyendo 182 caracteres de meta description — eso era literalmente todo lo que ChatGPT, Claude o Perplexity podían ver de ti.

Además: titles propios por página, canonical en www, JSON-LD servido, `llms.txt`, sitemap y un 404 de verdad. La tabla `leads` de Supabase está creada y verificada.

---

## Lo que sigue bloqueando todo

**Proyectos reales entregados, con fotos.** El bloque de prueba de cada página de servicio está vacío y es el que más pesa — tanto para que alguien te contrate como para que un modelo te cite. Embajada y Playcity no sirven ahí: son leads, no obras entregadas, y usarlos sería presentar una consulta como trabajo hecho.

Dos o tres proyectos por línea, con espacio, superficie, qué problema resolviste y qué sistema usaste. Con eso se terminan las páginas.
