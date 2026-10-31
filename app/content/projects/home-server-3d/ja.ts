import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "オープンソース",
  liveLabel: "サーバー室を見る",
  tagline: "AWS Lightsailのサーバーを小さな3Dのサーバー室にしたWeb。ラックのLEDがコンテナの実際の状態を示します。",
  summary:
    "私のAWS Lightsailサーバーを小さな3Dの部屋で見せます。ラックのLED 1つがコンテナ1つで、実際の状態に合わせて光ります。",
  facts: [
    { label: "種類", value: "3D Webページ · Blenderのシーン + three.js" },
    { label: "期間", value: "2026年10月" },
    { label: "データ", value: "Grafana Cloudのサーバー指標、1分ごと" },
    { label: "運用環境", value: "Cloudflare Pages · Pages Functions" },
  ],
  about: [
    "Home Server 3Dは、私のAWS Lightsailサーバーを小さな3Dのサーバー室として見せます。ラックの機器1台が1サービス、LED 1つが1コンテナで、正常は緑、注意はオレンジ、エラーは赤、データなしはグレーです。",
    "シーンはBlenderで作り、three.jsで表示します。小さなステータスAPIがGrafana Cloudから状態だけを読むので、トークンがブラウザに出ることはありません。",
  ],
  features: [
    {
      title: "実際の状態で光るLED",
      body: "LED 1つがコンテナ1つで、色はリアルタイムの指標で決まります。右のパネルでCPU・メモリ・ディスクの使用率とサービスごとの状態を見られ、サービスを選ぶとカメラがラックに寄ります。",
    },
    {
      title: "実データが出るモニター",
      body: "壁のモニターは直近1時間のCPU・メモリ・ネットワーク・ディスクを1分ごとに描きます。机のモニターは最近のコミットをターミナルのように表示し、各コミットはGitHubにつながります。",
    },
    {
      title: "昼と夜",
      body: "見る人の現地時刻に合わせて、午前6時から午後6時までは昼になります。太陽と月のスイッチで手動でも切り替えられます。",
    },
    {
      title: "カメラ",
      body: "ドラッグで回し、スクロールで拡大します。キーボードでは矢印キーかWASDで移動し、Q・Eで回し、+・-で拡大します。",
    },
    {
      title: "公開しても安全に",
      body: "APIがコンテナを正常・注意・エラーだけに絞り、1分間キャッシュします。訪問者がGrafana Cloudに直接触れることはなく、実際のサーバー名やコンテナ名もブラウザに出ません。",
    },
  ],
  stack: [
    { area: "3D", items: "Blender 5.2 · Pythonのシーンスクリプト · Cycles · glTF（GLB）+ Draco" },
    { area: "Web", items: "three.js 0.170 · HTML · CSS · JavaScript（ESモジュール、ビルドツールなし）" },
    { area: "API", items: "Cloudflare Pages Functions · Cache API · GitHub REST API" },
    { area: "モニタリング", items: "Grafana Cloud（Prometheus、PromQL）· Grafana Alloy · cAdvisor" },
    { area: "デプロイ", items: "Cloudflare Pages · git pushでデプロイ" },
  ],
  footnote: "ライブのページは私の実際のサーバーを表示します。アドレスの後ろに?demo=1を付けると、例のデータで見られます。スクリーンショットは例のデータで、そのほかの画像はBlenderのシーンをレンダリングしたものです。",
  alts: {
    main: "デスクトップ画面の3Dサーバー室。黒いサーバーラックのあるアイソメトリックの部屋と、6つのサービスの状態ランプが並ぶ右のパネル",
    inset: "同じページをスマホで見た様子。上に部屋、下にサービス一覧",
    gallery: [
      "同じ部屋の夜の様子。暖かい照明と光るラックのLED",
      "夜のラックのアップ。緑と白に光っている",
    ],
  },
};
