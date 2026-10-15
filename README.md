# Portfolio Hub — Nuxt 4 마이그레이션

기존 Portfolio Hub의 디자인·콘텐츠·기능·URL을 유지하면서 Next.js 구현을 Nuxt 4로 이전하는 프로젝트입니다.

## 확정 사항

- 대상 GitHub 저장소: `ottuck/portfolio-hub-nuxt`, **비공개**
- Nuxt 4 · Vue 3 Composition API · TypeScript · Tailwind CSS 4 · pnpm
- `nuxt generate`로 정적 생성하고 Cloudflare Pages에 `.output/public` 배포
- 기존 UI, 3개 언어, 프로젝트 상세 페이지, SEO와 리다이렉트 유지
- 기존 Next.js 저장소와 Vercel Production은 전환 검증이 끝날 때까지 유지

## 작업 문서

- [결정사항과 구현 계획](docs/MIGRATION.md)
- [기존 코드 조사와 기준 정보](docs/BASELINE.md)
- [완료 검증 목록](docs/ACCEPTANCE.md)
- [콘텐츠 URL 기준 목록](docs/routes.json)
- [프로젝트 작업 지침](AGENTS.md)

## 현재 상태

2026-10-15 기준으로 프로젝트 폴더와 작업 문서를 준비한 상태입니다. Nuxt 애플리케이션 구현·의존성 설치·빌드·배포는 아직 수행하지 않았습니다. GitHub 저장소 생성과 원격 연결도 아직 수행하지 않았습니다.

첫 구현 단계는 Nuxt 기반 구성과 프로젝트 상세 페이지 하나를 완성한 뒤, 정적 생성·이미지·다국어·SEO를 검증하는 것입니다. 이후 전체 UI를 이전합니다.

원본: https://github.com/ottuck/portfolio-hub

비교 사이트: https://www.portfolio-hub.dev/ko
