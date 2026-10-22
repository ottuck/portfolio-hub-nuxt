# 구현과 검증 결과

기준일: 2026-10-23 (Asia/Seoul)

## Henry Wallet 데모 링크 추가 (2026-10-23)

- 사용자 요청에 따라 Henry Wallet에 예시 데이터로 도는 웹 데모 `https://wallet.portfolio-hub.dev`를 `links.live`로 걸었다. 문구는 다른 데모와 같게 "Try the demo"·"데모 보기"·"デモを見る"다. 저장소는 비공개라 GitHub 링크는 넣지 않았다.
- `docs/baseline.json`은 세 언어의 홈·프로젝트 목록·Henry Wallet 상세 9개 경로만 바뀌었다. 변경은 데모 링크와 그 문구뿐이다.
- 로컬 Node 26.7.0에서 `pnpm lint`, `pnpm typecheck`, `pnpm generate`(33개 페이지, 381개 자산 검증), `pnpm test:pages`가 통과했다.

## Puny Chat 갤러리 언어 섞기 (2026-10-22)

- 사용자 요청에 따라 갤러리 4장을 장면마다 채팅 언어가 다르게 바꿨다(Lv.10 한국어, Lv.20 직업 영어, 온천 일본어, 눈 온천 중국어 번체). 장면은 그대로이고 세 언어 페이지가 같은 4장을 쓴다. 이미지 원본은 바로 아래 재촬영 때 찍은 16장 중 4장이다.
- alt에 각 장면의 채팅 언어를 세 언어로 적었고, `docs/baseline.json`은 Puny Chat 상세 3개 경로의 alt만 바뀌었다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지, 381개 자산 검증), `pnpm test:pages`가 통과했다.

## Puny Chat 스크린샷 재촬영 (2026-10-22)

- 사용자 요청에 따라 `ottuck/puny-chat`을 임시 폴더에 받아 Expo 웹 개발 서버로 띄우고, 기존 갤러리와 같은 4장면(Lv.10 어린이, Lv.20 직업 장치의 어른, 온천, 눈 오는 온천)을 구경하기 데모 대본으로 다시 찍었다. 임시 사본에서만 데모 화면에 장면 선택 주소값(단계·레벨·직업·온천·눈, 배속·멈춤 시점)을 더했고, Firebase 설정은 형식만 맞춘 가짜 값을 `.env.local`에 두었다. 원래 저장소에는 아무것도 올리지 않았다.
- headless Chrome에서 390×844 2x(780×1688), 페이지 안의 시계는 오후 12:00으로 고정해 낮 화면으로 찍었다. 한국어·영어·일본어·중국어(번체) 16장은 사용자 다운로드 폴더(`Downloads/puny-chat-screenshots/<언어>`)에 PNG로 저장했다.
- 포트폴리오 갤러리 4장은 기존처럼 한국어 화면으로 교체했다(WebP 품질 88, 크기 동일). Lv.10 장면에 말풍선이 없어져 그 alt만 세 언어로 고쳤고, `docs/baseline.json`은 Puny Chat 상세 3개 경로의 alt만 바뀌었다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지, 381개 자산 검증), `pnpm test:pages`가 통과했다.

## Quant Lab·UR Check 스크린샷 재촬영과 구성도 내보내기 (2026-10-22)

- 두 앱의 UI가 바뀌어 라이브 데모(`demo.trading-lab.me`, `demo.ur-check.com`)에서 같은 구성의 화면을 headless Chrome(DevTools 프로토콜)으로 다시 찍었다. 데스크톱은 1280×800 1x, 휴대폰은 390×844 2x(780×1688), 라이트 테마다. Quant Lab은 기존처럼 한국어, UR Check은 사용자 요청대로 일본어 화면이다. WebP 품질 88로 저장했고 크기는 기존과 같다.
- 화면이 바뀐 이미지의 alt만 세 언어로 고쳤다(Quant Lab 홈·질문·AI 봇, UR Check 조건 만들기·모집 중 물건). `docs/baseline.json`은 홈·목록·두 상세의 alt만 바뀌었다.
- `pnpm diagrams`(`scripts/export-diagrams.ts`)를 추가해 6개 구성도를 `docs/architecture/<slug>.svg`와 2x PNG로 내보냈다(Geist 글꼴, 페이지의 라이트 색). resvg가 `orient="auto-start-reverse"`를 지원하지 않아 내보내기에서는 시작·끝 화살촉을 따로 정의했다. 같은 파일을 사용자 다운로드 폴더(`Downloads/portfolio-architecture`)에도 복사했다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지, 381개 자산 검증), `pnpm test:pages`가 통과했다.

## 프로젝트 구성도 추가 (2026-10-22)

- 사용자 요청에 따라 GitLeaf·Pokepedia·Henry Wallet·Quant Lab·UR Check·Puny Chat 상세 페이지에 구성도 섹션(Architecture · 構成図 · 구성도)을 기술 구성 위에 추가했다. 각 저장소 README의 다이어그램(GitLeaf `docs/architecture.svg`, 나머지는 mermaid)을 바탕으로 하되, GitLeaf SVG의 모양(둥근 상자, 알약 라벨, 실선·점선 화살표, 세이지·샌드 색)으로 다시 배치했다. Pokepedia에는 Unity 배틀(별도 저장소)을 더했다.
- `Project.architecture`(상자 위치·화살표 경로 데이터)를 추가했다. 사용자 요청에 따라 구성도의 문구와 요약은 영어로 통일해 세 언어 페이지에서 같이 쓰고, 섹션 제목만 언어별 사전을 따른다. 빌드는 화살표가 없는 상자를 가리키면 실패한다. `ProjectDiagram.vue`가 인라인 SVG로 그려 라이트/다크를 따르고, 휴대폰에서는 구성도 영역만 가로로 스크롤된다(최소 680px).
- SVG 안의 `<title>` 때문에 `verify-static.ts`·`verify-http.ts`의 제목 검사를 `head > title`로 좁혔다.
- GitLeaf 갤러리의 구성도 스크린샷(`how.webp`)은 새 구성도와 내용이 같아 갤러리와 파일에서 뺐다.
- `docs/baseline.json`은 상세 18개 경로의 본문(구성도 문구 추가)과 GitLeaf 3개 경로의 갤러리 alt만 바뀌었다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지, 381개 자산 검증), `pnpm test:pages`를 실행했다. 로컬 미리보기에서 6개 구성도, GitLeaf 다크 모드, 375px 폭에서 페이지 가로 넘침이 없는 것을 확인했다.

## Henry Wallet 스크린샷 교체 (2026-10-22)

- 앱 UI가 바뀌어 사용자가 준 새 스크린샷 6장(924×2000 WebP)으로 갤러리 이미지를 교체하고(WebP 품질 90), 표지는 같은 방식(홈·서명 전 확인·보낸 뒤 화면, 1280×800)으로 다시 합성했다. 문구와 alt는 새 화면에도 맞아 바꾸지 않았다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지 검증, baseline 변화 없음), `pnpm test:pages`가 통과했다.

## Henry Wallet 표지 톤 조정과 글쓰기 원칙 (2026-10-22)

- 표지 배경이 다른 프로젝트보다 튄다는 사용자 의견에 따라 `cover.tint`를 `#e3e9fb → #bccbf5`(채도 약 75%)에서 `#e8eaf3 → #c5cbdd`(약 30%)로 낮추고, 합성 표지의 바탕도 `#e6ebf7`에서 `#eceef3`으로 바꿨다. Quant Lab·UR Check 카드와 나란히 합성해 톤을 비교했다.
- `AGENTS.md`에 "프로젝트 글쓰기" 원칙(면접 말투 금지, 첫 문장은 무엇인지부터, 소개는 짧게·기술은 기능과 기술 구성으로, "공부용" 대신 "사이드 프로젝트", 표지 채도)을 추가했다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지 검증, baseline 변화 없음), `pnpm test:pages`가 통과했다.

## Henry Wallet 공개 (2026-10-22)

- 사용자 요청에 따라 초안이던 Henry Wallet을 목록에 공개했다. `unlisted`를 지우고 `docs/routes.json`에 세 언어 상세 3개를 더해 콘텐츠 경로는 33개다. `unlisted` 기능은 남겨 두었다(현재 해당 프로젝트 없음).
- 상태 `testing`(Testing · テスト中 · 테스트 중, 하늘색 점)을 추가했다. 정렬 순위는 운영 중 다음이라 홈·목록에서 운영 중인 프로젝트 뒤, 마지막 카드로 나온다. 기존 카드 순서는 그대로다. 라벨은 Side project · 個人開発 · 사이드 프로젝트다.
- 소개를 담백한 세 문단(어떤 지갑인지, 서버 없이 휴대폰에서 끝나는 구조, 지금 테스트넷에서 쓰는 중)으로 다시 썼고, summary와 각주에서 "학습용" 표현을 뺐다.
- `docs/baseline.json`에 새 경로 3개를 리뷰한 생성 결과로 추가했다(원본 OG URL 없음). 기존 경로 중 바뀐 것은 세 언어의 홈·목록(카드 추가)과 Pokepedia 상세(다음 링크 추가) 9개이며, 추가 외의 변경은 없다. `verify-static.ts`의 sitemap 개수와 `verify-http.ts`의 메시지는 `routes.length`를 쓴다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(33개 페이지, 388개 자산, 9개 OG 이미지 검증), `pnpm test:pages`(33개 경로)가 통과했다. 로컬 미리보기에서 한국어 목록의 카드 순서와 상세 페이지 소개를 확인했다.

## Henry Wallet 소개 문단 정리 (2026-10-22)

- 소개가 기술 나열 같다는 사용자 의견에 따라 소개를 동기와 지갑의 성격만 담은 두 문단으로 줄였다. Keychain·개인 키 미저장·세 단어 확인은 "만들기·가져오기"와 "송금마다 Face ID" 기능 설명으로, 웹 데모 스크린샷이라는 안내는 각주로 옮겼다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(30개 페이지, 초안 3개 검증), `pnpm test:pages`가 통과했다.

## Henry Wallet 초안 페이지 추가 (2026-10-22)

- 사용자 요청에 따라 `ottuck/stable-wallet`(Henry Wallet)의 소개 페이지를 메인 목록에 합치지 않고 미리 작성했다. 저장소는 비공개라 GitHub 링크를 두지 않았고, 원고는 저장소의 README·`docs/PROJECT.md`·`docs/ROADMAP.md` 기준이다. 아직 확인되지 않은 항목(MetaMask와 같은 주소, iOS 스크린샷 차단)은 확정된 것처럼 쓰지 않았다.
- `Project.unlisted`를 추가했다. 초안 페이지는 `/projects/henry-wallet`과 `/ja`·`/ko` 경로로 생성되지만 홈·프로젝트 목록·이전/다음 링크·sitemap에서 빠지고 `robots: noindex`가 붙는다. 링크가 없어 크롤러가 찾지 못하므로 `pnpm assets`가 `app/generated/unlisted-routes.json`을 만들고 `nuxt.config.ts`가 prerender 경로에 더한다(설정에서 콘텐츠를 직접 import하면 `~` 별칭 때문에 typecheck가 깨진다).
- `scripts/verify-static.ts`가 초안 페이지의 noindex와 본문을 확인한다. 기존 30개 경로의 baseline은 바뀌지 않았다. OG 이미지는 초안 프로젝트 몫까지 9개가 생성된다.
- 이미지는 사용자가 준 웹 데모 스크린샷 6장을 WebP(품질 90)로 바꿨다. 표지는 홈·서명 전 확인·보낸 뒤 화면을 1280×800 한 장으로 합성했고, 카드용 inset은 환영 화면이다.
- 공개할 때는 `unlisted`를 지우고 `docs/routes.json`·`docs/baseline.json`에 세 경로를 추가하고, `verify-static.ts`의 sitemap 개수(30)를 고친다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(30개 페이지, 314개 자산, 초안 3개, 9개 OG 이미지 검증), `pnpm test:pages`가 통과했다. 로컬 미리보기에서 한국어 상세 페이지의 표지·정보·소개·갤러리를 확인했다.

## Puny Chat GitHub 링크 제거 (2026-10-20)

- 출시할 제품이라 저장소를 비공개로 유지한다는 사용자 요청에 따라 Puny Chat의 `links.github`를 지웠다. 목록 카드의 GitHub 링크, 상세 페이지 GitHub 버튼, JSON-LD `codeRepository`가 함께 빠진다. 기술 구성의 "GitHub Actions" 표기는 CI 도구명이라 유지했다.
- `docs/baseline.json`은 세 언어의 홈·프로젝트 목록·Puny Chat 상세 9개 경로만 갱신했다. 변경은 위 링크와 링크 문구뿐이다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(30개 페이지, 314개 자산, 8개 OG 이미지 검증), `pnpm test:pages`가 통과했다.

## Pokepedia에 Unity 저장소 링크 추가 (2026-10-19)

- `ottuck/pokepedia-unity`가 공개로 바뀐 것을 `gh repo view`로 확인하고, 상세 페이지의 GitHub 버튼 뒤에 `GitHub · Unity` 버튼을 추가했다. 링크 데이터는 `links.repos`(추가 저장소 목록, 라벨은 언어 공통)로 두었고, 목록 카드의 GitHub 링크와 JSON-LD `codeRepository`는 웹 저장소 그대로다.
- `docs/baseline.json`은 세 언어의 Pokepedia 상세 3개 경로만 갱신했다. 변경은 본문 버튼 문구와 링크 1개다.
- 로컬 Node 26.7.0에서 `pnpm check`, `pnpm generate`(30개 페이지, 314개 자산, 8개 OG 이미지 검증), `pnpm test:pages`가 통과했다.

## Pokepedia에 Unity 배틀 추가 소개 (2026-10-18)

- 사용자 요청으로 PR 14의 구성을 되돌린 뒤 다시 작성했다. 기존 웹 앱 소개와 이미지는 그대로 두고, C# 학습과 Unity 경험을 위해 별도 저장소(`pokepedia-unity`)로 만든 배틀을 뒤에 덧붙이는 흐름으로 세 언어의 요약·소개·기능을 갱신했다.
- 기술 구성은 웹(`pokepedia`)과 배틀(`pokepedia-unity`)을 나눠 적었다. 당시 Unity 저장소가 비공개여서 GitHub 링크는 웹 저장소만 유지했다(2026-10-19 공개 후 추가). 카드 기술 목록의 TypeScript를 Unity로 바꿨다.
- 대표·인셋·기존 갤러리 이미지 4개는 바꾸지 않았다. 사용자가 제공한 Unity 배틀 스크린샷(471×421)을 도트가 유지되도록 최근접 2배 확대한 무손실 WebP로 갤러리 마지막에 추가했다.
- Pokepedia가 보이는 9개 페이지의 본문·alt와 상세 3개의 description·OG/Twitter 설명·JSON-LD 기대값을 생성 결과와 대조해 갱신했다. 나머지 21개 페이지와 모든 링크·canonical·hreflang 기대값은 유지한다.
- 로컬 Node 26.7.0(엔진 요구 24.x와 다름)에서 lint·typecheck, 정적 생성 후 30개 페이지·참조 자산 314개·OG 8개·sitemap·robots·정적 404 검사, 로컬 Pages HTTP 검사를 통과했다. 로컬 Pages 1280px에서 한국어 상세의 갤러리 5장 로딩을 확인했다. Node 24 기준 결과는 PR CI를 따른다.

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
- 2026-10-18 운영 도메인에서 홈·목록·상세·About·다른 언어 사이를 앱 내부 이동으로 18회 반복했다. 해제되지 않은 interval·window/document 리스너가 남지 않았고, 이미지·payload 요청은 모두 200이었다. 한국어 Pokepedia 상세를 직접 열었을 때 CLS는 0이었고, 모든 이미지에 width·height가 지정되어 있었다.
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
