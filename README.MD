# Speaklog

배운 내용을 누군가에게 설명하듯 말하고, 설명 시간과 핵심 요약을 기록하는 학습 회고 웹 앱입니다.

배포 주소: https://speaklog.s2468.workers.dev/

데모 영상: `Speaklog_데모영상.mp4`

## 주요 기능

- 설명할 학습 주제 입력
- 설명을 들어줄 가상 청중 선택
- 설명 시간 타이머
- 설명 후 핵심 내용 백지 요약 작성
- 학습 기록 카드 저장
- 전체 기록 목록과 상세 보기
- 브라우저 `localStorage` 기반 기록 유지
- Cloudflare Workers Assets 배포

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Frontend | React 19, Create React App |
| State | React `useState`, `useEffect` |
| Storage | Browser localStorage |
| Test | React Testing Library, Jest |
| Deployment | Cloudflare Wrangler |

## 실행 방법

### 1. 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000`을 엽니다.

### 3. 테스트

```bash
npm test
```

### 4. 프로덕션 빌드

```bash
npm run build
```

## 배포

Cloudflare 계정과 Wrangler 로그인이 필요합니다.

```bash
npm run deploy
```

로컬에서 Workers 배포 결과를 미리 확인하려면:

```bash
npm run preview
```

`wrangler.jsonc`는 `build` 폴더를 Workers Assets로 배포하도록 설정되어 있습니다.

## 사용 흐름

1. 홈에서 `학습 시작하기`를 누릅니다.
2. 학습 주제와 청중을 선택합니다.
3. 화면 속 청중에게 설명하듯 말합니다.
4. 설명을 마치면 핵심 내용을 요약합니다.
5. 저장된 기록을 홈 또는 전체 기록 화면에서 다시 봅니다.

## 프로젝트 구조

```text
speaklog/
├─ public/
│  ├─ index.html
│  └─ videos/                # 청중 영상 리소스
├─ src/
│  ├─ components/            # 홈, 설정, 세션, 요약, 기록 화면
│  ├─ data/avatars.js        # 청중 데이터와 localStorage 키
│  ├─ utils/format.js        # 날짜/시간 포맷
│  ├─ App.js                 # 화면 전환과 기록 저장 상태
│  └─ App.test.js            # 주요 사용자 흐름 테스트
├─ wrangler.jsonc            # Cloudflare Workers Assets 설정
└─ README.MD
```

## 주의사항

- 기록은 서버가 아니라 현재 브라우저의 `localStorage`에 저장됩니다.
- 브라우저 데이터를 지우거나 다른 기기에서 접속하면 기존 기록을 볼 수 없습니다.
- 장기 운영 버전에서는 로그인과 서버 저장소를 추가하는 것이 좋습니다.
