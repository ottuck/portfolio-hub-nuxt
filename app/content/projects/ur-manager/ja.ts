import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "UR Checkに統合済み",
  tagline: "希望するUR賃貸の条件（エリア・家賃・間取り・駅徒歩）を保存しておくと、条件に合う空室が出たときにメールで通知します。",
  summary:
    "希望するUR賃貸の条件を保存しておくと、条件に合う空室が出たときにメールでお知らせします。公式サイトを何度も確認しに行く必要はありません。",
  facts: [
    { label: "種類", value: "Webサービス（日本語UI）" },
    { label: "期間", value: "2026年9〜10月" },
    { label: "運用環境", value: "Azure Container Apps（停止済み）" },
  ],
  about: [
    "東京のUR賃貸はすぐに埋まりますが、公式サイトには空室通知の機能がありません。毎日手作業で確認していたため、その確認を代わりに行うサービスを開発しました。",
    "会員登録なしでも、検索条件をひとつ保存してすぐに使い始められます。後からGoogleでログインすれば、条件と履歴はそのまま引き継がれます。ClaudeやChatGPTとの対話で探したい場合は、UR MCP Appを利用できます。",
    "2026年10月、UR MCP Appと統合してUR Checkになり、こちらは停止しました。",
  ],
  features: [
    { title: "検索条件の保存", body: "東京・神奈川・千葉・埼玉・茨城を対象に、エリア、家賃、専有面積、間取り、駅徒歩で絞り込めます。" },
    { title: "定期チェック", body: "条件ごとに設定した間隔で、日本時間の8時〜20時に確認します。" },
    { title: "差分だけを通知", body: "通知をオンにした時点で一度まとめを送り、以降は新着と再掲載の部屋だけをお知らせします。" },
    { title: "ゲストから会員へ", body: "Googleでログインすると、条件と履歴をワンステップで移行できます。" },
    { title: "履歴", body: "すべてのチェックと送信したメールを、結果とともに一覧で確認できます。" },
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
