import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const cover = {"src":"/images/content/projects/diagram-polish/cover.webp","width":1280,"height":800};
const sequence = {"src":"/images/content/projects/diagram-polish/sequence.webp","width":1280,"height":800};
const themes = {"src":"/images/content/projects/diagram-polish/themes.webp","width":1280,"height":800};
const korean = {"src":"/images/content/projects/diagram-polish/korean.webp","width":1280,"height":800};

export const diagramPolish: Project = {
  slug: "diagram-polish",
  name: "diagram-polish",
  status: "live",
  label: "Open source",
  order: 9,

  tagline: "A Claude Code skill that redraws a Mermaid block or an architecture sketch as a clean diagram. Boxes and arrows in JSON, SVG and PNG out.",
  summary:
    "A Claude Code skill that turns the Mermaid block in a README, or a rough description of a system, into a clean architecture diagram. It boils the system down to five to seven boxes and draws them in one consistent look.",
  cardStack: ["Claude Code", "Node.js", "SVG"],
  facts: [
    { label: "Type", value: "Claude Code skill + Node.js script" },
    { label: "Period", value: "Oct 2026" },
    { label: "Runs on", value: "Your machine · Node.js 18+" },
  ],

  links: {
    github: "https://github.com/ottuck/diagram-polish",
  },

  cover: {
    main: { src: cover, alt: "A data pipeline drawn by Mermaid's default theme, and the same pipeline redrawn by diagram-polish" },
    tint: ["#e3eee6", "#b5d0bd"],
  },

  about: [
    "diagram-polish is a Claude Code skill that redraws architecture diagrams. Give it the Mermaid block from a README, a rough sketch or description, or just the repository, and it returns a clean SVG and PNG.",
    "It works in four steps. Claude reads the source and checks it against the code, reduces the system to five to seven boxes, and writes the boxes and arrows into a small diagram.json. A script then lays them out, routes the lines and draws the picture. Claude looks at the result and fixes what the checks can't see, such as an arrow pointing the wrong way.",
    "The architecture diagrams on this site were made this way. There are three themes, sage, blue and mono, each in light and dark. The skill is open source: install it as a plugin, or copy the skill folder into ~/.claude/skills.",
  ],
  features: [
    {
      title: "Mermaid in, a clean diagram out",
      body: "Reads a Mermaid block, a README or the code and redraws it in one look: soft boxes, a frame around what runs together, another tone for services you don't run, dashed lines for scheduled work.",
    },
    {
      title: "Five to seven boxes",
      body: "Pieces of one codebase are merged, duplicate arrows are joined and labels shrink to a word or two. The code is checked first, so nothing is drawn that doesn't exist.",
    },
    {
      title: "Checks its own drawing",
      body: "The script stops on mistakes and warns about cut-off boxes, overlaps, lines through boxes and colliding labels. Claude looks at the picture before handing it over.",
    },
    {
      title: "Korean and Japanese text",
      body: "Box widths are measured for Hangul, kana and Han characters, and the PNG picks a system sans font for them.",
    },
  ],
  gallery: [
    { src: sequence, alt: "A Mermaid sequence diagram with twelve messages, next to the same system drawn as seven boxes and arrows" },
    { src: themes, alt: "The same pipeline in the sage, blue and mono themes, and the sage theme in dark mode" },
    { src: korean, alt: "A diagram with Korean labels: an AI client calls an MCP server that searches a rental site and keeps its history in SQLite" },
  ],
  stack: [
    { area: "Skill", items: "A Claude Code skill (SKILL.md) with the rules for reducing and placing boxes · plugin manifests, so claude plugin install works" },
    { area: "Script", items: "Node.js · one file with no dependencies for SVG · box sizes from estimated text width, right-angle line routing" },
    { area: "Picture", items: "SVG written by hand in JavaScript · Geist · light and dark palettes for three themes · an auto SVG that follows prefers-color-scheme" },
    { area: "PNG", items: "@resvg/resvg-js · a system sans font is picked for Hangul and kana" },
    { area: "Checks", items: "A validator that stops on errors and warns about cut-off boxes, overlaps, lines through boxes and colliding labels · one command redraws and checks every example" },
  ],
  footnote: "The skill needs Claude Code; the script alone needs only Node.js. The \"before\" pictures are Mermaid's default theme.",

  architecture: {
    width: 1080,
    height: 410,
    summary:
      "Claude reads the Mermaid and checks it against the project's code, writes the boxes and arrows into diagram.json, and render.mjs lays them out and draws the SVG and PNG. Claude then looks at the picture and fixes what the checks can't see.",
    nodes: [
      { id: "source", x: 110, y: 110, title: "Mermaid · README", note: "Or a description", tone: "accent" },
      { id: "skill", x: 390, y: 110, title: "Claude + SKILL.md", note: "Rules: 5–7 boxes" },
      { id: "json", x: 670, y: 110, title: "diagram.json", note: "Boxes · arrows · tones" },
      { id: "render", x: 950, y: 110, title: "render.mjs", note: "Layout · routes · checks" },
      { id: "code", x: 390, y: 310, title: "Project code", note: "Read, never changed", tone: "outside" },
      { id: "out", x: 950, y: 310, title: "SVG · PNG", note: "3 themes · light & dark" },
    ],
    edges: [
      { from: "source", to: "skill", label: "Read" },
      { from: "skill", to: "json", label: "Write", offset: -14 },
      { from: "json", to: "render", label: "Draw" },
      { from: "code", to: "skill", label: "Verify", dashed: true },
      { from: "render", to: "out" },
      { from: "out", to: "skill", label: "Look and fix", dashed: true, route: "hvh", bend: 530, toOffset: 16, labelAt: 0 },
    ],
  },
  translations: { ja, ko },
};
