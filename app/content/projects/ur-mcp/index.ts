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

  tagline: "An MCP server and app for UR rental vacancies: Claude and ChatGPT search them accurately, show the rooms as cards in the chat, and catch new ones three times a day.",
  summary:
    "UR has no public API. UR MCP App takes the same data the official site shows for vacancies and hands it to AI agents as three MCP tools: search vacancies, report what changed, save watch settings. Requests go one at a time and skip images, about the load of one person viewing a results page. In Claude and ChatGPT, the rooms show up as cards right in the chat.",
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
    "After building UR Manager, I caught myself still asking an AI about rooms. AI assistants now have notifications and scheduled tasks of their own, and they're far better than my screens at talking a choice through. So why not just hand the AI accurate data and let it do the rest? That's where ur-mcp came from.",
    "A skill would have been the simple route, but UR's data has gaps and needs cleaning up, so I built an MCP server. Ask Claude or ChatGPT for a 2DK near a station in 板橋区, it calls UR MCP App, and the rooms show up as cards in the chat, each with buttons for the listing and a map. Alerts come from a claude.ai scheduled task that asks for changes right after each check.",
    "It's an amazing time. Without building notifications, a scheduler or a login, one MCP server with the right data gets better answers than the scraped results I used to show. It shares no code with UR Manager. A few people besides me use it through private links, and adding someone takes one sentence to the AI as well.",
    "In October 2026 I merged this with UR Manager into UR Check, which uses accounts and OAuth in place of secret links.",
  ],
  features: [
    {
      title: "Search",
      body: "One area with rent, floor space, layout, walk to a station without a bus, no ground floor and pets. Up to 50 rooms by monthly cost, each with the listing and a map.",
    },
    {
      title: "Cards in the chat",
      body: "In claude.ai on the web and iPhone, and in ChatGPT, rooms show up as cards: monthly cost, layout, floor, size, walk to a station, badges, and buttons for UR and the map. They follow the app's colors and dark mode. Where cards aren't supported, the same rooms come as a table.",
    },
    {
      title: "What changed",
      body: "New, relisted and gone rooms in your watched areas, filtered by your own settings. A report after each check misses nothing, and rooms that came and went between checks are listed with their times.",
    },
    {
      title: "Watch settings in words",
      body: "“Make it ¥140,000 and skip the ground floor” is saved per person and applies from the next alert.",
    },
    {
      title: "Its own history",
      body: "Watched areas are checked at 8, 12 and 16 JST and kept in SQLite, so “new” means new to this service, not just new since the last search.",
    },
    {
      title: "Claude and ChatGPT",
      body: "Claude Code with a bearer token; claude.ai and ChatGPT connectors with a secret URL per person. I add people, reissue their links or cut them off by asking the AI, with no redeploy.",
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
  notes: [
    {
      title: "Division of work",
      body: "The AI reads the question, compares and recommends. The server's job is complete, exact UR data and tool descriptions that tell the AI how to present it.",
    },
    {
      title: "Cards as a single HTML page",
      body: "A tool points to a ui:// resource, which the host opens in a sandboxed iframe with the result passed in. There is no build step: at startup the server combines the HTML, the script and the ext-apps bundle into one page, with a content hash in the URI so hosts that cache it pick up changes. The card only draws what it receives and never calls UR.",
    },
    {
      title: "Partial results are errors",
      body: "Every estate and room page is collected. A failed page or a count mismatch fails the whole search. Values UR filters loosely (floor space, rent, layout) are checked again.",
    },
    {
      title: "A secret URL per person",
      body: "claude.ai and ChatGPT connectors can't send a bearer token, so each person gets their own URL. Tokens are compared as SHA-256 digests in constant time, and cutting someone off is a single variable.",
    },
    {
      title: "Request volume",
      body: "One request at a time, 0.5 s apart, with a 5-minute cache and daily caps. Searching 町田市 makes the same 7 API calls as opening the official results page, without its ~30 images. It backs off on 429 and stops on 403.",
    },
  ],
  footnote:
    "Not affiliated with UR (Urban Renaissance Agency). Always confirm availability on the official UR site. The card screenshots use sample data; the other images are drawn from real UR MCP App results.",

  translations: { ja, ko },
};
