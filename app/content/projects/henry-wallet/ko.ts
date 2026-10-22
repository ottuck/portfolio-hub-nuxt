import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "공부용",
  tagline: "직접 보관하는 iPhone용 스테이블코인 지갑. 키는 휴대폰에만 있고, 모든 송금은 Face ID를 거쳐 기기에서 서명합니다.",
  summary:
    "Polygon·Ethereum·Avalanche에서 USDC와 JPYC를 보관하고 보내는 작은 개인용 지갑입니다. 서버는 없습니다. 앱이 지갑을 만들고 복구 문구를 휴대폰 보안 저장소에 두며, 송금 전에 모든 내용을 한 화면에 보여 준 뒤 Face ID로 승인받습니다.",
  facts: [
    { label: "종류", value: "iPhone 앱 (Expo) · 한국어 / 영어" },
    { label: "기간", value: "2026년 10월" },
    { label: "네트워크", value: "Polygon · Ethereum · Avalanche (테스트넷 먼저)" },
    { label: "운영 환경", value: "휴대폰 안에서만 · 서버 없음" },
  ],
  about: [
    "12단어 복구 문구에서 서명된 송금이 나오기까지 지갑이 실제로 무엇을 하는지 알고 싶어서 작은 지갑을 직접 만들었습니다. 국경을 넘어 몇 초 만에 적은 수수료로 오가는 스테이블코인 USDC와 JPYC를 다루고, 만들기·가져오기, 잔액 확인, 보내기, 받기, QR 스캔만 합니다.",
    "비밀값은 복구 문구 하나뿐입니다. iOS Keychain에 이 기기 전용으로 저장하고, 읽을 때마다 Face ID를 거칩니다. 개인 키는 저장하지 않고 서명할 때 문구에서 파생해 쓴 뒤 버립니다. 암호 연산은 직접 구현하지 않고 ethers를 씁니다. 복구 문구 화면은 스크린샷과 화면 녹화에 대비했고, 새 지갑은 무작위 세 단어를 확인해야 쓸 수 있습니다.",
    "서명 전에 주소 체크섬, 토큰 컨트랙트 주소로 보내는지, 토큰·가스 잔액, 체인 ID를 확인합니다. 수수료는 EIP-1559로 계산하고, 서명할 트랜잭션 원본 값은 확인 화면 아래에 접어 둡니다. 서버가 없으니 서명 → pending 저장 → 전송 → 확정으로 이어지는 흐름은 화면이 부르기만 하는 core 모듈 한곳에 두었고, 홈을 열 때마다 대기 중인 거래를 다시 확인합니다. 스크린샷은 웹 데모 화면입니다. 저장소·키·RPC만 메모리용 가짜로 바꾸고, 수수료 계산·서명·전송은 실제 코드가 그대로 돕니다.",
  ],
  features: [
    {
      title: "만들기·가져오기",
      body: "휴대폰에서 12단어 문구를 새로 만들거나 갖고 있던 문구를 가져옵니다. MetaMask 첫 계정과 같은 파생 경로(m/44'/60'/0'/0/0)를 씁니다.",
    },
    {
      title: "송금마다 Face ID",
      body: "Face ID를 통과해야 Keychain에서 문구를 읽을 수 있어서, 승인 없이는 아무것도 서명되지 않습니다.",
    },
    {
      title: "한 화면에서 확인",
      body: "받는 주소, 금액, 네트워크, 다섯 가지 검증, 예상·최대 수수료를 서명 전에 보여 줍니다. EIP-1559 필드는 펼쳐서 볼 수 있습니다.",
    },
    {
      title: "서명 전에 막기",
      body: "체크섬이 틀린 주소, 토큰 컨트랙트 주소, 가스 부족은 Face ID 전에 막습니다. 처음 보내는 주소에는 앞뒤 네 글자를 맞춰 보라고 안내합니다.",
    },
    {
      title: "잔액 한눈에",
      body: "USDC와 JPYC 잔액, 그리고 수수료용 POL로 전송을 몇 번 더 할 수 있는지 보여 줍니다.",
    },
    {
      title: "송금 따라가기",
      body: "기기 서명, 네트워크 전송, 블록 포함을 시각·nonce와 함께 보여 주고, 실제 수수료를 예상값 옆에 둡니다. 대기·실패·누락된 거래는 앱을 다시 열어도 이어서 확인합니다.",
    },
    {
      title: "받기와 스캔",
      body: "주소와 QR을 네트워크 안내와 함께 보여 줍니다. 스캐너는 주소만 있는 QR과 EIP-681 링크를 읽고, 다른 체인의 요청은 거부합니다.",
    },
  ],
  stack: [
    { area: "앱", items: "Expo SDK 58 (React Native 0.88) · TypeScript · Expo Router · Zustand" },
    { area: "지갑", items: "ethers v6 — BIP-39, 키 파생, EIP-1559 서명 · USDC·JPYC (ERC-20)" },
    { area: "기기", items: "expo-secure-store (Keychain·Face ID) · expo-sqlite · expo-camera · expo-screen-capture · react-native-qrcode-svg" },
    { area: "네트워크", items: "Polygon · Ethereum · Avalanche C-Chain과 테스트넷(Amoy, Sepolia, Fuji) · 공개 RPC" },
    { area: "테스트", items: "jest-expo — 금액·주소·키 파생 test vector · ESLint · Prettier · GitHub Actions" },
    { area: "데모", items: "react-native-web — 저장소·키·RPC를 메모리 stub으로 교체" },
  ],
  footnote: "학습용으로 만든 실험적인 지갑이며 보안 감사를 받지 않았습니다. 테스트넷과 소액으로만 사용합니다.",
  alts: {
    main: "나란히 놓인 Henry Wallet 화면 세 장. 홈, 서명 전 확인, 보낸 뒤 화면",
    inset: "휴대폰의 Henry Wallet 환영 화면",
    gallery: [
      "환영 화면. 키는 이 기기에만, 서명할 때마다 Face ID, 보내기 전에 모두 확인",
      "Polygon Amoy 홈. USDC·JPYC 잔액, 약 71회 전송할 수 있는 수수료용 POL, 보낸 거래",
      "25 USDC 보내기. 주소가 체크섬 검사를 통과했고, 처음 보내는 주소라는 안내가 있다",
      "서명 전 확인. 보내는·받는 전체 주소, 검증 5/5, 예상·최대 수수료",
      "보낸 뒤 화면. 기기 서명, 네트워크 전송, 블록 포함과 예상값 옆의 실제 수수료",
      "받기. 주소 QR 코드와 Polygon Amoy로 보내 달라는 안내",
    ],
  },
};
