import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const cover = {"src":"/images/content/projects/home-server-3d/cover.webp","width":1280,"height":800};
const mobile = {"src":"/images/content/projects/home-server-3d/mobile.webp","width":780,"height":1688};
const night = {"src":"/images/content/projects/home-server-3d/night.webp","width":1280,"height":800};
const rackNight = {"src":"/images/content/projects/home-server-3d/rack-night.webp","width":1000,"height":1000};

export const homeServer3d: Project = {
  slug: "home-server-3d",
  name: "Home Server 3D",
  status: "live",
  label: "Open source",
  order: 1,

  tagline: "A 3D server room for my AWS Lightsail server. The rack LEDs show each container's real status.",
  summary:
    "My AWS Lightsail server as a small 3D room. The LEDs on the rack light up from the server's real status.",
  cardStack: ["Blender", "three.js", "Cloudflare"],
  facts: [
    { label: "Type", value: "3D web page · Blender scene + three.js" },
    { label: "Period", value: "Oct 2026" },
    { label: "Data", value: "Server metrics from Grafana Cloud, every minute" },
    { label: "Runs on", value: "Cloudflare Pages · Pages Functions" },
  ],

  links: {
    live: { href: "https://server.portfolio-hub.dev", label: "Open the server room" },
    github: "https://github.com/ottuck/home-server-3d",
  },

  cover: {
    main: { src: cover, alt: "The 3D server room on a desktop screen: an isometric room with a black server rack and a side panel listing six services with status lights" },
    inset: { src: mobile, alt: "The same page on a phone at night, with the room above and the service list below", frame: "phone" },
    tint: ["#ece9e2", "#d3cdbf"],
  },

  about: [
    "Home Server 3D shows my AWS Lightsail server as a small 3D server room. One rack unit is one service and one LED is one container.",
    "The scene is made with Blender and shown with three.js. A small status API reads only the status from Grafana Cloud, so no token reaches the browser.",
  ],
  features: [
    {
      title: "LEDs from real status",
      body: "Each LED is a container, colored from live metrics. The panel on the right shows CPU, memory and disk, and the status of each service. Selecting a service moves the camera to the rack.",
    },
    {
      title: "Monitors that show real data",
      body: "The wall monitor draws the last hour of CPU, memory, network and disk every minute. The desk monitor lists recent commits like a terminal, and each one links to GitHub.",
    },
    {
      title: "Day and night",
      body: "The room follows the visitor's local time, daytime from 6:00 to 18:00, and a sun and moon switch changes it by hand.",
    },
    {
      title: "Camera",
      body: "Drag to rotate and scroll to zoom. The keyboard works too: arrow keys or WASD to move, Q and E to rotate, plus and minus to zoom.",
    },
    {
      title: "Safe to make public",
      body: "The API reduces every container to normal, warning or error and caches the result for a minute. Visitors never reach Grafana Cloud, and the real server and container names stay out of the browser.",
    },
  ],
  gallery: [
    { src: night, alt: "The same room at night, with a warm lamp and the rack LEDs lit" },
    { src: rackNight, alt: "A close-up of the rack at night, glowing green and white" },
  ],
  stack: [
    { area: "3D", items: "Blender 5.2 · Python scene script · Cycles · glTF (GLB) with Draco" },
    { area: "Web", items: "three.js 0.170 · HTML · CSS · JavaScript (ES modules, no build tool)" },
    { area: "API", items: "Cloudflare Pages Functions · Cache API · GitHub REST API" },
    { area: "Monitoring", items: "Grafana Cloud (Prometheus, PromQL) · Grafana Alloy · cAdvisor" },
    { area: "Deploy", items: "Cloudflare Pages · deploys on git push" },
  ],
  footnote: "The live page shows my real server. Add ?demo=1 to the address to see sample data. The screenshots use sample data, and the other images are renders from the Blender scene.",

  architecture: {
    width: 1140,
    height: 400,
    summary:
      "A visitor opens the 3D page on Cloudflare Pages, and a status API reads the Lightsail server's metrics from Grafana Cloud and returns a public summary. The scene is built in Blender on my PC and deployed with git push.",
    groups: [{ title: "Cloudflare Pages", x: 310, y: 50, w: 230, h: 320 }],
    nodes: [
      { id: "visitor", x: 100, y: 150, title: "Visitor", note: "Browser", tone: "accent" },
      { id: "web", x: 425, y: 150, title: "3D web viewer", note: "three.js · GLB" },
      { id: "api", x: 425, y: 300, title: "Status API", note: "Pages Functions" },
      { id: "grafana", x: 750, y: 300, title: "Grafana Cloud", note: "Prometheus", tone: "outside" },
      { id: "server", x: 1035, y: 300, title: "AWS Lightsail", note: "13 containers · Alloy" },
      { id: "dev", x: 100, y: 300, title: "My PC", note: "Blender · Git", tone: "accent" },
    ],
    edges: [
      { from: "visitor", to: "web", offset: -12 },
      { from: "web", to: "api", label: "Status" },
      { from: "api", to: "grafana", label: "PromQL", both: true },
      { from: "server", to: "grafana", label: "Metrics" },
      { from: "dev", to: "web", label: "git push", dashed: true, route: "hvh", bend: 245, toOffset: 14, labelAt: 1 },
    ],
  },

  translations: { ja, ko },
};
