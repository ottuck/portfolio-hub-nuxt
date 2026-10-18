import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "리메이크",
  liveLabel: "포켓몬 잡으러 가기",
  tagline: "“이 포켓몬은 누구일까?”를 게임보이 배틀처럼. 1세대 포켓몬 도감과 띠부씰 컬렉션에, Unity로 만든 피카츄 턴제 배틀까지. 한국어·영어·일본어를 지원합니다.",
  summary:
    "게임보이 배틀 화면을 재현한 실루엣 퀴즈입니다. 포켓몬 이름을 맞히면 몬스터볼을 던지고, 띠부씰 컬렉션에 추가됩니다. 1세대 151마리 도감도 함께 제공합니다. 퀴즈에서 피카츄를 얻으면 따로 만든 Unity 프로젝트를 페이지 안에서 열어 거북왕과 턴제 배틀을 할 수 있습니다.",
  facts: [
    { label: "종류", value: "웹 앱 + Unity WebGL 배틀 · 한국어 / 영어 / 일본어" },
    { label: "기간", value: "2026년 9~10월 (리메이크, 10월에 배틀 추가)" },
    { label: "운영 환경", value: "Vercel + Supabase (도쿄) · Cloudflare Pages" },
  ],
  about: [
    "2023년 JSP 팀 프로젝트로 만들었던 포켓몬 도감을 최신 스택으로 혼자 다시 만들었습니다. 작은 앱을 어디까지 완성도 있게 다듬을 수 있는지 시험하는 프로젝트입니다.",
    "지금은 게임이 첫 화면입니다. 실루엣이 나오면 세 언어 중 어느 이름으로든 답할 수 있고, 맞히면 트레이너가 몬스터볼을 던집니다. 세 번 틀리면 게임 오버입니다. 가입 없이 게스트로 바로 플레이할 수 있고, 나중에 Google 계정을 연결해도 띠부씰과 점수는 그대로 이어집니다.",
    "그 뒤 C#을 배우고 Unity를 직접 다뤄 보고 싶었습니다. 상관없는 게임을 새로 시작하기보다, 이 게임에 빠져 있던 진짜 배틀을 붙이기로 했습니다. 배틀은 별도 저장소(pokepedia-unity)에서 Unity로 만들어 WebGL로 빌드하고, Pokepedia에서는 iframe으로 엽니다. 퀴즈에서 피카츄를 얻으면 그 피카츄로 거북왕과 싸웁니다. battle.pokepedia.dev에서 단독으로도 플레이할 수 있습니다.",
    "전투 규칙은 UnityEngine을 참조하지 않는 순수 C#으로 작성해, Unity 없이 dotnet test로 테스트합니다. 엔진은 ‘기술 사용·피해·급소·기절’ 같은 이벤트만 내보내고 화면이 그 목록을 차례로 재생하므로, 규칙과 연출이 서로를 모릅니다. 두 앱은 서버나 DB를 공유하지 않습니다. 웹 앱이 보유 포켓몬을 postMessage로 넘기고, 배틀은 메시지를 보낸 출처를 확인합니다.",
  ],
  features: [
    {
      title: "실루엣 퀴즈",
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
    {
      title: "퀴즈에서 배틀로",
      body: "피카츄 띠부씰이 없으면 첫 문제로 피카츄가 나옵니다. 획득 화면과 컬렉션의 피카츄 띠부씰에서 바로 배틀을 열 수 있습니다.",
    },
    {
      title: "Unity 턴제 배틀",
      body: "몸통박치기·10만볼트·번개 중 하나를 골라 거북왕과 싸웁니다. 스피드로 순서를 정하고, 타입 상성·명중률·급소로 피해를 계산합니다. 비와 안개가 내리는 도트 배경에 2D 조명을 더하고, 효과음은 직접 합성했습니다.",
    },
  ],
  stack: [
    { area: "웹 · 앱", items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript" },
    { area: "웹 · UI", items: "Tailwind CSS v4 · Motion · Zustand · next-intl" },
    { area: "웹 · 데이터", items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron" },
    { area: "웹 · 테스트", items: "Vitest · Playwright" },
    { area: "웹 · 호스팅", items: "Vercel (도쿄) · Supabase (도쿄) · Analytics · Speed Insights" },
    { area: "배틀 · 엔진", items: "Unity 6.3 LTS · C# 9 · uGUI · TextMesh Pro" },
    { area: "배틀 · 그래픽", items: "URP 2D — Light2D, 후처리 · 직접 작성한 셰이더 · HTML/CSS 시작·VS 화면" },
    { area: "배틀 · 테스트", items: "NUnit · dotnet test · GitHub Actions" },
    { area: "배틀 · 호스팅", items: "WebGL (Brotli 사전 압축) · Cloudflare Pages · iframe + postMessage" },
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
      "Unity로 만든 배틀. 비 내리는 들판에서 거북왕과 마주한 피카츄",
    ],
  },
};
