/**
 * Helpers para generar JSON-LD schema.org consistente entre páginas.
 * Usado por src/components/Seo.tsx y por landings que pasan jsonLd custom.
 */

export const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://omniious.com/#org',
  name: 'OMNIIOUS',
  legalName: 'OMM Technologies SA de CV',
  url: 'https://omniious.com',
  logo: 'https://omniious.com/favicon.svg',
  description:
    'Iluminación arquitectónica, ingeniería eléctrica e instalaciones especiales para proyectos residenciales, comerciales, corporativos y hoteleros. Una práctica integral en Ciudad de México.',
  foundingDate: '2019',
  email: 'elias@omniious.com',
  telephone: '+52-55-5501-1014',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
    addressCountry: 'MX'
  },
  areaServed: [
    { '@type': 'City', name: 'Ciudad de México' },
    { '@type': 'City', name: 'Valle de Bravo' },
    { '@type': 'City', name: 'Cancún' },
    { '@type': 'City', name: 'Polanco' },
    { '@type': 'City', name: 'San Pedro Garza García' },
    { '@type': 'Country', name: 'México' }
  ],
  knowsAbout: [
    'Iluminación arquitectónica',
    'Diseño de iluminación',
    'Cálculos lumínicos DiaLux',
    'Ingeniería eléctrica',
    'Instalaciones eléctricas residenciales',
    'Subestación eléctrica MT/BT',
    'Sistemas fotovoltaicos',
    'Instalaciones especiales',
    'Audio profesional',
    'Redes y WiFi',
    'CCTV',
    'Control de acceso',
    'Lutron HomeWorks',
    'Lutron RA2',
    'Lutron Athena',
    'Lutron Caséta',
    'Building Management Systems',
    'BMS Honeywell Niagara',
    'Detección de humo',
    'Cortinas motorizadas Somfy'
  ]
};

export function organizationLd() {
  return ORG;
}

export function serviceLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': 'https://omniious.com/#org' },
    areaServed: [
      { '@type': 'City', name: 'Ciudad de México' },
      { '@type': 'City', name: 'Valle de Bravo' },
      { '@type': 'City', name: 'Cancún' }
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Arquitectos, despachos de diseño, constructoras y desarrolladores inmobiliarios'
    }
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  };
}

/**
 * Combina varios @type en un solo @graph (formato preferido por Google
 * cuando hay múltiples entidades en una página).
 */
export function graphLd(...entities: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': entities
  };
}
