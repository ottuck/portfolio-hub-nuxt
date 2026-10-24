---
name: architecture-diagram
description: 프로젝트 저장소에 있는 아키텍처 그림(README의 Mermaid, 스크린샷, 설명)을 이 포트폴리오의 GitLeaf 스타일 구성도(`Project.architecture`)로 다시 그려 넣는다. 새 프로젝트에 구성도를 추가하거나 기존 구성도를 고칠 때, 또는 "아키텍처 구성도", "architecture diagram", "Mermaid를 구성도로" 같은 요청에 쓴다.
---

# 구성도 만들기

원본 저장소의 아키텍처 그림(대개 README의 Mermaid)을 읽고, 이 사이트의 구성도 데이터로 옮긴다. 이미지를 그대로 붙이지 않는다. 박스 좌표와 화살표 경로를 데이터로 적으면 `ProjectDiagram.vue`가 SVG로 그린다.

## 결과물

- `app/content/projects/<slug>/index.ts`의 `architecture` 필드 하나. 타입은 `app/lib/types.ts`의 `Diagram`이다.
- **영어만** 쓴다. 한국어·일본어 파일(`ko.ts`, `ja.ts`)에는 구성도 번역을 두지 않고, 세 언어 페이지가 같은 그림을 쓴다. 섹션 제목("Architecture / 구성도 / 構成図")만 `app/i18n/dictionaries.ts`에서 온다.
- 색을 직접 정하지 않는다. 박스는 `tone`만 고르고 색은 컴포넌트가 정한다.
- 페이지에서는 소개·주요 기능 바로 아래, 기술 구성(How it's built) 위, 스크린샷 위에 놓인다.

## 1. 원본 읽기

원본 그림에서 "무엇이 무엇과 어떻게 이야기하는가"만 뽑는다. 지금 README에 그려진 모양은 버린다.

- 소스: `gh api repos/ottuck/<repo>/readme -q .content | base64 -d` 로 README를, 필요하면 `docs/` 아래 문서를 읽는다. 사용자가 그림을 붙여 줬다면 그것을 우선한다.
- 코드와 맞는지 한 번 확인한다. 그림에만 있고 코드에 없는 구성요소를 그리지 않는다.

## 2. 박스와 화살표로 줄이기

| 원칙 | 예 |
| --- | --- |
| 박스는 5~7개. 같은 코드베이스의 플랫폼 분리는 합친다 | iOS app + Web app → `Expo app` (노트에 `iPhone · web`) |
| 직접 운영하지 않는 외부 서비스는 `tone: "outside"` | Firebase Auth, Push, UR official API, Claude / ChatGPT |
| 사람·트리거는 `tone: "accent"`, 나머지는 기본(`main`) | |
| 같은 위치에서 도는 것은 `groups`로 묶고 제목을 붙인다 | `Sydney`, `Bun · one process` |
| 제목은 이름, `note`는 기술·호스팅 한 줄 | `Spring WebFlux` / `AWS Lightsail` |
| 같은 두 박스 사이의 중복 화살표는 하나로 | iOS·Web 각각의 sign-in 두 개 → `Sign-in` 한 개 |
| 양방향은 `both: true`, 주기·비동기·예약 작업은 `dashed: true` | `Scheduled checks` |
| 라벨은 1~3단어. 문장을 쓰지 않는다 | `REST · WebSocket`, `Verify tokens` |

`summary`는 영어 한두 문장으로 흐름을 말로 풀어 쓴다. 그림 아래에 보이고 스크린리더 설명으로도 쓰인다. 면접 말투나 동기·성장 이야기를 쓰지 않는다(`AGENTS.md`의 글쓰기 원칙).

## 3. 좌표와 경로

- `width`는 1000~1080, `height`는 360~420 정도. 노드의 `x`, `y`는 박스 **중심**이다.
- 열 간격은 300~400, 행 간격은 약 150이 무난하다. 박스는 노트가 있으면 높이 68, 없으면 52이고, 폭은 글자 폭으로 자동 계산된다(최소 120). 좌표를 잡을 때 박스 폭을 감안해 서로 겹치지 않게 한다.
- 모바일에서는 그림이 가로 스크롤(최소 폭 680px)되므로, 박스를 너무 촘촘하게 넣어 글자가 작아지는 걸 피한다.
- 흐름은 왼쪽 → 오른쪽을 기본으로 하고, 외부 서비스는 위·아래에 둔다.

`edges`의 경로는 자동으로 정해진다. 두 박스의 세로 범위가 겹치면 `h`, 가로 범위가 겹치면 `v`, 아니면 `hvh`다. 선이 다른 선·박스를 지나거나 라벨이 겹치면 다음 값으로 손본다.

- `route`: `h`, `v`, `hvh`, `vhv`, `hv`, `vh` (가로·세로 꺾임 순서).
- `offset`: `h`/`v`에서 선을 평행 이동. `fromOffset`, `toOffset`: 박스 변에서 나가고 들어가는 위치를 이동. `bend`: 꺾이는 지점의 좌표.
- `labelAt`: 라벨을 올릴 구간 번호(0부터). 기본은 가장 긴 구간이다.
- 그룹 제목(왼쪽 위)을 선이 지나가지 않게 그룹 폭·높이에 여유를 둔다.

실제 예: `app/content/projects/puny-chat/index.ts`(Firebase로 가는 `hvh` + `bend`), `ur-check/index.ts`(`vh`, `labelAt`), `pokepedia/index.ts`(`both`, 그룹 폭 조정).

## 4. 확인

1. `pnpm diagrams` — `docs/architecture/<slug>.svg`와 `.png`가 나온다. **PNG를 열어서 눈으로 본다.** 확인할 것: 박스·라벨 겹침, 화살촉 방향(양방향은 양끝), 선이 그룹 제목이나 다른 박스를 지나가는지, 라벨 위치. 고친 뒤 다시 낸다.
2. `pnpm check` — 엣지의 `from`/`to`가 없는 박스를 가리키면 `app/lib/projects.ts`의 검증이 오류를 낸다.
3. `pnpm generate` — 구성도 텍스트가 페이지 본문에 들어가므로 기준 파일과 달라져 `verify`에서 멈추는 게 정상이다. `pnpm baseline`으로 `docs/baseline.json`을 다시 쓰고 `git diff docs/baseline.json`을 본다. 해당 프로젝트의 세 언어 상세 경로만, 구성도 문장·박스 글자 때문에만 바뀌어야 한다. 그 뒤 `pnpm generate`와 `pnpm test:pages`가 통과해야 한다.
4. 선택: 390px 폭에서 가로 스크롤과 위치를 본다(`mcp__Claude_Browser__resize_window`).

## 5. 반영

- 이 저장소 규칙대로 브랜치 → PR → 병합 → 배포 확인(`pnpm test:http https://www.portfolio-hub.dev`)까지 진행한다. 검증 결과는 PR 설명에 쓰고 `docs/`에는 쓰지 않는다.
- `docs/architecture/*.svg·png`는 내보내기 결과이므로 같이 커밋한다. 사용자가 요청하면 `~/Downloads/portfolio-architecture/`에도 복사한다.
- 프로젝트 이름을 바꾸면 파일 이름도 slug를 따라가므로 `pnpm diagrams`를 다시 낸다.

## 하지 말 것

- 언어별 구성도 번역 만들기(영어 한 벌만).
- 원본 이미지·Mermaid를 그대로 임베드하기.
- 박스 색·선 색을 직접 지정하기.
- 구성요소를 코드에서 확인하지 않고 그리기.
