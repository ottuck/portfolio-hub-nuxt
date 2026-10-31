import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const recent = {"src":"/images/content/projects/ur-manager/recent.webp","width":1173,"height":1168};
const searches = {"src":"/images/content/projects/ur-manager/searches.webp","width":1122,"height":1217};
const wizard = {"src":"/images/content/projects/ur-manager/wizard.webp","width":1122,"height":1242};

export const urManager: Project = {
  slug: "ur-manager",
  name: "UR Manager",
  status: "archived",
  label: "Merged into UR Check",
  mergedInto: "ur-check",
  order: 8,

  tagline:
    "A former UR vacancy search and email alert service, now part of UR Check.",
  summary:
    "A web service for UR vacancy searches and email alerts. It was merged into UR Check in October 2026 and is no longer operated separately.",
  cardStack: ["Spring Boot", "Azure", "Terraform"],
  facts: [
    { label: "Type", value: "Web service (Japanese UI)" },
    { label: "Period", value: "Sep – Oct 2026" },
    { label: "Runs on", value: "Azure Container Apps (shut down)" },
  ],

  links: {
    // Source is private, so no GitHub link. The site is down, so no live link either.
  },

  cover: {
    main: { src: searches, alt: "UR Manager saved searches page with one search for Koto ward" },
    inset: { src: wizard, alt: "Creating a search by answering questions in a chat-style form" },
    tint: ["#e8eef7", "#cfdbeb"],
  },

  about: [
    "Merged with UR MCP App into UR Check in October 2026.",
  ],
  features: [
    {
      title: "Saved searches",
      body: "Saved conditions for area, rent, layout and walk time.",
    },
    {
      title: "Vacancy alerts",
      body: "Checked for vacancies regularly and emailed new or relisted rooms.",
    },
  ],
  gallery: [
    { src: wizard, alt: "Creating a search step by step: area, rent, layout, size and walk time, checks and a name" },
    { src: recent, alt: "Home page with saved searches, a newly found room with its floor plan, and recent checks" },
  ],
  stack: [
    { area: "Backend", items: "Java · Spring Boot · Spring MVC · Spring Data JPA · Scheduler" },
    { area: "Frontend", items: "React · TypeScript · Vite · TanStack Query · Tailwind CSS" },
    { area: "Auth", items: "Spring Security · Entra External ID · Google" },
    { area: "Data", items: "PostgreSQL · Flyway" },
    { area: "Infra", items: "Azure Container Apps · Container Registry · Key Vault · Terraform · Cloudflare DNS" },
    { area: "CI/CD · Ops", items: "Azure Pipelines · Workload Identity Federation · Application Insights" },
  ],
  footnote: "Not affiliated with UR (Urban Renaissance Agency). Always confirm availability on the official UR site.",

  architecture: {
    width: 1120,
    height: 410,
    summary:
      "The web app, served from a Cloudflare Worker, calls a Spring Boot API on Azure, and sign-in goes through Entra External ID. Separate scheduled jobs check UR every two hours and send alert emails without touching the web side.",
    nodes: [
      { id: "web", x: 125, y: 215, title: "Web app", note: "Cloudflare Worker · React" },
      { id: "api", x: 450, y: 215, title: "Spring Boot API", note: "Azure Container Apps" },
      { id: "signin", x: 450, y: 75, title: "Entra External ID", note: "Google sign-in", tone: "outside" },
      { id: "db", x: 450, y: 355, title: "PostgreSQL", note: "Supabase" },
      { id: "mail", x: 760, y: 215, title: "Email", note: "Azure Communication Services" },
      { id: "jobs", x: 760, y: 355, title: "Scheduled jobs", note: "Watch · account cleanup" },
      { id: "ur", x: 1020, y: 355, title: "UR web API", tone: "outside" },
    ],
    edges: [
      { from: "web", to: "api", label: "REST · login", both: true },
      { from: "api", to: "signin", label: "Sign-in", both: true },
      { from: "api", to: "db", both: true },
      { from: "api", to: "mail", label: "Verify" },
      { from: "jobs", to: "db", label: "Read · write", both: true },
      { from: "jobs", to: "mail", label: "Alerts" },
      { from: "jobs", to: "ur", label: "Every 2 h", dashed: true },
    ],
  },

  translations: { ja, ko },
};
