# Varuna Kumari - 3D Developer Portfolio

An immersive, interactive portfolio for **Varuna Kumari**, an **AI & Data Science Student** and **Full Stack Developer**. The site is built with **Next.js 16**, **React Three Fiber**, **Three.js**, and **Tailwind CSS v4**, featuring a cinematic 3D mechanical keyboard, seasonal themes, smooth scrolling, project showcases, and an English-only interface.

**Built by [Varuna Kumari](https://www.linkedin.com/in/varunakumari/)** &nbsp;|&nbsp; **[GitHub](https://github.com/varunaKumari)**

---

## Highlights

- **Interactive 3D Keyboard** - A React Three Fiber keyboard scene that responds to hover/tap interactions and changes pose across page sections.
- **Tech Stack Showcase** - Keycaps display technologies including JavaScript, TypeScript, React, Next.js, Python, Java, C++, MongoDB, PostgreSQL, Docker, and Git.
- **Seasonal Themes** - Spring, Summer, Autumn, and Winter themes update the UI colors, particles, and 3D scene lighting.
- **Project Showcases** - Fullscreen project modals include screenshots, tech stacks, descriptions, and GitHub links.
- **Achievements & Journey** - Dedicated sections for competitive programming achievements, mentorship programs, and responsibilities.
- **Smooth Scroll & Reveal Animations** - Lenis-powered scrolling with section reveal effects and a scroll progress indicator.
- **Custom Cursor & Magnetic Targets** - Interactive cursor states and magnetic button motion for a polished portfolio feel.
- **Responsive Design** - Desktop gets the full 3D background experience, while mobile uses a lighter hero-focused 3D layout.
- **English-Only UI** - The portfolio defaults to English and clears older saved language preferences.
- **Security Headers** - HSTS, X-Frame-Options, Content-Type-Options, Referrer-Policy, and Permissions-Policy are configured.

## Portfolio Sections

- **Hero** - Introduces Varuna Kumari as an AI & Data Science Student and Full Stack Developer.
- **Tech Stack** - Displays the tools used across frontend, backend, databases, infrastructure, and programming.
- **Experience** - Highlights current internship availability across software development, AI/ML, and related roles.
- **Achievements & Journey** - Includes LeetCode, Codeforces, CodeChef, Amazon FFE Scholar, Infosys Springboard, CodeSoc, and SIC Technical Committee details.
- **Projects** - Features four major projects with details and source links.
- **Contact** - Email, GitHub, and LinkedIn calls to action.

## Featured Projects

### CodeReview.ai

AI-powered automated code review platform with multi-agent reviewers.

- **Stack:** Next.js, TypeScript, Node.js, PostgreSQL, Redis, BullMQ, Claude API
- **Source:** [github.com/varunaKumari/CodeReview.ai](https://github.com/varunaKumari/CodeReview.ai)

### PromptBudget

SaaS AI spend intelligence platform for analyzing AI subscriptions, API usage, and operational costs.

- **Stack:** Next.js, TypeScript, Supabase, Tailwind CSS, Claude API
- **Source:** [github.com/varunaKumari/PromptBudget](https://github.com/varunaKumari/PromptBudget)

### Collaborative Whiteboard

Real-time interactive canvas for remote collaboration with instant state synchronization.

- **Stack:** React.js, WebSockets, HTML5 Canvas, Node.js, Express
- **Source:** [github.com/varunaKumari/WhiteBoard-web](https://github.com/varunaKumari/WhiteBoard-web)

### AI Social Platform

Intelligent social network with AI-powered personalized feeds, auto-moderation, and chat assistants.

- **Stack:** React, Node.js, Express, MongoDB, OpenAI API
- **Source:** [github.com/varunaKumari/ai-social-platform](https://github.com/varunaKumari/ai-social-platform)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) App Router |
| UI | [React 19](https://react.dev/) |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [Three.js](https://threejs.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | [Simple Icons](https://simpleicons.org/) |
| Language | TypeScript |
| Deployment | Vercel or Docker |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/varunaKumari/3D-PORTFOLIO.git
cd 3D-PORTFOLIO
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t varuna-3d-portfolio .
docker run -p 3000:3000 varuna-3d-portfolio
```

## Project Structure

```text
app/
  globals.css          Tailwind styles, CSS tokens, and seasonal themes
  layout.tsx           Root metadata, providers, and app shell
  page.tsx             Main portfolio page and section content
components/
  FrozenKeyboard.tsx   3D keyboard scene
  FrozenBackground.tsx Animated background particles
  Carousel.tsx         Project image carousel
  ProjectModal.tsx     Fullscreen project detail modal
  SeasonProvider.tsx   Theme state and boot script
  SeasonPicker.tsx     Seasonal theme switcher
  LanguageProvider.tsx English-only language provider
  CustomCursor.tsx     Custom cursor interactions
  MagneticTargets.tsx  Magnetic hover effects
  Reveal.tsx           Scroll reveal animation wrapper
  SectionNav.tsx       Section dot navigation
  ScrollProgress.tsx   Page scroll progress bar
  CopyEmail.tsx        Copy email button
  smooth-scroll.tsx    Lenis scroll wrapper
lib/
  i18n.ts              English UI copy and translation helper
  seasons.ts           Theme palette definitions
  skills.ts            Tech icon definitions for the keyboard
public/
  fonts/               3D text fonts
  projects/            Project screenshots
  sounds/              Keyboard sound effects
```

## Customization

### Update Portfolio Content

Most visible content is defined in `app/page.tsx`, including projects, achievements, social links, and section copy.

### Add or Edit Projects

Projects are stored in the `projects` array in `app/page.tsx`. The current UI is English-only; the content objects still keep both `es` and `en` keys for compatibility, so use the same English copy in both fields.

```typescript
{
  num: "05",
  name: { es: "Project Name", en: "Project Name" },
  stack: ["Next.js", "TypeScript"],
  desc: { es: "Short description", en: "Short description" },
  details: { es: "Long description", en: "Long description" },
  url: "https://example.com",
  github: "https://github.com/user/repo",
  media: ["/projects/project-name/screenshot.png"],
  highlights: ["nextdotjs", "typescript"],
  align: "left",
  section: "project5",
}
```

### Change Themes

Seasonal color tokens are defined in `app/globals.css` under the `[data-season="..."]` selectors. Theme metadata lives in `lib/seasons.ts`.

### Update Skills

The 3D keyboard skill icons are defined in `lib/skills.ts`. Each icon uses a Simple Icons slug and is displayed on the keyboard keycaps.

## Deployment

### Vercel

This is a standard Next.js application and can be deployed directly to Vercel.

### Docker / Self-Hosted

The included Dockerfile builds a standalone Next.js production image.

```bash
docker build -t varuna-3d-portfolio .
docker run -p 3000:3000 varuna-3d-portfolio
```

## Performance Notes

- Uses Next.js standalone output for smaller production deployments.
- Project screenshots rely on native lazy loading.
- Fonts are optimized with `next/font`.
- Mobile renders a lighter 3D experience to reduce WebGL overhead.
- Smooth scrolling and reveal animations are isolated into reusable components.

## Contact

- **Email:** [varunakumari2102@gmail.com](mailto:varunakumari2102@gmail.com)
- **GitHub:** [github.com/varunaKumari](https://github.com/varunaKumari)
- **LinkedIn:** [linkedin.com/in/varunakumari](https://www.linkedin.com/in/varunakumari/)

## License

This project is open source and available under the [MIT License](LICENSE).
