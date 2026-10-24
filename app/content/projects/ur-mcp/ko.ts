import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "UR Check에 통합됨",
  tagline: "Claude와 ChatGPT에서 UR 임대 빈방을 찾을 수 있었던 MCP 앱. 현재는 UR Check에 통합됐습니다.",
  summary:
    "Claude와 ChatGPT에서 UR 임대 빈방을 찾을 수 있었던 MCP 서버이자 앱입니다. 2026년 10월 UR Check로 통합되어 별도 운영을 종료했습니다.",
  facts: [
    { label: "종류", value: "MCP 서버 + MCP App · Claude·ChatGPT용 도구 3종" },
    { label: "기간", value: "2026년 10월" },
    { label: "운영 환경", value: "Railway (싱가포르·운영 종료) · 볼륨에 둔 SQLite" },
  ],
  about: [
    "2026년 10월, UR Manager와 함께 UR Check로 통합했습니다.",
  ],
  features: [
    {
      title: "대화로 검색",
      body: "Claude와 ChatGPT에서 빈방을 검색하고 결과를 카드로 보여 줬습니다.",
    },
    {
      title: "변동 확인",
      body: "저장한 조건에 맞는 방의 신규 등록·재등록·모집 종료 내역을 확인할 수 있었습니다.",
    },
  ],
  stack: [
    { area: "서버", items: "Node.js 24 · TypeScript 7 · Hono · MCP TypeScript SDK · MCP Apps · Zod" },
    { area: "데이터", items: "UR 웹사이트 API · Railway 볼륨의 SQLite(node:sqlite)" },
    { area: "클라이언트", items: "Claude Code · claude.ai(웹·iOS) · ChatGPT" },
    { area: "인프라", items: "Railway 싱가포르 · 레플리카 1개 · railway.ts" },
    { area: "품질", items: "기록해 둔 UR 응답으로 하는 Vitest · 실환경 스모크 테스트 · Biome · GitHub Actions" },
  ],
  footnote:
    "UR 도시기구와는 관계가 없습니다. 빈방 여부는 반드시 UR 공식 사이트에서 확인해 주세요. 카드 화면은 예시 데이터이고, 나머지 이미지는 실제 UR MCP App 결과를 바탕으로 재구성한 것입니다.",
  alts: {
    main: "대화 안에 뜬 변화 보고 카드. 새로 나온 방·사라진 방 수와 지금 신청할 수 있는 방 2개",
    inset: "휴대폰에서 본 같은 카드",
    gallery: [
      "동작 방식. Claude나 ChatGPT가 UR MCP App을 호출하고, UR MCP App은 UR에 하나씩 요청하며 기록을 남긴다",
      "채팅으로 알림 예산 바꾸기. update_watch_settings가 저장하고 지금 조건에 맞는 방 수를 알려 준다",
    ],
  },
};
