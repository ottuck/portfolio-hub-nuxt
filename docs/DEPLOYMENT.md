# Cloudflare Pages 배포와 도메인 전환

기준일: 2026-10-15 (Asia/Seoul)

## 배포 설정

- GitHub: `ottuck/portfolio-hub-nuxt`, 비공개.
- Pages: `portfolio-hub-nuxt`, Production branch `main` 자동 배포, 작업 브랜치 Preview.
- Build: `pnpm generate`, output `.output/public`, Node `24.22.0`, pnpm `10.33.0`.
- 요청 시 Worker·Pages Functions·Node 서버 없이 정적 파일만 제공한다.
- `wrangler.jsonc`를 배포 설정의 기준으로 사용한다. 공통 `vars`와 각 환경에 Node/pnpm을 고정한다. `env.production.vars`에만 `NUXT_PUBLIC_ASSET_URL=https://www.portfolio-hub.dev`를 둔다. Preview에서는 이 변수를 생략하여 OG가 `CF_PAGES_URL`을 사용하게 한다. 빈 문자열도 Nuxt 런타임 설정을 덮으므로 빈 값으로 지정하지 않는다.
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

## 최초 www 전환 기록

아래는 PR #6에서 www를 이전했을 때의 기록이다. 이후 Vercel 프로젝트 삭제 요청에 따른 현재 DNS 상태는 다음 절을 따른다.

- 도메인 등록 기관과 DNS는 Vercel을 유지한다. 네임서버는 `ns1.vercel-dns.com`, `ns2.vercel-dns.com`이다.
- `www` CNAME을 `portfolio-hub-nuxt.pages.dev`로 추가했다(TTL 60). 공용 DNS, Cloudflare의 도메인·인증서 상태가 모두 `active`다. 대시보드도 `Active`, `SSL enabled`를 표시한다(`qa/cloudflare-domain-active.jpg`).
- 루트 ALIAS `fe7d24d3f4074e53.vercel-dns-017.com`과 wildcard ALIAS `cname.vercel-dns-017.com.`을 유지한다. 기존 루트 → `https://www.portfolio-hub.dev`의 308 및 경로·쿼리 보존도 유지한다.
- 기존 CAA(`pki.goog`, `sectigo.com`, `letsencrypt.org`)와 Vercel apex/wildcard HTTPS 레코드는 변경하지 않았다. 변경 전후 관찰 자료는 `qa/dns-before.*`, `qa/dns-after.json`에 있다.
- 기존 Vercel Production 커밋은 `5d2aa962632c036626bce867c2de979ae98f57a4`, 배포 주소는 `portfolio-1nkm07rdn-vison901-gmailcoms-projects.vercel.app`이다.
- 복구가 필요하면 www CNAME 대상을 `cname.vercel-dns-017.com`으로 바꾸고 HTTPS·본문·리다이렉트를 확인한다. Pages 배포 자체의 회귀는 이전 성공 배포로 롤백할 수도 있다.
- apex 리다이렉트를 기존 Vercel 프로젝트가 제공한다. 리다이렉트 제공처를 별도로 이전하기 전에는 이 프로젝트를 삭제하지 않는다. 기존 Next.js 저장소와 배포도 복구용으로 유지한다.

## Vercel 프로젝트 정리 완료

사용자가 기존 Vercel 프로젝트 삭제를 요청했다. www는 이미 Pages가 제공하지만, apex의 308을 기존 Vercel 프로젝트가 제공하므로 이 의존성을 먼저 옮긴다. 도메인 등록 기관과 자동 갱신은 Vercel에 유지한다. GitHub 원본 저장소도 삭제 대상이 아니다.

- Cloudflare Free DNS zone을 추가하고 등록 기관의 네임서버를 `alex.ns.cloudflare.com`, `treasure.ns.cloudflare.com`으로 변경했다. Cloudflare API에서 zone `active`와 공용 DNS의 새 NS 응답을 확인했다.
- www CNAME은 `portfolio-hub-nuxt.pages.dev`를 유지한다. 기존 사용자 CAA 3개를 복사했다. Cloudflare는 Universal SSL에 필요한 관리 CAA도 자동으로 제공한다.
- 새 Universal SSL이 `Active`가 될 때까지 apex를 기존 Vercel IP의 DNS only로 유지했다. 인증서 활성화 확인 후 apex A `192.0.2.1`을 **Proxied**로 바꿨다. 이 주소는 원본 서버가 아니며 모든 apex 요청을 edge redirect로 처리한다. DNS only로 바꾸면 안 된다. `www`는 DNS only CNAME이며 Pages가 HTTPS를 제공한다.
- Cloudflare Single Redirect `Portfolio Hub apex to www`를 활성화했다. 조건 `(http.host eq "portfolio-hub.dev")`, 동적 대상 `concat("https://www.portfolio-hub.dev", http.request.uri.path)`, 상태 308, query string 보존이다. HTTP와 HTTPS 모두 같은 www HTTPS 주소로 이동한다. 규칙 ID는 `f293563f813045ba8299b2c572d4c121`이다.
- 이전 NS를 캐시한 방문자를 위해 Vercel DNS에도 apex ALIAS `portfolio-hub-nuxt.pages.dev`(TTL 60)를 추가했다. 기존 두 Vercel NS에 직접 질의해 apex가 Cloudflare IP, www가 Pages CNAME으로 응답함을 확인했다. 자동 생성된 Vercel origin ALIAS 대신 수동 ALIAS가 우선 적용된다.
- 새 CF NS 2개, 이전 Vercel NS 2개, 공용 resolver 2개를 검사했다. 이들이 반환한 IP 4개에서 HTTP·HTTPS, 경로·쿼리 보존 32건을 검증했고 모두 Cloudflare의 308이었다. TLS 검증을 끄지 않았다. www의 30개 Nuxt HTML과 단일 Analytics 주입도 다시 확인했다. 결과는 `qa/hosting-cleanup-checks.json`, 화면은 `qa/cloudflare-apex-rule.jpg`, `qa/cloudflare-apex-certificate.jpg`, `qa/cloudflare-dns-final.jpg`다.
- 사용자가 실행 시점에 `영구 삭제 진행`을 확인한 후, 2026-10-15 23:27 KST에 기존 Vercel 프로젝트 `portfolio-hub`를 삭제했다. 프로젝트 설정 주소는 404, 기존 배포 주소는 HTTP 410이다. 도메인 관리 화면의 연결 프로젝트는 0개이며 도메인 등록과 자동 갱신은 유지된다. `qa/vercel-project-deleted.jpg`, `qa/vercel-domain-retained.jpg`에 기록했다. 원본 GitHub 저장소도 유지한다.

삭제 후에도 같은 6곳의 DNS와 32건의 HTTP·HTTPS redirect, www 30개 Nuxt HTML과 Analytics를 다시 검증했다. `qa/hosting-cleanup-checks.json`의 phase는 `after-vercel-project-deletion`이다. 로컬 Windows DNS 캐시를 갱신한 일반 접속에서도 apex는 Cloudflare 308, www는 Cloudflare 200이었다. 이미 옛 IP를 캐시한 다른 환경은 TTL 만료까지 전파 지연이 있을 수 있다.

이제 apex 리다이렉트도 Vercel 프로젝트에 의존하지 않는다. 향후 Pages 회귀는 이전 성공 배포로 롤백하고, 기존 Next 배포 자체로 복구하려면 삭제된 Vercel 프로젝트를 새로 만들어 배포해야 한다. Vercel 등록 도메인의 자동 갱신은 계속 관리한다.

PR #7의 구조 안내 문서는 CI·Preview 통과 후 main에 병합했다. main 커밋 `853baab463e7ef20a29378bc6bbc8f472db43a5b`의 Pages 배포 `80122652-1b74-4290-8131-c8591063f4d4`도 성공했고 `uses_functions: false`다.

## 운영 도메인 검증

`https://www.portfolio-hub.dev`에서 전체 HTTP 검사(30개 콘텐츠 경로·OG·308·쿼리 보존·7개 실제 404·기존 OG URL)가 통과했다. 30개 응답 모두 Nuxt HTML과 `Server: cloudflare`, Analytics beacon 1회, 운영 OG 주소를 확인했으며 정상 콘텐츠에 noindex가 없다. 추가로 정적 참조 자산 306개와 폰트 2개·sitemap·robots, 총 310개가 실제 운영 도메인에서 정상 응답했다. `qa/custom-domain-checks.json`, `qa/deployed-assets.json`에 기록했다.

HTTP www → HTTPS www는 301, HTTP·HTTPS apex → HTTPS www는 Cloudflare 308이며 모두 경로·쿼리를 보존한다. 최초 www 전환 중에는 이전 배포를 유지해 캐시된 방문자도 서비스했다. 이후 apex 이전 검증과 사용자 확인을 거쳐 기존 Vercel 프로젝트를 삭제했다.

## 이후 변경 시 검사

CI 통과와 Preview 확인 후 main에 병합한다. main 배포 성공을 확인한 다음 `pnpm test:http https://www.portfolio-hub.dev`와 브라우저 확인을 수행한다. 30개 경로 외에 정적 이미지·OG·sitemap·robots·308·쿼리·404·Analytics·색인 헤더를 함께 확인한다.

공식 참고: [Pages 설정 파일](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [외부 DNS와 커스텀 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Web Analytics 자동 주입](https://developers.cloudflare.com/pages/how-to/web-analytics/).
