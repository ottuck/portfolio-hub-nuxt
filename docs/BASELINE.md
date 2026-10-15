# 기존 코드 조사와 비교 기준

조사일: 2026-10-15 (Asia/Seoul)

## 원본

- 저장소: https://github.com/ottuck/portfolio-hub
- 확인한 커밋: `5d2aa962632c036626bce867c2de979ae98f57a4`
- 커밋 링크: https://github.com/ottuck/portfolio-hub/tree/5d2aa962632c036626bce867c2de979ae98f57a4
- 운영 사이트: https://www.portfolio-hub.dev/ko
- 운영 사이트는 브라우저로 홈 화면과 링크·콘텐츠를 확인했다. 배포 커밋이 위 커밋과 동일한지는 확인하지 않았다.
- 원본 빌드, 타입 검사, lint는 아직 실행하지 않았다. 전체 사이트 화면 비교와 모바일·다크모드 실측도 아직 수행하지 않았다.

## 실제 확인한 스택

`package.json` 기준 Next.js 16.3.6, React/React DOM 19.2.8, TypeScript, Tailwind CSS 4, Geist, pnpm 10.33.0이다. 원본 CI는 Node 22를 사용한다.

백엔드·DB·CMS는 없지만 `next.config.ts`에는 `output: 'export'`가 없고 기본 `next/image` 최적화를 사용한다. 기존 서비스의 페이지 정적 생성과 모든 요청 기능의 정적 파일 제공은 구분해야 한다.

## 재사용 및 변환 대상

| 원본 위치 | 역할 | 새 구현 |
| --- | --- | --- |
| `src/content/site.ts` | 프로필, 링크, 도메인, 환경별 URL | 데이터 보존, Vercel 환경 의존 교체 |
| `src/content/projects/` | 영문·일문·한글 프로젝트와 이미지 | 데이터 재사용, 이미지 import 메타데이터 변환 |
| `src/i18n/dictionaries.ts` | UI 문자열 | 재사용 |
| `src/i18n/locales.ts` | locale·경로·hreflang 유틸리티 | 재사용 |
| `src/lib/projects.ts` | 검증, 정렬, 번역 병합, 병합 프로젝트 | 로직 재사용 |
| `src/lib/types.ts` | 콘텐츠 타입 | `StaticImageData` 제거 |
| `src/app/globals.css` | Tailwind, 색상 토큰, CJK 규칙 | CSS 재사용 |
| `src/views/`, `src/components/` | 화면과 React 컴포넌트 | Vue SFC로 이전 |
| `src/views/metadata.ts`, `root-shell.tsx` | 공통 SEO·폰트·테마·레이아웃 | Nuxt head·레이아웃으로 이전 |
| `src/lib/og.tsx`, 각 `opengraph-image.tsx` | 1200×630 영문 OG | 빌드 시 이미지 생성으로 이전 |
| `src/app/sitemap.ts`, `robots.ts` | SEO 파일 | 정적 생성 |
| `next.config.ts` | 전역 404 및 리다이렉트 | 정적 404·Pages 규칙 |
| `.github/workflows/ci.yml` | lint·typecheck·build | Nuxt 검사·generate로 교체 |

## 페이지와 정렬

- 프로젝트 slug: `ur-check`, `puny-chat`, `gitleaf`, `quant-lab`, `pokepedia`, `ur-manager`, `ur-mcp`.
- `ur-manager`, `ur-mcp`는 `mergedInto: 'ur-check'`이며 목록과 이전/다음 링크에서 빠지지만 개별 상세 페이지는 유지된다.
- `getSlugs()`는 숨겨진 프로젝트를 포함한다. `getProjects()`는 목록 표시용이다.
- 언어별 홈·프로젝트 목록·About·상세 7개 = 10개, 세 언어 총 30개다.
- 홈 브라우저 확인 순서는 Puny Chat, UR Check, GitLeaf, Quant Lab, Pokepedia다.
- 경로 목록은 `routes.json`에 기록했다. 404, OG, sitemap, robots, 이미지 파일과 리다이렉트는 30개에 포함되지 않는다.

## 원본 동작의 세부 조건

- 영어는 `/`, 일본어는 `/ja`, 한국어는 `/ko`다.
- 각 언어의 HTML lang과 canonical, en/ja/ko/x-default 대체 링크가 필요하다.
- 현재 Preview는 Vercel 환경변수에 따라 자체 URL을 사용한다. 새 구현에서는 Production canonical + Preview noindex로 정책을 명시적으로 변경한다.
- `theme` localStorage 키, `data-theme` 속성, system/light/dark 선택과 페인트 전 초기화 스크립트를 사용한다.
- 시계는 `Asia/Tokyo`, 브라우저에서 시작하고 15초 간격으로 갱신한다. 서버 스냅샷은 비어 있다.
- 언어 메뉴는 같은 페이지의 언어 경로로 이동한다. Escape 및 외부 클릭으로 닫힌다.
- OG 이미지는 CJK 글리프가 없는 기존 폰트 때문에 영문 공용이다.
- 기존 redirect는 `/projects/buddy-chat`과 그 하위 경로를 puny-chat으로, `/projects/trading-bot`과 그 하위 경로를 quant-lab으로 이동시킨다. 언어 접두사가 붙은 규칙은 없다.

## 참고 화면

- `reference/user-home-overview.png`: 사용자가 제공한 전체 홈 참고 화면
- `reference/user-home-desktop.png`: 사용자가 제공한 넓은 화면 참고 이미지

두 이미지의 촬영 viewport·브라우저 배율은 확인되지 않았다. 동일 viewport에서 원본과 새 사이트를 비교해야 한다. 참고 화면에는 라이트모드 홈만 있으므로 상세·About·다크모드·실제 모바일은 추가 확인한다.
