---
name: architecture-diagram
description: 프로젝트의 아키텍처 그림(README의 Mermaid, 스크린샷, 설명)을 이 포트폴리오 상세 페이지의 구성도(`Project.architecture`)로 넣거나 고칠 때 쓴다. 그리는 규칙은 공개 스킬 diagram-polish를 따르고, 이 파일은 포트폴리오에서만 다른 점을 적는다. "아키텍처 구성도", "architecture diagram", "Mermaid를 구성도로" 같은 요청에 쓴다.
---

# 포트폴리오에 구성도 넣기

그리는 규칙(원본 읽기, 5~7개 박스로 줄이기, 톤·그룹, 좌표와 경로, 경고 확인)은 공개 스킬 **diagram-polish**의 `SKILL.md`가 기준이다. 여기에 다시 적지 않는다.

- 읽을 파일: `C:\Users\vison\IdeaProjects\diagram-polish\skills\architecture-diagram\SKILL.md`
- 없으면 `gh repo clone ottuck/diagram-polish`로 받거나 https://github.com/ottuck/diagram-polish/blob/main/skills/architecture-diagram/SKILL.md 를 읽는다.

**먼저 그 파일을 읽고 따른다.** 아래는 포트폴리오에서만 다른 점이다.

## 포트폴리오에서 다른 점

| 항목 | diagram-polish | 이 포트폴리오 |
| --- | --- | --- |
| 데이터 위치 | `diagram.json` | `app/content/projects/<slug>/index.ts`의 `architecture` 필드(같은 모양의 TS 객체). `footnote` 다음(없으면 `stack` 다음), `translations` 앞 |
| 넣지 않는 필드 | | `title`, `theme`, `colors`, `colorsDark`. 사이트의 `ProjectDiagram.vue`가 그리고 색·다크 모드는 사이트가 정한다. 타입은 `app/lib/types.ts`의 `Diagram` |
| 글자 언어 | README 언어를 따른다 | **항상 영어, 한 벌.** `ko.ts`, `ja.ts`에는 구성도를 두지 않는다. 섹션 제목(Architecture / 構成図 / 구성도)은 `app/i18n/dictionaries.ts`에서 온다 |
| 글쓰기 | | `summary`는 `AGENTS.md`의 글쓰기 원칙(담백하게)을 따른다 |
| 페이지에서 위치 | | 소개·주요 기능 바로 아래, 기술 구성 위, 스크린샷 위 |

레이아웃 계산(`app/lib/diagram.ts`)은 diagram-polish의 `render.mjs`와 같은 규칙이라, 같은 좌표면 같은 모양으로 그려진다. 규칙을 한쪽에서 바꾸면 다른 쪽도 맞춘다. 기본 테마 `sage`가 사이트 색과 같다.

## 미리 보기와 확인

1. 초안은 임시 JSON으로 만들어 diagram-polish 스크립트로 미리 본다. `--png`는 `@resvg/resvg-js`가 있는 폴더에서 돌려야 하므로 diagram-polish 폴더에서 실행한다: `node skills/architecture-diagram/scripts/render.mjs <json> --png --no-system-fonts`. 경고가 없어지고 그림이 깔끔해질 때까지 고친다.
2. 모양이 정해지면 `index.ts`에 옮기고 `pnpm diagrams`를 돌린다. **모든 프로젝트**의 `docs/architecture/<slug>.svg·png`를 다시 쓰므로 바뀐 건 이번 프로젝트뿐이어야 한다(`git status`). PNG를 열어 눈으로 확인한다.
3. `pnpm check` → `pnpm generate`(구성도 글자가 본문에 들어가서 기준 파일과 달라 verify에서 멈추는 게 정상) → `pnpm baseline` → 마지막 줄의 `Changed:`가 **이번 프로젝트의 세 언어 상세 경로뿐**인지 확인 → `pnpm generate` → `pnpm test:pages`.

## 반영

- 브랜치 → PR → 병합 → 배포 확인(`pnpm test:http https://www.portfolio-hub.dev`). 검증 결과는 PR 설명에 쓰고 `docs/`에는 쓰지 않는다.
- `docs/architecture/*.svg·png`는 내보내기 결과이므로 같이 커밋한다. 사용자가 요청하면 `~/Downloads/portfolio-architecture/`에도 복사한다.
- 프로젝트 이름을 바꿔 slug가 바뀌면 `pnpm diagrams`를 다시 내고 예전 파일을 지운다.

## 하지 말 것

- 언어별 구성도 번역 만들기.
- 원본 이미지·Mermaid를 그대로 임베드하기.
- 박스 색·선 색을 직접 지정하기(`tone`만 고른다).
- 구성요소를 코드에서 확인하지 않고 그리기.
