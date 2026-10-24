import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "UR Checkに統合済み",
  tagline: "ClaudeやChatGPTでUR賃貸の空室を探せたMCPアプリ。現在はUR Checkに統合されています。",
  summary:
    "ClaudeやChatGPTでUR賃貸の空室を探せたMCPサーバー兼アプリです。2026年10月にUR Checkへ統合し、単独での運用を終了しました。",
  facts: [
    { label: "種類", value: "MCPサーバー + MCP App · Claude・ChatGPT向けツール3種" },
    { label: "期間", value: "2026年10月" },
    { label: "運用環境", value: "Railway（シンガポール・停止済み）· ボリューム上のSQLite" },
  ],
  about: [
    "2026年10月、UR ManagerとともにUR Checkへ統合しました。",
  ],
  features: [
    {
      title: "会話で検索",
      body: "ClaudeやChatGPTで空室を検索し、結果をカードで表示していました。",
    },
    {
      title: "変化の確認",
      body: "保存した条件に合う部屋の新着・再募集・募集終了を確認できました。",
    },
  ],
  stack: [
    { area: "サーバー", items: "Node.js 24 · TypeScript 7 · Hono · MCP TypeScript SDK · MCP Apps · Zod" },
    { area: "データ", items: "URのWebサイトAPI · RailwayボリュームのSQLite（node:sqlite）" },
    { area: "クライアント", items: "Claude Code · claude.ai（Web・iOS）· ChatGPT" },
    { area: "インフラ", items: "Railway（シンガポール）· レプリカ1台 · railway.ts" },
    { area: "品質", items: "記録したUR応答を使ったVitest · 実環境スモークテスト · Biome · GitHub Actions" },
  ],
  footnote:
    "UR都市機構とは関係ありません。空室状況は必ずURの公式サイトでご確認ください。カードの画面は例のデータです。",
  alts: {
    main: "会話の中に表示された変化の報告カード。新着・募集終了の件数と、今申し込める2部屋",
    inset: "スマホで見た同じカード",
    gallery: [],
  },
};
