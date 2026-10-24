import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "リメイク",
  liveLabel: "ポケモンを捕まえに行く",
  tagline: "「このポケモン、だーれだ？」をゲームボーイ風のバトルで。初代ポケモン図鑑とシール帳に、Unityで作ったピカチュウのターン制バトルまで。日本語・英語・韓国語に対応しています。",
  summary:
    "ゲームボーイのバトル画面を再現したシルエットクイズです。ポケモンの名前を当てるとモンスターボールを投げ、シール帳に追加されます。初代151匹の図鑑も備えています。クイズでピカチュウを手に入れると、別に作ったUnityプロジェクトをページ内で開き、カメックスとターン制バトルができます。",
  facts: [
    { label: "種類", value: "Webアプリ + Unity WebGLバトル · 日本語 / 英語 / 韓国語" },
    { label: "期間", value: "2026年9〜10月（リメイク、10月にバトル追加）" },
    { label: "運用環境", value: "Vercel + Supabase（東京）· Cloudflare Pages" },
  ],
  about: [
    "シルエットが表示されたら3言語のいずれかで名前を答え、正解するとトレーナーがモンスターボールを投げます。3回間違えるとゲームオーバーです。登録不要のゲストとして遊べ、後からGoogleアカウントを連携してもシールとスコアは引き継がれます。",
    "クイズでピカチュウを手に入れると、そのピカチュウでカメックスとターン制バトルができます。バトルは別リポジトリ（pokepedia-unity）のUnityプロジェクトで、WebGLでビルドしてPokepediaからiframeで開きます。battle.pokepedia.devで単独でも遊べます。",
  ],
  features: [
    {
      title: "シルエットクイズ",
      body: "「たたかう」で回答、「ヒント」で名前の半分を表示、「スキップ」と「にげる」も選べます。矢印キーとZキーにも対応。ピカチュウ、Pikachu、피카츄のどれでも正解になります。",
    },
    { title: "シール帳とランキング", body: "色違いを含む151枠のシール帳と、全プレイヤーのベスト記録ランキング。" },
    {
      title: "クイズからバトルへ",
      body: "ピカチュウのシールがなければ、最初の問題はピカチュウです。獲得画面とシール帳のピカチュウからすぐにバトルを開けます。",
    },
    {
      title: "Unityのターン制バトル",
      body: "たいあたり・10まんボルト・かみなりから選んでカメックスと戦います。すばやさで行動順を決め、タイプ相性・命中率・急所でダメージを計算します。雨と霧のドット絵の背景に2Dライトを重ね、効果音は自分で合成しました。",
    },
  ],
  stack: [
    { area: "Web · アプリ", items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript" },
    { area: "Web · UI", items: "Tailwind CSS v4 · Motion · Zustand · next-intl" },
    { area: "Web · データ", items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron" },
    { area: "Web · テスト", items: "Vitest · Playwright" },
    { area: "Web · ホスティング", items: "Vercel（東京）· Supabase（東京）· Analytics · Speed Insights" },
    { area: "バトル · エンジン", items: "Unity 6.3 LTS · C# 9 · uGUI · TextMesh Pro" },
    { area: "バトル · グラフィック", items: "URP 2D — Light2D、ポストプロセス · 自作シェーダー · HTML/CSSのスタート・VS画面" },
    { area: "バトル · テスト", items: "NUnit · dotnet test · GitHub Actions" },
    { area: "バトル · ホスティング", items: "WebGL（Brotli事前圧縮）· Cloudflare Pages · iframe + postMessage" },
  ],
  footnote:
    "ポケモンおよび関連する名称・アートワークの権利は任天堂、株式会社ポケモン、クリーチャーズ、ゲームフリークに帰属します。非公式・非営利のファンプロジェクトです。",
  alts: {
    main: "ゲームボーイ風のバトル画面。ポケモンのシルエット、トレーナーの後ろ姿、コマンド欄",
    inset: "スマホで見た図鑑",
    gallery: [
      "トップページになったゲームのタイトル画面",
      "正解して手に入れた色違いシール",
      "ホログラムカードで表示したリザードンの詳細",
      "シール帳",
      "Unityで作ったバトル。雨の野原でカメックスと向き合うピカチュウ",
    ],
  },
};
