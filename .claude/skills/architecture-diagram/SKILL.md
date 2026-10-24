---
name: architecture-diagram
description: 프로젝트 저장소에 있는 아키텍처 그림(README의 Mermaid, 스크린샷, 설명)을 이 포트폴리오의 GitLeaf 스타일 구성도(`Project.architecture`)로 다시 그려 넣는다. 새 프로젝트에 구성도를 추가하거나 기존 구성도를 고칠 때, 또는 "아키텍처 구성도", "architecture diagram", "Mermaid를 구성도로" 같은 요청에 쓴다.
---

# 구성도 만들기

원본 저장소의 아키텍처 그림(대개 README의 Mermaid)을 읽고, 이 사이트의 구성도 데이터로 옮긴다. 이미지를 그대로 붙이지 않는다. 박스 좌표와 화살표 경로를 데이터로 적으면 `ProjectDiagram.vue`가 SVG로 그린다.

## 결과물

- `app/content/projects/<slug>/index.ts`의 `architecture` 필드 하나. 타입은 `app/lib/types.ts`의 `Diagram`이다. 필드 위치는 `footnote` 다음(없으면 `stack` 다음), `translations` 앞이다.
- **영어만** 쓴다. 한국어·일본어 파일(`ko.ts`, `ja.ts`)에는 구성도 번역을 두지 않고, 세 언어 페이지가 같은 그림을 쓴다. 섹션 제목("Architecture / 구성도 / 構成図")만 `app/i18n/dictionaries.ts`에서 온다. 원본 문서가 한국어여도 박스 이름·라벨·`summary`는 영어로 옮긴다.
- 색을 직접 정하지 않는다. 박스는 `tone`만 고르고 색은 컴포넌트가 정한다.
- 페이지에서는 소개·주요 기능 바로 아래, 기술 구성(How it's built) 위, 스크린샷 위에 놓인다.

## 1. 원본 읽기

원본 그림에서 "무엇이 무엇과 어떻게 이야기하는가"만 뽑는다. 지금 README에 그려진 모양은 버린다.

- 프로젝트의 원본 저장소는 해당 `index.ts`의 `links.github`나 사용자가 알려 준 주소다. slug와 저장소 이름이 다를 수 있다(예: `henry-wallet` ↔ `ottuck/stable-wallet`).
- README: `gh api repos/ottuck/<repo>/readme -q .content | base64 -d`. 문서가 더 있으면 `docs/` 아래도 본다.
- 코드와 맞는지 확인한다. 그림에만 있고 코드에 없는 구성요소를 그리지 않는다. 파일 몇 개면 `gh api repos/ottuck/<repo>/contents/<path> -H "Accept: application/vnd.github.raw"`, 많으면 `gh repo clone ottuck/<repo> <임시폴더> -- --depth 1`로 받아 `grep`으로 의존성(`package.json`, `build.gradle` 등)과 저장·통신 코드를 본다. 임시 폴더는 작업 뒤에 지우고 원본 저장소에는 아무것도 올리지 않는다.
- 사용자가 그림을 붙여 줬다면 그것을 우선한다.

## 2. 박스와 화살표로 줄이기

| 원칙 | 예 |
| --- | --- |
| 박스는 5~7개. 원본이 이미 이 범위면 구조를 그대로 두고, 넘치면 같은 코드베이스의 플랫폼 분리부터 합친다 | iOS app + Web app → `Expo app` (노트에 `iPhone · web`) |
| 직접 운영하지 않는 외부 서비스는 `tone: "outside"` | Firebase Auth, Push, UR official API, Claude / ChatGPT |
| 사람·트리거는 `tone: "accent"`, 나머지는 기본(`main`) | |
| 같은 위치에서 도는 것은 `groups`로 묶고 제목을 붙인다 | `Sydney`, `Bun · one process`, `Your phone` |
| 제목은 이름, `note`는 기술·호스팅 한 줄 | `Spring WebFlux` / `AWS Lightsail` |
| 같은 두 박스 사이의 중복 화살표는 하나로 | iOS·Web 각각의 sign-in 두 개 → `Sign-in` 한 개 |
| 양방향은 `both: true`, 주기·비동기·예약 작업은 `dashed: true` | `Scheduled checks` |
| 라벨은 1~3단어. 문장을 쓰지 않는다 | `REST · WebSocket`, `Verify tokens` |

`summary`는 영어로 가능하면 한 문장, 길어도 두 문장이다. 그림 아래에 보이고 스크린리더 설명으로도 쓰이며, 흐름을 말로 풀어 쓴다. 면접 말투나 동기·성장 이야기를 쓰지 않는다(`AGENTS.md`의 글쓰기 원칙).

## 3. 좌표와 경로

단위는 SVG 좌표(px)이고, 모바일에서는 그림이 가로 스크롤(최소 폭 680px)된다.

**캔버스와 박스**
- `width`는 1000~1080, `height`는 360~420 정도. 노드의 `x`, `y`는 박스 **중심**이다.
- 박스 높이는 `note`가 있으면 68, 없으면 52다. **폭은 글자 폭으로 자동 계산**된다: `max(120, 글자 폭) + 40`. 글자 폭은 대략 `note`가 영문 소문자 한 글자당 6.6, `title`이 8.7(대문자·숫자는 더 넓다)이다. 예: 노트 `Polygon · Ethereum · Avalanche`(30자)면 폭은 약 240이다.
- **오른쪽·왼쪽 끝 노드는 `x ± 폭/2`가 캔버스 안쪽 20 이상**이어야 한다. 잘리면 `width`를 키우거나 `x`를 옮긴다(`pnpm diagrams` PNG에서 확인).
- 열 간격은 300~400, 행 간격은 약 150이 무난하다. 흐름은 왼쪽 → 오른쪽을 기본으로 하고, 외부 서비스는 위·아래나 맨 오른쪽에 둔다.

**그룹** (`groups`): 노드와 달리 `x`, `y`가 **왼쪽 위 모서리**이고 `w`, `h`가 크기다. 제목이 `(x+14, y+20)`에 그려지므로 그룹 안 박스의 위쪽 가장자리는 `y + 40` 이상에 두고, 박스 둘레에 여유를 둔다. 제목 근처로 선이 지나가지 않게 한다.

**화살표** (`edges`): 경로는 자동으로 정해진다. 두 박스의 세로 범위가 겹치면 `h`, 가로 범위가 겹치면 `v`, 아니면 `hvh`다. 선이 다른 선·박스를 지나거나 겹치면 다음 값으로 손본다.

| 값 | 뜻 |
| --- | --- |
| `route` | `h`(가로 직선), `v`(세로 직선), `hvh`(가로-세로-가로), `vhv`, `hv`(가로 후 세로로 꺾여 도착), `vh` |
| `offset` | `h`는 선의 y, `v`는 선의 x를 그만큼 옮김 |
| `fromOffset`, `toOffset` | 출발·도착 지점을 박스 변을 따라 옮김(음수는 위·왼쪽). `hvh`는 둘 다 y, `vhv`는 둘 다 x, `hv`는 출발이 y·도착이 x, `vh`는 출발이 x·도착이 y다. 한 박스의 같은 변에서 선 두 개가 나가면 `-14`, `14`처럼 반대로 벌린다 |
| `bend` | 꺾이는 위치의 좌표. `hvh`는 세로 구간의 **x**, `vhv`는 가로 구간의 **y** |
| `labelAt` | 라벨을 올릴 구간 번호(0부터). 기본은 가장 긴 구간의 한가운데다 |

라벨 알약의 폭은 글자 폭 + 22다. 양방향 직선의 라벨이 화살촉에 닿지 않도록 구간이 충분히 긴지 확인한다. 라벨끼리, 라벨과 박스가 겹치면 `labelAt`이나 `offset`을 바꾼다.

실제 예: `puny-chat/index.ts`(Firebase로 가는 `hvh` + `bend`), `ur-check/index.ts`(`vh`, `labelAt`), `pokepedia/index.ts`(`both`, 그룹 폭 조정), `henry-wallet/index.ts`(그룹 하나에 박스 둘).

## 4. 확인

1. `pnpm diagrams` — **모든 프로젝트**의 `docs/architecture/<slug>.svg`와 `.png`를 다시 쓴다. 바뀐 건 이번 프로젝트뿐이어야 한다(`git status`로 확인). PNG는 2배 크기이니 **전체를 열어서 눈으로 본다.** 확인할 것: 박스·라벨 겹침, 화살촉 방향(양방향은 양끝), 선이 그룹 제목이나 다른 박스를 지나가는지, 잘린 박스. 고친 뒤 다시 낸다.
2. `pnpm check` — 엣지의 `from`/`to`가 없는 박스를 가리키면 `app/lib/projects.ts`의 검증이 오류를 낸다.
3. `pnpm generate` — 구성도 텍스트가 페이지 본문에 들어가므로 `verify` 단계에서 기준 파일과 달라 **멈추는 게 정상**이다(오류에 페이지 전체 글자가 길게 찍힌다. 읽을 필요 없다). 이어서:
   1. `pnpm baseline` — `generate`가 만든 `.output`을 읽으므로 반드시 `generate` 뒤에 돌린다. 마지막 줄의 `Changed:` 목록이 **이번 프로젝트의 세 언어 상세 경로뿐**인지 본다(다른 경로가 있으면 의도하지 않은 변경이다). 기준 파일은 공백을 뺀 한 줄 글자라서 `git diff`로는 내용이 안 보인다.
   2. `pnpm generate` — 이번에는 끝까지 통과해야 한다.
   3. `pnpm test:pages`
4. 선택: 390px 폭에서 가로 스크롤과 위치를 본다(`mcp__Claude_Browser__resize_window`).

## 5. 반영

- 이 저장소 규칙대로 브랜치 → PR → 병합 → 배포 확인(`pnpm test:http https://www.portfolio-hub.dev`)까지 진행한다. 검증 결과는 PR 설명에 쓰고 `docs/`에는 쓰지 않는다.
- `docs/architecture/*.svg·png`는 내보내기 결과이므로 같이 커밋한다. 사용자가 요청하면 `~/Downloads/portfolio-architecture/`에도 복사한다.
- 프로젝트 이름을 바꿔 slug가 바뀌면 `pnpm diagrams`를 다시 내고 예전 파일을 지운다.

## 하지 말 것

- 언어별 구성도 번역 만들기(영어 한 벌만).
- 원본 이미지·Mermaid를 그대로 임베드하기.
- 박스 색·선 색을 직접 지정하기.
- 구성요소를 코드에서 확인하지 않고 그리기.
