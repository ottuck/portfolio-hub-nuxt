// Site-wide profile and links. Words that change by language live in src/i18n/dictionaries.ts.
export const site = {
  name: "Henry Kim",
  shortName: "Henry",
  timeZone: "Asia/Tokyo",
  stack: ["Java", "Kotlin", "Spring Boot", "PostgreSQL", "Azure", "Terraform", "Next.js", "TypeScript"],
  links: {
    github: "https://github.com/ottuck",
    blog: "https://hukutaku.tistory.com/",
  },
  githubHandle: "ottuck",
  /** Production URL (apex redirects here). */
  url: "https://www.portfolio-hub.dev",
} as const;

export function siteUrl(): URL { return new URL(site.url); }
