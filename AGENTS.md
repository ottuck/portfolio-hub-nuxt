# 프로젝트 작업 지침

## 목표와 범위

- Next.js → Nuxt 4 프레임워크 마이그레이션이다. 기존 UI와 기능 보존이 우선이다.
- GitHub 대상은 `ottuck/portfolio-hub-nuxt` 비공개 저장소다. 새 Git 이력으로 시작하고 원본 커밋은 문서에 기록한다.
- `docs/MIGRATION.md`, `docs/BASELINE.md`, `docs/ACCEPTANCE.md`를 먼저 읽는다.
- 사용자에게 이미 확정한 기술 결정을 다시 묻지 않는다. 일반적인 구현 선택은 이 문서의 범위에서 진행한다.

## 구현

- Nuxt 4, Vue 3 Composition API, `<script setup lang="ts">`, TypeScript, Tailwind CSS 4, pnpm을 사용한다.
- 서버 렌더링을 활성화한 상태에서 정적 HTML을 생성한다. 사이트 전체에 `ssr: false`를 설정하지 않는다.
- 요청 시 서버 런타임, DB, CMS, 인증, 신규 기능을 도입하지 않는다. 빌드 중 Nitro 사용은 가능하다.
- Nuxt Image는 빌드 시 이미지 최적화에 사용한다. Nuxt UI, Content, Hub, 전역 상태 라이브러리는 현재 범위에 필요하지 않다.
- 영문 루트, `/ja`, `/ko` 경로를 유지한다. 기존 번역·경로 유틸리티와 콘텐츠 검증을 재사용한다.
- 숨겨진 프로젝트를 포함한 모든 slug로 생성 경로를 만든다. 목록에 표시되는 프로젝트만으로 경로를 만들지 않는다.
- Next.js 이미지 객체는 프레임워크 독립적인 이미지 메타데이터로 변환한다. Nuxt 설정에서 콘텐츠를 불러올 때 이미지 import 및 앱 전용 별칭이 경로 생성을 깨뜨리지 않도록 분리한다.

## UI와 콘텐츠

- 운영 사이트와 `docs/reference/`의 사용자 제공 이미지를 기준으로 비교한다. 스크린샷 픽셀 너비를 그대로 CSS 너비로 사용하지 말고 원본 CSS와 동일 viewport의 화면을 비교한다.
- 기존 디자인 토큰, `light-dark()`, `data-theme` 방식과 반응형 레이아웃을 재사용한다. 임의의 디자인 리뉴얼을 하지 않는다.
- 기존 `theme` localStorage 키와 light/dark/system 의미를 유지한다.
- Geist Sans/Mono와 언어별 시스템 CJK 폰트 대체 순서, 줄바꿈 규칙을 보존한다.
- 콘텐츠·번역·프로젝트 링크·프로젝트 정렬을 임의로 바꾸지 않는다. 현재 홈의 첫 카드는 Puny Chat이다.
- 영어 OG 이미지를 세 언어에서 공용으로 사용한다.
- 접근성, 키보드 조작, 스킵 링크, alt, 이벤트·타이머 정리를 유지한다.

## 검증과 배포

- 구현 이후 CI는 frozen lockfile 설치, lint, typecheck, generate, 정적 결과물 검증을 수행한다. 실행하지 않은 검사를 성공했다고 기록하지 않는다.
- `docs/routes.json`의 콘텐츠 URL(현재 33개) 외에 OG·이미지·sitemap·robots·404·리다이렉트도 별도로 검증한다.
- 앱의 SPA 탐색 성공과 주소 직접 접속 성공을 모두 확인한다.
- 없는 URL의 HTTP 404와 기존 URL의 HTTP 308을 실제 배포 환경에서 확인한다.
- Production canonical은 `https://www.portfolio-hub.dev` 기준이다. Preview는 색인을 차단한다.
- 비밀값과 Cloudflare 인증정보를 저장소에 넣지 않는다. 예제 환경변수에는 값의 형식만 기록한다.
- 기존 Vercel Production을 조기에 삭제하거나 도메인을 미리 전환하지 않는다.
- 문서의 상태·체크리스트를 실제 완료 상태에 맞춰 갱신한다.
