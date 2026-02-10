// Google OAuth 2.0 Configuration
// 사용 전 GOOGLE_LOGIN_SETUP.md 가이드를 참고하여 Client ID를 설정하세요

const GOOGLE_CONFIG = {
    // Google Cloud Console에서 발급받은 Client ID를 입력하세요
    // 예: '123456789-abcdefghijklmnop.apps.googleusercontent.com'
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID_HERE',
    
    // OAuth 스코프 (요청할 권한)
    SCOPES: [
        'profile',  // 프로필 정보 (이름, 사진)
        'email'     // 이메일 주소
    ],
    
    // 자동 로그인 설정
    AUTO_SELECT: false,  // 계정이 1개일 때 자동 선택
    
    // 로그인 버튼 커스터마이징
    BUTTON_CONFIG: {
        theme: 'filled_blue',  // 옵션: outline, filled_blue, filled_black
        size: 'large',         // 옵션: small, medium, large
        text: 'signin_with',   // 옵션: signin_with, signup_with, continue_with
        shape: 'rectangular',  // 옵션: rectangular, pill, circle, square
        logo_alignment: 'left',
        width: 300
    }
};

// Google Sign-In 초기화
function initGoogleSignIn(callback) {
    if (!GOOGLE_CONFIG.CLIENT_ID || GOOGLE_CONFIG.CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        console.error('❌ Google Client ID가 설정되지 않았습니다. GOOGLE_LOGIN_SETUP.md를 참고하세요.');
        return;
    }

    // Google Identity Services 라이브러리 로드 확인
    if (typeof google === 'undefined') {
        console.error('❌ Google Sign-In SDK가 로드되지 않았습니다.');
        return;
    }

    // Google Sign-In 초기화
    google.accounts.id.initialize({
        client_id: GOOGLE_CONFIG.CLIENT_ID,
        callback: callback,
        auto_select: GOOGLE_CONFIG.AUTO_SELECT,
        cancel_on_tap_outside: true,
        context: 'signin'
    });

    console.log('✅ Google Sign-In 초기화 완료');
}

// 로그인 버튼 렌더링
function renderGoogleButton(elementId) {
    if (!GOOGLE_CONFIG.CLIENT_ID || GOOGLE_CONFIG.CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div style="padding: 15px; background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #856404; font-weight: 600;">
                        ⚠️ Google Client ID를 설정해주세요
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 0.9rem; color: #856404;">
                        <a href="GOOGLE_LOGIN_SETUP.md" target="_blank" style="color: #007bff;">설정 가이드 보기</a>
                    </p>
                </div>
            `;
        }
        return;
    }

    google.accounts.id.renderButton(
        document.getElementById(elementId),
        GOOGLE_CONFIG.BUTTON_CONFIG
    );
}

// One Tap 로그인 프롬프트 표시 (선택적)
function showOneTap() {
    if (!GOOGLE_CONFIG.CLIENT_ID || GOOGLE_CONFIG.CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        return;
    }
    google.accounts.id.prompt();
}

// JWT 토큰 디코딩 (검증 없이 정보만 추출)
function parseJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('JWT 파싱 에러:', error);
        return null;
    }
}

// 구글 로그인 응답 처리
function handleGoogleLogin(response) {
    // JWT 토큰에서 사용자 정보 추출
    const userInfo = parseJWT(response.credential);
    
    if (!userInfo) {
        alert('로그인 처리 중 오류가 발생했습니다.');
        return;
    }

    // 사용자 정보 구조
    const user = {
        id: userInfo.sub,              // Google User ID
        email: userInfo.email,         // 이메일
        name: userInfo.name,           // 이름
        picture: userInfo.picture,     // 프로필 사진 URL
        emailVerified: userInfo.email_verified,  // 이메일 인증 여부
        provider: 'google',            // 로그인 제공자
        loginTime: new Date().toISOString(),
        token: response.credential     // JWT 토큰 (백엔드 검증용)
    };

    // localStorage에 사용자 정보 저장
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');

    console.log('✅ Google 로그인 성공:', user);
    
    return user;
}

// 로그아웃
function googleLogout() {
    // Google 로그아웃
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.disableAutoSelect();
    }
    
    // 로컬 세션 제거
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    console.log('✅ 로그아웃 완료');
}

// 현재 로그인 상태 확인
function isGoogleLoggedIn() {
    const user = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true' && user !== null;
}

// 현재 사용자 정보 가져오기
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}
