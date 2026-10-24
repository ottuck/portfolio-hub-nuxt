import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "오픈소스",
  tagline: "Mermaid 블록이나 구조 스케치를 깔끔한 구성도로 다시 그려 주는 Claude Code 스킬입니다. 박스와 화살표를 JSON으로 적으면 SVG와 PNG가 나옵니다.",
  summary:
    "README의 Mermaid 블록이나 시스템 설명을 깔끔한 아키텍처 구성도로 바꿔 주는 Claude Code 스킬입니다. 시스템을 박스 5~7개로 줄여 같은 모양으로 그립니다.",
  facts: [
    { label: "종류", value: "Claude Code 스킬 + Node.js 스크립트" },
    { label: "기간", value: "2026년 10월" },
    { label: "운영 환경", value: "내 컴퓨터 · Node.js 18 이상" },
  ],
  about: [
    "diagram-polish는 아키텍처 구성도를 다시 그려 주는 Claude Code 스킬입니다. README의 Mermaid 블록이나 대략적인 스케치·설명, 또는 저장소만 건네면 깔끔한 SVG와 PNG를 돌려줍니다.",
    "네 단계로 동작합니다. Claude가 원본을 읽고 코드와 맞는지 확인한 뒤, 시스템을 박스 5~7개로 줄여 박스와 화살표를 작은 diagram.json에 적습니다. 스크립트가 배치와 선 경로를 계산해 그림을 그립니다. 그다음 Claude가 결과를 보고, 화살표가 반대로 향한 것처럼 검사로 잡히지 않는 부분을 고칩니다.",
    "이 사이트의 구성도도 이 방식으로 만들었습니다. 테마는 sage, blue, mono 세 가지이고 각각 라이트와 다크가 있습니다. 오픈소스이며 플러그인으로 설치하거나 스킬 폴더를 ~/.claude/skills에 복사해서 쓸 수 있습니다.",
  ],
  features: [
    {
      title: "Mermaid를 깔끔한 구성도로",
      body: "Mermaid 블록, README, 코드를 읽고 하나의 스타일로 다시 그립니다. 둥근 박스, 함께 도는 것을 감싸는 점선 틀, 직접 운영하지 않는 서비스의 다른 색, 예약 작업을 나타내는 점선이 기본입니다.",
    },
    {
      title: "박스 5~7개",
      body: "한 코드베이스의 조각은 합치고, 중복된 화살표는 하나로 줄이고, 라벨은 한두 단어로 줄입니다. 코드를 먼저 확인하므로 없는 구성요소는 그리지 않습니다.",
    },
    {
      title: "스스로 그림을 검사",
      body: "스크립트는 오류가 있으면 멈추고, 잘린 박스·겹침·박스를 뚫고 가는 선·겹친 라벨을 경고합니다. Claude는 그림을 직접 열어 본 뒤에 넘깁니다.",
    },
    {
      title: "한글·일본어 글자",
      body: "박스 폭을 한글, 가나, 한자의 폭으로 계산하고, PNG에서는 이 글자를 위한 시스템 고딕 글꼴을 고릅니다.",
    },
  ],
  stack: [
    { area: "스킬", items: "Claude Code 스킬(SKILL.md)에 박스를 줄이고 놓는 규칙을 담았습니다 · 플러그인 설명 파일이 있어 claude plugin install로 설치할 수 있습니다" },
    { area: "스크립트", items: "Node.js · SVG는 의존성 없는 파일 하나 · 글자 폭 추정으로 박스 크기를 정하고 직각 선 경로를 계산합니다" },
    { area: "그림", items: "JavaScript로 직접 쓴 SVG · Geist · 테마 세 개의 라이트·다크 팔레트 · prefers-color-scheme을 따르는 auto SVG" },
    { area: "PNG", items: "@resvg/resvg-js · 한글·가나에는 시스템 고딕 글꼴을 고릅니다" },
    { area: "검사", items: "오류에서 멈추고 잘림·겹침·박스를 뚫는 선·겹친 라벨을 경고하는 검사기 · 한 명령으로 예시 전체를 다시 그려 검사합니다" },
  ],
  footnote: "스킬은 Claude Code가 필요하고, 스크립트만 쓸 때는 Node.js만 있으면 됩니다. 비교 그림의 \"before\"는 Mermaid의 기본 테마입니다.",
  alts: {
    main: "Mermaid 기본 테마로 그린 데이터 파이프라인과, diagram-polish로 다시 그린 같은 파이프라인",
    gallery: [
      "메시지 12개의 Mermaid 시퀀스 다이어그램과, 같은 시스템을 박스 7개와 화살표로 그린 모습",
      "같은 파이프라인을 sage, blue, mono 테마로 그린 모습과, sage 테마의 다크 모드",
      "한국어 라벨의 구성도. AI 클라이언트가 임대 사이트를 검색하는 MCP 서버를 호출하고 이력을 SQLite에 보관한다",
    ],
  },
};
