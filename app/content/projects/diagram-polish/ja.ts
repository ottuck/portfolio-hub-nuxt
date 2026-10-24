import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "オープンソース",
  tagline: "Mermaidブロックや構成のスケッチを、すっきりした構成図に描き直すClaude Codeのスキルです。箱と矢印をJSONに書くと、SVGとPNGが出ます。",
  summary:
    "READMEのMermaidブロックやシステムの説明を、すっきりしたアーキテクチャ図に変えるClaude Codeのスキルです。システムを5〜7個の箱に絞り、同じ見た目で描きます。",
  facts: [
    { label: "種類", value: "Claude Codeスキル + Node.jsスクリプト" },
    { label: "期間", value: "2026年10月" },
    { label: "運用環境", value: "自分のPC · Node.js 18以上" },
  ],
  about: [
    "diagram-polishは、アーキテクチャ図を描き直すClaude Codeのスキルです。READMEのMermaidブロックや大まかなスケッチ・説明、あるいはリポジトリだけを渡すと、きれいなSVGとPNGを返します。",
    "動きは4段階です。Claudeが元の情報を読んでコードと照らし合わせ、システムを5〜7個の箱に絞って、箱と矢印を小さなdiagram.jsonに書きます。スクリプトが配置と線の経路を計算して絵を描きます。そのあとClaudeが結果を見て、矢印の向きが逆といった、検査では見つからない部分を直します。",
    "このサイトの構成図もこの方法で作りました。テーマはsage、blue、monoの3つで、それぞれライトとダークがあります。オープンソースで、プラグインとして入れるか、スキルのフォルダを~/.claude/skillsにコピーして使えます。",
  ],
  features: [
    {
      title: "Mermaidをすっきりした構成図に",
      body: "Mermaidブロック、README、コードを読み、ひとつの見た目で描き直します。角丸の箱、まとまって動くものを囲む点線の枠、自分で運用しないサービスの別の色、予約実行を表す点線が基本です。",
    },
    {
      title: "箱は5〜7個",
      body: "1つのコードベースの部品は合わせ、重複した矢印は1本にし、ラベルは1〜2語に縮めます。先にコードを確認するので、存在しないものは描きません。",
    },
    {
      title: "自分の絵を検査",
      body: "スクリプトは間違いがあれば止まり、はみ出した箱・重なり・箱を貫く線・ぶつかるラベルを警告します。Claudeは絵を実際に開いて確かめてから渡します。",
    },
    {
      title: "ハングルと日本語の文字",
      body: "箱の幅をハングル・かな・漢字の幅で計算し、PNGではそれらの文字にシステムのゴシック体を選びます。",
    },
  ],
  stack: [
    { area: "スキル", items: "Claude Codeスキル（SKILL.md）· プラグインマニフェスト（claude plugin install）" },
    { area: "スクリプト", items: "Node.js · 依存なしのSVGレンダラー · 文字幅の推定 · 直角の線の経路" },
    { area: "絵", items: "SVG · Geist · ライト／ダークのパレット · auto SVG（prefers-color-scheme）" },
    { area: "PNG", items: "@resvg/resvg-js · ハングル・かな用のシステムゴシック体" },
    { area: "検査", items: "はみ出し・重なり・箱を貫く線・ラベルの衝突の検査 · 1コマンドで例を全部描き直して検査" },
  ],
  footnote: "スキルにはClaude Codeが必要で、スクリプトだけならNode.jsがあれば動きます。見比べ画像の「before」はMermaidの標準テーマです。",
  alts: {
    main: "Mermaidの標準テーマで描いたデータパイプラインと、diagram-polishで描き直した同じパイプライン",
    gallery: [
      "メッセージ12個のMermaidシーケンス図と、同じシステムを7つの箱と矢印で描いた図",
      "同じパイプラインをsage、blue、monoのテーマで描いた図と、sageテーマのダークモード",
    ],
  },
};
