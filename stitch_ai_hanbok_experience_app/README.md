# TripFit · AI 한복 여행 앱 (프로토타입)

AI 체형 분석으로 나에게 어울리는 한복을 찾고, 한옥마을 코스를 따라 여행하는 모바일 앱의 **인터랙티브 목업**입니다.
빌드 과정 없이 HTML 파일만으로 동작하며, iPhone에서는 **홈 화면에 추가**해 앱처럼 쓸 수 있습니다(PWA).

> 수업 과제용 프로토타입입니다. 일부 장소·가격·리뷰·예약 정보는 시연을 위해 만든 가상 데이터입니다.

## 화면 구성

| 화면 | 경로 | 주요 기능 |
|---|---|---|
| 스플래시 | `splash/` | 로고 애니메이션 후 홈으로 이동 (`?stay` 를 붙이면 머무름) |
| 홈 | `home/` | 통합 검색, AI 진단 배너, 추천 한복, 실시간 인기 투어 코스 |
| AI 분석 | `ai/` | 정밀 체형 분석, AI 가상 피팅, 추천 PICK · 오늘의 PICK · 맞춤 특가 |
| 체형 스캔 | `scan/` | 카메라 촬영/앨범/샘플, 성별 · 키 · 몸무게 입력, 아바타 미리보기, 분석 연출 |
| 지도 | `map/` | 전주 한옥마을 코스 지도(확대·이동), 코스 4종, 경유지 편집, 이동 수단, 장소 상세 |
| 상품 | `shop/` | 대여 · 패키지 · 구매 · 지역 굿즈, 정렬 · 카테고리 · 상세필터, 장바구니 |
| 내 정보 | `profile/` | 계정 정보, 예약 · 찜 · 쿠폰, 체형 분석 결과, 설정 메뉴 |

공통: 지역 선택, 알림(새 알림 표시), 하트(찜) 토글, 하단 탭 이동 시 슬라이드 전환.

## 폴더 구조

```
.
├── index.html          # 시작 주소 → splash 로 이동
├── manifest.json       # PWA 앱 정보 (이름 · 아이콘 · 전체 화면)
├── app-icon/           # 앱 아이콘 (icon.svg 원본 + 180/192/512/1024 PNG)
├── splash/ home/ ai/ scan/ map/ shop/ profile/   # 각 화면 (index.html)
│   ├── map/kpop1.png, kpop2.webp     # K-POP 코스 참고 이미지
│   └── shop/goods/, princess_pack.webp  # 상품 이미지
└── docs/
    ├── DESIGN.md       # 디자인 시스템 (Cupertino Editorial)
    └── stitch-originals/  # Google Stitch 원본 시안 이미지
```

## 실행하기

브라우저에서 파일을 바로 열어도 대부분 동작하지만, 지도 · 페이지 전환 · PWA 기능을 위해 로컬 서버를 권장합니다.

```bash
python3 -m http.server 8766
```

- PC: `http://localhost:8766`
- 같은 와이파이의 iPhone: `http://<Mac의 IP>:8766` → Safari 공유 버튼 → **홈 화면에 추가**

## GitHub Pages로 배포하기

1. 이 저장소를 GitHub에 올립니다.
2. 저장소 **Settings → Pages → Branch: `main` / `(root)`** 를 선택하고 저장합니다.
3. 잠시 후 `https://<아이디>.github.io/<저장소 이름>/` 에서 열립니다.

https 주소에서는 체형 스캔의 **실제 카메라**도 동작하고, iPhone에서 어디서나 홈 화면 앱으로 쓸 수 있습니다.

## 사용 기술

- HTML · [Tailwind CSS (Play CDN)](https://tailwindcss.com) · 순수 JavaScript
- [Leaflet](https://leafletjs.com) + [OpenStreetMap](https://www.openstreetmap.org/copyright) 지도 타일
- [Material Symbols](https://fonts.google.com/icons) 아이콘, Inter 글꼴
- View Transitions API (페이지 전환 애니메이션)
- 초기 화면 시안: Google Stitch

## 참고 · 출처

- 지도 데이터 © OpenStreetMap contributors
- 모델 · 한복 · 상품 이미지는 Google Stitch 및 AI 이미지 생성으로 만든 시안 이미지입니다.
- `map/kpop1.png`, `map/kpop2.webp` 은 아티스트 관련 참고 이미지로, 저작권은 각 권리자에게 있습니다. 과제 시연 목적으로만 사용합니다.
- 'K-POP 성지' 코스의 장소(아이돌 화보 골목, K-POP 화보 촬영 한옥)와 셀럽 스타일 상품(○○ st)은 가상의 예시이며, 실제 촬영지나 착용 상품이 아닙니다.
- 결제 · 예약 · 로그인은 실제로 동작하지 않는 데모입니다.
