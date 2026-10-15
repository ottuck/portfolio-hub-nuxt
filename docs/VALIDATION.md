# 구현과 검증 결과

기준일: 2026-10-15 (Asia/Seoul)

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
- OG 구성은 실제 생성 PNG와 원본 PNG를 열어 비교했다. 새 Satori의 기본 박스 계산 차이는 명시적 border-box로 보정했다.
- 화면과 반응형 측정은 `docs/qa/`에 저장했다. 모든 언어·모든 페이지·모든 브라우저에 대한 픽셀 단위 비교를 수행한 것은 아니다.

## GitHub 작업

| 브랜치 | PR | 상태 |
| --- | --- | --- |
| `feat/nuxt-foundation` | #1 | CI 통과 후 main 병합 |
| `feat/vue-ui` | #2 | CI 통과 후 main 병합 |
| `feat/static-seo-validation` | #3 | CI 통과 후 main 병합 |
| `chore/pages-deployment` | #4 예정 | 실제 Pages 배포·설정·검증 기록 |

초기 문서 커밋으로 main을 만든 뒤, 구현은 단계별 작업 브랜치와 PR로 진행한다. 배포 상태와 도메인 전환 상태는 `DEPLOYMENT.md`에 별도로 기록한다.
