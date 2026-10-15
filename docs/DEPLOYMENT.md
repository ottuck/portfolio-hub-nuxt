# Cloudflare Pages 배포와 도메인 전환

## 저장소와 빌드

- GitHub: `ottuck/portfolio-hub-nuxt`, 비공개
- Pages 프로젝트 이름: `portfolio-hub-nuxt`
- Production branch: `main`
- Build command: `pnpm generate`
- Output directory: `.output/public`
- Node: `24.22.0`
- pnpm: `10.33.0`
- Worker/Pages Functions: 사용하지 않음

Pages는 Git 연동 방식으로 구성한다. Direct Upload 전용 프로젝트로 먼저 만들지 않는다. GitHub의 Cloudflare 앱이 비공개 저장소를 읽을 수 있어야 한다. `main`의 자동 배포와 작업 브랜치 Preview 배포를 사용한다.

## URL과 색인

- canonical·hreflang·sitemap은 계속 `https://www.portfolio-hub.dev`를 기준으로 한다.
- Preview 빌드는 응답에 noindex를 적용한다. Production 빌드도 Pages 기본 도메인에는 noindex를 적용한다.
- Preview OG 주소는 `CF_PAGES_URL`을 이용해 실제 Preview 이미지로 연결한다.
- `NUXT_PUBLIC_ASSET_URL`을 설정하면 OG 이미지의 자산 도메인을 명시적으로 지정할 수 있다. 운영 도메인 전환 전 Pages Production을 검토할 때에는 `https://portfolio-hub-nuxt.pages.dev`를 지정하고, 실제 도메인을 전환할 때 `https://www.portfolio-hub.dev`로 변경해 재빌드한다.
- Web Analytics는 Pages의 자동 주입 방식으로 한 번만 적용한다. 앱 코드에 별도 beacon을 중복 삽입하지 않는다.

## 전환 순서

1. GitHub CI가 통과한 main을 Pages에서 빌드한다.
2. Pages URL에서 `pnpm test:http <배포 URL>`과 브라우저 확인을 수행한다.
3. 실제 배포에 Functions가 없고 이미지 변환 결과가 정적으로 제공되는지 확인한다.
4. Web Analytics를 활성화하고 beacon이 한 번만 주입되는지 확인한다.
5. 기존 Vercel의 배포·DNS 값을 복구 기준으로 기록한 뒤, Pages에 도메인을 연결하고 필요한 DNS를 전환한다.
6. `NUXT_PUBLIC_ASSET_URL`을 운영 도메인으로 맞춰 재빌드한다.
7. 최종 도메인의 HTTPS, www/apex 정규화, 30개 경로, SEO, 이미지, redirect, 404를 재검사한다.
8. 안정화 후 Vercel 정리를 진행한다.

도메인 전환이 끝나기 전에는 기존 운영 사이트를 계속 Vercel에서 제공한다. 로컬 Pages 검사 통과만으로 실제 배포나 DNS 전환이 끝났다고 기록하지 않는다.

## 현재 상태

Cloudflare Pages에 `portfolio-hub-nuxt`를 생성하고 GitHub 비공개 저장소와 연결했다. main의 자동 배포와 전체 작업 브랜치 Preview를 활성화했으며 Node/pnpm 버전과 빌드 명령·출력 디렉터리를 설정했다. 첫 main 배포는 플랫폼의 자동 Nitro 프리셋 선택으로 출력 경로가 달라져 실패했다. `chore/pages-deployment`에서 정적 프리셋을 명시하고 Cloudflare 환경을 재현한 빌드 검증을 추가했다. 기존 계정의 다른 Pages 프로젝트와 기존 운영 도메인·Vercel은 변경하지 않았다.

Production에는 도메인 전환 전 검토를 위해 `NUXT_PUBLIC_ASSET_URL=https://portfolio-hub-nuxt.pages.dev`를 지정했다. Web Analytics API 조회는 현재 CLI OAuth 권한으로 HTTP 403을 반환했다. Analytics 활성화는 아직 확인되지 않았으며 대시보드에서 별도로 완료해야 한다.
