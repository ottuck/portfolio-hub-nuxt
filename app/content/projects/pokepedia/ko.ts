import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "리메이크",
  liveLabel: "포켓몬 잡으러 가기",
  tagline: "“이 포켓몬은 누구일까?”를 게임보이 배틀처럼. 1세대 포켓몬 도감과 띠부씰 컬렉션까지, 한국어·영어·일본어를 지원합니다.",
  summary:
    "게임보이 배틀 화면을 재현한 실루엣 퀴즈입니다. 포켓몬 이름을 맞히면 몬스터볼을 던지고, 띠부씰 컬렉션에 추가됩니다. 1세대 151마리 도감도 함께 제공합니다.",
  facts: [
    { label: "종류", value: "웹 앱 · 한국어 / 영어 / 일본어" },
    { label: "기간", value: "2026년 9~10월 (리메이크)" },
    { label: "운영 환경", value: "Vercel + Supabase (도쿄)" },
  ],
  about: [
    "2023년 JSP 팀 프로젝트로 만들었던 포켓몬 도감을 최신 스택으로 혼자 다시 만들었습니다. 작은 앱을 어디까지 완성도 있게 다듬을 수 있는지 시험하는 프로젝트입니다.",
    "지금은 게임이 첫 화면입니다. 실루엣이 나오면 세 언어 중 어느 이름으로든 답할 수 있고, 맞히면 트레이너가 몬스터볼을 던집니다. 세 번 틀리면 게임 오버입니다. 가입 없이 게스트로 바로 플레이할 수 있고, 나중에 Google 계정을 연결해도 띠부씰과 점수는 그대로 이어집니다.",
  ],
  features: [
    {
      title: "실루엣 배틀",
      body: "‘싸우다’로 답하고 ‘힌트’로 이름 절반을 볼 수 있으며, ‘넘기기’와 ‘도망치다’도 있습니다. 방향키와 Z키도 지원합니다. 피카츄, Pikachu, ピカチュウ 모두 정답으로 인정됩니다.",
    },
    {
      title: "몬스터볼 던지기",
      body: "맞히면 게임보이 회색 톤으로 직접 그린 트레이너가 공을 던지고, 포켓몬의 모습이 드러납니다. 연속으로 맞힐수록 점수와 색이 다른 포켓몬의 출현 확률이 올라갑니다.",
    },
    {
      title: "도감",
      body: "151마리를 한 페이지에서 볼 수 있습니다. 세 언어의 이름이나 번호로 검색하고, 타입 필터와 정렬 상태는 URL에 유지됩니다.",
    },
    {
      title: "상세 카드",
      body: "능력치, 특성, 진화 정보를 보여 줍니다. 아트워크는 마우스나 손가락 움직임에 따라 기울어지는 홀로그램 카드로, 누르면 색이 다른 모습으로 바뀝니다.",
    },
    { title: "띠부씰 컬렉션과 랭킹", body: "색이 다른 포켓몬까지 포함한 151칸 컬렉션과 전체 플레이어의 최고 기록 랭킹." },
    {
      title: "모바일 대응",
      body: "게임보이 전체가 작은 화면에 맞게 들어가고, 배틀 중에는 화면을 터치해도 페이지가 스크롤되지 않습니다.",
    },
  ],
  stack: [
    { area: "앱", items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript" },
    { area: "UI", items: "Tailwind CSS v4 · Motion · Zustand · next-intl" },
    { area: "데이터", items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron" },
    { area: "테스트", items: "Vitest · Playwright" },
    { area: "호스팅", items: "Vercel (도쿄) · Supabase (도쿄) · Analytics · Speed Insights" },
  ],
  notes: [
    {
      title: "정답은 서버에 둔다",
      body: "진행 중인 문제에서 브라우저가 받는 것은 의미 없는 파일명의 실루엣과 가려진 이름뿐입니다. 정답 데이터는 private 스키마에 있습니다.",
    },
    {
      title: "판정과 저장",
      body: "판정 규칙은 순수 TypeScript입니다. 점수, 띠부씰, 다음 문제는 Postgres 함수 하나로 함께 저장하므로 두 번 제출해도 보상은 한 번만 들어갑니다.",
    },
  ],
  footnote:
    "포켓몬과 관련 이름·아트워크의 권리는 Nintendo, The Pokémon Company, Creatures Inc., GAME FREAK inc.에 있습니다. 비공식·비영리 팬 프로젝트입니다.",
  alts: {
    main: "게임보이 배틀 화면. 포켓몬 실루엣, 트레이너 뒷모습, 명령창",
    inset: "휴대폰에서 본 도감",
    gallery: [
      "첫 화면이 된 게임 타이틀 화면",
      "정답을 맞히고 받은 색이 다른 띠부씰",
      "홀로그램 카드로 보여 주는 리자몽 상세",
      "띠부씰 컬렉션",
    ],
  },
};
