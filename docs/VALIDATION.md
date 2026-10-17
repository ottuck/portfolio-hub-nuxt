# 구현과 검증 결과

기준일: 2026-10-17 (Asia/Seoul)

## 프로젝트 소개 문구 정리 (2026-10-17)

- 사용자 요청으로 GitLeaf 한국어 카드·요약·소개·기능·각주의 번역투와 어색한 표현을 다듬었다.
- UR Manager·UR MCP App은 세 언어 모두 요약에 별도 운영 종료를 명시하고, 소개를 UR Check 통합 안내 한 문장으로 줄였다. 기능은 과거형으로 쓴 핵심 두 항목만 남겼다. UR Check의 이전 프로젝트 카드도 짧은 설명을 사용한다.
- 변경한 12개 페이지의 본문과 관련 description·OG/Twitter 설명·JSON-LD 기대값을 갱신했다. 이미지·alt·링크·경로·기술 구성·정렬은 유지한다.
- Node 24.22.0·pnpm 10.33.0에서 `pnpm check`(lint·typecheck)를 통과했다. CI·Preview·운영 검증 결과는 해당 변경 PR의 검사·배포 기록을 따른다.

## 사용자 요청에 따른 콘텐츠 변경 (2026-10-16)

- 전체 7개 프로젝트의 영문·일문·한글 상세에서 개발 노트 섹션과 해당 콘텐츠를 삭제했다. 통합된 이전 프로젝트도 포함한다.
- 공통 상세 컴포넌트, 번역 사전, 콘텐츠 타입과 검증에서 개발 노트 항목을 제거했다.
- `docs/baseline.json`의 21개 상세 본문 기대값에서 기존 개발 노트 제목과 본문만 정확히 제거했다. 그 외 본문·링크·이미지·SEO 기대값은 유지한다. 아래 원본 대조 기록과 `docs/qa/` 화면 자료는 삭제 이전의 마이그레이션 검증 이력이다.
- Node 24.22.0·pnpm 10.33.0에서 frozen lockfile 설치, `pnpm check`(lint·typecheck), `pnpm generate`(정적 생성·출력물 검증)를 통과했다. 전체 30개 페이지 본문·링크·alt·SEO, 참조 자산 306개, OG 8개, sitemap·robots·다국어 정적 404를 확인했다.
- `pnpm test:pages`도 통과했다. 로컬 Pages에서 30개 콘텐츠·OG, 기존 경로와 하위 경로의 308·쿼리 보존, 미등록 경로 7개의 실제 404, 이전 OG URL 호환을 확인했다.
- PR #10의 CI·Preview 검사 통과 후 main에 병합했다. main 커밋 `2d0e4ef`의 CI와 Pages 운영 배포 `f2c47b6e-8072-4ab1-b61a-cbde8dfca705`가 성공했다.
- Preview와 운영 도메인에서 `pnpm test:http` 전체를 통과했다. 별도 HTTP 대조에서 30개 페이지의 본문·링크·alt와 자산 310개, sitemap·robots, Analytics 단일 주입, Preview noindex·운영 색인 허용을 확인했다. 전체 21개 프로젝트 상세에 개발 노트가 없다. 기록은 `docs/qa/development-notes-preview.json`, `docs/qa/development-notes-production.json`이다.
- 브라우저에서 Preview Puny Chat의 하단 레이아웃과 운영 Puny Chat 직접 접속·UR Check로의 내부 탐색을 확인했다. 기술 구성 다음에 이전 프로젝트가 이어지는 운영 화면을 `docs/qa/development-notes-production.png`에 보관했다.

## 완료한 구현

- Nuxt 4.6.1, Vue 3.5.44, Nuxt Image 2.1.0, Tailwind CSS 4.3.3.
- Node 24.22.0, pnpm 10.33.0을 고정했다. Vue Router는 Nuxt가 사용하는 5.x와 일치시켰다.
- 원본 프로젝트 데이터, 3개 언어 번역, 검증·정렬·병합 로직, 이미지 34개, Geist 폰트와 CSS를 재사용했다.
- Geist 패키지의 Next.js/React peer dependency를 피하기 위해 사용 폰트 파일과 SIL Open Font License를 직접 보관한다. 폰트 변경 시 브라우저용 `public/fonts/`와 OG용 `assets/og-fonts/`를 함께 확인한다.
- 홈·목록·상세·About·오류 화면과 헤더·푸터·언어 전환·테마·시계를 Vue SFC로 이전했다.
- 숨겨진 프로젝트를 포함한 30개 콘텐츠 URL을 명시적으로 생성한다.
- 원본 콘텐츠는 유지했고 푸터의 구현 기술·호스팅 표기만 새 스택으로 바꿨다.
- Nuxt Image가 최종 이미지와 srcset을 SSR HTML에 출력한다. 저해상도 미리보기는 CSS 배경의 작은 data URL로 제공하여, JavaScript 없이도 최종 이미지를 보고 브라우저의 lazy loading을 유지할 수 있다.
- OG PNG 8개, sitemap 30개 항목, robots, 기존 308과 OG URL 호환 규칙을 생성·제공한다.
- HTML은 경로별 `.html` 파일로 생성해 Pages의 확장자 없는 URL 제공을 사용한다. 불필요한 trailing slash 이동을 피한다.
- 영문·일문·한글 정적 404 문서를 제공하며 200 SPA fallback을 제거했다.
- Cloudflare에서 자동 선택되는 Nitro 어댑터가 출력물을 `dist`로 바꾸고 SPA fallback을 추가하는 것을 실제 첫 배포에서 확인했다. Production은 `static` 프리셋으로 고정하고, 개발 서버만 `node-server`로 설정했다. CI도 CF_PAGES 환경변수를 주어 이 차이를 검사한다.

## 자동 검사

아래 검사는 로컬 Node 24.22.0 환경에서 통과했다.

| 검사 | 결과 |
| --- | --- |
| 원본 `pnpm check` 및 `pnpm build` | 통과 |
| 새 프로젝트 lint·Nuxt typecheck·스크립트 TypeScript 검사 | 통과 |
| 정적 generate 및 빌드 후 검사 | 통과 |
| 30개 페이지 원본 대비 검사 | 본문, 내부·외부 링크, 이미지 alt, title, description, canonical, hreflang, 기존 OG/Twitter 텍스트, JSON-LD 일치 |
| 정적 자산 참조 검사 | HTML·srcset·OG에서 참조하는 자산 306개 존재 확인 |
| OG·sitemap·robots | 1200×630 PNG 8개, 콘텐츠 URL 30개 및 언어 대체 링크, sitemap 위치 확인 |
| 로컬 Pages HTTP 검사 | 30개 경로와 OG 정상 응답, 기존 URL 및 하위 경로 308·쿼리 보존, 없는 경로 7개 실제 404, 기존 OG 주소 호환 통과 |

`docs/baseline.json`은 원본 Next.js 빌드에서 추출한 비교 자료다. 마이그레이션 중에는 새 구현에 맞춰 이 자료를 바꾸지 않는다. 이후 사용자가 콘텐츠를 의도적으로 갱신할 때에는 해당 기대값과 변경 이유를 함께 검토해야 한다. 원본 목록·About에서 누락되었던 OG 이미지 메타데이터는 새 구현에서 공용 사이트 이미지로 제공한다.

## 브라우저 확인

- 홈 프로젝트 카드 5개의 x/y 위치·너비·높이가 원본과 1440px 및 390px에서 일치했다.
- 390px·768px에서 홈, 목록, 상세, 병합된 프로젝트, About을 세 언어에 걸쳐 확인했다. 기록한 12개 조합에 가로 넘침이 없었다.
- 한국어 상세에서 같은 프로젝트의 일본어 페이지로 이동하고 HTML lang과 canonical 변경을 확인했다.
- 시스템 → 라이트 → 다크 → 시스템 전환 및 새로고침 후 저장 설정 유지를 확인했다.
- 확인한 브라우저 로그에 hydration 경고가 없었다.
- 실제 Preview의 한국어 목록·About·Puny Chat 상세를 원본과 1280px에서 대조했다. 카드·본문·주요 이미지의 배치와 크기가 일치했으며, 리사이즈 이미지 한 곳의 높이 반올림 차이는 0.2px였다. About과 상세 측정값을 `docs/qa/*-geometry.json`에 보관했다.
- 배포본에서 메뉴 외부 클릭 닫기, Escape 닫기·트리거로 포커스 복귀, 키보드 포커스의 주황색 2px outline을 확인했다. 언어 메뉴 리스너와 시계 interval은 컴포넌트 해제 시 정리하는 코드를 확인했다.
- OG 구성은 실제 생성 PNG와 원본 PNG를 열어 비교했다. 새 Satori의 기본 박스 계산 차이는 명시적 border-box로 보정했다.
- 화면과 반응형 측정은 `docs/qa/`에 저장했다. 모든 언어·모든 페이지·모든 브라우저에 대한 픽셀 단위 비교를 수행한 것은 아니다.

## GitHub 작업

| 브랜치 | PR | 상태 |
| --- | --- | --- |
| `feat/nuxt-foundation` | #1 | CI 통과 후 main 병합 |
| `feat/vue-ui` | #2 | CI 통과 후 main 병합 |
| `feat/static-seo-validation` | #3 | CI 통과 후 main 병합 |
| `chore/pages-deployment` | #4 | CI·Preview 통과 후 main 병합, 실제 main 배포 및 HTTP 검사 통과 |
| `fix/static-asset-origin` | #5 | CI·Preview 통과 후 main 병합, 정적 생성 OG 자산 주소 회귀 검사 |
| `chore/production-domain` | #6 | 운영 변수·DNS 전환·최종 배포 기록 |
| `docs/nuxt-architecture-guide` | #7 | 초보자용 Next·Nuxt 구조 비교, CI·Preview 통과 후 main 병합 |
| `chore/remove-vercel-project` | #8 | DNS·apex redirect 이전, CI·Preview 통과 후 main 병합 |

초기 문서 커밋으로 main을 만든 뒤, 구현은 단계별 작업 브랜치와 PR로 진행한다. 배포 상태와 도메인 전환 상태는 `DEPLOYMENT.md`에 별도로 기록한다.

## 실제 Cloudflare Preview

PR #4 커밋 `06ef19e`의 Preview `https://9c74fd3c.portfolio-hub-nuxt.pages.dev`에서 HTTP 검사 전체가 통과했다. `uses_functions: false`이며 이미지 변형도 정적 파일로 제공된다. 브라우저에서 홈 이미지 로딩, canonical의 운영 도메인, OG의 Preview 도메인을 확인했다. Web Analytics는 대시보드에서 활성화했고 이후 main 배포에서 실제 주입도 확인했다.

PR #4 병합 커밋 `eb01a05`의 실제 main 배포에서도 HTTP 검사 전체가 통과했고 서버 함수가 없었다. Analytics beacon 단일 주입과 기본 Pages 도메인의 noindex를 확인했다. 이때 `NUXT_PUBLIC_ASSET_URL`이 생성 HTML에 반영되지 않는 문제를 발견하여 PR #5에서 설정의 빌드 시 기본값에 명시적으로 적용했다. 회귀 검사가 수정 전 출력물에서 실패하는 것을 확인한 뒤, 같은 환경변수를 준 전체 lint·typecheck·generate·정적 검사를 통과했다. CI도 `CF_PAGES_URL`과 다른 명시적 자산 주소로 이 우선순위를 검사한다.

PR #5 main 배포에서는 Wrangler 파일이 대시보드 환경변수를 빌드에 전달하지 않는 것을 로그에서 확인했다. PR #6에서 운영 변수와 Preview 변수를 Wrangler에 명시하여 설정 기준을 일치시킨다. main 배포 `6e8ed592`의 30개 콘텐츠 응답은 운영 도메인 기준 OG, Analytics beacon 1회, Pages 도메인 noindex를 확인했으며 전체 HTTP 검사도 통과했다.

PR #6 Preview에서는 빈 `NUXT_PUBLIC_ASSET_URL`도 Nuxt 런타임 값을 덮어 OG URL 생성을 실패시키는 것을 확인했다. 운영 값은 `env.production.vars`에만 두고 Preview에서는 키 자체를 생략한다. 이 실패 배포는 main에 병합하거나 운영에 배포하지 않았다.

## 운영 도메인 전환

`www.portfolio-hub.dev`를 Pages로 CNAME 연결하고 Cloudflare 도메인·인증서의 Active 상태를 확인했다. 운영 도메인의 전체 HTTP 검사도 통과했다. 30개 콘텐츠 HTML 모두 Nuxt·Cloudflare 응답, 운영 OG 주소, Analytics beacon 1회, 색인 허용 상태였다. 정적 참조 자산 306개와 폰트·sitemap·robots를 합친 310개도 실제 운영 주소에서 정상 응답했다.

PR #6 시점에는 HTTP www → HTTPS www(301), HTTPS apex → HTTPS www(308)의 경로·쿼리 보존을 확인하고 기존 Vercel 배포를 유지했다. 이후 사용자의 삭제 요청에 따라 DNS와 apex 리다이렉트도 Cloudflare로 옮겼다. 새·이전 NS와 공용 resolver 총 6곳 및 실제 edge IP 4개의 HTTP·HTTPS 리다이렉트 32건을 검증했다. 사용자 실행 시점 확인을 받아 기존 Vercel 프로젝트를 삭제한 후 같은 검사와 Nuxt HTML 30개·Analytics 검사를 다시 통과했다. 프로젝트 설정 404, 기존 배포 410, 등록 도메인·자동 갱신 유지도 확인했다. 현재 상태와 확인 자료는 DEPLOYMENT.md와 `docs/qa/`를 따른다.
