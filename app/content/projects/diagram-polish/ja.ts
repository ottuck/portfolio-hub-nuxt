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
    "diagram-polishは、アーキテクチャ図を描き直すClaude Codeのスキルです。READMEのMermaidブロックや大まかな説明、あるいはリポジトリだけを渡すと、きれいなSVGとPNGを返します。",
    "動きは4段階です。Claudeが元の情報を読んでコードと照らし合わせ、システムを5〜7個の箱に絞って、箱と矢印を小さなdiagram.jsonに書きます。スクリプトが配置と線の経路を計算して絵を描きます。そのあとClaudeが結果を見て、矢印の向きが逆といった、検査では見つからない部分を直します。",
    "このサイトの構成図もこの方法で作りました。オープンソースで、プラグインとして入れるか、スキルのフォルダを~/.claude/skillsにコピーして使えます。",
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
      title: "テーマ3つ、ライトとダーク",
      body: "sage、blue、monoの3つで、それぞれダーク版があります。1つのSVGで、読む人のライト／ダーク設定に合わせることもできます。",
    },
    {
      title: "ハングルと日本語の文字",
      body: "箱の幅をハングル・かな・漢字の幅で計算し、PNGではそれらの文字にシステムのゴシック体を選びます。",
    },
  ],
  stack: [
    { area: "スキル", items: "Claude Codeのスキル（SKILL.md）に、箱の絞り方と置き方のルールを書いています · プラグインの定義ファイルがあり、claude plugin installで入れられます" },
    { area: "スクリプト", items: "Node.js · SVGは依存なしの1ファイル · 文字幅の見積もりで箱の大きさを決め、直角の線の経路を計算します" },
    { area: "絵", items: "JavaScriptで手書きしたSVG · Geist · 3つのテーマのライト／ダークのパレット · prefers-color-schemeに従うautoのSVG" },
    { area: "PNG", items: "@resvg/resvg-js · ハングルやかなにはシステムのゴシック体を選びます" },
    { area: "検査", items: "間違いで止まり、はみ出し・重なり・箱を貫く線・ぶつかるラベルを警告する検査 · 1つのコマンドで例をすべて描き直して検査します" },
  ],
  footnote: "スキルにはClaude Codeが必要で、スクリプトだけならNode.jsがあれば動きます。見比べ画像の「before」はMermaidの標準テーマです。",
  alts: {
    main: "Mermaidの標準テーマで描いたデータパイプラインと、diagram-polishで描き直した同じパイプライン",
    gallery: [
      "メッセージ12個のMermaidシーケンス図と、同じシステムを7つの箱と矢印で描いた図",
      "同じパイプラインをsage、blue、monoのテーマで描いた図と、sageテーマのダークモード",
      "韓国語のラベルの構成図。AIクライアントが賃貸サイトを検索するMCPサーバーを呼び、履歴をSQLiteに保存する",
    ],
  },
};
