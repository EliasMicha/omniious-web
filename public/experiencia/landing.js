const projects = {
  residencial: ["01 / 05", "Residencial", "Confort, atmósfera y tecnología integrada sin invadir la arquitectura."],
  hoteleria: ["02 / 05", "Hotelería", "Experiencia para el huésped; control y continuidad para la operación."],
  corporativo: ["03 / 05", "Corporativo", "Conectividad, colaboración, seguridad y espacios capaces de evolucionar."],
  comercial: ["04 / 05", "Comercial", "Una atmósfera reconocible sostenida por una operación confiable."],
  edificios: ["05 / 05", "Edificios", "Infraestructura, medición y sistemas coordinados a escala completa."],
};

const buttons = [...document.querySelectorAll("[data-hero-project]")];
const images = [...document.querySelectorAll("[data-hero-image]")];
const number = document.querySelector("#hero-project-number");
const title = document.querySelector("#hero-project-title");
const copy = document.querySelector("#hero-project-copy");
const header = document.querySelector("#landing-header");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeProject = "residencial";
let rotation;

function selectProject(key, userInitiated = false) {
  if (!projects[key] || key === activeProject) return;
  activeProject = key;
  images.forEach((image) => image.classList.toggle("is-active", image.dataset.heroImage === key));
  buttons.forEach((button) => {
    const selected = button.dataset.heroProject === key;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  [number.textContent, title.textContent, copy.textContent] = projects[key];
  if (userInitiated) restartRotation();
}

function restartRotation() {
  window.clearInterval(rotation);
  if (reducedMotion) return;
  rotation = window.setInterval(() => {
    const index = buttons.findIndex((button) => button.dataset.heroProject === activeProject);
    selectProject(buttons[(index + 1) % buttons.length].dataset.heroProject);
  }, 6500);
}

buttons.forEach((button) => button.addEventListener("click", () => selectProject(button.dataset.heroProject, true)));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .16 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
window.addEventListener("scroll", () => header.classList.toggle("is-condensed", window.scrollY > 40), { passive: true });
restartRotation();
