export type ImageAsset = { src: string; width: number; height: number };

export type ProjectStatus = "live" | "in-progress" | "planned" | "archived";

export type Shot = {
  src: ImageAsset;
  alt: string;
  /** "phone" renders the shot narrow, like a mobile screen. */
  frame?: "screen" | "phone";
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  /** Short honest note next to the status, e.g. "I use it" or "For fun". */
  label: string;
  /** Emphasize the label with the accent color. */
  highlightLabel?: boolean;
  /** Lower comes first. */
  order: number;
  /**
   * Slug of the project this one was folded into. It keeps its own page, but it's left out of
   * the project lists and shown under that project instead.
   */
  mergedInto?: string;

  /** One or two sentences for cards. */
  tagline: string;
  /** Lead paragraph on the project page. */
  summary: string;
  /** Three short tech names for cards. */
  cardStack: string[];
  /** Quick facts row on the project page (keep it to three or four). */
  facts: { label: string; value: string }[];

  /** Omit a link to hide its button everywhere. */
  links: {
    /** label is the link text on cards, e.g. the domain or "Visit". */
    live?: { href: string; label: string };
    github?: string;
    /** A how-to page, e.g. a setup guide. label is the link text. */
    guide?: { href: string; label: string };
  };

  cover: {
    /** Omit for a project without screenshots yet; a drawn placeholder is shown instead. */
    main?: Shot;
    /** Optional second screenshot layered on top of the main one. */
    inset?: Shot;
    /** Background gradient behind the screenshots. */
    tint: [from: string, to: string];
    /** Decoration for the placeholder when there is no screenshot. */
    art?: "candles";
  };

  about: string[];
  features: { title: string; body: string }[];
  gallery: Shot[];
  stack: { area: string; items: string }[];
  footnote?: string;

  /** The same text in the other site languages (see ProjectCopy). */
  translations: Record<"ja" | "ko", ProjectCopy>;
};

/**
 * Everything in a project that is written in words, for one language. Lists line up with
 * the English ones item by item (the build checks the counts), and `alts` follow the
 * cover and gallery shots in order.
 */
export type ProjectCopy = Pick<
  Project,
  "label" | "tagline" | "summary" | "facts" | "about" | "features" | "stack" | "footnote"
> & {
  /** Link text for links.live, when it isn't a domain. */
  liveLabel?: string;
  /** Link text for links.guide. */
  guideLabel?: string;
  alts: { main?: string; inset?: string; gallery: string[] };
};
