# 결정사항과 마이그레이션 계획

결정일: 2026-10-15 (Asia/Seoul)

## 1. 목적

Vue를 실제 운영 프로젝트에서 사용한다. Portfolio Hub의 기존 외형·콘텐츠·기능·SEO·URL을 보존하면서 Nuxt 4로 구현하고 Cloudflare Pages 정적 호스팅으로 이전한다. 성능 향상을 프레임워크 교체만으로 보장하지 않으며, 기존보다 이미지 로딩이나 사용자 경험이 악화되지 않는지 비교한다.

## 2. 저장소와 작업 방식

- 새 저장소 이름: `ottuck/portfolio-hub-nuxt`
- 공개 설정: **비공개**, 사용자 확정
- 새 Git 이력으로 시작한다. 기존 `.git`을 복사하지 않는다.
- 원본 저장소와 비교 기준 커밋을 `BASELINE.md`에 남긴다.
- 원본 Next.js 서비스는 Vercel에서 유지하고 새 사이트를 별도로 검증한다.
- 이 문서 준비 시점에는 원격 저장소를 생성하거나 연결하지 않았다.

## 3. 기술 결정

| 영역 | 결정 |
| --- | --- |
| 프레임워크 | Nuxt 4 최신 호환 패치 버전을 설치 시 확인하고 lockfile에 고정 |
| UI | Vue 3 Composition API, `<script setup lang="ts">` |
| 언어 | TypeScript |
| CSS | Tailwind CSS 4, 공식 Vite 플러그인 연동 |
| 렌더링 | SSR 활성화 + 빌드 시 prerender. 요청 시 SSR 서버는 배포하지 않음 |
| 빌드 | `generate` 스크립트에서 정적 자산 생성과 `nuxt generate` 실행 |
| 배포 | Cloudflare Pages Git 연동, 결과물 `.output/public` |
| 패키지 | pnpm, `packageManager`와 lockfile 고정 |
| Node | Nuxt·의존성 호환 LTS를 설치 시 확인하고 로컬·CI·Pages에 동일하게 고정 |
| 이미지 | Nuxt Image의 정적 생성, 반응형 크기와 placeholder 생성 |
| OG | Satori 기반 정적 PNG 생성 스크립트, 필요 시 PNG 변환 도구 사용 |
| 분석 | Cloudflare Web Analytics, 중복 주입 없이 한 방식으로만 적용 |
| 상태 | 컴포넌트·작은 composable 수준. 전역 상태 라이브러리 미사용 |

Nuxt UI, Nuxt Content, NuxtHub, DB, CMS, 인증, 서버 API는 추가하지 않는다. 다국어도 기존의 단순한 데이터·유틸리티를 재사용하며 별도 i18n 모듈을 우선 도입하지 않는다.

## 4. 디자인 보존

- 운영 사이트와 원본 CSS·컴포넌트가 구현 기준이다.
- 크림색 배경, 주황색 강조, 둥근 카드, 가는 테두리, 그림자, Bento Grid, 카드 내 이미지 겹침을 보존한다.
- 원본 컨테이너 너비, gap, 여백, 반응형 breakpoint와 이미지 배치를 먼저 조사한다.
- 프로젝트 순서는 콘텐츠의 정렬 로직을 따른다. 현재 홈은 Puny Chat, UR Check, GitLeaf, Quant Lab, Pokepedia 순이다.
- Geist Sans/Mono를 정적으로 제공하고 기존 굵기 및 CJK 시스템 폰트 대체 순서를 유지한다.
- 원본의 light/dark/system 테마와 CSS `light-dark()` 토큰을 보존한다.
- `theme` 저장 키와 `data-theme` 속성을 유지한다. head의 초기화 스크립트로 첫 페인트 이전에 테마를 적용한다.
- 클라이언트 hydration이 초기 테마 속성을 되돌리거나 경고를 만들지 않도록 확인한다.
- 푸터의 구현 기술·호스팅 표기와 개발 문서는 실제 새 스택에 맞춰 수정한다. 소개의 개인 기술 목록은 사용자 콘텐츠이므로 자동으로 교체하지 않는다.
- `docs/reference/` 이미지는 사용자가 제공한 참고 화면이다. 촬영 배율이나 viewport는 확인되지 않았으므로 실제 모바일·데스크톱 비교를 별도로 수행한다.

## 5. 콘텐츠와 라우팅

- 기존 `site.ts`, 프로젝트별 영문·일문·한글 데이터, dictionary, 프로젝트 병합·정렬·번역 검증 로직을 재사용한다.
- `StaticImageData`, Next Metadata 타입, Next 전용 import만 프레임워크에 맞춰 제거·변환한다.
- 이미지 데이터는 src·width·height·placeholder 등 명시적 필드로 관리한다.
- 앱 경로는 영어 루트, 일본어 `/ja`, 한국어 `/ko`다. `/en`을 새 경로로 만들거나 브라우저 언어에 따라 루트를 자동 이동시키지 않는다.
- 언어 변경 시 같은 상세 페이지로 이동한다. `<html lang>`은 정적 HTML과 클라이언트 전환 모두에서 맞아야 한다.
- 원본 URL 목록은 `routes.json`의 30개 콘텐츠 경로다. 모든 언어 × 전체 프로젝트 slug에서 생성한다.
- 표시 목록에서 제외된 `ur-manager`, `ur-mcp`도 세 언어 상세 페이지·sitemap·OG 대상에 포함한다.
- 설정 시점에도 사용할 수 있는 프레임워크 독립적인 경로 목록을 둔다. Nuxt 설정에서 이미지가 포함된 앱 콘텐츠 전체를 직접 import하는 데 의존하지 않는다.
- 잘못된 locale·알 수 없는 slug는 오류 처리한다. 실수로 모든 임의 경로가 정상 페이지가 되지 않게 한다.

## 6. 이미지와 OG

- 원본 WebP 스크린샷과 alt 번역을 유지한다.
- `srcset`, `sizes`, width/height, 원본 비율, 주요 이미지 로딩 우선순위, 나머지 이미지 lazy loading을 보존한다.
- Nuxt Image가 생성하는 변형 이미지와 placeholder가 결과물에 실제로 존재하는지 확인한다. 클라이언트에서만 드러나는 이미지 경로도 빠지지 않게 한다.
- 이미지 변환 서비스나 요청 시 `/_ipx` 서버가 필요하지 않아야 한다.
- OG 이미지는 기존 1200×630 구성과 Geist 폰트를 기준으로 빌드 시 생성한다. 현재 정책대로 세 언어에서 영문 이미지를 공유한다.
- 기존 OG URL을 조사해 정적 파일 또는 리다이렉트로 호환시킨다. Next 자동 생성 식별자·쿼리까지 무조건 동일하다고 가정하지 않는다. 모든 새 메타데이터는 실제 제공되는 이미지 URL을 가리켜야 한다.

## 7. SEO와 배포 동작

- 페이지별 title/description, canonical, en/ja/ko/x-default hreflang, OG, Twitter card, JSON-LD를 원본과 대조한다.
- Production의 기준 도메인은 `https://www.portfolio-hub.dev`다.
- Preview에서도 canonical·hreflang·sitemap의 콘텐츠 URL은 Production 기준으로 통일하고, Preview 응답에 `X-Robots-Tag: noindex`를 적용한다. 실제 Pages 기본 헤더도 확인한다.
- Preview의 이미지 검증은 해당 Preview에서 제공되는 자산을 기준으로 한다. 이미지 URL은 검증 단계와 Production 단계에서 올바른 절대 주소가 되도록 배포 환경을 구분한다.
- sitemap.xml과 robots.txt는 정적 파일로 제공한다. Preview는 검색 색인이 목적이 아니며, robots 차단만으로 noindex를 대신하지 않는다.
- `NEXT_PUBLIC_SITE_URL`, `VERCEL_ENV`, `VERCEL_URL` 의존성을 제거하고 Nuxt/Cloudflare 환경에 맞는 명시적 설정으로 교체한다.
- 기존 buddy-chat → puny-chat, trading-bot → quant-lab의 영문 경로 및 하위 경로 리다이렉트를 308로 유지한다. `_redirects`의 원본 경로와 wildcard 규칙을 각각 정의한다.
- 원본에 없는 다국어 리다이렉트는 이번 범위에서 새로 추가하지 않는다.
- URL의 trailing slash와 `.html` 정규화, 쿼리 유지, 연속 리다이렉트·루프 여부는 실제 Pages에서 확인한다.
- 최상위 `404.html`을 생성하고 존재하지 않는 경로의 직접 요청이 HTTP 404를 반환하도록 한다. 모든 미등록 URL을 200으로 바꾸는 SPA rewrite를 추가하지 않는다.
- 최종 출력물이 정적 파일만으로 서비스되는지 확인한다. 의도치 않은 Worker/Pages Functions 산출물이 배포되지 않게 한다.
- Cloudflare Web Analytics를 적용하며 Vercel Analytics/Speed Insights는 제거한다. 기존 분석 이력의 이전이나 동일한 지표 제공은 이번 범위에 포함하지 않는다.

## 8. 브라우저 기능과 접근성

- 도쿄 시계는 빌드 시각을 고정 출력하지 않고, 마운트 후 `Asia/Tokyo`로 갱신한다. 원본처럼 빈 자리의 높이를 확보하여 레이아웃 이동을 방지한다.
- localStorage 접근은 브라우저에서 수행하고 사용 불가 환경을 처리한다.
- 메뉴의 Escape·외부 클릭 닫기, ARIA 상태, 포커스 표시, 스킵 링크, 이미지 alt를 유지한다.
- 언어·경로가 바뀔 때 메뉴 상태와 메타데이터가 갱신되는지 확인한다.
- 이벤트 리스너와 시계 타이머는 컴포넌트 해제 시 정리한다.

## 9. 구현 순서

1. 원본 기준 확보: commit·URL·SEO·리다이렉트·화면·빌드 상태 조사. 원본 `pnpm check`와 `pnpm build`를 실행하고 결과를 기록한다.
2. Nuxt 기반: 버전 고정, Tailwind, 기존 토큰·폰트·이미지 메타데이터·타입·콘텐츠 구성.
3. 대표 상세 페이지: Puny Chat 상세를 3개 언어 경로에서 구현하고, 공통 shell·테마·언어 전환·이미지·SEO·OG까지 정적 생성한다.
4. 초기 Pages 배포: Git 연동 방식으로 별도 Pages 프로젝트를 연결하여 깊은 경로 직접 접속, 이미지, HTTP 응답을 검증한다. 운영 도메인은 아직 이전하지 않는다.
5. UI 확대: 홈, 프로젝트 목록, 나머지 상세, About, 병합 프로젝트, 시계, 404 구현.
6. 출력물 검증: 30개 URL, metadata, JSON-LD, sitemap/robots, OG·이미지 참조, 리다이렉트, 모바일·다크모드 비교.
7. CI: frozen lockfile 설치 → lint → typecheck → generate → 출력물 검증. Pages도 동일 버전과 generate 스크립트를 사용한다.
8. 최종 배포: Preview 검증 완료 후 기존 도메인 연결·DNS 전환·HTTPS·apex/www 정규화를 확인한다.
9. 운영 확인: 최종 도메인의 응답·메타데이터·분석 동작을 확인하고 복구 가능한 기존 Vercel 배포를 유지한다. 안정화 확인 후 Vercel 정리를 진행한다.

현재 구현 완료로 표시할 단계는 없다. 계정 인증, 분석 설정값, 실제 DNS 현황은 해당 배포 단계에서 확인하며 초기 기술 결정 질문으로 다시 묻지 않는다.

## 10. 공식 참고 자료

- Nuxt 정적 생성: https://github.com/nuxt/nuxt/blob/4.x/docs/1.getting-started/15.prerendering.md
- Nuxt Image 정적 이미지: https://image.nuxt.com/advanced/static-images
- Pages 리다이렉트: https://developers.cloudflare.com/pages/configuration/redirects/
- Pages 404와 파일 제공: https://developers.cloudflare.com/pages/configuration/serving-pages/

설치·구현 시 선택한 Nuxt 4 버전에 맞는 공식 문서를 확인한다. Cloudflare의 일반 Nuxt 예제를 사용할 때도 이번 프로젝트의 정적 생성 목적에 맞춰 빌드 명령·출력물을 검증한다.
