import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const cardsMobile = {"src":"/images/content/projects/ur-mcp/cards-mobile.webp","width":780,"height":1688};
const cards = {"src":"/images/content/projects/ur-mcp/cards.webp","width":1280,"height":800};
const flow = {"src":"/images/content/projects/ur-mcp/flow.webp","width":1280,"height":800};
const settings = {"src":"/images/content/projects/ur-mcp/settings.webp","width":1280,"height":800};

export const urMcp: Project = {
  slug: "ur-mcp",
  name: "UR MCP App",
  status: "archived",
  label: "Merged into UR Check",
  mergedInto: "ur-check",
  order: 7,

  tagline: "A former MCP app for finding UR vacancies in Claude and ChatGPT, now part of UR Check.",
  summary:
    "An MCP server and app for finding UR vacancies in Claude and ChatGPT. It was merged into UR Check in October 2026 and is no longer operated separately.",
  cardStack: ["TypeScript", "MCP", "Railway"],
  facts: [
    { label: "Type", value: "MCP server + MCP App · 3 tools for Claude and ChatGPT" },
    { label: "Period", value: "Oct 2026" },
    { label: "Runs on", value: "Railway, Singapore (shut down) · SQLite on a volume" },
  ],

  // Private source, and the server is gone, so there is nothing to link to.
  links: {},

  cover: {
    main: { src: cards, alt: "Changes since the last check as cards in the chat: how many rooms are new and gone, and two you can apply for now" },
    inset: { src: cardsMobile, alt: "The same cards on a phone", frame: "phone" },
    tint: ["#ece8fb", "#d3ccf1"],
  },

  about: [
    "Merged with UR Manager into UR Check in October 2026.",
  ],
  features: [
    {
      title: "Search in chat",
      body: "Searched for rooms in Claude and ChatGPT and displayed results as cards.",
    },
    {
      title: "Vacancy changes",
      body: "Reported new, relisted and closed listings that matched saved conditions.",
    },
  ],
  gallery: [
    { src: flow, alt: "How it works: Claude or ChatGPT calls UR MCP App, which queries UR one request at a time and keeps a history" },
    { src: settings, alt: "Changing the alert budget in a chat: update_watch_settings saves it and lists what matches now" },
  ],
  stack: [
    { area: "Server", items: "Node.js 24 (TypeScript run directly, no build) · Hono · MCP TypeScript SDK, stateless · MCP Apps (ext-apps) · Zod" },
    { area: "Data", items: "The vacancy data UR's site shows · SQLite (node:sqlite) on a Railway volume" },
    { area: "Clients", items: "Claude Code · claude.ai on the web and iOS (connectors, scheduled tasks) · ChatGPT apps" },
    { area: "Infra", items: "Railway, Singapore · one replica · service config as code (railway.ts)" },
    { area: "Quality", items: "Vitest with recorded UR responses · live smoke tests · Biome · TypeScript 7 · GitHub Actions" },
  ],
  footnote:
    "Not affiliated with UR (Urban Renaissance Agency). Always confirm availability on the official UR site. The card screenshots use sample data; the other images are drawn from real UR MCP App results.",

  translations: { ja, ko },
};
