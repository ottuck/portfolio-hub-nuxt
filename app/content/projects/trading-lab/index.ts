import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const ai = {"src":"/images/content/projects/trading-lab/ai.webp","width":1280,"height":800};
const backtest = {"src":"/images/content/projects/trading-lab/backtest.webp","width":1280,"height":800};
const home = {"src":"/images/content/projects/trading-lab/home.webp","width":1280,"height":800};
const mobile = {"src":"/images/content/projects/trading-lab/mobile.webp","width":780,"height":1688};
const parallel = {"src":"/images/content/projects/trading-lab/parallel.webp","width":1280,"height":800};
const question = {"src":"/images/content/projects/trading-lab/question.webp","width":1280,"height":800};

export const tradingLab: Project = {
  slug: "trading-lab",
  name: "Trading Lab",
  status: "live",
  label: "Real trades at 1/100",
  highlightLabel: true,
  order: 6,

  tagline: "A payday investing bot that copies your habits, and AI bots that set the mix every day. All of them run on my real account at 1/100 scale.",
  summary:
    "A bot that buys for you on payday, and two AI bots that set the mix every day.",
  cardStack: ["Python", "FastAPI", "Claude API"],
  facts: [
    { label: "Type", value: "Web app + worker · my real account, public demo" },
    { label: "Period", value: "Oct 2026" },
    { label: "Runs on", value: "AWS Lightsail, Sydney · Docker Compose · Cloudflare Tunnel" },
  ],

  links: {
    // Source is private, so no GitHub link.
    live: { href: "https://demo.trading-lab.me", label: "Try the demo" },
  },

  cover: {
    main: { src: home, alt: "Trading Lab home: the copy-me bot next to just buying every month, today's decision, and the three bots on the side" },
    inset: { src: mobile, alt: "Trading Lab home on a phone", frame: "phone" },
    tint: ["#e7ecf6", "#c6d1e6"],
  },

  about: [
    "Made for people who invest a set amount every payday. Pick up to ten funds you like and the split between them, answer a few questions about how you buy, and a bot buys for you: on payday, skipping when prices run hot, buying big after a drop. It shows how the last ten years would have gone next to just buying every month.",
    "Beside it, two AI bots decide every day how much of ten funds I picked to hold: one reads the news, the other sees only price charts with the names hidden.",
  ],
  features: [
    {
      title: "Copy me",
      body: "Pick up to ten funds and a split, then answer four to six questions. They become a rule: how much on payday, when to skip, when to buy more. Selling isn't copied.",
    },
    {
      title: "Parallel yous",
      body: "The same money with one rule changed: never skipping, buying only after drops, waiting longer. See which version of you would have done better.",
    },
    {
      title: "What to do next",
      body: "How much of each fund to buy next payday and why, and how close prices are to the points where it would skip or buy more.",
    },
    {
      title: "Backtests",
      body: "Try a rule on the last ten years and compare it, year by year, with just buying every month.",
    },
    {
      title: "Two AI bots",
      body: "Every day, AI decides how much of ten funds and cash to hold, and shows each change with its reason. One reads the news and links the articles; the other sees only charts with the names hidden. From the day they start, they're compared with each other and with the copy-me bot.",
    },
    {
      title: "Real orders, small",
      body: "After the US market closes, the bots decide, and the orders go to my real account at 1/100, in fractional shares. Every trade is reported to Telegram.",
    },
    {
      title: "A demo anyone can try",
      body: "Made-up prices and example bots. The demo's AI bots show sample decisions made by rules, not a real AI. Copy-me and backtests work; nothing touches a real account.",
    },
  ],
  gallery: [
    { src: question, alt: "Copying a habit, question 3 of 6: how much goes in each month, with amounts to pick" },
    { src: ai, alt: "The market-analysis AI bot in the demo: today's decision with its reasons and a target weight for each fund. Demo decisions are made by rules, not a real AI" },
    { src: parallel, alt: "Parallel yous: the same money with one rule changed each time" },
    { src: backtest, alt: "Trying the copy-me rule on past prices: the monthly amount, when to skip or buy big, and which funds" },
  ],
  stack: [
    { area: "Backend", items: "Python 3.14 · uv · FastAPI · Pydantic v2 · SQLAlchemy 2 · Alembic · pandas" },
    { area: "Frontend", items: "React · TypeScript · Vite · TanStack Query · Lightweight Charts" },
    { area: "Data", items: "PostgreSQL 17 · Toss Securities Open API · synthetic prices for the demo" },
    { area: "AI", items: "Claude Sonnet 5.5 · web search · structured output (JSON schema) · Anthropic SDK" },
    { area: "Infra", items: "AWS Lightsail, Sydney (Terraform) · Docker Compose · GHCR · GitHub Actions with a self-hosted runner · Cloudflare Tunnel & Access · Tailscale · Telegram alerts" },
    { area: "Quality", items: "pytest · ruff · mypy (strict) · oxlint" },
  ],
  footnote: "Not investment advice. The screenshots use the demo's synthetic prices, where every order is simulated. The AI bot's reasons are for reference and can be wrong.",

  architecture: {
    width: 1080,
    height: 570,
    summary:
      "The screens and the worker only talk through the database. Only the worker reaches the brokerage, Claude and Telegram, and the demo runs on its own data with no keys.",
    groups: [{ title: "One server · Sydney", x: 340, y: 30, w: 260, h: 450 }],
    nodes: [
      { id: "anyone", x: 80, y: 90, title: "Anyone", tone: "accent" },
      { id: "demo", x: 470, y: 90, title: "Demo", note: "Synthetic prices · no keys" },
      { id: "me", x: 80, y: 200, title: "Me", tone: "accent" },
      { id: "app", x: 470, y: 200, title: "Trading Lab", note: "Screens · API" },
      { id: "db", x: 470, y: 310, title: "PostgreSQL" },
      { id: "worker", x: 470, y: 420, title: "Worker", note: "Prices · decisions · orders" },
      { id: "toss", x: 950, y: 310, title: "Toss Securities", note: "Prices · account · orders", tone: "outside" },
      { id: "claude", x: 950, y: 420, title: "Claude", note: "AI bot decisions", tone: "outside" },
      { id: "telegram", x: 950, y: 520, title: "Telegram", tone: "outside" },
    ],
    edges: [
      { from: "anyone", to: "demo", label: "Try it" },
      { from: "me", to: "app", label: "Private sign-in" },
      { from: "app", to: "db", both: true },
      { from: "worker", to: "db", both: true },
      { from: "worker", to: "toss", label: "Prices · orders", both: true, route: "hvh", fromOffset: -12, bend: 640, labelAt: 2 },
      { from: "worker", to: "claude", label: "One call a day" },
      { from: "worker", to: "telegram", label: "Alerts", route: "hvh", fromOffset: 12, bend: 640, labelAt: 2 },
    ],
  },
  translations: { ja, ko },
};
