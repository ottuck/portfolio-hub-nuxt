import type { Diagram, DiagramEdge, DiagramNode } from "./types";

// Font sizes in diagram units; the component uses the same ones.
export const DIAGRAM_TEXT = { title: 15, note: 12, label: 12 } as const;

// Hangul, CJK and full-width forms take a full em.
const wide = (c: string) => {
  const n = c.codePointAt(0)!;
  return (n >= 0x1100 && n <= 0x11ff) || (n >= 0x3000 && n <= 0x9fff) || (n >= 0xac00 && n <= 0xd7af) || (n >= 0xff00 && n <= 0xffef);
};
const narrow = /[\s·.,:;'()/|\-→+&]/;

/** A rough width for Geist text, so boxes and labels fit their words in any language. */
function textWidth(text: string, size: number) {
  let em = 0;
  for (const c of text) em += wide(c) ? 1 : narrow.test(c) ? 0.32 : /[A-Z0-9]/.test(c) ? 0.64 : 0.55;
  return em * size;
}

export type DiagramBox = DiagramNode & { w: number; h: number; x0: number; y0: number };
type Point = [number, number];

function box(n: DiagramNode): DiagramBox {
  const text = Math.max(textWidth(n.title, DIAGRAM_TEXT.title) * 1.05, n.note ? textWidth(n.note, DIAGRAM_TEXT.note) : 0);
  const w = Math.max(120, Math.ceil(text) + 40);
  const h = n.note ? 68 : 52;
  return { ...n, w, h, x0: n.x - w / 2, y0: n.y - h / 2 };
}

const overlaps = (a0: number, a1: number, b0: number, b1: number) => a0 < b1 && b0 < a1;

function points(e: DiagramEdge, a: DiagramBox, b: DiagramBox): Point[] {
  const route =
    e.route ??
    (overlaps(a.y0, a.y0 + a.h, b.y0, b.y0 + b.h) ? "h" : overlaps(a.x0, a.x0 + a.w, b.x0, b.x0 + b.w) ? "v" : "hvh");
  const dx = Math.sign(b.x - a.x) || 1;
  const dy = Math.sign(b.y - a.y) || 1;
  const from = e.fromOffset ?? 0;
  const to = e.toOffset ?? 0;
  switch (route) {
    case "h": {
      const y = (a.y + b.y) / 2 + (e.offset ?? 0);
      return [[a.x + (dx * a.w) / 2, y], [b.x - (dx * b.w) / 2, y]];
    }
    case "v": {
      const x = (a.x + b.x) / 2 + (e.offset ?? 0);
      return [[x, a.y + (dy * a.h) / 2], [x, b.y - (dy * b.h) / 2]];
    }
    case "hvh": {
      // Leave and arrive on the side that faces the bend, so a bend outside both boxes loops around them.
      const m0 = e.bend ?? (a.x + b.x) / 2;
      const x1 = a.x + (Math.sign(m0 - a.x) || dx) * (a.w / 2);
      const x2 = b.x + (Math.sign(m0 - b.x) || -dx) * (b.w / 2);
      const m = e.bend ?? (x1 + x2) / 2;
      return [[x1, a.y + from], [m, a.y + from], [m, b.y + to], [x2, b.y + to]];
    }
    case "vhv": {
      const m0 = e.bend ?? (a.y + b.y) / 2;
      const y1 = a.y + (Math.sign(m0 - a.y) || dy) * (a.h / 2);
      const y2 = b.y + (Math.sign(m0 - b.y) || -dy) * (b.h / 2);
      const m = e.bend ?? (y1 + y2) / 2;
      return [[a.x + from, y1], [a.x + from, m], [b.x + to, m], [b.x + to, y2]];
    }
    case "hv": {
      const y = a.y + from;
      const x = b.x + to;
      const down = Math.sign(b.y - y) || 1;
      return [[a.x + (dx * a.w) / 2, y], [x, y], [x, b.y - (down * b.h) / 2]];
    }
    case "vh": {
      const x = a.x + from;
      const y = b.y + to;
      const right = Math.sign(b.x - x) || 1;
      return [[x, a.y + (dy * a.h) / 2], [x, y], [b.x - (right * b.w) / 2, y]];
    }
  }
}

const round = (n: number) => Math.round(n * 10) / 10;

// Straight runs joined by small rounded corners.
function path(p: Point[]) {
  let d = `M${round(p[0]![0])} ${round(p[0]![1])}`;
  for (let i = 1; i < p.length - 1; i++) {
    const [px, py] = p[i - 1]!;
    const [x, y] = p[i]!;
    const [nx, ny] = p[i + 1]!;
    const r = Math.min(12, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
    d += ` L${round(x - Math.sign(x - px) * r)} ${round(y - Math.sign(y - py) * r)} Q${round(x)} ${round(y)} ${round(x + Math.sign(nx - x) * r)} ${round(y + Math.sign(ny - y) * r)}`;
  }
  const [lx, ly] = p[p.length - 1]!;
  return `${d} L${round(lx)} ${round(ly)}`;
}

export function layoutDiagram(d: Diagram) {
  const boxes = new Map(d.nodes.map((n) => [n.id, box(n)]));
  const edges = d.edges.map((e) => {
    const p = points(e, boxes.get(e.from)!, boxes.get(e.to)!);
    const segments = p.slice(1).map((q, i): [Point, Point] => [p[i]!, q]);
    const length = ([a, b]: [Point, Point]) => Math.hypot(b[0] - a[0], b[1] - a[1]);
    const at = e.labelAt ?? segments.reduce((best, s, i) => (length(s) > length(segments[best]!) ? i : best), 0);
    const [a, b] = segments[at]!;
    const label = e.label && {
      text: e.label,
      x: round((a[0] + b[0]) / 2),
      y: round((a[1] + b[1]) / 2),
      w: Math.ceil(textWidth(e.label, DIAGRAM_TEXT.label)) + 22,
    };
    return { d: path(p), dashed: Boolean(e.dashed), both: Boolean(e.both), label: label || undefined };
  });
  return { boxes: [...boxes.values()], edges };
}
