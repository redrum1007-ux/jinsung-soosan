# Vercel 배포 가이드 🚀

## 현재 문제: 404 NOT_FOUND

Vercel이 `index.html`을 찾지 못해서 발생한 에러입니다.

## 해결 방법

### 1. GitHub 저장소 구조 확인

**❌ 잘못된 구조:**

```
your-repo/
  └── 진성네이처푸드 쇼핑몰/
      ├── index.html
      ├── style.css
      └── ...
```

**✅ 올바른 구조:**

```
your-repo/
  ├── index.html
  ├── style.css
  ├── vercel.json
  └── ...
```

### 2. 수정 방법

#### 옵션 A: GitHub에서 파일 구조 수정

1. GitHub 저장소 접속
2. "진성네이처푸드 쇼핑몰" 폴더 **안의 모든 파일**을 루트로 이동
3. 빈 폴더 삭제
4. 커밋 & 푸시

#### 옵션 B: Vercel 프로젝트 설정 변경

1. Vercel 대시보드 접속
2. 프로젝트 → Settings → General
3. **Root Directory** 설정:
   - `진성네이처푸드 쇼핑몰` 입력
4. Save & Redeploy

### 3. 배포 확인

위 방법 중 하나를 적용한 후:

1. Vercel에서 자동 재배포 대기
2. 또는 수동으로 "Redeploy" 클릭
3. 배포 완료 후 URL 확인

## 추가 팁

### vercel.json 파일 추가

프로젝트 루트에 `vercel.json` 파일이 포함되어 있습니다.
이 파일을 GitHub에 함께 올리면 라우팅 설정이 자동 적용됩니다.

### 로컬 테스트

배포 전 로컬에서 테스트:

```bash
# Vercel CLI 설치 (한 번만)
npm install -g vercel

# 로컬 테스트
cd "진성네이처푸드 쇼핑몰"
vercel dev
```

## 문제 해결 체크리스트

- [ ] GitHub 저장소에서 `index.html` 파일이 루트에 있는지 확인
- [ ] `vercel.json` 파일이 루트에 있는지 확인
- [ ] Vercel Root Directory 설정 확인
- [ ] Redeploy 실행

## 배포 성공 후

배포 성공하면 다음 기능들이 정상 작동합니다:

- ✅ 메인 페이지 (슬라이드 배너)
- ✅ 상품 목록
- ✅ 장바구니
- ✅ 결제 페이지
- ✅ 관리자 페이지

---

**참고:** localStorage를 사용하는 기능들은 각 사용자의 브라우저에 저장되므로,
배포 후에도 정상 작동합니다.
