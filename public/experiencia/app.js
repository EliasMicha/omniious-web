const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

const story = document.querySelector("#story");
const stage = document.querySelector("#stage");
const topbar = document.querySelector("#topbar");
const chapters = [...document.querySelectorAll(".chapter")];
const navButtons = [...document.querySelectorAll(".phase-nav button")];
const layerRows = [...document.querySelectorAll("[data-layer]")];
const readoutNumber = document.querySelector("#readout-number");
const readoutName = document.querySelector("#readout-name");
const layerPercentage = document.querySelector("#layer-percentage");
const scanLabel = document.querySelector("#scan-label");
const timeRange = document.querySelector("#time-range");
const timeValue = document.querySelector("#time-value");
const sectorButtons = [...document.querySelectorAll("[data-sector]")];
const projectButtons = [...document.querySelectorAll("[data-project]")];
const projectMain = document.querySelector("#project-main");
const projectDay = document.querySelector("#project-day");
const projectPower = document.querySelector("#project-power");
const projectSpecial = document.querySelector("#project-special");
const projectTechAudio = document.querySelector("#project-tech-audio");
const projectTechNetwork = document.querySelector("#project-tech-network");
const projectTechSecurity = document.querySelector("#project-tech-security");
const projectTechShades = document.querySelector("#project-tech-shades");
const sectorNumber = document.querySelector("#sector-number");
const sectorEyebrow = document.querySelector("#sector-eyebrow");
const sectorTitle = document.querySelector("#sector-title");
const sectorDescription = document.querySelector("#sector-description");
const sectorPriorities = document.querySelector("#sector-priorities");

const scenes = [
  ["00", "Arquitectura"],
  ["01", "Luz"],
  ["02", "Infraestructura"],
  ["03", "Audio"],
  ["04", "Redes"],
  ["05", "Seguridad"],
  ["06", "Cortinas / persianas"],
  ["07", "Control"],
  ["08", "Ejecución"],
];

const sectors = {
  residencial: {
    number: "01",
    eyebrow: "Caso 01 / Residencial",
    title: "Confort que no se ve.<br /><em>Se siente.</em>",
    description: "La arquitectura permanece limpia mientras luz, energía, seguridad, conectividad y control trabajan detrás.",
    priorities: ["Atmósfera y confort", "Automatización discreta", "Audio, seguridad y conectividad", "Operación sencilla"],
    assets: ["omniious-residence-v3.webp", "omniious-xray-power-v6.webp", "omniious-xray-special-v6.webp", "omniious-residence-tech-audio-v3.svg", "omniious-residence-tech-network-v3.svg", "omniious-residence-tech-security-v3.svg", "omniious-residence-tech-shades-v3.svg"],
    chapters: [
      ["Caso 01 / Residencial", "Un proyecto.<br /><em>Un sistema.</em>", "Diseño de iluminación, proyecto técnico y ejecución coordinados desde el primer trazo hasta la puesta en marcha.", "El espacio comienza terminado · desliza para descubrir cómo se construye"],
      ["01 / Diseño de iluminación", "Primero,<br /><em>la luz.</em>", "Una disciplina estética y arquitectónica. Definimos qué debe aparecer, qué debe desaparecer y cómo se recorre el espacio.", "Acento · Plano vertical · Luz indirecta · Paisaje · 2700K"],
      ["02 / Ingeniería eléctrica", "Después,<br /><em>la energía.</em>", "Cálculo, documentación y coordinación de la infraestructura completa: desde la acometida hasta el último circuito.", "Fuerza · Iluminación · HVAC · MT/BT · Solar · Emergencia · UVIE"],
      ["03 / Tecnología", "La tecnología<br /><em>desaparece.</em>", "Audio, datos, seguridad y automatización coordinados sin invadir el espacio.", "Audio · Redes · Seguridad · Cortinas y persianas"],
      ["04 / Control Lutron", "Un espacio distinto<br /><em>a cada hora.</em>", "Iluminación, cortinas y clima responden juntos. Mueve la línea de tiempo y cambia el comportamiento del espacio.", "HomeWorks · RadioRA 3 · Caséta · Sivoia"],
      ["05 / Ejecución integral", "Lo proyectamos.<br /><em>Lo hacemos realidad.</em>", "Suministro, instalación, programación, pruebas, puesta en marcha y soporte. Un responsable de principio a fin.", ""],
    ],
  },
  hoteleria: {
    number: "02",
    eyebrow: "Caso 02 / Hotelería",
    title: "La experiencia del huésped.<br /><em>La operación del hotel.</em>",
    description: "Cada habitación debe sentirse personal; el edificio completo debe poder operarse, medirse y mantenerse con precisión.",
    priorities: ["Habitaciones y áreas comunes", "Control y ahorro energético", "BMS y operación central", "Mantenimiento y continuidad"],
    assets: ["omniious-hotel-v1.webp", "omniious-hotel-power-v1.webp", "omniious-hotel-special-v1.webp", "omniious-hotel-tech-audio-v3.svg", "omniious-hotel-tech-network-v3.svg", "omniious-hotel-tech-security-v3.svg", "omniious-hotel-tech-shades-v3.svg"],
    chapters: [
      ["Caso 02 / Hotelería", "Un hotel.<br /><em>Una sola operación.</em>", "La experiencia del huésped y la operación del edificio se proyectan juntas, desde el lobby hasta cada habitación.", "El hotel comienza terminado · desliza para revelar su infraestructura"],
      ["01 / Diseño de iluminación", "La experiencia<br /><em>empieza con la luz.</em>", "Diseñamos atmósferas, recorridos y jerarquías para que habitaciones y áreas comunes tengan identidad propia.", "Lobby · Habitaciones · Restaurante · Fachada · Paisaje"],
      ["02 / Ingeniería eléctrica", "Energía para operar.<br /><em>Sin interrupciones.</em>", "Coordinamos cargas, distribución, respaldo y eficiencia para habitaciones, cocinas, climatización y áreas comunes.", "MT/BT · Fuerza · HVAC · Emergencia · Medición · UVIE"],
      ["03 / Tecnología", "Cada huésped conectado.<br /><em>Todo el hotel coordinado.</em>", "Redes, seguridad, audio, accesos y control convergen en una sola infraestructura.", "Audio · Redes · Seguridad · Cortinas y persianas"],
      ["04 / Control y operación", "Cada área responde<br /><em>a su momento.</em>", "Habitaciones, salones y áreas comunes adaptan luz, cortinas y clima mientras operación mantiene visibilidad central.", "Athena · Vive · Cortinas · BMS · Gestión de habitaciones"],
      ["05 / Ejecución integral", "Del cuarto muestra<br /><em>al hotel completo.</em>", "Suministro, instalación, programación, pruebas y puesta en marcha coordinados con arquitectura y operación.", ""],
    ],
  },
  corporativo: {
    number: "03",
    eyebrow: "Caso 03 / Corporativo",
    title: "Espacios para trabajar.<br /><em>Infraestructura para crecer.</em>",
    description: "Luz, conectividad, colaboración y control se coordinan para acompañar la operación sin interrumpirla.",
    priorities: ["Iluminación de trabajo", "Redes y salas audiovisuales", "Acceso y seguridad", "Flexibilidad y continuidad"],
    assets: ["omniious-office-v1.webp", "omniious-office-power-v1.webp", "omniious-office-special-v1.webp", "omniious-office-tech-audio-v3.svg", "omniious-office-tech-network-v3.svg", "omniious-office-tech-security-v3.svg", "omniious-office-tech-shades-v3.svg"],
    chapters: [
      ["Caso 03 / Corporativo", "Una oficina.<br /><em>Una infraestructura.</em>", "El espacio de trabajo, la colaboración y la continuidad operativa se coordinan desde el proyecto.", "La oficina comienza terminada · desliza para revelar cómo funciona"],
      ["01 / Diseño de iluminación", "Luz para trabajar.<br /><em>Y para pertenecer.</em>", "Equilibramos confort visual, identidad y flexibilidad en áreas abiertas, salas, circulación y espacios ejecutivos.", "Trabajo · Reunión · Recepción · Circulación · Fachada"],
      ["02 / Ingeniería eléctrica", "Capacidad para hoy.<br /><em>Flexibilidad para mañana.</em>", "Distribución, respaldo y circuitos se proyectan para acompañar estaciones de trabajo, salas, equipos y crecimiento.", "Fuerza · UPS · HVAC · Emergencia · Medición · Tableros"],
      ["03 / Tecnología", "Colaborar sin fricción.<br /><em>Operar sin pausa.</em>", "Conectividad, colaboración, acceso y seguridad trabajan sobre una infraestructura común.", "Audio · Redes · Seguridad · Cortinas y persianas"],
      ["04 / Control Lutron", "La oficina responde<br /><em>a las personas.</em>", "Luz natural, iluminación artificial y cortinas se adaptan por horario, ocupación y uso del espacio.", "Athena · Vive · Cortinas · Sensores · Integración BMS"],
      ["05 / Ejecución integral", "Una coordinación.<br /><em>Cero interferencias.</em>", "Ejecutamos por fases y coordinamos instalaciones, programación y pruebas sin perder de vista la operación.", ""],
    ],
  },
  comercial: {
    number: "04",
    eyebrow: "Caso 04 / Comercial",
    title: "La atmósfera vende.<br /><em>La operación sostiene.</em>",
    description: "En restaurantes y tiendas, la luz construye identidad mientras energía, audio, datos y seguridad mantienen el negocio funcionando.",
    priorities: ["Identidad y experiencia", "Escenas por horario", "Audio, datos y CCTV", "Operación de una o varias sedes"],
    assets: ["omniious-restaurant-v1.webp", "omniious-restaurant-power-v1.webp", "omniious-restaurant-special-v1.webp", "omniious-restaurant-tech-audio-v3.svg", "omniious-restaurant-tech-network-v3.svg", "omniious-restaurant-tech-security-v3.svg", "omniious-restaurant-tech-shades-v3.svg"],
    chapters: [
      ["Caso 04 / Comercial", "Un restaurante.<br /><em>Una experiencia completa.</em>", "La atmósfera que ve el cliente y la infraestructura que sostiene la operación nacen del mismo proyecto.", "El restaurante comienza terminado · desliza para revelar cómo opera"],
      ["01 / Diseño de iluminación", "La atmósfera<br /><em>también se diseña.</em>", "La luz construye ritmo, intimidad e identidad sobre mesas, barra, arte, materiales y recorridos.", "Mesa · Barra · Producto · Arte · Fachada · 2200–2700K"],
      ["02 / Ingeniería eléctrica", "La experiencia al frente.<br /><em>La potencia detrás.</em>", "Coordinamos cocina, iluminación, climatización, fuerza y emergencia para soportar la intensidad real de la operación.", "Cocina · Fuerza · HVAC · Emergencia · Tableros · Medición"],
      ["03 / Tecnología", "Ambiente y operación.<br /><em>En la misma red.</em>", "Audio, conectividad, seguridad y control se integran sin invadir la arquitectura.", "Audio · Redes · Seguridad · Cortinas y persianas"],
      ["04 / Control", "Un ambiente distinto<br /><em>en cada servicio.</em>", "Las escenas transforman barra, comedor y privados mientras la operación conserva un control sencillo.", "Escenas · Atenuación · Audio por zonas · Horarios"],
      ["05 / Ejecución integral", "Abrir a tiempo.<br /><em>Y abrir funcionando.</em>", "Suministro, instalación, programación y pruebas coordinados hasta la apertura del espacio.", ""],
    ],
  },
  edificios: {
    number: "05",
    eyebrow: "Caso 05 / Edificios",
    title: "Muchas áreas.<br /><em>Una sola operación.</em>",
    description: "La infraestructura y los sistemas se proyectan desde la escala del edificio para operar como un conjunto coordinado.",
    priorities: ["Distribución y respaldo eléctrico", "BMS y medición", "Seguridad y áreas comunes", "Escalabilidad y soporte"],
    assets: ["omniious-building-v1.webp", "omniious-building-power-v1.webp", "omniious-building-special-v1.webp", "omniious-building-tech-audio-v3.svg", "omniious-building-tech-network-v3.svg", "omniious-building-tech-security-v3.svg", "omniious-building-tech-shades-v3.svg"],
    chapters: [
      ["Caso 05 / Edificios", "Un edificio.<br /><em>Una sola operación.</em>", "La infraestructura se proyecta a escala completa: acometida, áreas comunes, verticales, usuarios y operación central.", "El edificio comienza terminado · desliza para abrirlo por capas"],
      ["01 / Diseño de iluminación", "La arquitectura nocturna.<br /><em>Y el recorrido diario.</em>", "Diseñamos la presencia del edificio y la experiencia de lobby, circulaciones, amenidades y paisaje.", "Fachada · Lobby · Circulaciones · Amenidades · Paisaje"],
      ["02 / Ingeniería eléctrica", "Distribuir energía.<br /><em>Proteger la operación.</em>", "Proyectamos media y baja tensión, verticales, medición, respaldo y emergencia para el conjunto completo.", "MT/BT · Subestación · Busway · Respaldo · Medición · UVIE"],
      ["03 / Tecnología", "Muchos espacios.<br /><em>Una sola inteligencia.</em>", "Seguridad, comunicaciones y control conectan cada nivel con la operación central.", "Audio · Redes · Seguridad · Cortinas y persianas"],
      ["04 / Control y gestión", "Ver el edificio.<br /><em>Entender cómo opera.</em>", "Control, automatización y medición convierten miles de puntos en decisiones claras para operación y mantenimiento.", "BMS · Athena · Medición · Alarmas · Analítica"],
      ["05 / Ejecución integral", "De la vertical<br /><em>al último punto.</em>", "Coordinamos suministro, obra, integración, puesta en marcha y documentación final del edificio.", ""],
    ],
  },
};

const technologyChapters = {
  residencial: [
    ["03 / Tecnología · Audio", "El espacio<br /><em>también se escucha.</em>", "Audio distribuido y entretenimiento se diseñan por zona, uso y calidad de escucha, sin invadir la arquitectura.", "Audio distribuido · Cinema · AV · Zonas · Control"],
    ["04 / Tecnología · Redes", "Todo conectado.<br /><em>Sin que se note.</em>", "Una red estable sostiene entretenimiento, automatización, seguridad y trabajo en cada rincón de la residencia.", "Cableado estructurado · Wi-Fi · Switching · VLAN · Monitoreo"],
    ["05 / Tecnología · Seguridad", "Ver, identificar<br /><em>y responder.</em>", "CCTV, accesos e interfonía se proyectan desde la cobertura y la privacidad, no desde la cantidad de equipos.", "CCTV · Analítica · Acceso · Interfon · Monitoreo"],
    ["06 / Tecnología · Cortinas y persianas", "La luz natural.<br /><em>También bajo control.</em>", "Cortinas y persianas motorizadas coordinan privacidad, deslumbramiento, temperatura y escenas.", "Enrollables · Blackout · Persianas · Motorización · Integración"],
  ],
  hoteleria: [
    ["03 / Tecnología · Audio", "Cada ambiente<br /><em>con su propia voz.</em>", "Lobby, restaurante, salones y exteriores reciben cobertura, presión y control adecuados para cada momento de operación.", "Audio por zonas · Música ambiental · Salones · AV · Control"],
    ["04 / Tecnología · Redes", "Conectividad para el huésped.<br /><em>Infraestructura para operar.</em>", "Separamos y administramos redes de huéspedes, operación, habitaciones, seguridad y sistemas del edificio.", "Backbone · Wi-Fi · Switching · VLAN · Monitoreo"],
    ["05 / Tecnología · Seguridad", "Hospitalidad abierta.<br /><em>Operación protegida.</em>", "CCTV y control de acceso cubren áreas públicas, circulación, servicio y cuartos técnicos sin alterar la experiencia.", "CCTV · Acceso · Elevadores · Personal · Monitoreo"],
    ["06 / Tecnología · Cortinas y persianas", "Descanso, privacidad<br /><em>y control solar.</em>", "Blackouts y cortinas se coordinan con habitaciones, fachadas y escenas para mejorar confort y consumo energético.", "Blackout · Sheer · Fachada · Motorización · GRMS"],
  ],
  corporativo: [
    ["03 / Tecnología · Audio", "Reunirse.<br /><em>Escuchar y ser escuchado.</em>", "Audio y video se proyectan para salas, consejo, colaboración híbrida y comunicación interna sin fricción.", "Videoconferencia · Salas · Boardroom · AV · Audio"],
    ["04 / Tecnología · Redes", "La operación viaja<br /><em>sobre la red.</em>", "Cableado, Wi-Fi y switching administrable sostienen usuarios, telefonía, colaboración, seguridad y crecimiento.", "Backbone · Wi-Fi · Switching · VLAN · Telefonía IP"],
    ["05 / Tecnología · Seguridad", "Acceso controlado.<br /><em>Visibilidad completa.</em>", "CCTV y control de acceso coordinan colaboradores, visitantes, elevadores y áreas restringidas.", "CCTV · Acceso · Visitantes · Elevadores · Analítica"],
    ["06 / Tecnología · Cortinas y persianas", "Confort visual.<br /><em>Control solar.</em>", "Las persianas responden a orientación, horario y ocupación para reducir deslumbramiento y carga térmica.", "Persianas · Sensores · Fachada · Horarios · BMS"],
  ],
  comercial: [
    ["03 / Tecnología · Audio", "El ambiente<br /><em>también se escucha.</em>", "Barra, comedor, privados y exteriores operan como zonas independientes con presión y carácter propios.", "Audio por zonas · Música · Eventos · AV · Control"],
    ["04 / Tecnología · Redes", "Cada venta,<br /><em>cada sistema conectado.</em>", "La red sostiene punto de venta, operación, Wi-Fi, audio, cámaras y administración sin interrupciones.", "POS · Wi-Fi · Switching · VLAN · Monitoreo"],
    ["05 / Tecnología · Seguridad", "El cliente fluye.<br /><em>La operación observa.</em>", "CCTV y accesos protegen público, personal, almacenes, cajas y áreas de servicio.", "CCTV · Cajas · Acceso · Almacén · Analítica"],
    ["06 / Tecnología · Cortinas y persianas", "Control solar.<br /><em>Confort en cada mesa.</em>", "Cortinas y persianas regulan reflejos, temperatura, privacidad y relación con terrazas y fachada.", "Enrollables · Persianas · Terraza · Motorización · Escenas"],
  ],
  edificios: [
    ["03 / Tecnología · Audio", "Comunicación común.<br /><em>Zonas independientes.</em>", "Amenidades, lobby, exteriores y sistemas de voceo se organizan por áreas, horarios y operación.", "Audio común · Voceo · Amenidades · AV · Zonas"],
    ["04 / Tecnología · Redes", "El backbone<br /><em>del edificio.</em>", "Fibra, cuartos de comunicaciones y redes administrables conectan niveles, áreas comunes y sistemas centrales.", "Fibra · MDF/IDF · Wi-Fi · Switching · Monitoreo"],
    ["05 / Tecnología · Seguridad", "Cada acceso.<br /><em>Una visión central.</em>", "CCTV, accesos, elevadores e interfonía se coordinan desde lobby hasta estacionamientos y áreas técnicas.", "CCTV · Acceso · Elevadores · Interfon · Analítica"],
    ["06 / Tecnología · Cortinas y persianas", "La fachada responde.<br /><em>El interior se protege.</em>", "Control solar y motorización se integran por orientación, nivel, uso y estrategia energética.", "Fachada · Persianas · Sensores · Motorización · BMS"],
  ],
};

Object.entries(sectors).forEach(([key, sector]) => {
  const [intro, lighting, electrical, previousTechnology, control, execution] = sector.chapters;
  void previousTechnology;
  control[0] = control[0].replace(/^04/, "07");
  execution[0] = "08 / Ejecución integral";
  sector.chapters = [intro, lighting, electrical, ...technologyChapters[key], control, execution];
});

const statusValues = ["100%", "01 / 03", "02 / 03", "TEC · 01 / 04", "TEC · 02 / 04", "TEC · 03 / 04", "TEC · 04 / 04", "CONTROL", "100%"];
const visualFrames = [
  { brightness: .94, saturation: .82, contrast: 1.05, scale: 1.025, veil: .83 },
  { brightness: .88, saturation: .10, contrast: 1.14, scale: 1.036, veil: .74 },
  { brightness: .92, saturation: .78, contrast: 1.08, scale: 1.043, veil: .68 },
  { brightness: .87, saturation: .70, contrast: 1.10, scale: 1.043, veil: .66 },
  { brightness: .88, saturation: .74, contrast: 1.09, scale: 1.045, veil: .65 },
  { brightness: .89, saturation: .78, contrast: 1.08, scale: 1.047, veil: .64 },
  { brightness: .91, saturation: .82, contrast: 1.07, scale: 1.045, veil: .64 },
  { brightness: .94, saturation: .90, contrast: 1.03, scale: 1.032, veil: .70 },
  { brightness: 1.00, saturation: 1.00, contrast: 1.03, scale: 1.018, veil: .56 },
];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let centers = [];
let sceneProgress = 0;
let activeScene = -1;
let activeProject = "residencial";
let projectRequest = 0;
let scrollFrame = 0;
let pointerFrame = 0;
let pointer = { x: .5, y: .5 };

function mixFrame(progress) {
  const from = Math.floor(progress);
  const to = Math.min(visualFrames.length - 1, from + 1);
  const t = smooth(progress - from);
  const a = visualFrames[from];
  const b = visualFrames[to];
  return {
    brightness: lerp(a.brightness, b.brightness, t),
    saturation: lerp(a.saturation, b.saturation, t),
    contrast: lerp(a.contrast, b.contrast, t),
    scale: lerp(a.scale, b.scale, t),
    veil: lerp(a.veil, b.veil, t),
  };
}

function sceneAlpha(index) {
  return smooth(clamp(1 - Math.abs(sceneProgress - index)));
}

function calculateCenters() {
  const storyTop = story.getBoundingClientRect().top + window.scrollY;
  centers = chapters.map((chapter) => {
    const bounds = chapter.getBoundingClientRect();
    return bounds.top + window.scrollY - storyTop + bounds.height / 2;
  });
}

function getScrollProgress() {
  const storyTop = story.getBoundingClientRect().top + window.scrollY;
  const target = window.scrollY - storyTop + window.innerHeight * .5;
  if (target <= centers[0]) return 0;
  const last = centers.length - 1;
  if (target >= centers[last]) return last;
  for (let index = 0; index < last; index += 1) {
    if (target >= centers[index] && target < centers[index + 1]) {
      const local = clamp((target - centers[index]) / (centers[index + 1] - centers[index]));
      return index + smooth(local);
    }
  }
  return 0;
}

function setActiveScene(index) {
  if (index === activeScene) return;
  activeScene = index;
  stage.dataset.scene = String(index);
  chapters.forEach((chapter, chapterIndex) => chapter.classList.toggle("is-active", chapterIndex === index));
  navButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-current", selected ? "step" : "false");
  });
  readoutNumber.textContent = scenes[index][0];
  readoutName.textContent = scenes[index][1];
  layerPercentage.textContent = statusValues[index];

  const highestLayer = index === 0 ? 0 : Math.min(index, 3);
  layerRows.forEach((row, rowIndex) => row.classList.toggle("is-active", rowIndex <= highestLayer));
}

function setScanState(powerReveal, specialReveal, closeProgress) {
  let scanX = 100;
  let scanOpacity = 0;
  let label = "CAPA 02 · ENERGÍA";

  if (sceneProgress >= 1 && sceneProgress < 2) {
    scanX = (1 - powerReveal) * 100;
    scanOpacity = Math.sin(powerReveal * Math.PI);
  } else if (sceneProgress >= 2 && sceneProgress < 6) {
    const localTechnology = sceneProgress - Math.floor(sceneProgress);
    const technologyNames = ["AUDIO", "REDES", "SEGURIDAD", "CORTINAS"];
    scanX = (1 - localTechnology) * 100;
    scanOpacity = Math.sin(localTechnology * Math.PI);
    label = `TECNOLOGÍA · ${technologyNames[Math.min(3, Math.floor(sceneProgress) - 2)]}`;
  } else if (sceneProgress > 6.18 && sceneProgress < 7) {
    scanX = closeProgress * 100;
    scanOpacity = Math.sin(closeProgress * Math.PI);
    label = "CONTROL · ESCENA";
  }

  stage.style.setProperty("--scan-x", `${scanX.toFixed(2)}%`);
  stage.style.setProperty("--scan-opacity", (scanOpacity * .9).toFixed(3));
  if (scanLabel.textContent !== label) scanLabel.textContent = label;
}

function setVisualState() {
  const frame = mixFrame(sceneProgress);
  const powerReveal = smooth(clamp((sceneProgress - 1) / .92));
  const specialReveal = smooth(clamp((sceneProgress - 2) / .7));
  const closeProgress = smooth(clamp((sceneProgress - 6.20) / .76));
  const technologyFade = 1 - closeProgress;
  const audioReveal = smooth(clamp((sceneProgress - 2.18) / .66)) * technologyFade;
  const networkReveal = smooth(clamp((sceneProgress - 3.18) / .66)) * technologyFade;
  const securityReveal = smooth(clamp((sceneProgress - 4.18) / .66)) * technologyFade;
  const shadesReveal = smooth(clamp((sceneProgress - 5.18) / .66)) * technologyFade;
  const lightFocus = sceneAlpha(1);
  const accentFocus = sceneProgress <= 1
    ? smooth(clamp((sceneProgress - .08) / .82))
    : smooth(clamp((1.34 - sceneProgress) / .34));

  stage.style.setProperty("--photo-brightness", frame.brightness.toFixed(3));
  stage.style.setProperty("--photo-saturation", frame.saturation.toFixed(3));
  stage.style.setProperty("--photo-contrast", frame.contrast.toFixed(3));
  stage.style.setProperty("--photo-scale", frame.scale.toFixed(4));
  stage.style.setProperty("--veil", frame.veil.toFixed(3));
  stage.style.setProperty("--day-opacity", (sceneAlpha(7) * .94).toFixed(3));
  stage.style.setProperty("--photo-x", `${((pointer.x - .5) * -.16).toFixed(3)}%`);
  stage.style.setProperty("--photo-y", `${((pointer.y - .5) * -.10).toFixed(3)}%`);
  stage.style.setProperty("--xray-saturation", lerp(1, .06, lightFocus).toFixed(3));
  stage.style.setProperty("--xray-brightness", lerp(1, .88, lightFocus).toFixed(3));
  stage.style.setProperty("--xray-contrast", lerp(1, 1.16, lightFocus).toFixed(3));
  stage.style.setProperty("--light-intent-opacity", lightFocus.toFixed(3));
  stage.style.setProperty("--accent-layer-opacity", accentFocus.toFixed(3));

  const ignitions = [];
  for (let index = 0; index < 10; index += 1) {
    const ignition = smooth(clamp((sceneProgress - (.16 + index * .055)) / .26));
    ignitions.push(ignition);
    stage.style.setProperty(`--beam-${index + 1}`, (ignition * .82).toFixed(3));
  }

  stage.style.setProperty("--accent-center-art", ignitions[1].toFixed(3));
  stage.style.setProperty("--accent-dining", ignitions[1].toFixed(3));
  stage.style.setProperty("--accent-lounge", ignitions[2].toFixed(3));
  stage.style.setProperty("--accent-right-art", ignitions[3].toFixed(3));
  stage.style.setProperty("--accent-desk", ignitions[4].toFixed(3));
  stage.style.setProperty("--accent-bed", Math.max(ignitions[5], ignitions[6]).toFixed(3));
  stage.style.setProperty("--accent-tree", Math.max(ignitions[7], ignitions[8]).toFixed(3));
  stage.style.setProperty("--accent-garden", ignitions[9].toFixed(3));

  stage.style.setProperty("--power-inset", `${Math.max(100 - powerReveal * 100, closeProgress * 100).toFixed(2)}%`);
  stage.style.setProperty("--special-inset", `${Math.max(100 - specialReveal * 100, closeProgress * 100).toFixed(2)}%`);
  stage.style.setProperty("--power-opacity", powerReveal.toFixed(3));
  stage.style.setProperty("--special-opacity", (specialReveal * technologyFade * .72).toFixed(3));
  stage.style.setProperty("--tech-audio-opacity", audioReveal.toFixed(3));
  stage.style.setProperty("--tech-network-opacity", networkReveal.toFixed(3));
  stage.style.setProperty("--tech-security-opacity", securityReveal.toFixed(3));
  stage.style.setProperty("--tech-shades-opacity", shadesReveal.toFixed(3));

  setScanState(powerReveal, specialReveal, closeProgress);
}

function updateScroll() {
  const storyBounds = story.getBoundingClientRect();
  story.classList.toggle("is-reading", storyBounds.top <= 0 && storyBounds.bottom > window.innerHeight * .45);
  sceneProgress = getScrollProgress();
  setActiveScene(clamp(Math.round(sceneProgress), 0, scenes.length - 1));
  setVisualState();
  const closing = document.querySelector(".closing").getBoundingClientRect();
  topbar.classList.toggle("is-on-paper", closing.top < 74);
  scrollFrame = 0;
}

function updateTime() {
  const value = Number(timeRange.value);
  const totalMinutes = Math.round(6 * 60 + value / 100 * 18 * 60);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  timeValue.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  stage.style.setProperty("--time", `${value}%`);
  timeRange.setAttribute("aria-valuetext", timeValue.textContent);
}

window.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}, { passive: true });

window.addEventListener("resize", () => {
  calculateCenters();
  updateScroll();
}, { passive: true });

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / Math.max(window.innerWidth, 1);
  pointer.y = event.clientY / Math.max(window.innerHeight, 1);
  if (!pointerFrame) {
    pointerFrame = requestAnimationFrame(() => {
      setVisualState();
      pointerFrame = 0;
    });
  }
}, { passive: true });

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.go);
    chapters[index].scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  });
});

timeRange.addEventListener("input", updateTime);

function preloadAssets(assetNames) {
  return Promise.all(assetNames.map((assetName) => new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = `./assets/${assetName}`;
  })));
}

function updateProjectContent(key) {
  const sector = sectors[key];
  stage.dataset.project = key;

  projectButtons.forEach((button) => {
    const selected = button.dataset.project === key;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  sectorButtons.forEach((button) => {
    const selected = button.dataset.sector === key;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });

  sectorNumber.textContent = sector.number;
  sectorEyebrow.textContent = sector.eyebrow;
  sectorTitle.innerHTML = sector.title;
  sectorDescription.textContent = sector.description;
  sectorPriorities.replaceChildren(...sector.priorities.map((priority) => {
    const item = document.createElement("li");
    item.textContent = priority;
    return item;
  }));

  sector.chapters.forEach((content, index) => {
    document.querySelector(`#chapter-${index}-eyebrow`).textContent = content[0];
    document.querySelector(`#chapter-${index}-title`).innerHTML = content[1];
    document.querySelector(`#chapter-${index}-copy`).textContent = content[2];
    const detail = document.querySelector(`#chapter-${index}-detail`);
    if (detail) {
      detail.textContent = content[3];
      detail.hidden = !content[3];
    }
  });
}

async function selectProject(key, returnToStory = false) {
  const sector = sectors[key];
  if (!sector) return;
  if (key === activeProject) {
    if (returnToStory) chapters[0].scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    return;
  }

  const request = ++projectRequest;
  stage.classList.add("is-changing-project");
  document.querySelector(".sector-panel").classList.add("is-changing");
  await preloadAssets(sector.assets);
  if (request !== projectRequest) return;

  activeProject = key;
  projectMain.src = `./assets/${sector.assets[0]}`;
  projectDay.src = `./assets/${sector.assets[0]}`;
  projectPower.src = `./assets/${sector.assets[1]}`;
  projectSpecial.src = `./assets/${sector.assets[2]}`;
  projectTechAudio.src = `./assets/${sector.assets[3]}`;
  projectTechNetwork.src = `./assets/${sector.assets[4]}`;
  projectTechSecurity.src = `./assets/${sector.assets[5]}`;
  projectTechShades.src = `./assets/${sector.assets[6]}`;
  updateProjectContent(key);
  requestAnimationFrame(() => {
    stage.classList.remove("is-changing-project");
    document.querySelector(".sector-panel").classList.remove("is-changing");
  });
  if (returnToStory) chapters[0].scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
}

projectButtons.forEach((button) => button.addEventListener("click", () => selectProject(button.dataset.project)));
sectorButtons.forEach((button) => button.addEventListener("click", () => selectProject(button.dataset.sector, true)));

updateTime();
updateProjectContent(activeProject);
calculateCenters();
updateScroll();

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    calculateCenters();
    updateScroll();
  });
}

const requestedProject = new URLSearchParams(window.location.search).get("project");
if (requestedProject && requestedProject !== activeProject && sectors[requestedProject]) {
  selectProject(requestedProject);
}

const warmProjectCache = () => {
  Object.values(sectors).flatMap((sector) => sector.assets).forEach((assetName) => {
    const image = new Image();
    image.src = `./assets/${assetName}`;
  });
};
if ("requestIdleCallback" in window) window.requestIdleCallback(warmProjectCache, { timeout: 2500 });
else window.setTimeout(warmProjectCache, 900);
