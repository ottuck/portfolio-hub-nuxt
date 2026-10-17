import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "리메이크",
  liveLabel: "포켓몬 잡으러 가기",
  tagline: "포켓몬 이름을 맞히고 띠부씰을 모아, 피카츄로 Unity 배틀까지. 1세대 도감과 함께 한국어·영어·일본어를 지원합니다.",
  summary: "포켓몬 이름을 맞히고 띠부씰을 모으는 웹 게임에 Unity로 만든 턴제 배틀을 더했습니다. 1세대 151마리 도감과 컬렉션을 제공하며, 퀴즈에서 얻은 피카츄로 거북왕과 배틀할 수 있습니다. PC와 모바일 브라우저에서 플레이할 수 있고, 한국어·영어·일본어를 지원합니다.",
  facts: [
    {
      label: "종류",
      value: "웹 앱 + Unity WebGL · 한국어 / 영어 / 일본어"
    },
    {
      label: "기간",
      value: "2026년 9~10월 (리메이크)"
    },
    {
      label: "운영 환경",
      value: "Vercel · Supabase · Cloudflare Pages"
    }
  ],
  about: [
    "2023년 JSP 팀 프로젝트로 만들었던 포켓몬 도감을 최신 스택으로 혼자 다시 만들었습니다. 작은 앱을 어디까지 완성도 있게 다듬을 수 있는지 시험하는 프로젝트입니다.",
    "지금은 게임이 첫 화면입니다. 실루엣이 나오면 세 언어 중 어느 이름으로든 답할 수 있고, 맞히면 트레이너가 몬스터볼을 던집니다. 세 번 틀리면 게임 오버입니다. 가입 없이 게스트로 바로 플레이할 수 있고, 나중에 Google 계정을 연결해도 띠부씰과 점수는 그대로 이어집니다.",
    "웹 게임 안에 Unity WebGL 배틀을 연결했습니다. 퀴즈에서 피카츄를 얻으면 보상 화면이나 컬렉션에서 바로 거북왕과의 배틀을 시작할 수 있습니다. 현재 공개 버전은 피카츄를 조작해 거북왕과 대결하는 1인용 배틀입니다."
  ],
  features: [
    {
      title: "실루엣 퀴즈",
      body: "‘싸우다’로 답하고 ‘힌트’로 이름 절반을 볼 수 있으며, ‘넘기기’와 ‘도망치다’도 있습니다. 방향키와 Z키도 지원합니다. 피카츄, Pikachu, ピカチュウ 모두 정답으로 인정됩니다."
    },
    {
      title: "퀴즈에서 배틀로",
      body: "퀴즈에서 피카츄를 얻으면 보상 화면이나 컬렉션의 피카츄 띠부씰에서 배틀로 바로 이동할 수 있습니다."
    },
    {
      title: "Unity 턴제 배틀",
      body: "피카츄의 몸통박치기·10만볼트·번개를 골라 거북왕과 대결합니다. 스피드에 따라 행동 순서를 정하고, 타입 상성·명중률·급소를 반영해 결과를 계산합니다."
    },
    {
      title: "날씨와 기술 연출",
      body: "픽셀 아트 배경에 비·안개와 2D 조명을 더했습니다. 10만볼트와 하이드로펌프에는 전용 효과와 카메라 움직임, 합성 사운드를 적용했습니다."
    },
    {
      title: "도감",
      body: "151마리를 한 페이지에서 볼 수 있습니다. 세 언어의 이름이나 번호로 검색하고, 타입 필터와 정렬 상태는 URL에 유지됩니다."
    },
    {
      title: "상세 카드",
      body: "능력치, 특성, 진화 정보를 보여 줍니다. 아트워크는 마우스나 손가락 움직임에 따라 기울어지는 홀로그램 카드로, 누르면 색이 다른 모습으로 바뀝니다."
    },
    {
      title: "띠부씰 컬렉션과 랭킹",
      body: "색이 다른 포켓몬까지 포함한 151칸 컬렉션과 전체 플레이어의 최고 기록 랭킹."
    }
  ],
  stack: [
    {
      area: "앱",
      items: "Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript"
    },
    {
      area: "UI",
      items: "Tailwind CSS v4 · Motion · Zustand · next-intl"
    },
    {
      area: "배틀",
      items: "Unity 6.3 LTS · C# · uGUI · TextMeshPro · URP 2D · WebGL"
    },
    {
      area: "데이터",
      items: "Supabase — Postgres, Auth, Storage · Row Level Security · RPC · pg_cron"
    },
    {
      area: "테스트",
      items: "Vitest · Playwright · NUnit (.NET)"
    },
    {
      area: "호스팅",
      items: "Vercel · Supabase · Cloudflare Pages"
    }
  ],
  footnote: "포켓몬과 관련 이름·아트워크의 권리는 Nintendo, The Pokémon Company, Creatures Inc., GAME FREAK inc.에 있습니다. 비공식·비영리 팬 프로젝트입니다.",
  alts: {
    main: "피카츄와 거북왕의 Unity 배틀. 세 가지 기술을 선택하는 화면",
    inset: "휴대폰에서 본 도감",
    gallery: [
      "게임보이 스타일의 포켓몬 실루엣 퀴즈",
      "피카츄 띠부씰 획득과 배틀 시작 버튼",
      "Unity 배틀에서 10만볼트를 사용하는 피카츄",
      "Pokepedia GOLD 타이틀 화면",
      "홀로그램 카드로 보여 주는 리자몽 상세",
      "배틀 바로가기가 표시된 피카츄 띠부씰 컬렉션"
    ]
  }
};
