# Taskify

## 📌 프로젝트 개요
Taskify는 **커뮤니티 기반으로 일정과 할 일을 공유·관리할 수 있는 웹 애플리케이션**입니다.
멤버 초대, 일정/할 일 CRUD, 댓글, Drag & Drop 등 다양한 협업 기능을 제공하여 효율적인 일정 관리와 소통을 지원합니다.

## 🛠 기술 스택
<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"/>
</p>

- **상태 관리** : Zustand (전역 상태 관리)
- **API 통신** : Axios 기반 커스텀 API 클라이언트 (Swagger 문서 참고)

## 📂 폴더 구조
- **app/** – Next.js App Router 기반의 페이지 라우팅
- **assets/** – 이미지, 아이콘 등 정적 리소스
- **components/** – 재사용 가능한 UI 컴포넌트
- **lib/api/** – Axios 기반 API 요청 함수
- **lib/stores/** – Zustand 전역 상태 관리
- **lib/utils/** – 유틸리티 함수 모음
- **types/** – 전역 타입 정의

## ✨ 주요 기능
- **인증/권한**
	- **로그인 → accessToken 저장** (Zustand persist로 LocalStorage 유지)
	- Axios 인터셉터로 `Authorization: Bearer <token>` 자동 주입 
	- 401 응답 처리 및 자동 로그아웃/리다이렉트
	- Next.js Middleware로 보호 라우트/게스트 라우트 분기

- **데이터/상태 관리**
	- Zustand 기반 전역 상태 관리
	- Axios 인스턴스 공통화(baseURL, 헤더, 일부 에러 처리) 
	- isAxiosError로 컴포넌트 단위 에러 처리
	- 페이지네이션으로 대량 데이터 효율적 탐색

- **UI/UX**
	- 반응형 UI(다양한 해상도 대응)
	- 스켈레톤 UI & 스피너 (로딩 경험 개선)
	- Toast 알림(Zustand store와 연동)
	- DatePicker로 기간/날짜 선택
	- **Drag & Drop으로 컬럼/카드 순서 변경**
	- not-found 페이지 제공

- **성능 최적화**
	- **useMemo, useCallback, React.memo 적극 활용**
	- Zustand 리렌더 최소화

## 🚀 배포 링크
[Taskify 바로가기](https://taskify-six-sooty.vercel.app/)

## 🎨 디자인 & 문서
- [Figma 디자인](https://www.figma.com/design/bNTFuJECTJFzpx84Vi4HzR/Taskify?node-id=0-1&p=f&t=NgAbrZsHWIAic3mt-0)
- [Swagger API 문서](https://sp-taskify-api.vercel.app/docs/#/) 
- [프로젝트 컨벤션](https://chivalrous-barberry-9bb.notion.site/254a83bcc886808b878ef679236ee7c5?source=copy_link)
