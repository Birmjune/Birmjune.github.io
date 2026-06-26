# 사이트 수정 가이드 (EDITING)

> `Birmjune.github.io` - al-folio 기반 개인 홈페이지.
> 이 문서는 **사이트를 어떻게 수정/업데이트하는지** 정리한 것이다.
> 이 파일은 사이트로 배포되지 않는다 (`_config.yml`의 `exclude`에 등록됨).

---

## 0. 로컬 미리보기 (수정 전후 확인)

```bash
cd <repo 폴더>
bundle exec jekyll serve --livereload
```

- 접속: <http://127.0.0.1:4000>
- 파일을 저장하면 브라우저가 자동 새로고침된다. 끌 때는 `Ctrl+C`.
- **처음 한 번 / 브랜치를 바꾼 직후**에는 먼저 `bundle install`.
- **`_config.yml`을 고치면** 서버를 끄고 다시 실행해야 반영된다 (그 외 파일은 자동 반영).
- 포트가 이미 쓰이는 중이면:
  ```bash
  kill $(ss -ltnp | grep ':4000' | grep -oE 'pid=[0-9]+' | grep -oE '[0-9]+' | head -1)
  ```
- 캐시가 꼬이면 `bundle exec jekyll clean` 후 다시 빌드.

> 참고: `_projects`, `_news`, `_courses` 폴더는 **홈페이지가 자동으로 끌어와** 보여준다.
> 그래서 이 폴더들만 고치면 홈 + 해당 섹션 페이지가 같이 업데이트된다.

---

## 1. News (소식) - `_news/`

파일 하나 = 소식 하나. 날짜가 최신인 것이 위로 자동 정렬된다.
홈페이지 News 섹션과 `/news/` 페이지에 노출된다.

추가하려면 기존 파일을 복사해 날짜/내용만 바꾼다.

```markdown
---
layout: post
date: 2025-09-01 09:00:00+0900
inline: true
related_posts: false
---

소식 내용 한 줄. [링크](https://example.com)도 넣을 수 있다.
```

---

## 2. Projects - `_projects/` (이미지는 `assets/img/`)

파일 하나 = 카드 하나. `importance` 숫자가 작을수록 앞에 온다.
홈에는 상위 3개만, `/projects/` 페이지에는 전체가 그리드로 나온다.

```yaml
---
layout: page
title: 프로젝트 이름
description: 카드에 보일 한 줄 설명
img: assets/img/myproject.jpg
importance: 1
category: work
# github: https://github.com/Birmjune/repo   # 링크 달고 싶으면 주석 해제
---

여기에 프로젝트 상세 설명 (마크다운 · 이미지 · 코드 · 수식 가능).
```

- **추가:** 파일을 복사해 `4_project.md` 처럼 만든다.
- **이미지:** `assets/img/`에 넣고 `img: assets/img/파일명.jpg`로 참조.

---

## 3. Research - `_pages/publications.md` + `_bibliography/papers.bib`

- **소개/관심사 문구:** `_pages/publications.md` (= `/research/` 페이지). HTML 문단을 직접 수정.
- **논문 목록:** `_bibliography/papers.bib`에 BibTeX(`@article{...}`) 추가. 지금은 비어 있다.
  - 아직 논문이 없어 bibliography 렌더 태그는 빼 둔 상태다. 실제 논문이 생기면
    `papers.bib`에 넣고, `/research/` 페이지에 `{% bibliography %}` 를 다시 켜면 자동 목록으로 나온다.
- 홈 화면의 짧은 Research 소개글은 `_layouts/about.liquid` 안에 있다 (아래 7번 참고).

---

## 4. 강의 / 스터디에서 한 것 → Projects 로

별도 Education 섹션·페이지는 두지 않는다. 수업이나 스터디에서 한 작업은 **Projects**(위 2번)로 올린다.

> 예전 "Basics of Deep Learning" 강의 노트는 `_courses/dl-basics.md` 에 남아 있다.
> 직접 URL `/courses/dl-basics/` 로는 열리지만 지금은 어디에도 링크돼 있지 않다.
> Projects 카드로 옮기거나, 필요 없으면 그 파일을 지워도 된다.

---

## 5. 프로필 사진 / CV

- **프로필 사진:** `assets/img/prof_pic.jpg` 를 같은 이름으로 교체.
- **CV PDF (다운로드 버튼):** `assets/pdf/cv.pdf` 를 교체.
- **CV 페이지 표 내용:** `_data/cv.yml` 편집 (이름 · 학력 · 경력 등).
  - al-folio 기본 아인슈타인 샘플(`assets/json/resume.json`)은 꺼 두었으므로 `cv.yml`만 보면 된다.

---

## 6. 연락처 / 소셜 링크 - `_data/socials.yml`

`email`, `github_username` 등. 주석을 풀면 LinkedIn, Google Scholar, X 등을 추가할 수 있다.

---

## 7. 홈페이지 구성 / 문구 - `_layouts/about.liquid`

홈페이지 레이아웃은 `_layouts/about.liquid` 다.
섹션 순서: **Hero → News → Research → Projects → Education → Misc → Contact**.

| 바꾸고 싶은 것 | 위치 |
| --- | --- |
| 이름 (큰 제목) | `_config.yml` 의 `first_name`, `last_name` |
| 부제 (subtitle) | `_pages/about.md` front matter `subtitle` |
| Hero 라벨 / Research 소개글 / Misc 문구 | `_layouts/about.liquid` 안 텍스트 |
| bio 본문 | `_pages/about.md` 본문 |

---

## 8. 색 / 폰트 / 네비바

- **강조색(teal):** `_sass/_themes.scss` 의 `--global-theme-color` + `assets/css/main.scss` 의 `#2f7a75`.
- **폰트:** `_config.yml` 의 google_fonts URL + `assets/css/main.scss` (제목 Newsreader / 본문 Inter).
- **네비바 글자 크기·폰트:** `assets/css/main.scss` 의 `.navbar-brand`, `.nav-link`.
- **네비바 브랜드 글자("Home"):** `_includes/header.liquid`.
- **네비 탭 이름:** 각 페이지의 `title:` (예: `_pages/projects.md` 의 `title: Projects`).

---

## 9. 글쓰기 규칙

- **긴 dash(`—` em dash, `–` en dash)는 쓰지 않는다.** 대신 쉼표 · 콜론 · 괄호를 쓴다.
  (일반 하이픈 `-` 은 괜찮다.)

---

## 10. 배포 (GitHub Pages)

- 현재는 로컬에서만 확인 중이며 **GitHub에 push하지 않는다**.
- 공개 준비가 되면: 작업 브랜치를 `main`에 머지 → push → GitHub Actions가 빌드·배포.
  (한 번은 Settings → Pages 에서 소스 브랜치 설정이 필요하다.)
- 이 단계는 도움 요청하면 같이 진행할 수 있다.
