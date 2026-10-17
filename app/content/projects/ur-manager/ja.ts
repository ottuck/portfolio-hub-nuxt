import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "UR Checkに統合済み",
  tagline: "UR賃貸の空室検索とメール通知を提供していたWebサービス。現在はUR Checkに統合されています。",
  summary:
    "UR賃貸の空室検索とメール通知を提供していたWebサービスです。2026年10月にUR Checkへ統合し、単独での運用を終了しました。",
  facts: [
    { label: "種類", value: "Webサービス（日本語UI）" },
    { label: "期間", value: "2026年9〜10月" },
    { label: "運用環境", value: "Azure Container Apps（停止済み）" },
  ],
  about: [
    "2026年10月、UR MCP AppとともにUR Checkへ統合しました。",
  ],
  features: [
    {
      title: "検索条件の保存",
      body: "エリア・家賃・間取り・駅徒歩などの条件を保存できました。",
    },
    {
      title: "空室通知",
      body: "定期的に空室を確認し、新着・再募集の部屋をメールで通知していました。",
    },
  ],
  stack: [
    { area: "バックエンド", items: "Java · Spring Boot · Spring MVC · Spring Data JPA · Scheduler" },
    { area: "フロントエンド", items: "React · TypeScript · Vite · TanStack Query · Tailwind CSS" },
    { area: "認証", items: "Spring Security · Entra External ID · Google" },
    { area: "データ", items: "PostgreSQL · Flyway" },
    { area: "インフラ", items: "Azure Container Apps · Container Registry · Key Vault · Terraform · Cloudflare DNS" },
    { area: "CI/CD · 運用", items: "Azure Pipelines · Workload Identity Federation · Application Insights" },
  ],
  footnote: "UR都市機構とは関係ありません。空室状況は必ずURの公式サイトでご確認ください。",
  alts: {
    main: "UR Managerの保存済み検索条件の画面。江東区の条件が1件ある",
    inset: "チャット形式の質問に答えて検索条件を作成する画面",
    gallery: [
      "エリア、家賃、間取り、広さと駅徒歩、確認、名前の順に条件を作成する画面",
      "保存した条件、新たに見つかった部屋と間取り図、最近のチェックが並ぶホーム画面",
    ],
  },
};
