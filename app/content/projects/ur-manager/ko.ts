import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "UR Check에 통합됨",
  tagline: "원하는 UR 임대 조건(지역·월세·방 구조·역 도보 시간)을 저장해 두면, 조건에 맞는 빈방이 나왔을 때 메일로 알려 줍니다.",
  summary: "원하는 UR 임대 조건을 저장해 두면 조건에 맞는 빈방이 나왔을 때 메일로 알려 줍니다. 공식 사이트를 계속 새로 고칠 필요가 없습니다.",
  facts: [
    { label: "종류", value: "웹 서비스 (일본어 UI)" },
    { label: "기간", value: "2026년 9~10월" },
    { label: "운영 환경", value: "Azure Container Apps (운영 종료)" },
  ],
  about: [
    "도쿄의 UR 임대는 금방 나가지만, 공식 사이트에는 빈방 알림 기능이 없습니다. 매일 직접 확인하던 일을 대신 맡아 주는 서비스를 만들었습니다.",
    "가입하지 않아도 검색 조건 하나를 저장해 바로 쓸 수 있습니다. 나중에 Google로 로그인하면 조건과 기록이 그대로 이어집니다. Claude나 ChatGPT와 대화하며 찾고 싶다면 UR MCP App을 쓰면 됩니다.",
    "2026년 10월, UR MCP App과 합쳐 UR Check가 되면서 이 서비스는 운영을 종료했습니다.",
  ],
  features: [
    { title: "검색 조건 저장", body: "도쿄·가나가와·지바·사이타마·이바라키를 대상으로 지역, 월세, 면적, 방 구조, 역 도보 시간으로 찾을 수 있습니다." },
    { title: "정기 확인", body: "조건마다 정한 간격으로 일본 시간 8시~20시 사이에 확인합니다." },
    { title: "바뀐 것만 메일로", body: "알림을 켤 때 요약을 한 번 보내고, 이후에는 새로 나왔거나 다시 올라온 방만 알려 줍니다." },
    { title: "게스트에서 회원으로", body: "Google로 로그인하면 조건과 기록을 한 번에 옮길 수 있습니다." },
    { title: "기록", body: "모든 확인 내역과 보낸 메일을 결과와 함께 볼 수 있습니다." },
  ],
  stack: [
    { area: "백엔드", items: "Java · Spring Boot · Spring MVC · Spring Data JPA · Scheduler" },
    { area: "프런트엔드", items: "React · TypeScript · Vite · TanStack Query · Tailwind CSS" },
    { area: "인증", items: "Spring Security · Entra External ID · Google" },
    { area: "데이터", items: "PostgreSQL · Flyway" },
    { area: "인프라", items: "Azure Container Apps · Container Registry · Key Vault · Terraform · Cloudflare DNS" },
    { area: "CI/CD · 운영", items: "Azure Pipelines · Workload Identity Federation · Application Insights" },
  ],
  notes: [
    {
      title: "컨테이너 하나",
      body: "React와 Spring을 이미지 하나로 묶어 레플리카 1개로 운영합니다. 이 정도 규모에서는 스케줄러와 세션을 단순하게 유지할 수 있습니다.",
    },
    {
      title: "네트워크 호출은 트랜잭션 밖에서",
      body: "UR과 메일 서비스 호출은 DB 트랜잭션 밖에서 처리합니다. 느린 요청이나 메일 전송 실패 때문에 정상적으로 끝난 확인이 롤백되지 않습니다.",
    },
    {
      title: "일부만 성공하면 실패",
      body: "한 페이지라도 가져오지 못하면 확인 전체를 실패로 처리하고 이전 상태를 유지합니다. 그래서 잘못된 “새 방” 메일은 나가지 않습니다.",
    },
  ],
  footnote: "UR 도시기구와는 관계가 없습니다. 빈방 여부는 반드시 UR 공식 사이트에서 확인해 주세요.",
  alts: {
    main: "UR Manager의 저장된 검색 조건 화면. 고토구 조건이 하나 있다",
    inset: "채팅처럼 질문에 답하며 검색 조건을 만드는 화면",
    gallery: [
      "지역, 월세, 방 구조, 면적과 도보 시간, 확인, 이름 순서로 조건을 만드는 화면",
      "저장한 조건, 새로 찾은 방과 평면도, 최근 확인 내역이 보이는 홈 화면",
    ],
  },
};
