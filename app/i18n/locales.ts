// English lives at the root (/projects); the others under a prefix (/ja/projects).
export const locales = ["en", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
/** Locales served under a path prefix. */
export const prefixedLocales = ["ja", "ko"] as const satisfies readonly Locale[];
export type PrefixedLocale = (typeof prefixedLocales)[number];

export const languageNames: Record<Locale, string> = { en: "English", ja: "日本語", ko: "한국어" };
export const ogLocales: Record<Locale, string> = { en: "en_US", ja: "ja_JP", ko: "ko_KR" };

export function isPrefixedLocale(value: string): value is PrefixedLocale {
  return (prefixedLocales as readonly string[]).includes(value);
}

/** A site path ("/projects") in the given locale ("/ja/projects"). */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The locale-free path of a pathname ("/ja/projects" → "/projects"). */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isPrefixedLocale(first)) return `/${rest.join("/")}`;
  return pathname;
}

export function localeOf(pathname: string): Locale {
  const first = pathname.split("/")[1] ?? "";
  return isPrefixedLocale(first) ? first : defaultLocale;
}

/** hreflang alternates for a locale-free path. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
    "x-default": path,
  };
}
