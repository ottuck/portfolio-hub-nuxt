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
    "Save the UR apartment you're looking for — area, rent, layout, walk time — and get an email when a matching room opens up.",
  summary:
    "Save the UR apartment you're looking for and get an email when a matching room opens up, so you don't have to keep refreshing the site.",
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
    "UR rentals in Tokyo go fast, and the official site has no alerts. I was checking it by hand every day, so I built a service to do it for me.",
    "You can start with one saved search without signing up. Sign in with Google later and your searches and history come with you. To ask in a chat with Claude or ChatGPT instead, there's UR MCP App.",
    "In October 2026 I merged this with UR MCP App into UR Check and shut this one down.",
  ],
  features: [
    {
      title: "Saved searches",
      body: "Area, rent, floor space, layout and walk time across Tokyo, Kanagawa, Chiba, Saitama and Ibaraki.",
    },
    { title: "Scheduled checks", body: "Each search is checked on its own interval between 08:00 and 20:00 JST." },
    {
      title: "Change-only emails",
      body: "One summary when you turn alerts on, then only rooms that are new or listed again.",
    },
    { title: "Guest to member", body: "Searches and history move over in one step when you sign in with Google." },
    { title: "History", body: "Every check and every email is listed with its result." },
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
