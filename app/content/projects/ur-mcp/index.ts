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
    { area: "Server", items: "Node.js 24 · TypeScript 7 · Hono · MCP TypeScript SDK · MCP Apps · Zod" },
    { area: "Data", items: "UR website API · SQLite (node:sqlite) on a Railway volume" },
    { area: "Clients", items: "Claude Code · claude.ai (web, iOS) · ChatGPT" },
    { area: "Infra", items: "Railway, Singapore · one replica · railway.ts" },
    { area: "Quality", items: "Vitest with recorded UR responses · live smoke tests · Biome · GitHub Actions" },
  ],
  footnote:
    "Not affiliated with UR (Urban Renaissance Agency). Always confirm availability on the official UR site. The card screenshots use sample data; the other images are drawn from real UR MCP App results.",

  architecture: {
    width: 1100,
    height: 450,
    summary:
      "You talk to Claude or ChatGPT, which calls the MCP server's tools and shows rooms as cards. The server also checks UR itself three times a day and keeps the history in SQLite, so the AI can report what changed.",
    groups: [{ title: "Railway, Singapore · one process", x: 580, y: 30, w: 240, h: 410 }],
    nodes: [
      { id: "you", x: 110, y: 240, title: "You", tone: "accent" },
      { id: "ai", x: 400, y: 240, title: "Claude / ChatGPT", note: "Chat · scheduled tasks", tone: "outside" },
      { id: "schedule", x: 700, y: 100, title: "Schedule", note: "8 · 12 · 16 JST", tone: "accent" },
      { id: "server", x: 700, y: 240, title: "ur-mcp", note: "Node.js · Hono · MCP" },
      { id: "db", x: 700, y: 380, title: "SQLite", note: "Railway volume" },
      { id: "ur", x: 1000, y: 240, title: "UR web API", tone: "outside" },
    ],
    edges: [
      { from: "you", to: "ai", label: "Ask · alerts", both: true },
      { from: "ai", to: "server", label: "MCP", both: true },
      { from: "schedule", to: "server", label: "3× a day", dashed: true },
      { from: "server", to: "db", label: "History", both: true },
      { from: "server", to: "ur", label: "Search" },
    ],
  },

  translations: { ja, ko },
};
