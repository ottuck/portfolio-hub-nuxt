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
  status: "in-progress",
  label: "For learning",
  order: 8,
  unlisted: true,

  tagline: "A self-custody stablecoin wallet for iPhone. The keys stay on the phone, and every payment is signed there after Face ID.",
  summary:
    "A small personal wallet for holding and sending USDC and JPYC on Polygon, Ethereum and Avalanche. There is no server: the app creates the wallet, keeps the recovery phrase in the phone's secure storage, and shows everything on one screen before you approve a payment with Face ID.",
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
    "I wanted to understand what a wallet actually does between a 12-word phrase and a signed payment, so I built a small one myself. It handles USDC and JPYC, stablecoins that cross borders in seconds for a small fee, and does only a few things: create or import, check balances, send, receive and scan.",
    "The recovery phrase is the only secret. It lives in the iOS Keychain, tied to this device, and every read asks for Face ID. The private key is never stored; it's derived from the phrase when signing and then dropped. The cryptography comes from ethers rather than my own code. The phrase screen guards against screenshots and screen recording, and a new wallet asks for three random words before it's ready.",
    "Before anything is signed, the app checks the address checksum, refuses to send to a token's own contract, and checks the token and gas balances and the chain ID. Fees follow EIP-1559, and the raw transaction fields are folded away under the review screen. With no server, the flow of sign, save as pending, broadcast and confirm lives in one core module that the screens only call, and pending payments are checked again whenever home opens. The screenshots come from the web demo, which swaps storage, keys and RPC for in-memory fakes while the real fee, signing and sending code runs.",
  ],
  features: [
    {
      title: "Create or import",
      body: "Make a new 12-word phrase on the phone, or bring in one you already have. It uses the same derivation path as MetaMask's first account (m/44'/60'/0'/0/0).",
    },
    {
      title: "Face ID on every payment",
      body: "The phrase can only be read from the Keychain after Face ID, so nothing is signed without your approval.",
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
  footnote: "An experimental wallet built for learning. It hasn't been audited, so I only use it on test networks and with small amounts.",

  translations: { ja, ko },
};
