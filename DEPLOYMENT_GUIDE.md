# 🚀 온라인 배포 가이드

진성네이처푸드 쇼핑몰을 온라인으로 배포하는 방법을 안내합니다.

---

## 배포 옵션

### 옵션 1: 프론트엔드만 배포 (추천 - 빠르고 무료) ⭐

- **플랫폼**: Netlify 또는 GitHub Pages
- **장점**: 완전 무료, 배포 즉시 완료, 도메인 제공
- **단점**: 백엔드 API 없음 (localStorage만 사용)

### 옵션 2: 풀스택 배포

- **플랫폼**: Vercel, Render, Railway
- **장점**: 백엔드 포함 완전한 기능
- **단점**: 일부 유료 (무료 티어 있음)

---

## 🎯 방법 1: Netlify로 프론트엔드 배포 (가장 쉬움)

### 1단계: Netlify 가입

1. https://www.netlify.com 접속
2. GitHub 계정으로 회원가입

### 2단계: GitHub에 코드 업로드

```bash
# Git 초기화 (아직 안했다면)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub 리포지토리 생성 후 연결
git remote add origin https://github.com/YOUR_USERNAME/jinsung-naturefood.git

# 업로드
git push -u origin main
```

### 3단계: Netlify에서 배포

1. Netlify 대시보드에서 "Add new site" 클릭
2. "Import an existing project" 선택
3. GitHub 연결 및 리포지토리 선택
4. Build settings:
   - **Build command**: (비워두기)
   - **Publish directory**: `.` (현재 디렉토리)
5. "Deploy site" 클릭

**완료!** 🎉 몇 초 후 `https://your-site-name.netlify.app` 형태의 URL이 생성됩니다.

---

## 🎯 방법 2: GitHub Pages로 배포 (완전 무료)

GitHub Pages는 프론트엔드만 배포할 수 있습니다.

### 단계:

1. GitHub 리포지토리 생성
2. 코드 푸시:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jinsung-naturefood.git
git push -u origin main
```

3. GitHub 리포지토리 → Settings → Pages
4. Source: "Deploy from a branch" 선택
5. Branch: `main` 선택, 폴더: `/ (root)`
6. Save

**접속 URL**: `https://YOUR_USERNAME.github.io/jinsung-naturefood/`

---

## 🎯 방법 3: Vercel로 풀스택 배포

백엔드까지 함께 배포하려면 Vercel을 사용하세요.

### 1단계: Vercel 가입

1. https://vercel.com 접속
2. GitHub 계정으로 가입

### 2단계: GitHub에 코드 업로드 (위와 동일)

### 3단계: Vercel에서 배포

1. Vercel 대시보드 → "Add New Project"
2. GitHub 리포지토리 연결
3. Framework Preset: "Other" 선택
4. Environment Variables 설정:
   ```
   TOSS_SECRET_KEY=your_secret_key
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
5. Deploy 클릭

**완료!** 프론트엔드와 백엔드가 함께 배포됩니다.

---

## 🎯 방법 4: Render로 백엔드 배포

무료로 백엔드만 따로 배포할 수 있습니다.

### 1단계: Render 가입

https://render.com 접속 후 가입

### 2단계: 새 Web Service 생성

1. Dashboard → "New +" → "Web Service"
2. GitHub 리포지토리 연결
3. 설정:
   - **Name**: jinsung-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 3단계: 환경변수 설정

Environment 탭에서 추가:

```
TOSS_SECRET_KEY=your_key
JWT_SECRET=your_secret
PORT=5000
```

### 4단계: 프론트엔드에서 API URL 업데이트

`script.js`와 `payment-config.js`에서:

```javascript
const API_URL = "https://jinsung-api.onrender.com";
```

---

## 📋 배포 전 체크리스트

- [ ] `.gitignore` 파일 확인 (`.env`, `node_modules` 제외)
- [ ] 환경변수 확인 및 설정
- [ ] API URL 업데이트 (백엔드 배포 시)
- [ ] 이미지 경로 확인 (절대경로 vs 상대경로)
- [ ] 결제 API 키를 실제 키로 교체 (실제 운영 시)
- [ ] CORS 설정 확인

---

## 🌐 도메인 연결 (선택사항)

### Netlify/Vercel 커스텀 도메인 설정

1. 원하는 도메인 구매 (가비아, GoDaddy 등)
2. Netlify/Vercel 대시보드 → Domain Settings
3. Custom Domain 추가
4. DNS 레코드 업데이트:
   - Type: `CNAME`
   - Name: `@` 또는 `www`
   - Value: 제공된 Netlify/Vercel URL

---

## 🔧 배포 후 테스트

1. **프론트엔드 확인**
   - [ ] 메인 페이지 로딩
   - [ ] 제품 목록 표시
   - [ ] 장바구니 동작
   - [ ] 로그인/회원가입

2. **백엔드 확인** (풀스택 배포 시)
   - [ ] API 엔드포인트 응답
   - [ ] 데이터베이스 연결
   - [ ] 인증 토큰 발급

---

## ⚡ 빠른 배포 명령어 (요약)

```bash
# 1. GitHub에 업로드
git init
git add .
git commit -m "Initial deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jinsung-naturefood.git
git push -u origin main

# 2. Netlify CLI로 배포 (선택사항)
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 💡 추천 배포 조합

### 초보자용 (가장 쉬움)

- **프론트엔드**: Netlify 또는 GitHub Pages
- **백엔드**: 없음 (localStorage 사용)

### 중급자용

- **프론트엔드**: Netlify
- **백엔드**: Render (Free tier)

### 프로덕션용

- **풀스택**: Vercel (Pro plan)
- 또는 프론트엔드: Netlify + 백엔드: AWS/GCP

---

## 🆘 문제 해결

### 배포 후 페이지가 안 보여요

- `index.html` 파일이 루트 디렉토리에 있는지 확인
- Netlify/Vercel 빌드 로그 확인

### API 호출이 안 돼요

- CORS 설정 확인 (`server.js`에 `cors()` 미들웨어)
- API URL이 올바른지 확인
- 환경변수 설정 확인

### 결제가 안 돼요

- Toss Payments/PortOne 키가 올바른지 확인
- 테스트 모드인지 실제 모드인지 확인

---

**지금 바로 배포해보세요!** 🚀

가장 빠른 방법: Netlify Drag & Drop

1. https://app.netlify.com/drop 접속
2. 프로젝트 폴더를 드래그 앤 드롭
3. 완료!
