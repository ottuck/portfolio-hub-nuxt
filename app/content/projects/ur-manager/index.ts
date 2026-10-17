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
  order: 6,

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

  translations: { ja, ko },
};
