# 🔐 구글 로그인 설정 가이드

## 📋 목차

1. [Google Cloud Console 설정](#google-cloud-console-설정)
2. [Client ID 설정](#client-id-설정)
3. [테스트](#테스트)
4. [문제 해결](#문제-해결)

---

## Google Cloud Console 설정

### 1단계: 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단 메뉴에서 **"프로젝트 선택"** → **"새 프로젝트"** 클릭
3. 프로젝트 이름 입력 (예: "진성네이처푸드")
4. **"만들기"** 클릭

### 2단계: OAuth 동의 화면 구성

1. 좌측 메뉴 → **"API 및 서비스"** → **"OAuth 동의 화면"**
2. User Type: **"외부"** 선택 → **"만들기"**
3. 필수 정보 입력:
   - 앱 이름: `진성네이처푸드`
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
4. **"저장 후 계속"** 클릭
5. 범위(Scopes): **"저장 후 계속"** (기본 설정 유지)
6. 테스트 사용자: 자신의 Google 계정 추가
7. **"저장 후 계속"** → **"대시보드로 돌아가기"**

### 3단계: OAuth 2.0 Client ID 생성

1. 좌측 메뉴 → **"API 및 서비스"** → **"사용자 인증 정보"**
2. 상단 **"+ 사용자 인증 정보 만들기"** → **"OAuth 클라이언트 ID"**
3. 애플리케이션 유형: **"웹 애플리케이션"**
4. 이름: `진성네이처푸드 웹`
5. **승인된 JavaScript 원본** 추가:
   ```
   http://localhost
   http://localhost:5000
   http://127.0.0.1:5000
   ```

   - 배포 후에는 실제 도메인 추가 (예: `https://yourdomain.com`)
6. **승인된 리디렉션 URI**: 비워두기 (Google Sign-In은 필요 없음)
7. **"만들기"** 클릭
8. ✅ **Client ID 복사** (예: `123456789-abc...apps.googleusercontent.com`)

---

## Client ID 설정

### `google-auth-config.js` 파일 수정

1. `google-auth-config.js` 파일 열기
2. 다음 줄을 찾기:
   ```javascript
   CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID_HERE',
   ```
3. 복사한 Client ID로 교체:
   ```javascript
   CLIENT_ID: '123456789-abc...apps.googleusercontent.com',
   ```
4. 파일 저장

---

## 테스트

### 로컬 환경에서 테스트

1. **웹 서버 실행**:

   ```bash
   # Node.js 서버가 있는 경우
   npm start

   # 또는 간단한 HTTP 서버
   npx http-server . -p 5000

   # Python이 설치된 경우
   python -m http.server 5000
   ```

2. **브라우저에서 접속**:

   ```
   http://localhost:5000/login.html
   ```

3. **Google 로그인 테스트**:
   - "Google로 로그인" 버튼 확인
   - 버튼 클릭
   - Google 계정 선택
   - 권한 승인
   - 로그인 성공 확인

### 예상 동작

✅ **성공 시**:

- Google 로그인 버튼이 파란색으로 표시됨
- 클릭 시 Google 계정 선택 팝업
- 로그인 후 메인 페이지 이동
- 우측 상단에 프로필 사진/이름 표시

❌ **실패 시** (아래 문제 해결 참고):

- 버튼이 노란색 경고 메시지로 표시
- 콘솔에 에러 메시지

---

## 문제 해결

### 1. "Google Client ID를 설정해주세요" 경고

**원인**: `google-auth-config.js`에 Client ID가 설정되지 않음

**해결**:

1. Google Cloud Console에서 Client ID 확인
2. `google-auth-config.js` 파일의 `CLIENT_ID` 값 수정
3. 파일 저장 후 페이지 새로고침

---

### 2. "Origin not allowed" 에러

**에러 메시지**:

```
Not a valid origin for the client: http://localhost:5000
```

**원인**: Google Cloud Console에 현재 URL이 등록되지 않음

**해결**:

1. Google Cloud Console → OAuth 2.0 Client ID 편집
2. **승인된 JavaScript 원본**에 추가:
   ```
   http://localhost:5000
   ```
3. 저장 후 페이지 새로고침

---

### 3. "This browser or app may not be secure" 에러

**원인**: 최신 브라우저가 아니거나 쿠키/JavaScript 비활성화

**해결**:

- Chrome, Edge, Firefox 최신 버전 사용
- 시크릿/프라이빗 모드 해제
- 쿠키 및 JavaScript 활성화 확인

---

### 4. 로그인 버튼이 안 보임

**원인**: SDK 로딩 실패

**해결**:

1. 콘솔(F12) 확인
2. 네트워크 탭에서 `gsi/client` 로딩 확인
3. 인터넷 연결 확인
4. 페이지 새로고침

---

### 5. "Access blocked" 에러

**원인**: OAuth 동의 화면이 게시되지 않음

**해결**:

1. Google Cloud Console → **OAuth 동의 화면**
2. **"앱 게시"** 클릭 (테스트 단계에서는 본인 계정만 사용 가능)
3. 또는 **테스트 사용자**에 본인 Google 계정 추가

---

## 프로덕션 배포 시 주의사항

### 1. 승인된 도메인 추가

Google Cloud Console에서 실제 배포 도메인 추가:

```
https://yourdomain.com
https://www.yourdomain.com
```

### 2. HTTPS 필수

- Google Sign-In은 **HTTPS**에서만 완전히 작동
- Netlify, Vercel 등은 자동으로 HTTPS 제공

### 3. OAuth 동의 화면 게시

- "게시 상태: 테스트 중" → "프로덕션"으로 변경
- Google 검토 필요 (1~2주 소요)

---

## 추가 커스터마이징

### 버튼 스타일 변경

`google-auth-config.js`의 `BUTTON_CONFIG` 수정:

```javascript
BUTTON_CONFIG: {
    theme: 'filled_blue',    // outline, filled_blue, filled_black
    size: 'large',           // small, medium, large
    text: 'signin_with',     // signin_with, signup_with, continue_with
    shape: 'rectangular',    // rectangular, pill, circle
    width: 300
}
```

### One Tap 자동 로그인 활성화

로그인 페이지에서 자동으로 Google 로그인 프롬프트 표시:

`login.html`의 스크립트에 추가:

```javascript
showOneTap(); // Google One Tap 활성화
```

---

## 도움이 필요하신가요?

- [Google Sign-In 공식 문서](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 가이드](https://developers.google.com/identity/protocols/oauth2)

---

**축하합니다! 🎉** 이제 Google 로그인이 설정되었습니다!
