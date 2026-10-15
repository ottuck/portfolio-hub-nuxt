import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const cover = {"src":"/images/content/projects/gitleaf/cover.webp","width":1280,"height":800};
const embed = {"src":"/images/content/projects/gitleaf/embed.webp","width":1280,"height":800};
const how = {"src":"/images/content/projects/gitleaf/how.webp","width":1280,"height":800};

export const gitleaf: Project = {
  slug: "gitleaf",
  name: "GitLeaf",
  status: "live",
  label: "Free to use",
  order: 3,

  tagline: "Your year of GitHub contributions, painted as a watercolor plant: one leaf for each day. Paste one line into your README to use it.",
  summary:
    "A small service that turns your GitHub contributions into a watercolor plant. Every day of the year is a leaf, and the more you did that day, the deeper its green. Paste one image line into your profile README and the picture keeps itself up to date.",
  cardStack: ["TypeScript", "Cloudflare Workers", "SVG"],
  facts: [
    { label: "Type", value: "Image service for GitHub READMEs" },
    { label: "Period", value: "Oct 2026" },
    { label: "Runs on", value: "Cloudflare Workers + D1 + R2" },
  ],

  links: {
    github: "https://github.com/ottuck/gitleaf",
  },

  cover: {
    main: { src: cover, alt: "A year of contributions as a plant, and a close-up of its leaves" },
    tint: ["#e9eedd", "#cdd8bb"],
  },

  about: [
    "A contribution graph is a grid of green squares. I wanted something I'd enjoy looking at, so GitLeaf paints the year as a plant: a small leaf for each day, shaded by how much happened, and a bigger leaf at the end of each branch for the week. Days that haven't come yet are faint outlines, and the plant's caption counts the year's contributions.",
    "It's made to sit in a profile README. You paste one image line with your username, with no sign-up and no GitHub Actions. The first time the image is requested, the service reads your contributions, paints the plant and saves it. After that it's repainted once a day under the same URL, so your README never changes and nothing is committed.",
    "The leaves are eight watercolor leaf shapes in five shades, made with an AI image tool. The code lays them out on four stems and fills in one per day. The whole picture is a single SVG file, so it works as a plain image in a README, where scripts and outside requests are blocked.",
  ],
  features: [
    {
      title: "One leaf a day",
      body: "The shade follows GitHub's own contribution level, from a faint outline on quiet days to deep green. Weeks get a larger leaf with the week's average.",
    },
    {
      title: "One line to use",
      body: "Add the image line with your username to your README. No account, and the picture shows up on the first request.",
    },
    {
      title: "Repainted every day",
      body: "The same URL shows the latest activity, so the README never needs editing. A new year starts a new plant; ?year= pins any year back to 2008.",
    },
    {
      title: "A little breeze",
      body: "Add ?motion=breeze and the branches sway slowly, each at its own pace. It's CSS only, and it stops if the device asks for less motion.",
    },
  ],
  gallery: [
    { src: how, alt: "How it works: a README asks a Cloudflare Worker for an image, which comes from saved SVGs in R2; a daily cron reads GitHub and repaints, and D1 keeps the schedule" },
    { src: embed, alt: "The one line to paste into a README, next to the plant it shows" },
  ],
  stack: [
    { area: "Service", items: "TypeScript · Cloudflare Workers with Cron Triggers" },
    { area: "Storage", items: "R2 for the saved SVGs · D1 for gardens and refresh times" },
    { area: "Picture", items: "SVG written in plain JavaScript · eight watercolor leaf images in five shades (sharp) · CSS animation for the breeze" },
    { area: "Data", items: "GitHub GraphQL API, token kept as a Worker secret" },
    { area: "Quality", items: "Tests on the real Workers runtime with D1 and R2 (Miniflare) · a live check against GitHub · GitHub Actions" },
  ],
  notes: [
    {
      title: "Draw once, serve many times",
      body: "A request only reads the saved SVG from R2, with an ETag for repeat requests. GitHub is called on the first visit and in the daily repaint, not when a README is viewed.",
    },
    {
      title: "Failures keep the old picture",
      body: "If GitHub fails or returns incomplete data, the previous picture stays and retries back off from one hour up to a day. A lease in D1 keeps two overlapping requests from painting the same garden twice.",
    },
    {
      title: "Small repaint batches",
      body: "Cron runs every ten minutes and handles up to four gardens that are due, each once a day after 00:20 UTC. The limits for when more people use it are in the README.",
    },
    {
      title: "Checked against GitHub",
      body: "A script compares a live picture with a fresh GitHub response: each day's count and shade, the weekly leaves, future days and the total. The 20 tests run without calling GitHub and cover leap years, year-end rushes and outages.",
    },
  ],
  footnote: "Counts are GitHub contributions, not only commits. Private activity only shows if the service's GitHub token can see it. The pictures use my own account.",

  translations: { ja, ko },
};
