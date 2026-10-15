import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "누구나 사용 가능",
  tagline: "GitHub 1년치 기여 기록을 수채화 식물로 그려 주는 서비스. 하루가 잎 한 장입니다. README에 한 줄만 붙이면 됩니다.",
  summary:
    "GitHub 기여 기록을 수채화 식물로 바꿔 주는 작은 서비스입니다. 1년의 하루하루가 잎이 되고, 그날 활동이 많을수록 잎의 초록이 짙어집니다. 프로필 README에 이미지 한 줄만 붙이면 그림이 알아서 최신으로 유지됩니다.",
  facts: [
    { label: "종류", value: "GitHub README용 이미지 서비스" },
    { label: "기간", value: "2026년 10월" },
    { label: "운영 환경", value: "Cloudflare Workers + D1 + R2" },
  ],
  about: [
    "기여 그래프는 초록 네모가 늘어선 표입니다. 보고 있으면 즐거운 것으로 만들고 싶어서, GitLeaf는 1년을 식물로 그립니다. 하루가 작은 잎 한 장이고 활동이 많을수록 색이 짙어지며, 가지 끝에는 한 주를 나타내는 큰 잎이 달립니다. 아직 오지 않은 날은 옅은 윤곽만 있고, 그림 아래에는 그해의 기여 수가 적힙니다.",
    "프로필 README에 두려고 만들었습니다. 사용자 이름이 들어간 이미지 한 줄만 붙이면 되고, 가입도 GitHub Actions 설정도 필요 없습니다. 이미지를 처음 요청받을 때 기여 기록을 읽어 식물을 그리고 저장해 두며, 이후에는 같은 URL 그대로 하루에 한 번 다시 그립니다. README는 바뀌지 않고 커밋도 만들어지지 않습니다.",
    "잎은 AI 이미지 도구로 만든 수채화 잎 8종을 각각 5단계 농도로 만든 것입니다. 네 줄기를 따라 배치하고 하루에 한 장씩 채우는 것이 코드가 하는 일입니다. 그림 전체가 SVG 파일 하나라서 스크립트와 외부 요청이 막힌 README에서도 평범한 이미지로 보입니다.",
  ],
  features: [
    {
      title: "하루에 잎 한 장",
      body: "잎의 농도는 GitHub의 기여 단계를 따라, 조용한 날은 옅은 윤곽에서 활발한 날은 짙은 초록까지 달라집니다. 주마다 그 주의 평균을 나타내는 큰 잎도 달립니다.",
    },
    {
      title: "한 줄이면 끝",
      body: "사용자 이름이 들어간 이미지 한 줄을 README에 붙입니다. 계정은 필요 없고 첫 요청에서 그림이 나타납니다.",
    },
    {
      title: "매일 다시 그리기",
      body: "같은 URL에 최신 활동이 반영되어서 README를 고칠 일이 없습니다. 해가 바뀌면 새 식물이 자라고, ?year=로 2008년까지 원하는 해를 고정할 수 있습니다.",
    },
    {
      title: "살랑이는 바람",
      body: "?motion=breeze를 붙이면 가지들이 저마다의 속도로 천천히 흔들립니다. CSS만으로 움직이며, 기기에서 움직임 줄이기를 켜면 멈춥니다.",
    },
  ],
  stack: [
    { area: "서비스", items: "TypeScript · Cloudflare Workers(Cron Triggers)" },
    { area: "저장", items: "완성된 SVG는 R2, 정원과 갱신 시각은 D1" },
    { area: "그림", items: "순수 JavaScript로 쓴 SVG · 수채화 잎 이미지 8종 × 5단계(sharp) · 바람은 CSS 애니메이션" },
    { area: "데이터", items: "GitHub GraphQL API(토큰은 Worker 시크릿에 보관)" },
    { area: "품질", items: "실제 Workers 런타임과 D1·R2에서 하는 테스트(Miniflare) · GitHub 실데이터 대조 · GitHub Actions" },
  ],
  footnote: "건수는 커밋만이 아니라 GitHub 기여 전체입니다. 비공개 활동은 서비스의 GitHub 토큰이 볼 수 있는 범위만 반영됩니다. 실린 그림은 제 계정의 것입니다.",
  alts: {
    main: "1년치 기여 기록으로 그린 식물과 그 잎을 확대한 모습",
    gallery: [
      "동작 방식. README가 Cloudflare Worker에 이미지를 요청하면 R2에 저장된 SVG가 돌아오고, 매일 도는 Cron이 GitHub를 읽어 다시 그리며, D1이 일정을 관리한다",
      "README에 붙이는 한 줄 코드와 그것으로 나타나는 식물",
    ],
  },
};
