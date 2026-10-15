import { projects as source } from "~/content/projects";
import type { Locale } from "~/i18n/locales";
import type { Project, ProjectCopy, ProjectStatus, Shot } from "./types";

export const STATUS_RANK: Record<ProjectStatus, number> = { live: 0, "in-progress": 1, planned: 2, archived: 3 };

// Fail the build on content mistakes instead of shipping a broken page.
function validate(list: Project[]) {
  const slugs = new Set<string>();
  for (const p of list) {
    if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Invalid slug "${p.slug}"`);
    if (slugs.has(p.slug)) throw new Error(`Duplicate slug "${p.slug}"`);
    slugs.add(p.slug);
    for (const [locale, copy] of Object.entries(p.translations)) checkCopy(p, locale, copy);
  }
  for (const p of list) {
    if (p.mergedInto && (p.mergedInto === p.slug || !slugs.has(p.mergedInto))) {
      throw new Error(`"${p.slug}" is merged into "${p.mergedInto}", which doesn't exist`);
    }
  }
  return list;
}

// A translation must cover the same items as the English text.
function checkCopy(p: Project, locale: string, copy: ProjectCopy) {
  const counts: [string, number, number][] = [
    ["facts", p.facts.length, copy.facts.length],
    ["features", p.features.length, copy.features.length],
    ["stack", p.stack.length, copy.stack.length],
    ["gallery alts", p.gallery.length, copy.alts.gallery.length],
  ];
  for (const [what, want, got] of counts) {
    if (want !== got) throw new Error(`"${p.slug}" ${locale}: ${got} ${what}, English has ${want}`);
  }
  if (Boolean(p.cover.main) !== Boolean(copy.alts.main) || Boolean(p.cover.inset) !== Boolean(copy.alts.inset)) {
    throw new Error(`"${p.slug}" ${locale}: cover alts don't match the cover shots`);
  }
  if (Boolean(p.footnote) !== Boolean(copy.footnote)) throw new Error(`"${p.slug}" ${locale}: footnote missing`);
}

const sorted = validate(source).toSorted(
  (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || a.order - b.order,
);

// Merged projects keep their pages but stay out of the lists and the previous/next links.
const listed = sorted.filter((p) => !p.mergedInto);

function withAlt(shot: Shot, alt: string | undefined): Shot {
  return alt ? { ...shot, alt } : shot;
}

function localize(p: Project, locale: Locale): Project {
  if (locale === "en") return p;
  const { alts, liveLabel, guideLabel, ...text } = p.translations[locale];
  return {
    ...p,
    ...text,
    links: {
      ...p.links,
      ...(p.links.live && liveLabel && { live: { ...p.links.live, label: liveLabel } }),
      ...(p.links.guide && guideLabel && { guide: { ...p.links.guide, label: guideLabel } }),
    },
    cover: {
      ...p.cover,
      main: p.cover.main && withAlt(p.cover.main, alts.main),
      inset: p.cover.inset && withAlt(p.cover.inset, alts.inset),
    },
    gallery: p.gallery.map((shot, i) => withAlt(shot, alts.gallery[i])),
  };
}

export function getProjects(locale: Locale): Project[] {
  return listed.map((p) => localize(p, locale));
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  const p = sorted.find((x) => x.slug === slug);
  return p && localize(p, locale);
}

/** The projects that were folded into this one, in list order. */
export function getMerged(slug: string, locale: Locale): Project[] {
  return sorted.filter((p) => p.mergedInto === slug).map((p) => localize(p, locale));
}

export function getSlugs(): string[] {
  return sorted.map((p) => p.slug);
}

export function getAdjacent(slug: string, locale: Locale): { prev?: Project; next?: Project } {
  const i = listed.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  const at = (j: number) => (listed[j] ? localize(listed[j], locale) : undefined);
  return { prev: at(i - 1), next: at(i + 1) };
}
