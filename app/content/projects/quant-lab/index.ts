import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const ai = {"src":"/images/content/projects/quant-lab/ai.webp","width":1280,"height":800};
const backtest = {"src":"/images/content/projects/quant-lab/backtest.webp","width":1280,"height":800};
const home = {"src":"/images/content/projects/quant-lab/home.webp","width":1280,"height":800};
const mobile = {"src":"/images/content/projects/quant-lab/mobile.webp","width":780,"height":1688};
const parallel = {"src":"/images/content/projects/quant-lab/parallel.webp","width":1280,"height":800};
const question = {"src":"/images/content/projects/quant-lab/question.webp","width":1280,"height":800};

export const quantLab: Project = {
  slug: "quant-lab",
  name: "Quant Lab",
  status: "live",
  label: "Real trades at 1/100",
  highlightLabel: true,
  order: 4,

  tagline: "A payday investing bot that copies your habits, and AI bots that set the mix every day. All of them run on my real account at 1/100 scale.",
  summary:
    "Made for people who invest a set amount every payday. Pick up to ten funds you like and the split between them, answer a few questions about how you buy, and a bot buys for you: on payday, skipping when prices run hot, buying big after a drop. It shows how the last ten years would have gone next to just buying every month. Beside it, two AI bots decide every day how much of ten funds I picked to hold: one reads the news, the other sees only price charts with the names hidden.",
  cardStack: ["Python", "FastAPI", "Claude API"],
  facts: [
    { label: "Type", value: "Web app + worker · my real account, public demo" },
    { label: "Period", value: "Oct 2026 –" },
    { label: "Runs on", value: "AWS Lightsail, Sydney · Docker Compose · Cloudflare Tunnel" },
  ],

  links: {
    // Source is private, so no GitHub link.
    live: { href: "https://demo.trading-lab.me", label: "Try the demo" },
  },

  cover: {
    main: { src: home, alt: "Quant Lab home: the copy-me bot next to just buying every month, and the next payday's buys" },
    inset: { src: mobile, alt: "Quant Lab home on a phone", frame: "phone" },
    tint: ["#e7ecf6", "#c6d1e6"],
  },

  about: [
    "It can't be offered as a service, so I'm its only user. It runs on my real account at 1/100 of what I actually invest and reports every fill to Telegram, and I use what it does as a reference for my own investing. Lately, I've started handing decisions to AI as well.",
    "It started as a paper-trading bot for well-known strategies. Those are gone now, and it's built around the copy-me bot, made for the way most people with a salary invest: a set amount every payday. You choose up to ten funds you like and the split between them, then answer four to six questions: how much a month, whether to skip when prices run hot, how far a drop has to go before buying big. From then on the bot buys on payday in your place, including the months you'd have let slip.",
    "It answers two questions, with no scores or rankings. Looking back: the last ten years done your way, next to just buying every month, and “parallel yous” that each change one rule. Looking ahead: on the next payday, how much of each fund to buy and why, and how far prices are from your buy-big and skip lines.",
    "The newest part is two AI bots. Every day after the US market closes, they decide how much of ten funds I picked, and of cash, to hold, and explain each change in plain words. One reads the news; the other sees only price charts with the names hidden. Does knowing the market help, and can an AI beat my own rule? They run side by side on the same money, at 1/100 in my real account. The market data I use can't be shared, so the real app is private and a public demo runs the same app on made-up prices.",
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
    { src: question, alt: "Copying a habit: “When prices look high, what do you do?” with four choices" },
    { src: ai, alt: "The AI bot in the demo: today's decision, from current to target weight with reasons, and the AI bot next to the copy-me bot. Demo decisions are made by rules, not a real AI" },
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
  notes: [
    {
      title: "Decisions and orders are separate",
      body: "The bot decides in paper money what to buy and how much. A separate trading engine turns that into real orders scaled to my account and sends them to the broker. Because the decision side never touches money, backtests, the demo and my account all use the same logic.",
    },
    {
      title: "The AI only proposes weights",
      body: "The AI answers with target weights in a fixed format, and the engine turns them into orders. An answer with an unknown fund, or weights that don't add up to 100, is discarded and that day is left unchanged. Inputs and answers are saved, so a decision can be replayed.",
    },
    {
      title: "Charts without names",
      body: "The candle-analysis bot sees prices as an index with today at 100, without dates, and each fund is only a letter that changes every day. A well-known chart shape can still give the past away, so neither AI bot is backtested. Both are compared from the day they started, with the same money.",
    },
  ],
  footnote: "Not investment advice. I trade my own account at a small scale; the screenshots use the demo's synthetic prices, where every order is simulated. The AI bot's reasons are for reference and can be wrong.",

  translations: { ja, ko },
};
