@echo off
echo ===================================
echo 진성네이처푸드 배포 스크립트
echo ===================================
echo.

REM Git 설치 확인
git --version >nul 2>&1
if errorlevel 1 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo https://git-scm.com/download/win 에서 Git을 설치해주세요.
    pause
    exit /b 1
)

echo [1/5] Git 리포지토리 초기화...
if not exist .git (
    git init
    echo Git 리포지토리가 초기화되었습니다.
) else (
    echo 이미 Git 리포지토리가 존재합니다.
)

echo.
echo [2/5] 파일 추가 중...
git add .

echo.
echo [3/5] 커밋 생성 중...
git commit -m "Deploy: 진성네이처푸드 쇼핑몰"

echo.
echo [4/5] GitHub 리포지토리 URL을 입력해주세요.
echo 예: https://github.com/username/jinsung-naturefood.git
set /p REPO_URL="URL: "

if "%REPO_URL%"=="" (
    echo [오류] URL을 입력해주세요.
    pause
    exit /b 1
)

echo.
echo [5/5] GitHub에 업로드 중...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ===================================
echo 배포 완료! 🎉
echo ===================================
echo.
echo 다음 단계:
echo 1. https://netlify.com 또는 https://vercel.com 접속
echo 2. GitHub 리포지토리 연결
echo 3. 자동 배포 시작
echo.
pause
