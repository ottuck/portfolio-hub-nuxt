import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const battle = {"src":"/images/content/projects/pokepedia/battle.webp","width":756,"height":612};
const collection = {"src":"/images/content/projects/pokepedia/collection.webp","width":1280,"height":570};
const detail = {"src":"/images/content/projects/pokepedia/detail.webp","width":1280,"height":800};
const mobile = {"src":"/images/content/projects/pokepedia/mobile.webp","width":390,"height":780};
const reward = {"src":"/images/content/projects/pokepedia/reward.webp","width":756,"height":612};
const title = {"src":"/images/content/projects/pokepedia/title.webp","width":756,"height":528};

export const pokepedia: Project = {
  slug: "pokepedia",
  name: "Pokepedia",
  status: "live",
  label: "Remake",
  order: 5,

  tagline:
    "“Who's that Pokémon?” as a Game Boy–style battle, with a Gen 1 Pokédex and a sticker book. In Korean, English and Japanese.",
  summary:
    "A silhouette game styled like a Game Boy battle: name the Pokémon, throw a Poké Ball, and it goes into your sticker book. A Pokédex of the original 151 sits next to it.",
  cardStack: ["Next.js", "Supabase", "TypeScript"],
  facts: [
    { label: "Type", value: "Web app · KO / EN / JA" },
    { label: "Period", value: "Sep – Oct 2026 (remake)" },
    { label: "Runs on", value: "Vercel + Supabase, Tokyo" },
  ],

  links: {
    live: { href: "https://pokepedia.dev", label: "Catch a Pokémon" },
    github: "https://github.com/ottuck/pokepedia",
  },

  cover: {
    main: { src: battle, alt: "Game Boy–style battle: a Pokémon silhouette, the trainer's back and the command box" },
    inset: { src: mobile, alt: "The Pokédex on a phone", frame: "phone" },
    tint: ["#fde2d3", "#f6b9a0"],
  },

  about: [
    "In 2023 I built a Pokédex as a JSP team project. This is a solo rebuild on a modern stack, to see how far a small app can be polished.",
    "The game is the front page now. A silhouette appears; name it in any of the three languages and the trainer throws a Poké Ball. Miss three times and the run is over. No sign-up: you play as a guest, and linking Google later keeps your stickers and scores.",
  ],
  features: [
    {
      title: "Silhouette battle",
      body: "Fight to answer, Hint for half the name, Skip, Run — arrow keys and Z work too. Pikachu, 피카츄 or ピカチュウ all count.",
    },
    {
      title: "Throw a Poké Ball",
      body: "Get it right and the trainer, hand-drawn in Game Boy greys, throws the ball before the Pokémon is revealed. Streaks raise the score and the shiny odds.",
    },
    {
      title: "Pokédex",
      body: "All 151 on one page. Search by name in three languages or by number; type filters and sorting stay in the URL.",
    },
    {
      title: "Detail cards",
      body: "Stats, abilities and evolutions. Artwork sits on a holographic card that tilts with your pointer or finger and flips to the shiny version.",
    },
    { title: "Sticker book & ranking", body: "151 slots to fill, shiny ones included, and a leaderboard of everyone's best run." },
    {
      title: "Plays on a phone",
      body: "The whole Game Boy fits on a small screen, and the page doesn't scroll under your thumb during a battle.",
    },
  ],
  gallery: [
    { src: title, alt: "The game's title screen, now the front page" },
    { src: reward, alt: "A shiny sticker for a correct answer" },
    { src: detail, alt: "Charizard on a holographic detail card" },
    { src: collection, alt: "Sticker collection" },
  ],
  stack: [
    { area: "App", items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript" },
    { area: "UI", items: "Tailwind CSS v4 · Motion · Zustand · next-intl" },
    { area: "Data", items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron" },
    { area: "Testing", items: "Vitest · Playwright" },
    { area: "Hosting", items: "Vercel (Tokyo) · Supabase (Tokyo) · Analytics · Speed Insights" },
  ],
  notes: [
    {
      title: "Answers stay on the server",
      body: "While a round is in progress, the browser gets a silhouette under an opaque file name and a masked name. The answers are in a private schema.",
    },
    {
      title: "Judging and saving",
      body: "The rules are plain TypeScript. Score, sticker and the next question are saved by one Postgres function, so submitting twice doesn't pay out twice.",
    },
  ],
  footnote:
    "Pokémon and related names and artwork are © Nintendo, The Pokémon Company, Creatures Inc. and GAME FREAK inc. An unofficial, non-commercial fan project.",

  translations: { ja, ko },
};
