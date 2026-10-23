# 배포

## 구성

- GitHub: `ottuck/portfolio-hub-nuxt` (비공개). 원본 Next.js 저장소 `ottuck/portfolio-hub`은 참고용으로 남겨 둔다.
- Cloudflare Pages 프로젝트 `portfolio-hub-nuxt`. Production branch는 `main`이고, 작업 브랜치는 Preview로 배포된다.
- 빌드 명령 `pnpm generate`, 출력 `.output/public`, Node `24.22.0`, pnpm `10.33.0`.
- 요청 시 Worker·Pages Functions·Node 서버 없이 정적 파일만 제공한다.

## 설정 파일

- 배포 설정의 기준은 `wrangler.jsonc`다. 공통 `vars`와 각 환경에 Node·pnpm 버전을 둔다.
- `NUXT_PUBLIC_ASSET_URL=https://www.portfolio-hub.dev`는 `env.production.vars`에만 둔다. Preview에서는 이 변수를 아예 생략해서 OG가 `CF_PAGES_URL`을 쓰게 한다. 빈 문자열도 Nuxt 런타임 값을 덮으므로 빈 값으로 두지 않는다.
- Wrangler 파일이 있으면 대시보드의 일반 환경변수가 빌드에 전달되지 않을 수 있다. 값을 바꿀 때는 빌드 로그의 `Build environment variables`와 생성된 HTML을 함께 본다.
- 비밀값과 Cloudflare 인증정보는 저장소에 넣지 않는다.

## 주소와 색인

- 운영 주소는 `https://www.portfolio-hub.dev`다. canonical·hreflang·sitemap은 항상 이 주소를 기준으로 한다.
- Preview와 Pages 기본 도메인(`*.pages.dev`)은 `X-Robots-Tag: noindex`로 색인을 막는다. 운영 도메인의 정상 콘텐츠에는 noindex가 없다.
- OG는 운영 도메인 또는 해당 Preview의 정적 PNG를 가리킨다.
- Web Analytics는 Pages 대시보드(Metrics)에서 켜서 자동 주입한다. 앱 코드에 beacon을 넣지 않는다.

## DNS와 도메인

- 도메인 등록과 자동 갱신은 Vercel에 있고, DNS는 Cloudflare(Free zone)가 맡는다. 네임서버는 `alex.ns.cloudflare.com`, `treasure.ns.cloudflare.com`이다.
- `www`는 `portfolio-hub-nuxt.pages.dev`로 가는 DNS only CNAME이고, HTTPS는 Pages가 제공한다.
- apex(`portfolio-hub.dev`)는 A `192.0.2.1`을 **Proxied**로 둔다. 원본 서버가 아니라 Cloudflare가 모든 요청을 edge에서 처리하기 위한 값이다. DNS only로 바꾸면 안 된다.
- Single Redirect `Portfolio Hub apex to www`가 `(http.host eq "portfolio-hub.dev")` 요청을 `concat("https://www.portfolio-hub.dev", http.request.uri.path)`로 308 이동시킨다. 쿼리 문자열을 보존하고, HTTP와 HTTPS 모두 www HTTPS로 간다.
- CAA는 `pki.goog`, `sectigo.com`, `letsencrypt.org`을 허용한다. Cloudflare Universal SSL용 CAA는 Cloudflare가 자동으로 더한다.
- HTTP `www`는 HTTPS `www`로 301이다.

## 복구

- Pages 배포에 문제가 생기면 대시보드에서 이전 성공 배포로 롤백한다.
- 도메인을 잃은 경우를 대비해 등록 기관(Vercel)의 자동 갱신을 계속 관리한다.

## 변경 후 확인

PR은 CI와 Preview를 확인한 뒤 main에 병합한다. main 배포가 성공하면 `pnpm test:http https://www.portfolio-hub.dev`로 전체 경로·이미지·OG·sitemap·robots·308과 쿼리 보존·404를 확인하고, 바뀐 화면은 브라우저로 직접 본다.

공식 참고: [Pages 설정 파일](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [외부 DNS와 커스텀 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Web Analytics 자동 주입](https://developers.cloudflare.com/pages/how-to/web-analytics/).
