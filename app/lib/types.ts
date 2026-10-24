export type ImageAsset = { src: string; width: number; height: number };

export type ProjectStatus = "live" | "testing" | "in-progress" | "planned" | "archived";

export type Shot = {
  src: ImageAsset;
  alt: string;
  /** "phone" renders the shot narrow, like a mobile screen. */
  frame?: "screen" | "phone";
};

/** A box in an architecture diagram. x and y are its center, in diagram units. */
export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  title: string;
  note?: string;
  /** "accent" for people and triggers, "outside" for services the project doesn't run. */
  tone?: "main" | "accent" | "outside";
};

/**
 * An arrow between two boxes. route picks the shape: "h" and "v" are straight, "hvh" and
 * "vhv" bend twice at `bend`, "hv" and "vh" bend once. Offsets slide an end along its box side.
 * Without a route, a straight line is used when the boxes share a row or a column.
 */
export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  /** Arrowheads on both ends. */
  both?: boolean;
  route?: "h" | "v" | "hvh" | "vhv" | "hv" | "vh";
  offset?: number;
  fromOffset?: number;
  toOffset?: number;
  bend?: number;
  /** The segment that carries the label (0 is the first); the longest one by default. */
  labelAt?: number;
};

export type Diagram = {
  width: number;
  height: number;
  /** One or two sentences shown under the diagram, also read as its description. */
  summary: string;
  /** Dashed frames around boxes that run in one place, e.g. "One server". */
  groups?: { title: string; x: number; y: number; w: number; h: number }[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  /** Short honest note next to the status, e.g. "I use it" or "For fun". */
  label: string;
  /** Emphasize the label with the accent color. */
  highlightLabel?: boolean;
  /** Position in the lists and in the previous/next links; lower comes first. The status doesn't affect it. */
  order: number;
  /**
   * Slug of the project this one was folded into. It keeps its own page, but it's left out of
   * the project lists and shown under that project instead.
   */
  mergedInto?: string;
  /**
   * A draft page: it is built at its URL, but left out of the project lists, the sitemap and the
   * previous/next links, and marked noindex.
   */
  unlisted?: boolean;

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
    /** More repositories, shown after the GitHub button as "GitHub · label", e.g. a separate Unity repo. */
    repos?: { href: string; label: string }[];
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
  /** How the parts fit together, drawn on the project page. Its words are English in every language. */
  architecture?: Diagram;
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
