const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const segment = (value, start, end) => ease(clamp((value - start) / (end - start)));

const story = document.querySelector("#service-story");
const stage = document.querySelector("#service-stage");
const chapters = [...document.querySelectorAll(".service-chapter")];
const navButtons = [...document.querySelectorAll(".service-nav button")];
const outputName = document.querySelector("#output-name");
const readoutNumber = document.querySelector("#readout-number");
const readoutName = document.querySelector("#readout-name");
const scanLabel = document.querySelector("#service-scan-label");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const service = document.body.dataset.service;
let centers = [];
let progress = 0;
let active = -1;
let frame = 0;

function calculateCenters() {
  const storyTop = story.getBoundingClientRect().top + window.scrollY;
  centers = chapters.map((chapter) => {
    const rect = chapter.getBoundingClientRect();
    return rect.top + window.scrollY - storyTop + rect.height / 2;
  });
}

function getProgress() {
  const storyTop = story.getBoundingClientRect().top + window.scrollY;
  const target = window.scrollY - storyTop + window.innerHeight * .5;
  if (target <= centers[0]) return 0;
  const last = centers.length - 1;
  if (target >= centers[last]) return last;
  for (let index = 0; index < last; index += 1) {
    if (target >= centers[index] && target < centers[index + 1]) {
      const local = clamp((target - centers[index]) / (centers[index + 1] - centers[index]));
      return index + local;
    }
  }
  return 0;
}

function setActive(index) {
  if (index === active) return;
  active = index;
  stage.dataset.scene = String(index);
  chapters.forEach((chapter, chapterIndex) => chapter.classList.toggle("is-active", chapterIndex === index));
  navButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-current", selected ? "step" : "false");
  });
  const chapter = chapters[index];
  readoutNumber.textContent = String(index).padStart(2, "0");
  readoutName.textContent = chapter.dataset.label;
  outputName.textContent = chapter.dataset.output;
  if (!reducedMotion) {
    [readoutNumber, readoutName, outputName].forEach((element) => {
      element.getAnimations().forEach((animation) => animation.cancel());
      element.animate(
        [{ opacity: .18, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 360, easing: "cubic-bezier(.16,1,.3,1)" },
      );
    });
  }
}

function setScan() {
  if (service !== "electrical") {
    stage.style.setProperty("--scan-opacity", "0");
    return;
  }
  const local = progress - Math.floor(progress);
  const moving = local > .03 && local < .97;
  stage.style.setProperty("--scan-x", `${((1 - local) * 100).toFixed(2)}%`);
  stage.style.setProperty("--scan-opacity", moving ? (Math.sin(local * Math.PI) * .72).toFixed(3) : "0");
  scanLabel.textContent = chapters[Math.min(chapters.length - 1, Math.round(progress))].dataset.label.toUpperCase();
}

function setVisual() {
  const finish = segment(progress, 5.05, 5.95);
  stage.style.setProperty("--service-scale", lerp(1.025, 1.012, finish).toFixed(4));

  if (service === "lighting") {
    const intentIn = segment(progress, .18, .92);
    const intentOut = segment(progress, 1.12, 1.88);
    const planIn = segment(progress, 1.08, 1.96);
    const planOut = segment(progress, 5.06, 5.96);
    const planOpacity = planIn * (1 - planOut);
    const introColor = 1 - segment(progress, .16, .88);
    const finalColor = segment(progress, 5.08, 5.96);
    const color = Math.max(introColor, finalColor);
    const metrics = segment(progress, 2.18, 2.88) * (1 - segment(progress, 3.15, 3.86));
    const photoDim = intentIn * (1 - finalColor);
    stage.style.setProperty("--service-saturation", lerp(.84, .06, photoDim).toFixed(3));
    stage.style.setProperty("--service-brightness", (lerp(.84, .7, photoDim) + finalColor * .08).toFixed(3));
    stage.style.setProperty("--study-opacity", (intentIn * (1 - intentOut) * .92).toFixed(3));
    stage.style.setProperty("--metrics-opacity", metrics.toFixed(3));
    stage.style.setProperty("--color-opacity", color.toFixed(3));
    stage.style.setProperty("--plan-inset", `${(100 - planIn * 100).toFixed(2)}%`);
    stage.style.setProperty("--plan-opacity", planOpacity.toFixed(3));
  }

  if (service === "electrical") {
    const planIn = segment(progress, .65, 1.55);
    const planOut = segment(progress, 4.65, 5.45);
    const planOpacity = planIn * (1 - planOut);
    stage.style.setProperty("--plan-inset", `${(100 - planIn * 100).toFixed(2)}%`);
    stage.style.setProperty("--plan-opacity", planOpacity.toFixed(3));
    stage.style.setProperty("--service-brightness", lerp(.76, .96, finish).toFixed(3));
    stage.style.setProperty("--service-saturation", lerp(.72, 1, finish).toFixed(3));
  }

  if (service === "specials") {
    const xrayIn = segment(progress, 1.06, 1.96);
    const xrayOut = segment(progress, 5.06, 5.96);
    const xray = xrayIn * (1 - xrayOut);
    const operation = segment(progress, .18, .94);
    const photoReturn = segment(progress, 5.06, 5.96);
    const audio = segment(progress, 2.04, 2.27) * (1 - xrayOut);
    const network = segment(progress, 2.26, 2.49) * (1 - xrayOut);
    const security = segment(progress, 2.48, 2.71) * (1 - xrayOut);
    const shades = segment(progress, 2.7, 2.93) * (1 - xrayOut);
    stage.style.setProperty("--service-brightness", (lerp(.84, .68, operation * (1 - photoReturn)) + photoReturn * .09).toFixed(3));
    stage.style.setProperty("--service-saturation", (lerp(.82, .18, operation * (1 - photoReturn)) + photoReturn * .12).toFixed(3));
    stage.style.setProperty("--xray-inset", `${(100 - xrayIn * 100).toFixed(2)}%`);
    stage.style.setProperty("--xray-opacity", xray.toFixed(3));
    stage.style.setProperty("--tech-audio", audio.toFixed(3));
    stage.style.setProperty("--tech-network", network.toFixed(3));
    stage.style.setProperty("--tech-security", security.toFixed(3));
    stage.style.setProperty("--tech-shades", shades.toFixed(3));
  }

  setScan();
}

function update() {
  const storyBounds = story.getBoundingClientRect();
  story.classList.toggle("is-reading", storyBounds.top <= 0 && storyBounds.bottom > window.innerHeight * .45);
  progress = getProgress();
  setActive(clamp(Math.round(progress), 0, chapters.length - 1));
  setVisual();
  frame = 0;
}

window.addEventListener("scroll", () => {
  if (!frame) frame = requestAnimationFrame(update);
}, { passive: true });

window.addEventListener("resize", () => {
  calculateCenters();
  update();
}, { passive: true });

navButtons.forEach((button) => button.addEventListener("click", () => {
  chapters[Number(button.dataset.go)].scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
}));

calculateCenters();
update();

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    calculateCenters();
    update();
  });
}
