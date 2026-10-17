import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";

const unityBattle = { src: "/images/content/projects/pokepedia/unity-battle.webp", width: 1000, height: 500 };
const mobile = { src: "/images/content/projects/pokepedia/mobile.webp", width: 390, height: 780 };
const battle = { src: "/images/content/projects/pokepedia/battle.webp", width: 641, height: 580 };
const reward = { src: "/images/content/projects/pokepedia/reward.webp", width: 633, height: 573 };
const unityAttack = { src: "/images/content/projects/pokepedia/unity-attack.webp", width: 1000, height: 900 };
const title = { src: "/images/content/projects/pokepedia/title.webp", width: 641, height: 630 };
const detail = { src: "/images/content/projects/pokepedia/detail.webp", width: 641, height: 590 };
const collection = { src: "/images/content/projects/pokepedia/collection.webp", width: 672, height: 566 };

export const pokepedia: Project = {
  slug: "pokepedia",
  name: "Pokepedia",
  status: "live",
  label: "Remake",
  order: 5,
  tagline: "Guess Pokémon, collect stickers, then take your Pikachu into a Unity battle. A Gen 1 Pokédex in Korean, English and Japanese.",
  summary: "A Pokémon quiz and sticker collection with turn-based battles built in Unity. Browse the original 151 in the Pokédex, then battle Blastoise with the Pikachu you earned in the quiz. Play in a desktop or mobile browser, in Korean, English or Japanese.",
  cardStack: [
    "Next.js",
    "Unity",
    "Supabase"
  ],
  facts: [
    {
      label: "Type",
      value: "Web app + Unity WebGL · KO / EN / JA"
    },
    {
      label: "Period",
      value: "Sep – Oct 2026 (remake)"
    },
    {
      label: "Runs on",
      value: "Vercel · Supabase · Cloudflare Pages"
    }
  ],
  links: {
    live: {
      href: "https://pokepedia.dev",
      label: "Catch a Pokémon"
    },
    github: "https://github.com/ottuck/pokepedia"
  },
  cover: {
    main: {
      src: unityBattle,
      alt: "Unity battle between Pikachu and Blastoise, with three moves to choose from"
    },
    inset: {
      src: mobile,
      alt: "The Pokédex on a phone",
      frame: "phone"
    },
    tint: [
      "#fde2d3",
      "#f6b9a0"
    ]
  },
  about: [
    "In 2023 I built a Pokédex as a JSP team project. This is a solo rebuild on a modern stack, to see how far a small app can be polished.",
    "The game is the front page now. A silhouette appears; name it in any of the three languages and the trainer throws a Poké Ball. Miss three times and the run is over. No sign-up: you play as a guest, and linking Google later keeps your stickers and scores.",
    "I extended the web game with a Unity WebGL battle, embedded in the same site. The quiz, collection and battle are connected: earn Pikachu, then enter a match against Blastoise from the reward screen or sticker book. This release is a single-player battle with Pikachu as the playable Pokémon."
  ],
  features: [
    {
      title: "Silhouette quiz",
      body: "Fight to answer, Hint for half the name, Skip, Run — arrow keys and Z work too. Pikachu, 피카츄 or ピカチュウ all count."
    },
    {
      title: "From quiz to battle",
      body: "Earn Pikachu in the quiz, then enter a battle from the reward screen or its sticker in your collection."
    },
    {
      title: "Unity turn-based battle",
      body: "Pick Tackle, Thunderbolt or Thunder against Blastoise. Speed determines turn order, with type matchups, accuracy and critical hits shaping the result."
    },
    {
      title: "Rain, light and move effects",
      body: "A pixel-art arena with rain, fog and 2D lighting. Thunderbolt and Hydro Pump have their own effects, camera movement and synthesized audio."
    },
    {
      title: "Pokédex",
      body: "All 151 on one page. Search by name in three languages or by number; type filters and sorting stay in the URL."
    },
    {
      title: "Detail cards",
      body: "Stats, abilities and evolutions. Artwork sits on a holographic card that tilts with your pointer or finger and flips to the shiny version."
    },
    {
      title: "Sticker book & ranking",
      body: "151 slots to fill, shiny ones included, and a leaderboard of everyone's best run."
    }
  ],
  gallery: [
    {
      src: battle,
      alt: "Game Boy-style Pokémon silhouette quiz"
    },
    {
      src: reward,
      alt: "Pikachu sticker reward with a button to enter the battle"
    },
    {
      src: unityAttack,
      alt: "Pikachu using Thunderbolt in the Unity battle"
    },
    {
      src: title,
      alt: "Pokepedia GOLD title screen"
    },
    {
      src: detail,
      alt: "Charizard on a holographic detail card"
    },
    {
      src: collection,
      alt: "Pikachu in the sticker collection with a battle shortcut"
    }
  ],
  stack: [
    {
      area: "App",
      items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript"
    },
    {
      area: "UI",
      items: "Tailwind CSS v4 · Motion · Zustand · next-intl"
    },
    {
      area: "Battle",
      items: "Unity 6.3 LTS · C# · uGUI · TextMeshPro · URP 2D · WebGL"
    },
    {
      area: "Data",
      items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron"
    },
    {
      area: "Testing",
      items: "Vitest · Playwright · NUnit (.NET)"
    },
    {
      area: "Hosting",
      items: "Vercel · Supabase · Cloudflare Pages"
    }
  ],
  footnote: "Pokémon and related names and artwork are © Nintendo, The Pokémon Company, Creatures Inc. and GAME FREAK inc. An unofficial, non-commercial fan project.",
  translations: { ja, ko },
};
