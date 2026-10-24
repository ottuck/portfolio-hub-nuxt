import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const apps = {"src":"/images/content/projects/ur-check/apps.webp","width":1280,"height":800};
const history = {"src":"/images/content/projects/ur-check/history.webp","width":1280,"height":800};
const home = {"src":"/images/content/projects/ur-check/home.webp","width":1280,"height":800};
const mobile = {"src":"/images/content/projects/ur-check/mobile.webp","width":780,"height":1688};
const rooms = {"src":"/images/content/projects/ur-check/rooms.webp","width":1280,"height":800};
const wizard = {"src":"/images/content/projects/ur-check/wizard.webp","width":1280,"height":800};

export const urCheck: Project = {
  slug: "ur-check",
  name: "UR Check",
  status: "live",
  label: "Invite only · I use it",
  highlightLabel: true,
  order: 2,

  tagline:
    "Search UR rental vacancies by your conditions and track rooms that are new, relisted or gone. The website and AI assistants work from the same conditions and history.",
  summary:
    "UR Check searches vacancies in UR rental housing in Tokyo and the surrounding Kanto area, checks every area three times a day, and records which rooms are new, relisted or gone. The website and AI assistants, through MCP, use the same conditions and history.",
  cardStack: ["Bun", "PostgreSQL", "MCP"],
  facts: [
    { label: "Type", value: "Web app + MCP server (Japanese UI)" },
    { label: "Period", value: "Oct 2026" },
    { label: "Runs on", value: "AWS Lightsail, Sydney · Docker Compose · Cloudflare Tunnel" },
  ],

  // The source is private and accounts are invite-only, so the link is the demo: a static
  // site in the browser with made-up rooms.
  links: {
    live: { href: "https://demo.ur-check.com", label: "Try the demo" },
  },

  cover: {
    main: { src: home, alt: "UR Check home: the headline banner, then the counts of saved conditions, open rooms and recent changes" },
    inset: { src: mobile, alt: "The same page on a phone", frame: "phone" },
    tint: ["#e7e9f3", "#d6c9dc"],
  },

  about: [
    "UR is first come, first served, and a good room can be gone almost as soon as it's listed. The official site has no vacancy alerts, so this does the watching. The real site is run privately, to stay within the policy.",
    "It was built in this order: web, then MCP, then a web service that supports MCP.",
  ],
  features: [
    {
      title: "Search",
      body: "One area at a time, by rent, floor space, layout, walk to a station without a bus, and no ground floor. Up to 50 rooms by monthly cost.",
    },
    {
      title: "Saved conditions",
      body: "Save several named conditions, each with several areas and preferred stations per area. Every edit is versioned, and a condition can be paused.",
    },
    {
      title: "What changed",
      body: "Every area is checked three times a day. Rooms are tracked as new, relisted or gone, and rooms that came and went between checks are listed too.",
    },
    {
      title: "AI assistants (MCP)",
      body: "Sign in with OAuth, then search, read changes and manage conditions in the chat, with rooms shown as cards. Alerts come from a scheduled task in the AI app.",
    },
    {
      title: "Sharing",
      body: "An eight-digit code copies a condition to another user. It expires after seven days and can be withdrawn.",
    },
    {
      title: "Admin screen",
      body: "Issue, reset and suspend accounts, and register the AI apps that may connect. A new account comes with a message that has the sign-in and AI connection details in it.",
    },
  ],
  gallery: [
    { src: wizard, alt: "Creating a condition step by step: step 1 of 6 asks for the area, with three wards and cities picked" },
    { src: rooms, alt: "Open rooms that match the conditions, as cards with a floor plan and the monthly rent" },
    { src: history, alt: "Change history: rooms that are new, relisted or gone, with the condition each one matches" },
    { src: apps, alt: "Admin screen for adding an AI app, with the AI app choices and their callback URLs" },
  ],
  stack: [
    { area: "Server", items: "Bun · Hono · one process for the REST API, the MCP server and the scheduler" },
    { area: "Web", items: "React 19 · Vite" },
    { area: "Data", items: "PostgreSQL · Drizzle ORM" },
    { area: "Auth · MCP", items: "Better Auth (OAuth provider) · MCP TypeScript SDK · MCP Apps · Zod" },
    { area: "Infra", items: "Docker · AWS Lightsail, Sydney · Cloudflare Tunnel" },
    { area: "Quality", items: "bun test · Biome · TypeScript · GitHub Actions, with a throwaway PostgreSQL" },
  ],
  footnote:
    "Not affiliated with UR (Urban Renaissance Agency). Always confirm availability on the official UR site. The screenshots and the demo use made-up rooms.",

  architecture: {
    width: 1000,
    height: 400,
    summary:
      "One Bun process serves the web app, the MCP server that Claude and ChatGPT connect to, and the scheduler that checks UR's listings.",
    groups: [{ title: "Bun · one process", x: 320, y: 30, w: 280, h: 240 }],
    nodes: [
      { id: "web", x: 110, y: 90, title: "Web app", note: "React" },
      { id: "ai", x: 110, y: 240, title: "Claude / ChatGPT", note: "MCP · OAuth", tone: "outside" },
      { id: "api", x: 460, y: 90, title: "Hono", note: "REST · MCP · scheduler" },
      { id: "services", x: 460, y: 220, title: "Services", note: "Search · tracking · saved searches" },
      { id: "pg", x: 860, y: 220, title: "PostgreSQL" },
      { id: "ur", x: 860, y: 350, title: "UR web API", tone: "outside" },
    ],
    edges: [
      { from: "web", to: "api", label: "REST API" },
      { from: "ai", to: "api", label: "MCP", route: "hvh", toOffset: 12, bend: 250, labelAt: 1 },
      { from: "api", to: "services" },
      { from: "services", to: "pg", label: "Saved searches · history", both: true },
      { from: "services", to: "ur", label: "Scheduled checks", dashed: true, route: "vh", labelAt: 1 },
    ],
  },
  translations: { ja, ko },
};
