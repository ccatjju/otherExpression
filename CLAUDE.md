# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 작업 규칙

1. claude에 요청하는 모든 프롬프트(한굴,영문, 숫자 모두)의 내용을 절대 수정하지 말고, 하나도 빠짐없이 코드에 기재하는 작업을 실행합니다. 프롬프트의 내용은 웹 브라우저의 우측 30%로 잡아 놓은 div영역에서 확인할 수 있게 작업 합니다.
   \*\* 참고1 : '응', '아니', '그래'처럼 claude의 요청에 응답하는 것도 1번을 실행하세요.
   \*\* 참고2 : 클로드가 제안한 자동완성 텍스트 입력도 1번을 실행하세요.
   \*\* 참고3 : 내가 프롬프트로 작성하여 전달한 내용만 코드에 기재해서 브라우저에 표시되게 합니다. 절대 다른 글자는 추가하지 말아주세요.
2. 내가 요청하는 프롬프트의 내용 중 '개인정보' 또는 '어떤 인물'을 특정할 수 있는 내용이 있으면, 1번을 실행하기 전에 나에게 확인을 받고 진행합니다.
3. 2번의 내용에 위배되지 않으면, 내 프롬프트의 내용이 입력되면 바로 1번의 작업을 진행합니다.
4. 1,2번의 규칙으로 작성된 프롬프트의 내용은 절대 수정, 삭제하지 않습니다.

---

## 프로젝트 개요

아티스트 포트폴리오 웹 애플리케이션. React + Vite로 구축되었으며, 브라우저를 **좌측 70% (비주얼 영역) / 우측 30% (텍스트 영역)** 로 분할하는 반응형 레이아웃을 가지고 있습니다.

---

## 프로젝트 구조 및 아키텍처

### 핵심 레이아웃

```
App (src/App.jsx)
├── VisualPanel (src/components/VisualPanel.jsx) — 좌측 70%
└── TextPanel (src/components/TextPanel.jsx) — 우측 30%
```

**레이아웃 구현 방식:**

- CSS Flexbox 사용 (`src/index.css`)
- 뷰포트 기준 `vw` 단위로 반응형 자동 처리
- `.app-layout { display: flex; width: 100vw; height: 100vh; }`
- VisualPanel: `flex: 0 0 70%`
- TextPanel: `flex: 0 0 30%`

### 텍스트 데이터 관리

- `src/data/textEntries.js`: 사용자가 전달하는 모든 텍스트를 배열로 관리
- TextPanel이 이 파일을 import하여 렌더링
- 새 텍스트 추가 시: `textEntries` 배열에 항목 추가

### 파일 구조

```
src/
├── main.jsx           # 엔트리 포인트 (React 초기화)
├── App.jsx            # 메인 컴포넌트 (70/30 레이아웃)
├── index.css          # 글로벌 스타일 및 레이아웃 CSS
├── components/
│   ├── VisualPanel.jsx    # 좌측 70% 영역
│   └── TextPanel.jsx      # 우측 30% 영역 (textEntries 렌더링)
└── data/
    └── textEntries.js     # 텍스트 데이터 배열
```

---

## 주요 명령어

| 명령어            | 설명                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Vite 개발 서버 시작 (http://localhost:5173) |
| `npm run build`   | 프로덕션 빌드                               |
| `npm run preview` | 빌드된 앱 미리보기                          |

---

## 텍스트 추가 방법

사용자가 전달하는 모든 텍스트는 **`src/data/textEntries.js`** 파일에 추가합니다:

```javascript
export const textEntries = [
  "첫 번째 텍스트",
  "두 번째 텍스트",
  "세 번째 텍스트",
  // 새로운 텍스트 추가
];
```

TextPanel이 자동으로 이 배열의 모든 항목을 렌더링합니다.

---

## 비주얼 패널 커스터마이징

VisualPanel (`src/components/VisualPanel.jsx`)은 현재 placeholder 상태입니다. 이곳에 다음을 추가할 수 있습니다:

- **이미지**: `<img>` 태그로 이미지 삽입
- **캔버스**: Canvas API로 동적 그래픽 그리기
- **SVG**: 벡터 그래픽
- **비디오**: `<video>` 태그
- **애니메이션**: CSS 애니메이션 또는 라이브러리 (Three.js, Framer Motion 등)

---

## 스타일 가이드

- **텍스트 스타일**: 12px, black (우측 패널)
- **배경색**: 좌측 #f5f5f5, 우측 #ffffff
- **언어**: 코드 주석은 한글로 작성

---

## 개발 워크플로우

1. `npm run dev` 로 개발 서버 시작
2. 브라우저에서 http://localhost:5173 열기
3. 필요한 파일 수정 (자동 핫 리로드)
4. 텍스트 추가: `src/data/textEntries.js` 수정
5. 비주얼 수정: `src/components/VisualPanel.jsx` 수정
6. 스타일 수정: `src/index.css` 수정

---

## 성능 최적화 시 주의사항

- VisualPanel에 큰 이미지를 추가할 경우, 이미지 최적화 (압축, 캐싱) 필요
- 많은 텍스트 항목 추가 시, 가상 스크롤 (Virtual Scrolling) 고려
- 동적 콘텐츠 추가 시, React 성능 프로파일링 도구 활용

---

## 주요 의존성

- **React 19.2**: UI 라이브러리
- **Vite 8.0**: 빌드 도구 및 개발 서버
- **@vitejs/plugin-react**: Vite React 플러그인
