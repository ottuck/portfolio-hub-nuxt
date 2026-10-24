import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const battle = {"src":"/images/content/projects/pokepedia/battle.webp","width":756,"height":612};
const collection = {"src":"/images/content/projects/pokepedia/collection.webp","width":1280,"height":570};
const detail = {"src":"/images/content/projects/pokepedia/detail.webp","width":1280,"height":800};
const mobile = {"src":"/images/content/projects/pokepedia/mobile.webp","width":390,"height":780};
const reward = {"src":"/images/content/projects/pokepedia/reward.webp","width":756,"height":612};
const title = {"src":"/images/content/projects/pokepedia/title.webp","width":756,"height":528};
const unityBattle = {"src":"/images/content/projects/pokepedia/unity-battle.webp","width":942,"height":842};

export const pokepedia: Project = {
  slug: "pokepedia",
  name: "Pokepedia",
  status: "live",
  label: "Remake",
  order: 5,

  tagline:
    "“Who's that Pokémon?” as a Game Boy–style battle, with a Gen 1 Pokédex and a sticker book — plus a turn-based Pikachu battle I built in Unity. In Korean, English and Japanese.",
  summary:
    "A silhouette game styled like a Game Boy battle: name the Pokémon, throw a Poké Ball, and it goes into your sticker book. A Pokédex of the original 151 sits next to it. Win a Pikachu and you can take it into a turn-based battle against Blastoise, a separate Unity project that runs inside the page.",
  cardStack: ["Next.js", "Supabase", "Unity"],
  facts: [
    { label: "Type", value: "Web app + Unity WebGL battle · KO / EN / JA" },
    { label: "Period", value: "Sep – Oct 2026 (remake, battle added in Oct)" },
    { label: "Runs on", value: "Vercel + Supabase, Tokyo · Cloudflare Pages" },
  ],

  links: {
    live: { href: "https://pokepedia.dev", label: "Catch a Pokémon" },
    github: "https://github.com/ottuck/pokepedia",
    repos: [{ href: "https://github.com/ottuck/pokepedia-unity", label: "Unity" }],
  },

  cover: {
    main: { src: battle, alt: "Game Boy–style battle: a Pokémon silhouette, the trainer's back and the command box" },
    inset: { src: mobile, alt: "The Pokédex on a phone", frame: "phone" },
    tint: ["#fde2d3", "#f6b9a0"],
  },

  about: [
    "A silhouette appears; name it in any of the three languages and the trainer throws a Poké Ball. Miss three times and the run is over. No sign-up: you play as a guest, and linking Google later keeps your stickers and scores.",
    "Win a Pikachu and it fights Blastoise in a turn-based battle. The battle is a separate Unity project, pokepedia-unity, built for WebGL and opened in an iframe. It also runs on its own at battle.pokepedia.dev.",
  ],
  features: [
    {
      title: "Silhouette quiz",
      body: "Fight to answer, Hint for half the name, Skip, Run — arrow keys and Z work too. Pikachu, 피카츄 or ピカチュウ all count.",
    },
    { title: "Sticker book & ranking", body: "151 slots to fill, shiny ones included, and a leaderboard of everyone's best run." },
    {
      title: "From quiz to battle",
      body: "Without a Pikachu sticker, the first question is Pikachu. The reward screen and the Pikachu sticker in your book both open the battle.",
    },
    {
      title: "Unity turn-based battle",
      body: "Pick Tackle, Thunderbolt or Thunder against Blastoise. Speed decides who goes first; type matchups, accuracy and critical hits decide the damage. Rain and fog over a pixel-art field, 2D lights, and sound effects I synthesized myself.",
    },
  ],
  gallery: [
    { src: title, alt: "The game's title screen, now the front page" },
    { src: reward, alt: "A shiny sticker for a correct answer" },
    { src: detail, alt: "Charizard on a holographic detail card" },
    { src: collection, alt: "Sticker collection" },
    { src: unityBattle, alt: "The Unity battle: Pikachu faces Blastoise on a rainy field" },
  ],
  stack: [
    { area: "Web · App", items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript" },
    { area: "Web · UI", items: "Tailwind CSS v4 · Motion · Zustand · next-intl" },
    { area: "Web · Data", items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron" },
    { area: "Web · Testing", items: "Vitest · Playwright" },
    { area: "Web · Hosting", items: "Vercel (Tokyo) · Supabase (Tokyo) · Analytics · Speed Insights" },
    { area: "Battle · Engine", items: "Unity 6.3 LTS · C# 9 · uGUI · TextMesh Pro" },
    { area: "Battle · Graphics", items: "URP 2D — Light2D, post-processing · custom shader · HTML/CSS start and VS screens" },
    { area: "Battle · Testing", items: "NUnit · dotnet test · GitHub Actions" },
    { area: "Battle · Hosting", items: "WebGL (pre-compressed Brotli) · Cloudflare Pages · iframe + postMessage" },
  ],
  footnote:
    "Pokémon and related names and artwork are © Nintendo, The Pokémon Company, Creatures Inc. and GAME FREAK inc. An unofficial, non-commercial fan project.",

  architecture: {
    width: 940,
    height: 440,
    summary:
      "The web app and the battle are separate projects. The page opens the Unity build in an iframe and passes the Pikachu over postMessage. Pokémon data was copied from PokeAPI once, so nothing outside is called at runtime.",
    groups: [{ title: "pokepedia-unity · separate repo", x: 180, y: 186, w: 360, h: 118 }],
    nodes: [
      { id: "player", x: 100, y: 80, title: "Player", tone: "accent" },
      { id: "next", x: 400, y: 80, title: "Next.js · Vercel", note: "Tokyo · pages, Server Actions" },
      { id: "pg", x: 800, y: 80, title: "Supabase Postgres", note: "Tokyo · RLS, RPC" },
      { id: "battle", x: 400, y: 256, title: "Unity battle", note: "WebGL · Cloudflare Pages" },
      { id: "sync", x: 800, y: 256, title: "Sync script", note: "Run once by hand" },
      { id: "pokeapi", x: 560, y: 386, title: "PokeAPI", tone: "outside" },
      { id: "storage", x: 800, y: 386, title: "Supabase Storage", note: "Served to the page" },
    ],
    edges: [
      { from: "player", to: "next", label: "Play" },
      { from: "next", to: "pg", label: "Pages · RPC" },
      { from: "next", to: "battle", label: "iframe · postMessage", both: true },
      { from: "pokeapi", to: "sync", label: "Pokémon data", dashed: true, route: "vh", labelAt: 1 },
      { from: "sync", to: "pg", label: "Stats · names", dashed: true },
      { from: "sync", to: "storage", label: "Artwork", dashed: true },
    ],
  },
  translations: { ja, ko },
};
