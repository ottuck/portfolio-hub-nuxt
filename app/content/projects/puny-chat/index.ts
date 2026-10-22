import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const adult = {"src":"/images/content/projects/puny-chat/adult.webp","width":780,"height":1688};
const chat = {"src":"/images/content/projects/puny-chat/chat.webp","width":780,"height":1688};
const desktop = {"src":"/images/content/projects/puny-chat/desktop.webp","width":1280,"height":800};
const kid = {"src":"/images/content/projects/puny-chat/kid.webp","width":780,"height":1688};
const onsen = {"src":"/images/content/projects/puny-chat/onsen.webp","width":780,"height":1688};
const onsenSnow = {"src":"/images/content/projects/puny-chat/onsen-snow.webp","width":780,"height":1688};

export const punyChat: Project = {
  slug: "puny-chat",
  name: "Puny Chat",
  status: "live",
  label: "App Store soon",
  order: 1,

  tagline: "A messenger for two, with a tiny pixel buddy you raise together just by chatting.",
  summary:
    "A one-on-one messenger with a small pixel creature living between the two of you. Chat, feed it, clean up after it, and watch it grow.",
  cardStack: ["Expo", "Spring WebFlux", "MongoDB"],
  facts: [
    { label: "Type", value: "iPhone + web app · KO / JA / EN" },
    { label: "Period", value: "Sep – Oct 2026" },
    { label: "Runs on", value: "AWS Lightsail + MongoDB Atlas, Sydney" },
  ],

  links: {
    live: { href: "https://puny-chat.com", label: "Raise a buddy" },
  },

  cover: {
    main: { src: desktop, alt: "Puny Chat in a desktop browser: the adult buddy at its job station on the stage above the chat" },
    inset: { src: chat, alt: "Puny Chat on a phone: the adult buddy at work, with its events mixed into the messages", frame: "phone" },
    tint: ["#e3efe0", "#bfdcc0"],
  },

  about: [
    "When I was first learning to code, I wrote a simple socket messenger and used it to chat with my girlfriend. Puny Chat grew out of that memory. It's a messenger for exactly two people, with a tiny buddy between them that grows the more you talk. It eats, and it poops. Name it after the other person and it gets more fun. No AI prompts, no daily missions.",
    "Start as a guest with just a name, then invite one friend with an eight-character code. The same Expo app runs on iPhone and on the web, and the web app can be added to your home screen with notifications. The 50-second demo shows an egg growing up without signing in.",
  ],
  features: [
    {
      title: "Real-time chat",
      body: "Reconnects and fills in missed messages; resends are delivered once. Typing, read and online indicators.",
    },
    {
      title: "A buddy to raise",
      body: "Egg to baby to kid to adult. At Lv.20 it takes a job that depends on how you raised it (cook, barista, gardener, writer, radio DJ) and works at its own spot on the stage. It never dies if you forget it for a few days.",
    },
    {
      title: "Easy to look after",
      body: "Tap the bowl or the poop, or just send “밥” (food) in the chat. Who took care of it shows up in the conversation.",
    },
    {
      title: "A buddy with moods",
      body: "Left alone, it dances and sings. Once it's a kid it starts talking: “Long time no see!”, “Did you eat?” Tap ♨ and it soaks in an open-air hot spring, with snow in winter. A new room opens on a short dream of what the egg might grow into.",
    },
    { title: "Just the two of you", body: "Start without signing up, link Google later. One invite code, two people per room." },
    {
      title: "Anywhere",
      body: "iPhone first, the same app on the web — installable to the home screen with push. Korean, Japanese and English, light and dark.",
    },
  ],
  gallery: [
    { src: kid, alt: "The kid buddy at Lv.10 on the stage, with the poop and cleaning events in a Korean chat below", frame: "phone" },
    { src: adult, alt: "The adult buddy at its job station with a flower on its head, above a chat in English about the weekend", frame: "phone" },
    { src: onsen, alt: "The buddy in an open-air hot spring with a towel on its head, and the chat still running below in Japanese", frame: "phone" },
    { src: onsenSnow, alt: "The same hot spring in winter, with snow falling, and the chat in Traditional Chinese", frame: "phone" },
  ],
  stack: [
    { area: "App", items: "Expo (React Native) · TypeScript · Expo Router — iPhone and web from one codebase" },
    { area: "Server", items: "Java 25 · Spring Boot 4 · WebFlux · WebSocket" },
    { area: "Data", items: "MongoDB Atlas, free tier, Sydney" },
    { area: "Auth · Push", items: "Firebase Authentication · Expo push · Web Push (VAPID)" },
    { area: "Infra", items: "AWS Lightsail, Sydney (server) · Cloudflare Workers (web) · Terraform for Atlas and Cloudflare, state in R2 · GitHub Actions" },
  ],

  architecture: {
    width: 1040,
    height: 420,
    summary:
      "Sign-in goes through Firebase, and the server checks each ID token. Chat runs over REST and WebSocket to one Spring server in Sydney, which sends a push when a message goes unread.",
    groups: [{ title: "Sydney", x: 430, y: 150, w: 570, h: 120 }],
    nodes: [
      { id: "app", x: 140, y: 210, title: "Expo app", note: "iPhone · web (Cloudflare Workers)" },
      { id: "firebase", x: 540, y: 60, title: "Firebase Auth", note: "Sign-in · ID tokens", tone: "outside" },
      { id: "server", x: 540, y: 210, title: "Spring WebFlux", note: "AWS Lightsail" },
      { id: "db", x: 880, y: 210, title: "MongoDB Atlas" },
      { id: "push", x: 540, y: 360, title: "Push", note: "Expo → APNs · Web Push", tone: "outside" },
    ],
    edges: [
      { from: "app", to: "server", label: "REST · WebSocket", both: true },
      { from: "app", to: "firebase", label: "Sign-in", route: "hvh", fromOffset: -20, bend: 320, labelAt: 2 },
      { from: "server", to: "firebase", label: "Verify tokens" },
      { from: "server", to: "db", both: true },
      { from: "server", to: "push", label: "Unread messages" },
      { from: "push", to: "app", label: "Notifications", route: "hv", labelAt: 0 },
    ],
  },
  translations: { ja, ko },
};
