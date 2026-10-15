# 완료 검증 목록

아래 항목은 구현 후 실제 결과를 확인하여 체크한다. 문서 준비만으로 통과 처리하지 않는다.

## 기반과 빌드

- [x] 원본 `pnpm check`, `pnpm build` 결과와 비교 기준 기록
- [x] Nuxt 4 호환 Node/pnpm 버전 고정, CI·Pages와 일치
- [x] `pnpm install --frozen-lockfile` 성공
- [x] `pnpm lint` 성공
- [x] `pnpm typecheck` 성공
- [x] `pnpm generate` 성공, prerender 오류 시 실패 처리
- [x] `.output/public`만 정적 호스팅하여 동작
- [x] 요청 시 Nitro/Node/Pages Functions/Worker 서버 불필요
- [x] Next·React·Vercel 전용 패키지와 설정 제거
- [x] 콘텐츠 검증이 잘못된 slug·중복·번역 길이·병합 대상을 탐지

## 경로와 콘텐츠

- [x] `routes.json`의 30개 URL 각각에 정적 HTML 생성
- [x] 각 URL 직접 접속·새로고침·앱 내부 이동 성공
- [x] HTML 응답에 주요 콘텐츠가 포함되어 JavaScript 없이 읽힘
- [x] 5개 표시 프로젝트와 2개 숨김 프로젝트의 관계·정렬 보존
- [x] ur-manager·ur-mcp의 3개 언어 상세 유지
- [x] 번역·alt·버튼·외부 링크·개인 기술 목록 보존
- [x] 언어 변경 시 같은 콘텐츠로 이동하고 lang·head 갱신
- [x] 잘못된 locale·알 수 없는 slug가 정상 페이지로 처리되지 않음

## UI와 접근성

- [ ] 홈·프로젝트 목록·상세·About·404 화면 비교
- [x] 모바일 390px·태블릿 768px·데스크톱 1440px에서 비교
- [ ] 원본과 새 사이트를 동일 viewport·배율·테마·언어로 비교
- [ ] 컨테이너 너비·간격·폰트·줄바꿈·색상·그림자·이미지 겹침 보존
- [x] 3개 언어에서 텍스트 넘침과 가로 스크롤 없음
- [x] 라이트·다크·시스템 테마 및 기존 저장값 유지
- [x] 첫 로드 테마 깜빡임과 hydration 경고 없음
- [x] 도쿄 시계가 빌드 시각에 고정되지 않고 정상 갱신
- [ ] 메뉴 Escape·외부 클릭·키보드 조작·포커스 표시 정상
- [x] 스킵 링크·alt·ARIA 상태와 heading 구조 유지
- [ ] 라우팅 반복 시 이벤트·타이머 중복 등록 없음

## 이미지와 SEO

- [x] 반응형 srcset/sizes·width/height·placeholder 유지
- [x] 주요 이미지 로딩 우선순위와 나머지 lazy loading 확인
- [x] 모든 참조 이미지와 최적화 변형 파일이 정적 호스팅에서 응답
- [ ] 화면 크기·언어·내부 탐색 변경 시 이미지 404 없음
- [ ] 이미지 로딩으로 인한 불필요한 레이아웃 이동 없음
- [x] 페이지별 title·description·canonical·hreflang 확인
- [x] OG·Twitter card·JSON-LD 파싱 및 값 확인
- [x] OG 이미지 1200×630, 기존 영문 구성 유지
- [x] 기존 OG URL 호환 처리와 새 메타데이터 이미지 응답 확인
- [x] sitemap의 30개 콘텐츠 URL 및 언어 대체 링크 확인
- [x] robots.txt와 sitemap URL 확인
- [ ] Production의 메타데이터에 localhost·Preview 주소 없음
- [ ] Preview noindex 응답과 Production 색인 허용 확인

## Pages와 전환

- [x] Git 연동, 비공개 저장소 접근 및 Preview 배포 정상
- [x] 기본 경로 및 하위 경로 redirect가 308·올바른 Location 반환
- [x] 리다이렉트 쿼리 유지·정규화·루프 여부 확인
- [x] 최상위 404.html 존재
- [x] 존재하지 않는 최상위·언어별·프로젝트 경로가 HTTP 404 반환
- [x] 알 수 없는 URL에 200 SPA fallback을 제공하지 않음
- [ ] HTTPS·커스텀 도메인·apex/www 정규화 정상
- [ ] Cloudflare Web Analytics 중복 주입 없이 정상
- [x] DNS 전환 전 기존 Vercel 서비스 유지
- [ ] 최종 도메인에서 전체 검증 및 복구 경로 확인
- [ ] 안정화 확인 후 기존 Vercel 정리
- [ ] README·AGENTS·문서가 최종 구현과 일치


체크한 항목의 검증 범위와 근거는 VALIDATION.md를 따른다. HTTP 동작은 로컬 Pages와 실제 PR #4 Preview에서 확인했다. 최종 도메인 항목은 아직 완료하지 않았다.
