import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const cover = {"src":"/images/content/projects/henry-wallet/cover.webp","width":1280,"height":800};
const home = {"src":"/images/content/projects/henry-wallet/home.webp","width":924,"height":2000};
const receive = {"src":"/images/content/projects/henry-wallet/receive.webp","width":924,"height":2000};
const review = {"src":"/images/content/projects/henry-wallet/review.webp","width":924,"height":2000};
const send = {"src":"/images/content/projects/henry-wallet/send.webp","width":924,"height":2000};
const sent = {"src":"/images/content/projects/henry-wallet/sent.webp","width":924,"height":2000};
const welcome = {"src":"/images/content/projects/henry-wallet/welcome.webp","width":924,"height":2000};

export const henryWallet: Project = {
  slug: "henry-wallet",
  name: "Henry Wallet",
  status: "testing",
  label: "Side project",
  order: 8,

  tagline: "A self-custody stablecoin wallet for iPhone. The keys stay on the phone, and every payment is signed there after Face ID.",
  summary:
    "Holds and sends USDC and JPYC on Polygon, Ethereum and Avalanche. The recovery phrase stays in the phone's secure storage, and every payment is shown in full on one screen before you approve it with Face ID.",
  cardStack: ["Expo", "ethers", "Polygon"],
  facts: [
    { label: "Type", value: "iPhone app (Expo) · KO / EN" },
    { label: "Period", value: "Oct 2026" },
    { label: "Networks", value: "Polygon · Ethereum · Avalanche, testnets first" },
    { label: "Runs on", value: "Only on the phone · no server" },
  ],

  links: {
    // The demo runs on sample data.
    live: { href: "https://wallet.portfolio-hub.dev", label: "Try the demo" },
    github: "https://github.com/ottuck/stable-wallet",
  },

  cover: {
    main: { src: cover, alt: "Three Henry Wallet screens side by side: home, review before signing, and the sent confirmation" },
    inset: { src: welcome, alt: "The Henry Wallet welcome screen on a phone", frame: "phone" },
    tint: ["#e8eaf3", "#c5cbdd"],
  },

  about: [
    "It handles two coins: USDC and JPYC.",
    "There's no server. Everything from creating the wallet to signing happens on the phone, and the only thing that leaves it is the signed payment. The features stay narrow: send, receive and check balances, with no swaps.",
  ],
  features: [
    {
      title: "Create or import",
      body: "Make a new 12-word phrase on the phone, or bring in one you already have. A new wallet asks for three random words from the phrase before it's ready.",
    },
    {
      title: "Face ID on every payment",
      body: "The phrase is kept in the iOS Keychain for this device only, and it can only be read after Face ID. The private key is never saved; it's derived for each signature.",
    },
    {
      title: "One review screen",
      body: "The amount, the network, both full addresses, the results of the five checks and the expected and maximum fee, all before signing. The EIP-1559 transaction details are one tap away.",
    },
    {
      title: "Stopped before signing",
      body: "A bad checksum, a token's contract address or too little gas is caught before the Face ID prompt. A first-time recipient gets a reminder to match the first and last four characters.",
    },
    {
      title: "Balances at a glance",
      body: "USDC and JPYC, plus roughly how many more transfers the POL fee balance covers.",
    },
    {
      title: "Follow each payment",
      body: "Signed on the device, sent to the network, included in a block, with times, the nonce and the actual fee next to the estimate. Pending, failed and dropped payments are still tracked after a restart.",
    },
    {
      title: "Receive and scan",
      body: "Address and QR code with a reminder to use the right network. The scanner reads plain addresses and EIP-681 links, and refuses requests for another chain.",
    },
  ],
  gallery: [
    { src: welcome, alt: "The welcome screen: keys only on this device, Face ID for every signature, and everything checked before sending", frame: "phone" },
    { src: home, alt: "Home on Polygon Amoy: USDC and JPYC balances, POL for fees with about 71 transfers left, and sent payments", frame: "phone" },
    { src: send, alt: "Sending 25 USDC: the amount on a number pad, and the address passing the checksum check", frame: "phone" },
    { src: review, alt: "Review before signing: both full addresses, 5 of 5 checks passed, and the expected and maximum fee", frame: "phone" },
    { src: sent, alt: "Sent: signed on the device, sent to the network and included in a block, with the actual fee next to the estimate", frame: "phone" },
    { src: receive, alt: "Receive: the address as a QR code, with a reminder to ask for Polygon Amoy", frame: "phone" },
  ],
  stack: [
    { area: "App", items: "Expo SDK 58 · React Native 0.88 · TypeScript · Expo Router · Zustand" },
    { area: "Wallet", items: "ethers v6 · BIP-39 · EIP-1559 · ERC-20 (USDC, JPYC)" },
    { area: "Storage", items: "expo-secure-store (Keychain, Face ID) · expo-sqlite" },
    { area: "Device", items: "expo-camera · expo-screen-capture · react-native-qrcode-svg" },
    { area: "Networks", items: "Polygon · Ethereum · Avalanche C-Chain · testnets (Amoy, Sepolia, Fuji) · public RPC" },
    { area: "Testing", items: "jest-expo (amount, address, key derivation) · ESLint · Prettier · GitHub Actions" },
    { area: "Demo", items: "react-native-web · in-memory stubs for storage, keys and RPC" },
  ],
  footnote: "Experimental and unaudited. I only use it on test networks and with small amounts. The screenshots are from the web demo with sample data.",

  architecture: {
    width: 1080,
    height: 370,
    summary:
      "Keys, signing and payment history stay on the phone. Only balance lookups and signed payments go out to the network.",
    groups: [{ title: "Your phone", x: 250, y: 34, w: 530, h: 306 }],
    nodes: [
      { id: "you", x: 80, y: 185, title: "You", tone: "accent" },
      { id: "app", x: 380, y: 185, title: "Henry Wallet", note: "Balance · send · receive · scan" },
      { id: "vault", x: 660, y: 100, title: "Secure storage", note: "Recovery phrase · Face ID" },
      { id: "history", x: 660, y: 270, title: "SQLite", note: "Payment history" },
      { id: "chain", x: 930, y: 185, title: "Blockchains", note: "Polygon · Ethereum · Avalanche", tone: "outside" },
    ],
    edges: [
      { from: "you", to: "app", label: "Face ID" },
      { from: "app", to: "vault", both: true, route: "hvh", fromOffset: -14, bend: 520 },
      { from: "app", to: "history", route: "hvh", fromOffset: 14, bend: 520 },
      { from: "app", to: "chain", label: "Balances · signed payments", both: true },
    ],
  },
  translations: { ja, ko },
};
