# Cloudflare Pages 배포와 도메인 전환

기준일: 2026-10-15 (Asia/Seoul)

## 배포 설정

- GitHub: `ottuck/portfolio-hub-nuxt`, 비공개.
- Pages: `portfolio-hub-nuxt`, Production branch `main` 자동 배포, 작업 브랜치 Preview.
- Build: `pnpm generate`, output `.output/public`, Node `24.22.0`, pnpm `10.33.0`.
- 요청 시 Worker·Pages Functions·Node 서버 없이 정적 파일만 제공한다.
- `wrangler.jsonc`를 배포 설정의 기준으로 사용한다. `vars`에 운영 Node/pnpm과 `NUXT_PUBLIC_ASSET_URL=https://www.portfolio-hub.dev`를 두고, `env.preview.vars`에서는 Node/pnpm만 지정하여 Preview OG가 `CF_PAGES_URL`을 사용하게 한다.
- Wrangler 파일을 도입하면 대시보드의 일반 환경변수가 빌드에 전달되지 않을 수 있다. 실제 빌드 로그의 `Build environment variables`와 생성 HTML을 함께 확인한다. 비밀값은 이 파일에 넣지 않는다.

## URL과 색인

- canonical·hreflang·sitemap은 `https://www.portfolio-hub.dev`를 기준으로 유지한다.
- Preview와 Production의 Pages 기본 도메인은 `X-Robots-Tag: noindex`로 색인을 막는다. 운영 커스텀 도메인의 정상 콘텐츠는 색인을 허용한다.
- OG는 운영 도메인 또는 해당 Preview의 실제 정적 PNG를 가리킨다.
- Web Analytics는 Pages 자동 주입으로 활성화했다. 앱 코드에 별도 beacon을 삽입하지 않는다.

## 실제 확인한 결과

PR #4 Preview와 main에서 30개 페이지·OG·308·쿼리 보존·7개 미등록 경로의 실제 404·기존 OG 주소 HTTP 검사가 통과했다. 첫 배포에서 자동 Nitro 어댑터가 출력 경로를 바꾸는 문제를 발견하여 정적 프리셋을 명시했고, API에서 `uses_functions: false`를 확인했다.

PR #5의 main 배포 `6e8ed592`(커밋 `31c4d68`)도 HTTP 검사 전체를 통과했다. 30개 콘텐츠 응답에서 Analytics beacon 1회 주입, Pages 도메인 noindex, 운영 OG 주소를 확인했다. `qa/pages-production-checks.json`에 결과를 보관했다. 이 과정에서 Wrangler 설정의 환경변수 우선순위를 확인하여 운영 변수도 파일에서 관리하도록 맞췄다.

Web Analytics는 사용자의 대시보드 로그인 후 Pages Metrics에서 활성화했으며, 이후 실제 배포에서 단일 주입을 확인했다. 활성화 화면은 `qa/cloudflare-analytics-enabled.jpg`에 있다. 대시보드의 집계 데이터가 나타날 때까지의 지연을 실시간 방문자 수로 단정하지 않는다.

## DNS 전환과 복구

- 도메인 등록 기관과 DNS는 Vercel을 유지한다. 네임서버는 `ns1.vercel-dns.com`, `ns2.vercel-dns.com`이다.
- `www` CNAME을 `portfolio-hub-nuxt.pages.dev`로 추가했다(TTL 60). 공용 DNS와 Cloudflare의 DNS 소유 확인이 통과했으며 인증서 활성화를 확인 중이다.
- 루트 ALIAS `fe7d24d3f4074e53.vercel-dns-017.com`과 wildcard ALIAS `cname.vercel-dns-017.com.`을 유지한다. 기존 루트 → `https://www.portfolio-hub.dev`의 308 및 경로·쿼리 보존도 유지한다.
- 기존 CAA(`pki.goog`, `sectigo.com`, `letsencrypt.org`)와 Vercel apex/wildcard HTTPS 레코드는 변경하지 않았다. 변경 전후 관찰 자료는 `qa/dns-before.*`, `qa/dns-after.json`에 있다.
- 기존 Vercel Production 커밋은 `5d2aa962632c036626bce867c2de979ae98f57a4`, 배포 주소는 `portfolio-1nkm07rdn-vison901-gmailcoms-projects.vercel.app`이다.
- 복구가 필요하면 www CNAME 대상을 `cname.vercel-dns-017.com`으로 바꾸고 HTTPS·본문·리다이렉트를 확인한다. Pages 배포 자체의 회귀는 이전 성공 배포로 롤백할 수도 있다.
- apex 리다이렉트를 기존 Vercel 프로젝트가 제공한다. 리다이렉트 제공처를 별도로 이전하기 전에는 이 프로젝트를 삭제하지 않는다. 기존 Next.js 저장소와 배포도 복구용으로 유지한다.

## 이후 변경 시 검사

CI 통과와 Preview 확인 후 main에 병합한다. main 배포 성공을 확인한 다음 `pnpm test:http https://www.portfolio-hub.dev`와 브라우저 확인을 수행한다. 30개 경로 외에 정적 이미지·OG·sitemap·robots·308·쿼리·404·Analytics·색인 헤더를 함께 확인한다.

공식 참고: [Pages 설정 파일](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [외부 DNS와 커스텀 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Web Analytics 자동 주입](https://developers.cloudflare.com/pages/how-to/web-analytics/).
