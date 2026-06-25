"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "varunakumari2102@gmail.com";

// Localised content lives in `{ es, en }` objects inside these arrays so the
// page can be a straightforward array.map() at render time. Tech names stay
// as plain strings (they're brand names, not localised).
type Localised = { es: string; en: string };

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      es: "CodeReview.ai",
      en: "CodeReview.ai",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Claude API",
    ],
    desc: {
      es: "Plataforma de revisión de código automatizada impulsada por IA con agentes de múltiples roles.",
      en: "AI-powered automated code review platform featuring multi-agent reviewers.",
    },
    details: {
      es: "Una plataforma premium de revisión de código impulsada por IA que analiza la calidad del código, las vulnerabilidades de seguridad y los cuellos de botella de rendimiento utilizando revisores de IA multi-persona. Diseñó canalizaciones de revisión asíncronas escalables utilizando Redis y BullMQ para un procesamiento eficiente de tareas en segundo plano.",
      en: "An AI-powered peer code review platform capable of analyzing code quality, security vulnerabilities, scalability issues, and performance bottlenecks using multi-persona AI reviewers. Designed scalable asynchronous review pipelines using Redis and BullMQ for concurrent background job processing and real-time feedback.",
    },
    github: "https://github.com/varunakumari2102/CodeReview.ai",
    media: [
      "/projects/revio/landing.png",
      "/projects/revio/dashboard.png",
      "/projects/revio/alertas.png",
    ],
    highlights: ["nextdotjs", "typescript", "nodedotjs", "postgresql"],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      es: "PromptBudget",
      en: "PromptBudget",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Claude API",
    ],
    desc: {
      es: "Plataforma SaaS de inteligencia de gastos en IA para analizar suscripciones, uso de APIs y costos operativos.",
      en: "SaaS AI spend intelligence platform to analyze AI subscriptions, API usage, and operational costs.",
    },
    details: {
      es: "Plataforma integral de análisis de gastos de IA para rastrear el uso de APIs y los costos de suscripción, ayudando a identificar oportunidades de optimización. Integra paneles de previsión financiera e insights generados por IA para recomendaciones de ahorro de costos automatizadas.",
      en: "A full-stack AI spend intelligence platform to analyze AI subscriptions, API usage, and operational costs, helping users identify overspending and optimization opportunities. Integrated AI-generated financial insights, forecasting dashboards, and benchmarking systems to deliver personalized cost-saving recommendations.",
    },
    github: "https://github.com/varunakumari2102/PromptBudget",
    media: [
      "/projects/aptia/landing.png",
      "/projects/aptia/panel.png",
      "/projects/aptia/registros.png",
    ],
    highlights: ["nextdotjs", "typescript", "tailwindcss", "git"],
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      es: "Pizarra Colaborativa",
      en: "Collaborative Whiteboard",
    },
    stack: [
      "React.js",
      "WebSockets",
      "HTML5 Canvas",
      "Node.js",
      "Express",
    ],
    desc: {
      es: "Lienzo interactivo en tiempo real para colaboración remota con sincronización de estado instantánea.",
      en: "Real-time interactive canvas for remote collaboration with instant state synchronization.",
    },
    details: {
      es: "Una pizarra digital interactiva que permite a múltiples usuarios dibujar, escribir y colaborar en tiempo real. Construida con Canvas API para un renderizado de alto rendimiento y WebSockets (Socket.io) para una sincronización de estado de latencia ultra baja.",
      en: "A collaborative digital whiteboard allowing multiple users to draw, write, and collaborate in real time. Built using the HTML5 Canvas API for high-performance rendering and WebSockets (Socket.io) for ultra-low latency state synchronization.",
    },
    github: "https://github.com/varunakumari2102/WhiteBoard-web",
    media: [
      "/projects/gestor-gastos/dashboard.png",
      "/projects/gestor-gastos/wallets.png",
    ],
    highlights: ["react", "javascript", "html5", "nodedotjs"],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      es: "Plataforma Social de IA",
      en: "AI Social Platform",
    },
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "OpenAI API",
    ],
    desc: {
      es: "Red social inteligente con feeds personalizados por IA, moderación automática de contenido y chat inteligente.",
      en: "Intelligent social network featuring AI-powered personalized feeds, auto-moderation, and chat assistants.",
    },
    details: {
      es: "Una red social moderna con generación de feeds inteligentes y moderación automática de contenido impulsada por modelos de lenguaje de OpenAI. Incluye chat en vivo con asistentes virtuales y un panel de análisis de interacciones.",
      en: "A modern social network with intelligent feed generation and automated content moderation powered by OpenAI language models. Features real-time chat with virtual assistants and an interaction analytics dashboard.",
    },
    github: "https://github.com/varunakumari2102/ai-social-platform",
    media: [
      "/projects/dianas/packs.png",
      "/projects/dianas/catalogo.png",
    ],
    highlights: ["react", "nodedotjs", "mongodb", "javascript"],
    align: "right",
    section: "project4",
  },
];

const experiences: Array<{
  role: Localised;
  company: string;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
}> = [
  {
    role: {
      es: "Scholar & Mentee de Ingeniería de Software",
      en: "Software Engineering Scholar & Mentee",
    },
    company: "Amazon",
    period: { es: "2025 — Presente", en: "2025 — Present" },
    location: { es: "India (Remoto)", en: "India (Remote)" },
    summary: {
      es: "Seleccionada entre las 500 mejores estudiantes a nivel nacional por excelencia académica y técnica. Participo en mentorías con ingenieros de Amazon enfocadas en desarrollo de software y sistemas cloud.",
      en: "Selected among the top 500 students nationwide for academic excellence and technical skills. Participating in mentorship sessions with Amazon engineers focused on software engineering and cloud systems.",
    },
    bullets: [
      {
        es: "Mentoría directa con ingenieros senior de Amazon en diseño de sistemas y mejores prácticas.",
        en: "Direct mentorship from senior Amazon engineers on system design and software engineering best practices.",
      },
      {
        es: "Talleres prácticos sobre servicios web (AWS) y arquitectura de software a escala de producción.",
        en: "Hands-on workshops on cloud web services (AWS) and software architecture at production scale.",
      },
      {
        es: "Participación activa en revisiones de código colaborativas y simulacros de diseño técnico.",
        en: "Active participation in collaborative code reviews and mock technical design sessions.",
      },
    ],
    stack: ["AWS", "Python", "Docker", "Git", "System Design"],
  },
  {
    role: {
      es: "Grado en Inteligencia Artificial y Ciencia de Datos",
      en: "B.Tech in Artificial Intelligence & Data Science",
    },
    company: "IIIT Raichur",
    period: { es: "2024 — Presente", en: "2024 — Present" },
    location: { es: "Raichur, India", en: "Raichur, India" },
    summary: {
      es: "Estudios de grado enfocados en algoritmos, estructuras de datos, aprendizaje automático, bases de datos y desarrollo de software con un promedio actual (CGPA) de 7.94 / 10.0.",
      en: "Undergraduate studies focused on algorithms, data structures, machine learning, databases, and software engineering. Current CGPA: 7.94 / 10.0.",
    },
    bullets: [
      {
        es: "Sólida formación en Estructuras de Datos y Algoritmos (DSA), Programación Orientada a Objetos (OOP) y DBMS.",
        en: "Solid foundation in Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), and DBMS.",
      },
      {
        es: "Proyectos académicos y laboratorios prácticos en Python, Java y C++ para resolver problemas complejos.",
        en: "Academic projects and practical labs in Python, Java, and C++ to solve complex problems.",
      },
      {
        es: "Especialización en modelos predictivos, análisis de datos y procesamiento del lenguaje natural.",
        en: "Specialisation in predictive modeling, data analysis, and natural language processing.",
      },
    ],
    stack: ["Java", "Python", "C++", "SQL", "DSA", "DBMS"],
  },
  {
    role: {
      es: "Trainee en Inteligencia Artificial y Aprendizaje Automático",
      en: "AI/ML Trainee — Pragati Cohort 6",
    },
    company: "Infosys",
    period: { es: "2025", en: "2025" },
    location: { es: "India (Remoto)", en: "India (Remote)" },
    summary: {
      es: "Completé un programa intensivo de 12 semanas de formación técnica en Inteligencia Artificial y Aprendizaje Automático con más de 100 horas de clases prácticas.",
      en: "Completed an intensive 12-week technical training program in Artificial Intelligence and Machine Learning with over 100 hours of hands-on coursework.",
    },
    bullets: [
      {
        es: "Desarrollo de modelos de ML utilizando TensorFlow, scikit-learn y pandas en Python.",
        en: "Development of ML models using TensorFlow, scikit-learn, and pandas in Python.",
      },
      {
        es: "Formación práctica en ingeniería de prompts y consumo de APIs de modelos de lenguaje grandes (LLMs).",
        en: "Practical training in prompt engineering and consuming large language model (LLM) APIs.",
      },
      {
        es: "Finalización de proyectos prácticos de clasificación de imágenes y análisis predictivo.",
        en: "Completion of hands-on projects in image classification and predictive analysis.",
      },
    ],
    stack: ["Python", "TensorFlow", "Pandas", "Prompt Engineering"],
  },
  {
    role: {
      es: "Miembro Activo & Organizadora Técnica",
      en: "Active Member & Technical Organizer",
    },
    company: "IIIT Raichur Student Societies",
    period: { es: "2025 — Presente", en: "2025 — Present" },
    location: { es: "Raichur, India", en: "Raichur, India" },
    summary: {
      es: "Miembro activa en CodeSoc (Sociedad de Programación de IIIT Raichur) y miembro del Comité Técnico de SIC, liderando la organización de eventos tecnológicos y talleres de codificación.",
      en: "Active member of CodeSoc (IIIT Raichur's Coding Society) and member of the SIC Technical Committee, leading the organization of technical events and coding workshops.",
    },
    bullets: [
      {
        es: "Colaboración en la organización de hackathons universitarios y competiciones de programación competitiva.",
        en: "Collaboration in organizing university hackathons and competitive programming contests.",
      },
      {
        es: "Participación activa en entrenamientos semanales de algoritmos y estructuras de datos complejos.",
        en: "Active participation in weekly training sessions on complex algorithms and data structures.",
      },
      {
        es: "Impartición de tutorías introductorias a estudiantes de primer año sobre desarrollo de software básico.",
        en: "Delivery of introductory tutorials to first-year students on basic software development.",
      },
    ],
    stack: ["Leadership", "Competitive Programming", "Algorithms", "Public Speaking"],
  },
];

function pick<T>(loc: { es: T; en: T }, lang: Lang): T {
  return loc[lang];
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. On mobile
            the canvas lives inside the hero instead (see below) so it scrolls
            away and the rest of the page is clean, fast 2D. */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              Varuna Kumari
            </span>
            {/* Wrapper (not the pill itself) carries the hide: .status-pill
                hard-sets display:inline-flex, which beats Tailwind's .hidden
                due to CSS source order, so hiding must happen on a parent. */}
            <span className="hidden md:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
            <a
              href="https://github.com/varunakumari2102/3d-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn !py-1.5 !px-3 !text-xs"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {/* Mobile-only 3D centerpiece. Lives inside the hero (scrolls away
                with it) and takes pointer events so keycaps are tappable. */}
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">
                <HeroWord text="Varuna" delay={120} />
                <br />
                <HeroWord text="Kumari" delay={260} className="text-ice-400" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
                <br />
                {t("hero.tagline")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href={lang === "en" ? "/cv_en.pdf" : "/cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                {/* Mobile-only full-width break: forces the social icons onto
                    their own row below the two primary buttons. Hidden on md+
                    so desktop keeps everything on a single line. */}
                <div className="basis-full h-0 md:hidden" aria-hidden />
                <a
                  href="https://linkedin.com/in/varunakumari2102"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/varunakumari2102"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack — desktop relies on the 200vh scroll + sticky title while
              the keyboard does the talking on hover. On mobile (md:) that
              choreography is gone, so we drop the tall scroll and render a
              real, legible skills grid with the same taglines. */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid (recovers the hover interaction as static
                  content the keyboard can't surface on touch). */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Experience — title is sticky at top-24 (feels anchored) but sits
              BEHIND the cards (z-0 vs. card wrapper's z-10), so as you scroll
              the card slides over the title. The section has no extra filler
              beyond the cards, so when you scroll past the last card the
              section ends and the title un-pins and exits the viewport at the
              same time — giving the "anchored then both disappear" feel. */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {pick(exp.summary, lang)}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("Ver más") don't sit under the
                      // fixed SectionNav dots on the right edge. On mobile they
                      // collapse to a normal left-aligned full-width card.
                      "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href="https://github.com/varunakumari2102"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href="https://linkedin.com/in/varunakumari2102"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}
