// Payment Gateway Configuration
// 실제 운영 시 환경변수로 관리 필요

const PAYMENT_CONFIG = {
    // Toss Payments 설정
    toss: {
        clientKey: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq', // 테스트 키 (실제 키로 교체 필요)
        secretKey: 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R', // 서버용 시크릿 키
        enabled: true
    },
    
    // PortOne (구 아임포트) 설정
    portone: {
        impCode: 'imp10391932', // 가맹점 식별코드 (실제 코드로 교체 필요)
        apiKey: 'YOUR_API_KEY', // REST API 키
        apiSecret: 'YOUR_API_SECRET', // REST API Secret
        enabled: true
    },
    
    // 기본 설정
    default: 'toss', // 'toss' 또는 'portone'
    
    // 서버 API 엔드포인트 (백엔드 서버 실행 필요)
    backendUrl: 'http://localhost:5000'
};

// 결제 금액 검증
function validatePaymentAmount(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('유효하지 않은 결제 금액입니다.');
    }
    return true;
}

// 주문 번호 생성
function generateOrderId() {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
