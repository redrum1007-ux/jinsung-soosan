// 주문 관리 시스템 유틸리티 함수

// 주문 상태 정의
const ORDER_STATUS = {
    PAID: { key: 'paid', label: '결제완료', color: '#28a745' },
    PREPARING: { key: 'preparing', label: '배송준비중', color: '#ffc107' },
    SHIPPING: { key: 'shipping', label: '배송중', color: '#17a2b8' },
    DELIVERED: { key: 'delivered', label: '배송완료', color: '#6c757d'},
    CANCELLED: { key: 'cancelled', label: '취소됨', color: '#dc3545' },
    REFUNDED: { key: 'refunded', label: '환불됨', color: '#dc3545' }
};

// 주문번호 생성 (ORD-YYYYMMDD-0001 형식)
function generateOrderNumber() {
    const orders = getOrders();
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    
    // 오늘 날짜의 주문 개수 확인
    const todayOrders = orders.filter(order => 
        order.orderNumber.includes(today)
    );
    
    const orderCount = todayOrders.length + 1;
    const orderNum = String(orderCount).padStart(4, '0');
    
    return `ORD-${today}-${orderNum}`;
}

// 주문 목록 가져오기
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// 주문 저장
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// 개별 주문 가져오기
function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(order => order.id === orderId);
}

// 주문 생성
function createOrder(orderData) {
    const orders = getOrders();
    
    const newOrder = {
        id: Date.now(),
        orderNumber: generateOrderNumber(),
        orderDate: new Date().toISOString(),
        customer: orderData.customer,
        shipping: orderData.shipping,
        items: orderData.items,
        payment: orderData.payment,
        status: 'paid',
        statusHistory: [
            {
                status: 'paid',
                date: new Date().toISOString(),
                note: '결제 완료'
            }
        ],
        memo: '',
        trackingNumber: ''
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    
    return newOrder;
}

// 주문 상태 업데이트
function updateOrderStatus(orderId, newStatus, note = '') {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    orders[orderIndex].status = newStatus;
    orders[orderIndex].statusHistory.push({
        status: newStatus,
        date: new Date().toISOString(),
        note: note || ORDER_STATUS[newStatus.toUpperCase()]?.label || newStatus
    });
    
    saveOrders(orders);
    return true;
}

// 송장번호 업데이트
function updateTrackingNumber(orderId, trackingNumber) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    orders[orderIndex].trackingNumber = trackingNumber;
    saveOrders(orders);
    return true;
}

// 관리자 메모 업데이트
function updateOrderMemo(orderId, memo) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    orders[orderIndex].memo = memo;
    saveOrders(orders);
    return true;
}

// 주문 검색
function searchOrders(query) {
    const orders = getOrders();
    const lowerQuery = query.toLowerCase();
    
    return orders.filter(order => 
        order.orderNumber.toLowerCase().includes(lowerQuery) ||
        order.customer.name.toLowerCase().includes(lowerQuery) ||
        order.customer.email.toLowerCase().includes(lowerQuery) ||
        order.customer.phone.includes(query)
    );
}

// 주문 필터링
function filterOrders(filters) {
    let orders = getOrders();
    
    // 상태별 필터
    if (filters.status && filters.status !== 'all') {
        orders = orders.filter(order => order.status === filters.status);
    }
    
    // 날짜 범위 필터
    if (filters.startDate) {
        orders = orders.filter(order => {
            const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
            return orderDate >= filters.startDate;
        });
    }
    
    if (filters.endDate) {
        orders = orders.filter(order => {
            const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
            return orderDate <= filters.endDate;
        });
    }
    
    return orders;
}

// 주문 통계 계산
function getOrderStatistics() {
    const orders = getOrders();
    const today = new Date().toISOString().split('T')[0];
    
    return {
        total: orders.length,
        today: orders.filter(order => 
            order.orderDate.split('T')[0] === today
        ).length,
        paid: orders.filter(order => order.status === 'paid').length,
        preparing: orders.filter(order => order.status === 'preparing').length,
        shipping: orders.filter(order => order.status === 'shipping').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length,
        totalRevenue: orders
            .filter(order => order.status !== 'cancelled' && order.status !== 'refunded')
            .reduce((sum, order) => sum + order.payment.totalAmount, 0),
        todayRevenue: orders
            .filter(order => 
                order.orderDate.split('T')[0] === today &&
                order.status !== 'cancelled' && 
                order.status !== 'refunded'
            )
            .reduce((sum, order) => sum + order.payment.totalAmount, 0)
    };
}

// 날짜 포맷팅
function formatOrderDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 금액 포맷팅
function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

// 주문 상태 다음 단계 가져오기
function getNextStatus(currentStatus) {
    const flow = {
        'paid': 'preparing',
        'preparing': 'shipping',
        'shipping': 'delivered'
    };
    
    return flow[currentStatus] || null;
}

// 주문 상태 변경 가능 여부
function canChangeStatus(currentStatus, newStatus) {
    // 완료 또는 취소된 주문은 변경 불가
    if (['delivered', 'cancelled', 'refunded'].includes(currentStatus)) {
        return false;
    }
    
    const validTransitions = {
        'paid': ['preparing', 'cancelled'],
        'preparing': ['shipping', 'cancelled'],
        'shipping': ['delivered', 'cancelled']
    };
    
    return validTransitions[currentStatus]?.includes(newStatus) || false;
}

// 주문 삭제 (관리자 전용)
function deleteOrder(orderId) {
    let orders = getOrders();
    orders = orders.filter(order => order.id !== orderId);
    saveOrders(orders);
    return true;
}

console.log('✅ Order Manager Loaded');
