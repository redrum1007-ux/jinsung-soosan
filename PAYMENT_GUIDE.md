# 결제 시스템 연동 가이드 🔐

## 개요

진성네이처푸드 쇼핑몰에 **실제 결제 시스템**을 연동하는 가이드입니다.

## 지원하는 결제 방식

### 1. Toss Payments (토스페이먼츠) ⭐ 추천

- **장점**: 간편한 연동, 낮은 수수료, 빠른 정산
- **수수료**: 카드 2.9%, 계좌이체 0.9%
- **홈페이지**: https://www.tosspayments.com/

### 2. PortOne (구 아임포트)

- **장점**: 다양한 PG사 지원, 유연한 결제 방식
- **홈페이지**: https://portone.io/

---

## 🚀 빠른 시작 (Toss Payments 기준)

### 1단계: 가맹점 가입

1. [Toss Payments](https://www.tosspayments.com/) 접속
2. 회원가입 및 가맹점 신청
3. **클라이언트 키**와 **시크릿 키** 발급 받기

### 2단계: API 키 설정

`payment-config.js` 파일에서 발급받은 키를 입력:

```javascript
const PAYMENT_CONFIG = {
  toss: {
    clientKey: "YOUR_ACTUAL_CLIENT_KEY", // 여기에 실제 키 입력
    secretKey: "YOUR_ACTUAL_SECRET_KEY", // 서버용 시크릿 키
    enabled: true,
  },
};
```

### 3단계: 백엔드 설정

`server.js`에 결제 라우트 추가:

```javascript
app.use("/api/payment", require("./routes/payment"));
```

`.env` 파일에 환경변수 추가:

```
TOSS_SECRET_KEY=your_secret_key_here
PORTONE_API_KEY=your_api_key
PORTONE_API_SECRET=your_api_secret
```

### 4단계: 필수 패키지 설치

```bash
npm install axios
```

### 5단계: 테스트

1. `checkout-with-payment.html` 파일을 브라우저에서 열기
2. 장바구니에 상품 추가
3. 결제 진행 (테스트 모드에서는 실제 결제 없이 테스트 가능)

---

## 📋 결제 흐름 (Flow)

```
1. 고객이 "결제하기" 버튼 클릭
   ↓
2. 프론트엔드에서 결제 정보 수집
   ↓
3. PG사 SDK 호출 (Toss Payments 또는 PortOne)
   ↓
4. 결제창 팝업 → 고객이 결제 정보 입력
   ↓
5. PG사에서 결제 처리
   ↓
6. 성공 시: successUrl로 리다이렉트
   실패 시: failUrl로 리다이렉트
   ↓
7. 백엔드에서 결제 검증 (서버 투 서버)
   ↓
8. 주문 완료 처리 및 DB 저장
```

---

## 🧪 테스트 카드 정보

### Toss Payments 테스트 카드

- **카드번호**: 아무 16자리 (예: 1234-5678-1234-5678)
- **유효기간**: 미래 날짜 (예: 12/25)
- **CVC**: 아무 3자리 (예: 123)
- **비밀번호**: 아무 2자리 (예: 00)

### PortOne 테스트 카드

PG사별로 테스트 카드가 다르므로 PortOne 문서 참조:
https://portone.gitbook.io/docs/test/card

---

## 🔧 기본 파일 구조

```
진성네이처푸드 쇼핑몰/
├─ checkout.html               # 기존 Mock 결제
├─ checkout-with-payment.html  # 실제 결제 연동 버전 ⭐
├─ payment-config.js           # 결제 API 키 설정
├─ routes/
│  └─ payment.js               # 백엔드 결제 검증 API
├─ PAYMENT_GUIDE.md            # 이 문서
└─ .env                        # 환경변수 (추가 필요)
```

---

## ⚠️ 보안 주의사항

### 1. API 키 관리

- ❌ **절대 클라이언트 코드에 Secret Key 노출하지 마세요!**
- ✅ Secret Key는 **반드시 서버 사이드**에서만 사용
- ✅ `.env` 파일을 `.gitignore`에 추가하여 GitHub 업로드 방지

### 2. 결제 검증

- 클라이언트에서 받은 결제 정보는 **반드시 서버에서 재검증**
- 결제 금액 위변조 방지를 위해 DB의 주문 금액과 실제 결제 금액 비교

### 3. HTTPS 필수

- 실제 운영 시 **HTTPS 필수** (Let's Encrypt 무료 인증서 추천)
- 로컬 테스트는 HTTP 가능

---

## 🎯 실제 운영 체크리스트

- [ ] 가맹점 승인 완료 (테스트 모드 → 실제 모드 전환)
- [ ] 실제 API 키로 교체
- [ ] 백엔드 결제 검증 로직 구현
- [ ] HTTPS 적용
- [ ] 주문 DB 연동
- [ ] 에러 처리 및 로깅
- [ ] 결제 성공/실패 페이지 생성
- [ ] 이메일/SMS 알림 설정 (선택)
- [ ] 정산 주기 확인

---

## 📞 고객센터

### Toss Payments

- 이메일: support@tosspayments.com
- 문서: https://docs.tosspayments.com/

### PortOne

- 이메일: support@portone.io
- 문서: https://portone.gitbook.io/docs/

---

## 🎓 다음 단계

1. **checkout-with-payment.html** 파일을 **checkout.html**로 교체하여 사용
2. 백엔드 서버 실행: `npm start`
3. 브라우저에서 테스트 진행
4. 실제 가맹점 전환 후 운영 시작

---

**Made with ❤️ by Antigravity AI**
