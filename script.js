const T = {
  es: {
    nav_about: "Sobre mí", nav_skills: "Habilidades", nav_projects: "Proyectos", nav_contact: "Contacto",
    theme_dark: "Oscuro", theme_light: "Claro",
    about_text: "Curso segundo semestre en la Universidad María Cano, estoy comenzando mi proceso de aprendizaje como ingeniera en software. Aprendo rápido, trabajo bien en equipo y disfruto explicar mis conocimientos.",
    about_loc: "Ubicación", about_edu: "Grado de estudios",
    about_edu_v: "Bachiller, 2do Semestre de Ingeniería en Software",
    skills_title: "Habilidades", langs: "Lenguajes", tools: "Herramientas y Apps",
    soft: "Otras habilidades (Soft Skills)",
    s1: "Trabajo en equipo", s2: "Puntualidad", s3: "Resolución de problemas", s4: "Machine learning",
    t_code: "Editor de código", t_design: "Diseño", t_org: "Organización", t_pub: "Publicación y almacenamiento", t_lang: "Lenguaje de código",
    langs2: "Idiomas", l1: "Español (Nativo)", l2: "Inglés (B2)",
    projects_title: "Proyectos", code: "Ver código",
    p1: "App web para organizar sesiones de estudio.",
    p2_title: "Temperatura", p2: "Calculadora Celsius a Fahrenheit en Java.",
    p3_title: "Menú para tienda", p3: "Menú de compras y ventas en una tienda.",
    contact_title: "Contacto", f_name: "Nombre", f_msg: "Mensaje",
    f_send: "Enviar mensaje", email: "Correo", phone: "Teléfono",
    ok: "Mensaje enviado. Gracias por escribirme.",
    err: "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.",
    sending: "Enviando..."
  },
  en: {
    nav_about: "About me", nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
    theme_dark: "Dark", theme_light: "Light",
    about_text: "I am in my second semester at Universidad María Cano, starting my journey as a software engineer. I learn fast, work well in a team and enjoy explaining what I know.",
    about_loc: "Location", about_edu: "Education",
    about_edu_v: "High school graduate, 2nd Semester of Software Engineering",
    skills_title: "Skills", langs: "Languages", tools: "Tools and Apps",
    soft: "Other skills (Soft Skills)",
    s1: "Teamwork", s2: "Punctuality", s3: "Problem solving", s4: "Machine learning",
    t_code: "Code editor", t_design: "Design", t_org: "Organization", t_pub: "Publishing and storage", t_lang: "Programming language",
    langs2: "Languages", l1: "Spanish (Native)", l2: "English (B2)",
    projects_title: "Projects", code: "View code",
    p1: "Web app to organize study sessions.",
    p2_title: "Temperature", p2: "Celsius to Fahrenheit calculator in Java.",
    p3_title: "Store menu", p3: "Purchase and sales menu for a store.",
    contact_title: "Contact", f_name: "Name", f_msg: "Message",
    f_send: "Send message", email: "Email", phone: "Phone",
    ok: "Message sent. Thank you for writing to me.",
    err: "The message could not be sent. Please try again in a few minutes.",
    sending: "Sending..."
  }
};

const root = document.documentElement;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

let lang = store.get("lang") || "es";
let theme = store.get("theme") ||
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function render() {
  root.lang = lang;
  root.dataset.theme = theme;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = T[lang][el.dataset.i18n];
    if (v) el.textContent = v;
  });
  document.getElementById("theme-label").textContent =
    theme === "dark" ? T[lang].theme_light : T[lang].theme_dark;
  document.getElementById("lang").setAttribute("aria-label",
    lang === "es" ? "Cambiar a inglés" : "Switch to Spanish");
  document.getElementById("theme").setAttribute("aria-label",
    lang === "es" ? "Cambiar tema" : "Change theme");
}

document.getElementById("lang").addEventListener("click", () => {
  lang = lang === "es" ? "en" : "es";
  store.set("lang", lang);
  render();
});
document.getElementById("theme").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  store.set("theme", theme);
  render();
});
render();

// Progress bars fill when they enter the viewport
const bars = document.querySelector(".bars");
if ("IntersectionObserver" in window) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { bars.classList.add("in"); obs.disconnect(); } });
  }, { threshold: 0.3 }).observe(bars);
} else {
  bars.classList.add("in");
}

// Contact form: sends the message to the email through FormSubmit
const form = document.getElementById("form");
const status = document.getElementById("status");
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const btn = form.querySelector(".send");
  btn.disabled = true;
  status.textContent = T[lang].sending;
  try {
    const res = await fetch("https://formsubmit.co/ajax/Susanaabad2122@gmail.com", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    });
    if (!res.ok) throw new Error("bad response");
    status.textContent = T[lang].ok;
    form.reset();
  } catch (e) {
    status.textContent = T[lang].err;
  } finally {
    btn.disabled = false;
  }
});

// "Ver código" links do not go anywhere for now
document.querySelectorAll(".code").forEach(a => a.addEventListener("click", e => e.preventDefault()));
