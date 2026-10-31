import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "오픈 소스",
  liveLabel: "서버실 열어 보기",
  tagline: "AWS Lightsail 서버를 작은 3D 서버실로 만든 웹. 랙의 LED가 컨테이너의 실제 상태를 보여 줍니다.",
  summary:
    "제 AWS Lightsail 서버를 작은 3D 방으로 보여 줍니다. 랙의 LED 하나가 컨테이너 하나이고, 실제 상태에 따라 켜집니다.",
  facts: [
    { label: "종류", value: "3D 웹 페이지 · Blender 장면 + three.js" },
    { label: "기간", value: "2026년 10월" },
    { label: "데이터", value: "Grafana Cloud의 서버 지표, 1분마다" },
    { label: "운영 환경", value: "Cloudflare Pages · Pages Functions" },
  ],
  about: [
    "Home Server 3D는 제 AWS Lightsail 서버를 작은 3D 서버실로 보여 줍니다. 랙의 장비 하나가 서비스 하나, LED 하나가 컨테이너 하나이고, 정상은 초록·주의는 주황·오류는 빨강·데이터 없음은 회색입니다.",
    "장면은 Blender로 만들어 three.js로 띄웁니다. 작은 상태 API가 Grafana Cloud에서 상태만 읽어 오므로 토큰은 브라우저로 나가지 않습니다.",
  ],
  features: [
    {
      title: "실제 상태로 켜지는 LED",
      body: "LED 하나가 컨테이너 하나이고, 색은 실시간 지표로 정해집니다. 오른쪽 패널에서 CPU·메모리·디스크 사용률과 서비스별 상태를 볼 수 있고, 서비스를 누르면 카메라가 랙으로 다가갑니다.",
    },
    {
      title: "실제 데이터가 뜨는 모니터",
      body: "벽 모니터는 최근 1시간의 CPU·메모리·네트워크·디스크를 1분마다 그립니다. 책상 모니터는 최근 커밋을 터미널처럼 보여 주고, 각 커밋은 GitHub로 연결됩니다.",
    },
    {
      title: "낮과 밤",
      body: "보는 사람의 현지 시각에 맞춰 오전 6시부터 오후 6시까지는 낮이고, 해·달 스위치로 직접 바꿀 수도 있습니다.",
    },
    {
      title: "카메라",
      body: "드래그로 돌리고 스크롤로 확대합니다. 키보드로는 방향키나 WASD로 옮기고, Q·E로 돌리고, +·-로 확대합니다.",
    },
    {
      title: "공개해도 안전하게",
      body: "API가 컨테이너를 정상·주의·오류로만 줄여서 1분 동안 캐시합니다. 방문자가 Grafana Cloud에 직접 닿지 않고, 실제 서버·컨테이너 이름도 브라우저로 나가지 않습니다.",
    },
  ],
  stack: [
    { area: "3D", items: "Blender 5.2 · Python 장면 스크립트 · Cycles · glTF(GLB) + Draco" },
    { area: "웹", items: "three.js 0.170 · HTML · CSS · JavaScript (ES 모듈, 빌드 도구 없음)" },
    { area: "API", items: "Cloudflare Pages Functions · Cache API · GitHub REST API" },
    { area: "모니터링", items: "Grafana Cloud(Prometheus, PromQL) · Grafana Alloy · cAdvisor" },
    { area: "배포", items: "Cloudflare Pages · git push로 배포" },
  ],
  footnote: "라이브 페이지는 제 실제 서버를 보여 줍니다. 주소 뒤에 ?demo=1을 붙이면 예시 데이터로 볼 수 있습니다. 스크린샷은 예시 데이터이고, 나머지 이미지는 Blender 장면을 렌더한 것입니다.",
  alts: {
    main: "데스크톱 화면의 3D 서버실. 검은 서버 랙이 있는 아이소메트릭 방과, 서비스 여섯 개의 상태등이 있는 오른쪽 패널",
    inset: "같은 페이지를 휴대폰으로 본 모습. 위에 방, 아래에 서비스 목록",
    gallery: [
      "같은 방의 밤 모습. 따뜻한 조명과 불이 켜진 랙 LED",
      "밤의 랙 근접 모습. 초록색과 흰색으로 빛남",
    ],
  },
};
