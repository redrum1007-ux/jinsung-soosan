# Jinsung Nature Food 🌊

대한민국 청정 바다의 프리미엄 건어물 쇼핑몰

## 🎯 프로젝트 소개

진성네이처푸드는 청정 바다에서 자연 건조한 최고급 건어물을 판매하는 온라인 쇼핑몰입니다.

## ✨ 주요 기능

### 고객용 기능
- 🏠 메인 페이지: 베스트셀러 상품 및 프로모션
- 🛍️ 카테고리별 상품 조회 (김/미역/다시마, 멸치, 건어물)
- 🔍 상품 검색 기능
- 🛒 장바구니 관리 (추가/수정/삭제)
- 💳 주문 및 결제
- 👤 회원가입 및 로그인
- 📖 브랜드 스토리 페이지

### 관리자 기능
- 🔐 관리자 로그인 (ID: admin, PW: admin1234)
- ➕ 상품 등록
- ✏️ 상품 수정
- 🗑️ 상품 삭제
- 📊 상품 목록 조회

## 🚀 배포 방법

### GitHub Pages
1. Repository Settings → Pages
2. Source: main branch, root directory
3. 배포 URL: `https://redrum1007-ux.github.io/jinsung-naturefood/`

### Netlify (추천)
1. [Netlify](https://netlify.com) 로그인
2. "Add new site" → GitHub repository 연결
3. 자동 배포

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: LocalStorage (클라이언트 사이드)
- **Fonts**: Google Fonts (Work Sans)
- **Icons**: Emoji

## 📁 프로젝트 구조

```
jinsung-naturefood/
├── index.html              # 메인 페이지
├── story.html              # 브랜드 스토리
├── premium.html            # 프리미엄 건어물 카테고리
├── gifts.html              # 선물세트 카테고리
├── detail.html             # 상품 상세
├── search.html             # 검색
├── cart.html               # 장바구니
├── checkout.html           # 결제
├── login.html              # 로그인
├── signup.html             # 회원가입
├── admin-login.html        # 관리자 로그인
├── admin.html              # 관리자 페이지
├── style.css               # 스타일시트
├── script.js               # JavaScript
├── images/                 # 이미지 폴더
└── README.md
```

## 💡 로컬 실행 방법

1. 프로젝트 클론
```bash
git clone https://github.com/redrum1007-ux/jinsung-naturefood.git
```

2. 폴더로 이동
```bash
cd jinsung-naturefood
```

3. HTML 파일을 브라우저로 열기
- `index.html` 더블클릭 또는
- Live Server 확장으로 실행

## 🎨 주요 디자인

- **컬러**: 딥 블루 (#003d73), 민트 그린 (#98FB98)
- **폰트**: Work Sans (영문), 시스템 폰트 (한글)
- **스타일**: 모던, 클린, 프리미엄

## 📱 반응형 디자인

모든 페이지는 모바일, 태블릿, 데스크톱에 최적화되어 있습니다.

## 🔒 보안 참고사항

현재 버전은 **데모/프로토타입**으로 LocalStorage를 사용합니다.
실제 운영 시에는:
- 백엔드 서버 구축 필요
- 데이터베이스 연동 필요
- 실제 결제 API 연동 필요
- HTTPS 필수

## 📄 라이선스

이 프로젝트는 개인 포트폴리오/데모 목적으로 제작되었습니다.

## 👨‍💻 개발자

Developed by redrum1007-ux

---

**Made with ❤️ by Antigravity AI**
