import type { ProjectCopy } from "~/lib/types";

export const ko: ProjectCopy = {
  label: "UR Check에 통합됨",
  tagline: "UR 임대 빈방 검색과 이메일 알림을 제공하던 웹 서비스. 현재는 UR Check에 통합됐습니다.",
  summary: "UR 임대 빈방 검색과 이메일 알림을 제공하던 웹 서비스입니다. 2026년 10월 UR Check로 통합되어 별도 운영을 종료했습니다.",
  facts: [
    { label: "종류", value: "웹 서비스 (일본어 UI)" },
    { label: "기간", value: "2026년 9~10월" },
    { label: "운영 환경", value: "Azure Container Apps (운영 종료)" },
  ],
  about: [
    "2026년 10월, UR MCP App과 함께 UR Check로 통합했습니다.",
  ],
  features: [
    {
      title: "검색 조건 저장",
      body: "지역·월세·방 구조·역 도보 시간 등의 조건을 저장할 수 있었습니다.",
    },
    {
      title: "빈방 알림",
      body: "정기적으로 빈방을 확인하고, 새로 나오거나 다시 올라온 방을 이메일로 알려 줬습니다.",
    },
  ],
  stack: [
    { area: "백엔드", items: "Java · Spring Boot · Spring MVC · Spring Data JPA · Scheduler" },
    { area: "프런트엔드", items: "React · TypeScript · Vite · TanStack Query · Tailwind CSS" },
    { area: "인증", items: "Spring Security · Entra External ID · Google" },
    { area: "데이터", items: "PostgreSQL · Flyway" },
    { area: "인프라", items: "Azure Container Apps · Container Registry · Key Vault · Terraform · Cloudflare DNS" },
    { area: "CI/CD · 운영", items: "Azure Pipelines · Workload Identity Federation · Application Insights" },
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
