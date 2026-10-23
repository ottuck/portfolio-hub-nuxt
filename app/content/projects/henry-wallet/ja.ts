import type { ProjectCopy } from "~/lib/types";

export const ja: ProjectCopy = {
  label: "個人開発",
  liveLabel: "デモを見る",
  tagline: "自分で鍵を持つiPhone用ステーブルコインウォレット。鍵はスマホの中だけにあり、送金はすべてFace IDを通して端末で署名します。",
  summary:
    "Polygon・Ethereum・AvalancheでUSDCとJPYCを保管・送金します。復元フレーズは端末の安全な保管領域だけに置き、送金のたびにすべてを1画面で見せてからFace IDで承認します。",
  facts: [
    { label: "種類", value: "iPhoneアプリ（Expo）· 韓国語 / 英語" },
    { label: "期間", value: "2026年10月" },
    { label: "ネットワーク", value: "Polygon · Ethereum · Avalanche（まずテストネット）" },
    { label: "運用環境", value: "スマホの中だけ · サーバーなし" },
  ],
  about: [
    "個人用に作ったiPhoneのステーブルコインウォレットです。扱うのはUSDCとJPYCの2つで、国境を越えても数秒・少ない手数料で送れます。",
    "サーバーは置いていません。ウォレットの作成から署名までスマホの中で完結し、外に出るのは署名済みの送金だけです。機能は送金・受け取り・残高確認に絞り、コインの交換やWebサイトとの接続は入れていません。",
    "今はテストネットで使いながら手を入れています。",
  ],
  features: [
    {
      title: "作成・インポート",
      body: "端末で12単語のフレーズを新しく作るか、持っているフレーズを取り込みます。新しいウォレットは、フレーズからランダムな3単語を確認してから使えます。MetaMaskの最初のアカウントと同じ導出パス（m/44'/60'/0'/0/0）を使います。",
    },
    {
      title: "送金ごとにFace ID",
      body: "フレーズはiOSのキーチェーンにこの端末専用で保管し、Face IDを通ったときだけ読み出します。秘密鍵は保存せず、署名のたびに導出します。",
    },
    {
      title: "1画面で確認",
      body: "受取アドレス、金額、ネットワーク、5つの検証、予想・最大手数料を署名前に表示します。EIP-1559のフィールドは開いて確認できます。",
    },
    {
      title: "署名の前に止める",
      body: "チェックサムの合わないアドレス、トークンのコントラクトアドレス、ガス不足はFace IDの前に止めます。初めて送るアドレスには、前後4文字を相手と照らし合わせるよう案内します。",
    },
    {
      title: "残高をひと目で",
      body: "USDCとJPYCの残高に加え、手数料用のPOLであと何回送金できるかを表示します。",
    },
    {
      title: "送金を追う",
      body: "端末での署名、ネットワークへの送信、ブロックへの取り込みを時刻・nonceとともに表示し、実際の手数料を予想の横に並べます。保留・失敗・ドロップした取引は、アプリを開き直しても続けて確認します。",
    },
    {
      title: "受け取りとスキャン",
      body: "アドレスとQRをネットワークの注意書きと一緒に表示します。スキャナーはアドレスだけのQRとEIP-681リンクを読み、別のチェーンの要求は拒否します。",
    },
  ],
  stack: [
    { area: "アプリ", items: "Expo SDK 58 (React Native 0.88) · TypeScript · Expo Router · Zustand" },
    { area: "ウォレット", items: "ethers v6 — BIP-39、鍵の導出、EIP-1559署名 · USDC・JPYC（ERC-20）" },
    { area: "端末", items: "expo-secure-store（キーチェーン・Face ID）· expo-sqlite · expo-camera · expo-screen-capture · react-native-qrcode-svg" },
    { area: "ネットワーク", items: "Polygon · Ethereum · Avalanche C-Chainとテストネット（Amoy、Sepolia、Fuji）· 公開RPC" },
    { area: "テスト", items: "jest-expo — 金額・アドレス・鍵導出のテストベクター · ESLint · Prettier · GitHub Actions" },
    { area: "デモ", items: "react-native-web — 保存・鍵・RPCをメモリ上のスタブに差し替え" },
  ],
  footnote: "実験段階で、セキュリティ監査は受けていません。テストネットと少額でのみ使っています。スクリーンショットはサンプルデータで動かしたWebデモの画面です。",
  alts: {
    main: "並べたHenry Walletの3画面。ホーム、署名前の確認、送金後の画面",
    inset: "スマホで見たHenry Walletのようこそ画面",
    gallery: [
      "ようこそ画面。鍵はこの端末だけ、署名のたびにFace ID、送る前にすべて確認",
      "Polygon Amoyのホーム。USDC・JPYCの残高、あと約71回送れる手数料用のPOL、送った取引",
      "25 USDCの送金。金額はテンキーで入力し、アドレスはチェックサム検査を通っている",
      "署名前の確認。送信元・受取の完全なアドレス、検証5/5、予想・最大手数料",
      "送金後の画面。端末での署名、ネットワークへの送信、ブロックへの取り込みと、予想の横に実際の手数料",
      "受け取り。アドレスのQRコードと、Polygon Amoyで送ってもらうよう促す注意書き",
    ],
  },
};
