import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "누구나 사용 가능",
  tagline: "GitHub의 1년 치 기여 기록을 수채화 느낌의 식물로 보여 줍니다. README에 이미지 코드 한 줄을 추가하면 매일 자동으로 갱신됩니다.",
  summary:
    "GitHub 기여 기록을 수채화 느낌의 식물로 보여 주는 서비스입니다. 하루를 잎 한 장으로 표현하고, 활동이 많은 날일수록 잎 색이 짙어집니다. 프로필 README에 이미지 코드 한 줄을 추가하면 매일 최신 기록이 반영됩니다.",
  facts: [
    { label: "종류", value: "GitHub README용 이미지 서비스" },
    { label: "기간", value: "2026년 10월" },
    { label: "운영 환경", value: "Cloudflare Workers + D1 + R2" },
  ],
  about: [
    "GitHub의 기여 기록을 초록색 칸 대신 잎과 가지로 표현한 프로젝트입니다. 하루를 잎 한 장으로 나타내고, 활동이 많은 날일수록 잎 색이 짙어집니다. 가지 끝의 큰 잎은 한 주의 평균 활동량을 보여 줍니다.",
    "프로필 README에 사용하려고 만들었습니다. GitHub 사용자 이름이 들어간 이미지 코드 한 줄을 추가하면 됩니다. 별도로 가입하거나 GitHub Actions를 설정할 필요가 없고, 이미지는 매일 자동으로 갱신됩니다.",
    "수채화 느낌의 잎 이미지 8종을 AI 이미지 도구로 만들고, 각각 다섯 단계의 색상으로 준비했습니다. 아직 오지 않은 날짜는 옅은 윤곽으로 표시하고, 그림 아래에는 해당 연도의 총 기여 수를 표시합니다.",
  ],
  features: [
    {
      title: "하루를 잎 한 장으로",
      body: "하루의 기여도에 따라 잎 색이 옅은 색부터 짙은 초록색까지 달라집니다. 한 주의 평균 활동량은 가지 끝의 큰 잎으로 표시합니다.",
    },
    {
      title: "한 줄로 추가",
      body: "사용자 이름이 포함된 이미지 코드를 README에 붙여 넣으면 됩니다. 별도의 회원가입 없이 바로 사용할 수 있습니다.",
    },
    {
      title: "매일 자동 갱신",
      body: "이미지 주소를 바꾸지 않아도 최신 기여 기록이 반영됩니다. 해가 바뀌면 새해의 기록을 보여 주며, ?year=2025처럼 연도를 지정해 과거 기록을 볼 수도 있습니다.",
    },
    {
      title: "바람 애니메이션",
      body: "이미지 주소에 ?motion=breeze를 추가하면 가지가 바람에 흔들리듯 천천히 움직입니다. 기기에서 동작 줄이기 설정을 켜면 애니메이션이 멈춥니다.",
    },
  ],
  stack: [
    { area: "서비스", items: "TypeScript · Cloudflare Workers(Cron Triggers)" },
    { area: "저장", items: "완성된 SVG는 R2, 정원과 갱신 시각은 D1" },
    { area: "그림", items: "순수 JavaScript로 쓴 SVG · 수채화 잎 이미지 8종 × 5단계(sharp) · 바람은 CSS 애니메이션" },
    { area: "데이터", items: "GitHub GraphQL API(토큰은 Worker 시크릿에 보관)" },
    { area: "품질", items: "실제 Workers 런타임과 D1·R2에서 하는 테스트(Miniflare) · GitHub 실데이터 대조 · GitHub Actions" },
  ],
  footnote: "기여 수에는 커밋 외의 GitHub 활동도 포함됩니다. 비공개 활동은 서비스의 GitHub 토큰으로 확인할 수 있는 범위만 반영됩니다. 예시 이미지는 제 GitHub 계정의 기록으로 만들었습니다.",
  alts: {
    main: "1년치 기여 기록으로 그린 식물과 그 잎을 확대한 모습",
    gallery: [
      "동작 방식. README가 Cloudflare Worker에 이미지를 요청하면 R2에 저장된 SVG가 돌아오고, 매일 도는 Cron이 GitHub를 읽어 다시 그리며, D1이 일정을 관리한다",
      "README에 붙이는 한 줄 코드와 그것으로 나타나는 식물",
    ],
  },
};
