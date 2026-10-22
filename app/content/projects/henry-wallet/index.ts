import type { Project } from "~/lib/types";
import { ja } from "./ja";
import { ko } from "./ko";
const cover = {"src":"/images/content/projects/henry-wallet/cover.webp","width":1280,"height":800};
const home = {"src":"/images/content/projects/henry-wallet/home.webp","width":384,"height":738};
const receive = {"src":"/images/content/projects/henry-wallet/receive.webp","width":384,"height":738};
const review = {"src":"/images/content/projects/henry-wallet/review.webp","width":384,"height":738};
const send = {"src":"/images/content/projects/henry-wallet/send.webp","width":384,"height":738};
const sent = {"src":"/images/content/projects/henry-wallet/sent.webp","width":384,"height":738};
const welcome = {"src":"/images/content/projects/henry-wallet/welcome.webp","width":480,"height":923};

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

  links: {},

  cover: {
    main: { src: cover, alt: "Three Henry Wallet screens side by side: home, review before signing, and the sent confirmation" },
    inset: { src: welcome, alt: "The Henry Wallet welcome screen on a phone", frame: "phone" },
    tint: ["#e3e9fb", "#bccbf5"],
  },

  about: [
    "A personal stablecoin wallet for iPhone. It handles two coins, USDC and JPYC, which cross borders in seconds for a small fee.",
    "There's no server. Everything from creating the wallet to signing happens on the phone, and the only thing that leaves it is the signed payment. The features stay narrow: send, receive and check balances, with no swaps and no connecting to websites.",
    "For now I use it on testnets and keep polishing it.",
  ],
  features: [
    {
      title: "Create or import",
      body: "Make a new 12-word phrase on the phone, or bring in one you already have. A new wallet asks for three random words from the phrase before it's ready. It uses the same derivation path as MetaMask's first account (m/44'/60'/0'/0/0).",
    },
    {
      title: "Face ID on every payment",
      body: "The phrase is kept in the iOS Keychain for this device only, and it can only be read after Face ID. The private key is never saved; it's derived for each signature.",
    },
    {
      title: "One review screen",
      body: "Recipient, amount, network, five checks and the expected and maximum fee, all before signing. The EIP-1559 fields are a tap away.",
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
    { src: send, alt: "Sending 25 USDC: the address passes the checksum check, with a note that it's a first-time recipient", frame: "phone" },
    { src: review, alt: "Review before signing: both full addresses, 5 of 5 checks passed, and the expected and maximum fee", frame: "phone" },
    { src: sent, alt: "Sent: signed on the device, sent to the network and included in a block, with the actual fee next to the estimate", frame: "phone" },
    { src: receive, alt: "Receive: the address as a QR code, with a reminder to ask for Polygon Amoy", frame: "phone" },
  ],
  stack: [
    { area: "App", items: "Expo SDK 58 (React Native 0.88) · TypeScript · Expo Router · Zustand" },
    { area: "Wallet", items: "ethers v6 — BIP-39, key derivation, EIP-1559 signing · USDC and JPYC (ERC-20)" },
    { area: "Device", items: "expo-secure-store (Keychain, Face ID) · expo-sqlite · expo-camera · expo-screen-capture · react-native-qrcode-svg" },
    { area: "Networks", items: "Polygon · Ethereum · Avalanche C-Chain and their testnets (Amoy, Sepolia, Fuji) · public RPC" },
    { area: "Testing", items: "jest-expo — amounts, addresses, key derivation vectors · ESLint · Prettier · GitHub Actions" },
    { area: "Demo", items: "react-native-web — storage, keys and RPC swapped for in-memory stubs" },
  ],
  footnote: "Experimental and unaudited. I only use it on test networks and with small amounts. The screenshots are from the web demo with sample data.",

  translations: { ja, ko },
};
