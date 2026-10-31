import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "オープンソース",
  liveLabel: "サーバー室を見る",
  tagline: "AWS Lightsailのサーバーを小さな3Dのサーバー室にしたWeb。ラックのLEDがコンテナの実際の状態に合わせて光ります。",
  summary:
    "AWS Lightsailのサーバー1台をミニチュアの3Dの部屋として見せるWebページです。ラックのLED 1つがコンテナ1つで、色はGrafana Cloudから1分ごとに読む実際の状態に従います。",
  facts: [
    { label: "種類", value: "3D Webページ · Blenderのシーン + three.js" },
    { label: "期間", value: "2026年10月" },
    { label: "データ", value: "Grafana Cloudのサーバー指標、1分ごと" },
    { label: "運用環境", value: "Cloudflare Pages · Pages Functions" },
  ],
  about: [
    "Home Server 3Dは、私のAWS Lightsailサーバーを小さな3Dのサーバー室として見せます。ラックに載った機器1台が1つのサービスで、機器のLED 1つが1つのコンテナです。正常は緑、注意はオレンジ、エラーは赤、データがなければグレーです。データがないのに緑にすることはありません。",
    "壁のモニターには直近1時間のCPU・メモリ・ネットワーク・ディスクが、机のモニターには私の公開GitHubリポジトリの最近のコミットがgit logのように表示されます。昼と夜は見る人の時刻に合わせて変わり、部屋の中にはクリックできる物もあります。",
    "シーンはBlenderのPythonスクリプトで作ってGLBファイルに書き出し、Webではthree.jsで表示します。小さなステータスAPIがGrafana Cloudからサーバーの指標を読み、コンテナごとに正常・注意・エラーだけを返すので、アクセストークンがブラウザに出ることはありません。",
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
  footnote: "ライブのページは私の実際のサーバーを表示します。アドレスの後ろに?demo=1を付けると、例のデータで見られます。画像はBlenderのシーンをレンダリングしたものです。",
  alts: {
    main: "机、本棚、観葉植物、ひじ掛け椅子のあるアイソメトリックの部屋と、壁のモニターの横でLEDが光る黒いサーバーラック",
    gallery: [
      "同じ部屋の夜の様子。暖かい照明と光るラックのLED",
      "昼のラックのアップ。スイッチ、ドライブベイとLEDのあるサーバー数台、いちばん下にUPS",
      "同じラックの夜の様子。緑と白に光っている",
    ],
  },
};
