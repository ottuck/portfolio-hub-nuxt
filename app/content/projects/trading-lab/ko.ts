import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "1/100 규모 실거래",
  tagline: "내 습관을 복사해 월급날 대신 사 주는 봇과, 매일 비중을 정하는 AI 봇들. 모두 제 실제 계좌에서 1/100 규모로 돌리고 있습니다.",
  summary:
    "월급날 대신 사 주는 투자 봇과, 매일 비중을 정하는 AI 봇 둘.",
  liveLabel: "데모 보기",
  facts: [
    { label: "종류", value: "웹 앱 + 워커 · 내 실제 계좌, 공개 데모 있음" },
    { label: "기간", value: "2026년 10월" },
    { label: "운영 환경", value: "AWS Lightsail (시드니) · Docker Compose · Cloudflare Tunnel" },
  ],
  about: [
    "월급날마다 정해진 금액을 적립하는 직장인을 위한 봇입니다. 좋아하는 종목을 10개까지 고르고 비율을 정한 뒤 매수 습관에 관한 몇 가지 질문에 답하면, 봇이 대신 삽니다. 월급날 적립하고, 많이 오르면 쉬고, 크게 떨어지면 몰아서 사는 식입니다. 지난 10년을 매달 그냥 샀을 때와 나란히 보여 줍니다.",
    "그 옆에서는 AI 봇 둘이 매일 제가 정해 둔 10개 종목을 얼마씩 담을지 정합니다. 하나는 뉴스를 읽고, 다른 하나는 이름을 가린 가격 차트만 봅니다.",
  ],
  features: [
    {
      title: "나 카피하기",
      body: "좋아하는 종목을 10개까지 고르고 비율을 정한 뒤, 질문 4~6개에 답하면 규칙이 됩니다. 월급날 얼마를 살지, 언제 쉴지, 언제 더 살지. 매도는 따라 하지 않습니다.",
    },
    {
      title: "평행세계의 나",
      body: "같은 돈으로 규칙을 하나만 바꾼 나들입니다. 쉬지 않는 나, 떨어질 때만 사는 나, 더 오래 기다리는 나. 어떤 내가 더 나았을지 비교해 볼 수 있습니다.",
    },
    {
      title: "다음에 할 일",
      body: "다음 월급날 종목별로 얼마를 왜 사는지, 그리고 쉬거나 더 사게 되는 가격까지 지금 얼마나 남았는지 보여 줍니다.",
    },
    {
      title: "백테스트",
      body: "원하는 규칙을 지난 10년에 적용해 보고, 매달 그냥 샀을 때와 연도별로 비교합니다.",
    },
    {
      title: "AI 봇 둘",
      body: "매일 AI가 10개 종목과 현금의 비중을 정하고, 바꾼 이유를 함께 보여 줍니다. 하나는 뉴스를 읽고 기사 링크를 남기고, 다른 하나는 이름을 가린 차트만 봅니다. 시작한 날부터 서로, 그리고 나 카피 봇과 나란히 비교합니다.",
    },
    {
      title: "작게, 실제로 주문",
      body: "미국 장이 끝나면 봇들이 판단하고, 그 주문이 제 실제 계좌에 1/100 규모, 소수점 단위로 나갑니다. 거래할 때마다 Telegram으로 알려 줍니다.",
    },
    {
      title: "누구나 써 볼 수 있는 데모",
      body: "가상의 가격과 예시 봇들이 들어 있습니다. 데모의 AI 봇들은 실제 AI 대신 규칙으로 만든 예시 판단을 보여 줍니다. 나 카피하기와 백테스트를 써 볼 수 있고, 실제 계좌에는 전혀 닿지 않습니다.",
    },
  ],
  stack: [
    { area: "백엔드", items: "Python 3.14 · uv · FastAPI · Pydantic v2 · SQLAlchemy 2 · Alembic · pandas" },
    { area: "프런트엔드", items: "React · TypeScript · Vite · TanStack Query · Lightweight Charts" },
    { area: "데이터", items: "PostgreSQL 17 · 토스증권 Open API · 데모용 합성 데이터" },
    { area: "AI", items: "Claude Sonnet 5.5 · 웹 검색 · 구조화 출력 (JSON 스키마) · Anthropic SDK" },
    { area: "인프라", items: "AWS Lightsail 시드니 (Terraform) · Docker Compose · GHCR · GitHub Actions (셀프 호스티드 러너) · Cloudflare Tunnel·Access · Tailscale · Telegram 알림" },
    { area: "품질", items: "pytest · ruff · mypy (strict) · oxlint" },
  ],
  footnote: "투자 조언이 아닙니다. 스크린샷은 데모의 합성 데이터이고 데모의 주문은 모두 모의 체결입니다. AI 봇의 판단 이유는 참고용이며 사실과 다를 수 있습니다.",
  alts: {
    main: "Trading Lab 홈. 나 카피 봇과 매달 그냥 샀을 때의 비교, 오늘의 판단, 옆에 놓인 봇 세 개",
    inset: "휴대폰에서 본 Trading Lab 홈",
    gallery: [
      "습관 복사하기 3/6 질문. 한 달에 투자하는 금액과 고를 수 있는 금액들",
      "데모의 시장분석 AI 봇. 오늘의 판단과 이유, 종목별 목표 비중. 데모 판단은 실제 AI가 아니라 규칙으로 만든 예시",
      "평행세계의 나. 같은 금액으로 규칙을 하나씩 바꾼 나들",
      "과거 가격으로 나 카피 규칙을 시험해 보는 화면. 매달 넣는 돈, 쉬기·몰아 사기 기준, 종목",
    ],
  },
};
