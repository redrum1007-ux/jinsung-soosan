# 🚀 가장 쉬운 배포 방법 (Git 없이)

Git이 설치되어 있지 않아도 **드래그 앤 드롭**만으로 온라인 배포가 가능합니다!

---

## ⚡ 방법 1: Netlify Drop (가장 빠름 - 1분)

### 단계:

1. **브라우저로 이동**: https://app.netlify.com/drop
2. **폴더 드래그**: 이 프로젝트 폴더 전체를 웹 페이지에 드래그 앤 드롭
3. **완료!** 즉시 URL이 생성됩니다 (예: `https://random-name-123456.netlify.app`)

### 도메인 변경하기:

- Site settings → Domain management → 원하는 이름으로 변경
- 예: `jinsung-naturefood.netlify.app`

---

## ⚡ 방법 2: Vercel Deploy (CLI 없이)

### 단계:

1. **Vercel 가입**: https://vercel.com
2. **새 프로젝트**: "Add New" → "Project"
3. **GitHub 없이 배포**:
   - "Import Third-Party Git Repository" 선택
   - 또는 폴더를 ZIP으로 압축 → Vercel CLI 설치 후 `vercel --prod` 실행

---

## ⚡ 방법 3: GitHub Desktop 사용 (Git GUI)

Git 명령어가 어려우면 **GitHub Desktop** 사용:

### 단계:

1. **GitHub Desktop 다운로드**: https://desktop.github.com/
2. **설치 및 로그인**
3. **리포지토리 생성**:
   - File → Add Local Repository
   - 이 프로젝트 폴더 선택
   - "Create Repository" 클릭
4. **GitHub에 업로드**:
   - Publish repository 클릭
   - Repository name 입력: `jinsung-naturefood`
   - Publish 클릭
5. **Netlify/Vercel 연결**:
   - Netlify/Vercel에서 GitHub 리포지토리 선택
   - 자동 배포 시작

---

## 📦 ZIP 파일로 배포하기

일부 플랫폼은 ZIP 파일 업로드를 지원합니다:

### 준비:

1. 다음 파일/폴더 **제외**하고 압축:
   - `node_modules/` 폴더
   - `.env` 파일
   - `database.sqlite` 파일

2. 나머지 파일을 ZIP으로 압축

3. 플랫폼에서 ZIP 업로드

---

## 🎯 내 추천: Netlify Drop

**지금 바로 시도해보세요:**

1. 탐색기에서 이 폴더 열기
2. 브라우저에서 https://app.netlify.com/drop 열기
3. 폴더를 브라우저로 드래그
4. 끝!

**장점:**

- ✅ Git 불필요
- ✅ 계정 생성 불필요 (익명 배포 가능)
- ✅ HTTPS 자동 제공
- ✅ 무료 도메인 제공

**단점:**

- ❌ 업데이트 시 매번 드래그 필요 (자동 배포 안 됨)
- ❌ 백엔드 미지원 (프론트엔드만)

---

## 💡 배포 후 확인사항

배포 완료 후 다음을 테스트하세요:

- [ ] 메인 페이지가 잘 로드되는가?
- [ ] 제품 목록이 표시되는가?
- [ ] 장바구니에 추가가 되는가?
- [ ] 로그인/회원가입이 작동하는가?
- [ ] 모바일에서도 잘 보이는가?

---

## 🆘 문제 해결

### "index.html이 없습니다" 오류

→ 프로젝트 폴더 전체를 드래그했는지 확인 (하위 폴더가 아닌 루트 폴더)

### 이미지가 안 보여요

→ 이미지 경로가 상대경로인지 확인 (`/images/...` 대신 `images/...`)

### CSS가 적용 안 돼요

→ `style.css` 파일이 같은 폴더에 있는지 확인

---

**지금 바로 배포해보세요!** 🚀
