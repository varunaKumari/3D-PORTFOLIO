// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ES and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "es" | "en";

export const LANGUAGES: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).es === "string";
}

export const DICT = {
  picker: {
    season: { es: "Estación", en: "Season" },
    language: { es: "Idioma", en: "Language" },
  },
  seasons: {
    spring: { es: "Primavera", en: "Spring" },
    summer: { es: "Verano", en: "Summer" },
    autumn: { es: "Otoño", en: "Autumn" },
    winter: { es: "Invierno", en: "Winter" },
  },
  nav: {
    aria: { es: "Secciones", en: "Sections" },
    home: { es: "Inicio", en: "Home" },
    stack: { es: "Stack", en: "Stack" },
    experience: { es: "Experiencia", en: "Experience" },
    achievements: { es: "Logros", en: "Achievements" },
    project: { es: "Proyecto", en: "Project" },
    contact: { es: "Contacto", en: "Contact" },
  },
  header: {
    availability: {
      es: "Disponible para oportunidades",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I am" },
    roleLine: {
      es: "Estudiante de IA & Ciencia de Datos y Desarrolladora Full Stack.",
      en: "AI & Data Science Student & Full Stack Developer.",
    },
    tagline: {
      es: "Apasionada por el desarrollo de aplicaciones web de alto rendimiento y soluciones con IA.",
      en: "Passionate about building high-performance web applications and intelligent AI solutions.",
    },
    cv: { es: "Descargar CV", en: "Download CV" },
    hire: { es: "Contactarme", en: "Contact me" },
    scroll: { es: "Scroll para explorar", en: "Scroll to explore" },
    keysHint: {
      es: "· hover sobre las teclas",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { es: "Tech Stack", en: "Tech Stack" },
    hint: {
      es: "(hint: pasa el ratón por una tecla)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      es: "Las herramientas con las que construyo.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { es: "Experience", en: "Experience" },
    subtitle: {
      es: "Mi trayectoria profesional.",
      en: "My professional journey.",
    },
  },
  projects: {
    kicker: { es: "proyecto", en: "project" },
    viewMore: { es: "Ver más", en: "View more" },
    openSite: { es: "Abrir sitio", en: "Visit site" },
    viewCode: { es: "Ver código", en: "View code" },
    close: { es: "Cerrar", en: "Close" },
    stackLabel: { es: "Stack", en: "Stack" },
    overview: { es: "Resumen", en: "Overview" },
  },
  contact: {
    kicker: { es: "contacto", en: "contact" },
    title: { es: "¿Hablamos?", en: "Let's talk?" },
    body: {
      es: "Si lo que has visto te interesa, el teclado ya está listo para recibir el primer mensaje.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { es: "Copiar email", en: "Copy email" },
    openMail: { es: "Abrir mail", en: "Open mailto" },
    github: { es: "GitHub", en: "GitHub" },
    linkedin: { es: "LinkedIn", en: "LinkedIn" },
    emailToast: { es: "Email copiado", en: "Email copied" },
    footer: {
      es: "© 2026 Varuna Kumari. Todos los derechos reservados.",
      en: "© 2026 Varuna Kumari. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      javascript: {
        es: "Donde empezó todo. Sigue aquí, sigue mandando.",
        en: "Where it all started. Still here, still in charge.",
      },
      typescript: {
        es: "Mismo JS, con cinturón de seguridad.",
        en: "Same JS, with a seatbelt.",
      },
      html5: {
        es: "Los huesos de cualquier página.",
        en: "The bones of any page.",
      },
      css: {
        es: "El detalle que separa lo bueno de lo bonito.",
        en: "What separates good from beautiful.",
      },
      tailwindcss: {
        es: "Utility-first. Diseño en el HTML.",
        en: "Utility-first. Design inside the HTML.",
      },
      python: {
        es: "Se lee como inglés, escala como cohete.",
        en: "Reads like English, scales like a rocket.",
      },
      react: {
        es: "Componentes, componentes, componentes.",
        en: "Components, components, components.",
      },
      nextdotjs: {
        es: "React adulto: routing, SSR, edge.",
        en: "React all grown up: routing, SSR, edge.",
      },
      openjdk: {
        es: "Robusto, tipado y la columna vertebral de sistemas empresariales.",
        en: "Robust, typed, and the backbone of enterprise systems.",
      },
      nodedotjs: {
        es: "JavaScript en el servidor.",
        en: "JavaScript on the server.",
      },
      cplusplus: {
        es: "Rendimiento puro y control de bajo nivel cuando los milisegundos importan.",
        en: "Pure performance and low-level control when milliseconds matter.",
      },
      mongodb: {
        es: "Base de datos NoSQL flexible orientada a documentos.",
        en: "Flexible, document-oriented NoSQL database.",
      },
      postgresql: {
        es: "La base de datos aburrida que siempre funciona.",
        en: "The boring database that always works.",
      },
      docker: {
        es: "Igual en mi máquina, igual en producción.",
        en: "Same on my machine, same in production.",
      },
      git: {
        es: "Historia y máquina del tiempo del código.",
        en: "History and a time machine for your code.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.es ?? path;
  return path;
}
