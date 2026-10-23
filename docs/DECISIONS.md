# 결정사항

이 사이트는 Next.js로 만든 기존 포트폴리오(`ottuck/portfolio-hub`, 비교 기준 커밋 `5d2aa96`)를 Nuxt 4로 옮긴 것이다. 아래는 지금 유효한 결정만 적는다. 바뀌면 이 문서를 바로 고친다.

## 범위

- 기존 외형·콘텐츠·기능·SEO·URL을 지킨다. 성능 향상을 프레임워크 교체만으로 기대하지 않는다.
- 정적 파일만 배포한다. 요청 시 서버, DB, CMS, 인증, 서버 API는 두지 않는다.
- Nuxt UI, Nuxt Content, NuxtHub, 전역 상태 라이브러리, 별도 i18n 모듈은 쓰지 않는다. 상태는 컴포넌트와 작은 composable로 다룬다.

## 기술

| 영역 | 결정 |
| --- | --- |
| 프레임워크 | Nuxt 4, Vue 3 Composition API, `<script setup lang="ts">`, TypeScript |
| CSS | Tailwind CSS 4 (Vite 플러그인) |
| 렌더링 | SSR을 켠 채 빌드 시 prerender. 사이트 전체에 `ssr: false`를 쓰지 않는다 |
| 빌드 | `pnpm generate`: 자산 생성 → `nuxt generate` → 404·헤더 마무리 → 기준 대비 검사 |
| 패키지·Node | pnpm 10.33.0, Node 24.22.0을 로컬·CI·Pages에 같게 고정 |
| 이미지 | Nuxt Image로 빌드 시 반응형 변형과 placeholder 생성. 요청 시 `/_ipx` 서버는 쓰지 않는다 |
| OG | 빌드 시 1200×630 PNG 생성(Geist 폰트). 세 언어가 영어 이미지를 함께 쓴다 |
| 분석 | Cloudflare Web Analytics를 Pages 자동 주입으로 한 번만. Vercel Analytics는 쓰지 않는다 |

## 디자인

- 크림색 배경, 주황 강조, 둥근 카드, 가는 테두리, Bento Grid, 카드 안 이미지 겹침을 유지한다. 임의로 디자인을 바꾸지 않는다.
- 기존 토큰과 CSS `light-dark()`를 쓴다. 테마는 `theme` localStorage 키와 `data-theme` 속성, light/dark/system 선택을 유지하고, head의 초기화 스크립트로 첫 페인트 전에 적용한다.
- Geist Sans/Mono를 정적으로 제공하고, 언어별 시스템 CJK 폰트 대체 순서와 줄바꿈 규칙을 유지한다.
- 푸터의 구현 기술 표기는 실제 스택에 맞춘다. 소개의 개인 기술 목록은 사용자 콘텐츠다.

## 콘텐츠와 경로

- 영어는 `/`, 일본어는 `/ja`, 한국어는 `/ko`다. `/en` 경로를 만들지 않고 브라우저 언어로 자동 이동시키지 않는다. 언어를 바꾸면 같은 페이지의 다른 언어로 이동한다.
- `ja`, `ko` 외의 locale과 없는 slug는 404다.
- 프로젝트 글은 `app/content/projects/<slug>/`에 영어(`index.ts`), 일본어(`ja.ts`), 한국어(`ko.ts`)로 둔다. 글쓰기 원칙은 `AGENTS.md`를 따른다.
- 숨은 프로젝트를 포함한 모든 slug와 세 언어로 경로를 만든다. `ur-manager`, `ur-mcp`는 `mergedInto: 'ur-check'`라서 목록과 이전·다음 링크에서만 빠진다.
- `unlisted` 프로젝트는 자기 주소로는 열리지만 목록·이전·다음 링크·sitemap에서 빠지고 noindex다.
- 경로 목록은 `docs/routes.json`이 기준이다(홈·프로젝트 목록·About·상세 × 3개 언어, 현재 33개). 새 프로젝트를 더하면 이 파일도 고친다. Nuxt 설정은 이미지가 섞인 앱 콘텐츠 전체를 import하지 않고 이 목록을 쓴다.
- 프로젝트 주소(slug)는 현재 이름과 맞춘다. 이름을 바꿔 slug가 바뀌면 이전 주소를 아래 리다이렉트로 남긴다.

## 이미지와 OG

- 스크린샷은 WebP를 쓰고, `srcset`·`sizes`·width/height·원본 비율을 지킨다. 첫 화면의 주요 이미지는 우선 로딩, 나머지는 lazy loading이다.
- 프로젝트 구성도는 영어 한 벌만 만들어 세 언어가 함께 쓴다(`Project.architecture`). `pnpm diagrams`가 `docs/architecture`에 SVG와 PNG로 내보낸다.
- 모든 새 메타데이터는 실제로 제공되는 이미지 주소를 가리킨다.

## SEO

- 페이지마다 title·description·canonical·en/ja/ko/x-default hreflang·OG·Twitter card·JSON-LD를 둔다.
- 운영 기준 도메인은 `https://www.portfolio-hub.dev`다. Preview도 canonical·hreflang·sitemap은 운영 주소로 통일하고, Preview와 Pages 기본 도메인은 `X-Robots-Tag: noindex`로 색인을 막는다. 운영 도메인의 정상 콘텐츠는 색인을 허용한다.
- `sitemap.xml`과 `robots.txt`는 정적 파일이다.

## 리다이렉트와 404

- 규칙은 `public/_redirects`에 둔다. 모두 308이고 경로와 쿼리를 보존한다.
  - `/projects/buddy-chat` → `/projects/puny-chat`
  - `/projects/trading-bot`, `/projects/quant-lab` → `/projects/trading-lab` (`quant-lab`은 `/ja`, `/ko`도 포함)
  - 예전 Next OG 주소(`opengraph-image*`) → 정적 OG PNG
- 존재하지 않는 경로는 실제 HTTP 404다. 모든 주소를 200으로 돌리는 SPA fallback은 두지 않는다. 언어별 정적 `404.html`이 응답한다.
- 앱 안에서 일어난 오류는 `app/error.vue`가 처리한다.

## 브라우저 동작과 접근성

- 도쿄 시계는 마운트 후 `Asia/Tokyo` 기준으로 15초마다 갱신하고, 서버 출력은 빈 자리만 잡아 레이아웃 이동을 막는다.
- localStorage는 브라우저에서만 읽고, 쓸 수 없는 환경을 처리한다.
- 메뉴의 Escape·바깥 클릭 닫기, ARIA 상태, 포커스 표시, 스킵 링크, 이미지 alt를 유지한다. 이벤트 리스너와 타이머는 컴포넌트가 사라질 때 정리한다.

## 검증 기준

- `docs/baseline.json`은 페이지별 title·description·canonical·본문 텍스트·링크·alt·JSON-LD의 기준값이다. `pnpm generate`가 생성 결과와 비교한다. 의도한 콘텐츠 변경이면 변경 내용이 맞는지 확인한 뒤 기준을 갱신한다.
- CI는 frozen lockfile 설치 → `pnpm check` → `pnpm generate` → `pnpm test:pages` 순서다. 배포 후에는 `pnpm test:http https://www.portfolio-hub.dev`로 경로·OG·리다이렉트·404를 확인한다.
- 검사 결과와 작업 기록은 docs에 쌓지 않는다. PR 설명과 CI 결과에 남긴다.
