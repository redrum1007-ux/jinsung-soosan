// 팝업 공지 표시 스크립트
// index.html 등 메인 페이지에 포함시킬 스크립트

function checkAndShowPopup() {
    const popups = JSON.parse(localStorage.getItem('popups')) || [];
    const today = new Date().toISOString().split('T')[0];
    
    // 활성화된 팝업 찾기
    const activePopups = popups.filter(popup => {
        return popup.active && 
               popup.startDate <= today && 
               popup.endDate >= today;
    });

    if (activePopups.length === 0) return;

    // 오늘 하루 보지 않기 체크
    const hiddenPopups = JSON.parse(localStorage.getItem('hiddenPopupsToday')) || {};
    const todayKey = new Date().toDateString();

    // 표시할 팝업 필터링
    const popupsToShow = activePopups.filter(popup => {
        return !hiddenPopups[todayKey]?.includes(popup.id);
    });

    if (popupsToShow.length === 0) return;

    // 첫 번째 팝업 표시
    showPopupNotice(popupsToShow[0]);
}

function showPopupNotice(popup) {
    // 팝업 HTML 생성
    const popupHTML = `
        <div id="noticePopup" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div style="
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                position: relative;
            ">
                <!-- 닫기 버튼 -->
                <button onclick="closePopup()" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    z-index: 10;
                    font-weight: bold;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                ">✕</button>

                <!-- 팝업 내용 -->
                <div style="padding: 40px 30px 30px 30px;">
                    <h2 style="
                        color: #0056a6;
                        margin-bottom: 20px;
                        font-size: 1.8rem;
                        text-align: center;
                    ">${popup.title}</h2>
                    
                    ${popup.image ? `
                        <img src="${popup.image}" alt="${popup.title}" style="
                            width: 100%;
                            border-radius: 10px;
                            margin-bottom: 20px;
                        ">
                    ` : ''}
                    
                    <div style="
                        line-height: 1.8;
                        color: #333;
                        white-space: pre-wrap;
                        margin-bottom: 25px;
                        text-align: center;
                        font-size: 1.1rem;
                    ">${popup.content}</div>
                    
                    ${popup.link ? `
                        <a href="${popup.link}" style="
                            display: block;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 15px;
                            text-align: center;
                            border-radius: 8px;
                            text-decoration: none;
                            font-weight: 700;
                            margin-bottom: 15px;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.2)'"
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            자세히 보기 →
                        </a>
                    ` : ''}
                    
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        padding-top: 15px;
                        border-top: 2px solid #f0f0f0;
                    ">
                        <input type="checkbox" id="hideToday" style="
                            width: 18px;
                            height: 18px;
                            cursor: pointer;
                        ">
                        <label for="hideToday" style="
                            cursor: pointer;
                            color: #666;
                            font-size: 0.95rem;
                            user-select: none;
                        ">오늘 하루 보지 않기</label>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 팝업을 body에 추가
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // 팝업 ID 저장 (닫기 시 사용)
    document.getElementById('noticePopup').dataset.popupId = popup.id;
}

function closePopup() {
    const popup = document.getElementById('noticePopup');
    if (!popup) return;

    const hideToday = document.getElementById('hideToday')?.checked;
    const popupId = parseInt(popup.dataset.popupId);

    if (hideToday) {
        // 오늘 하루 보지 않기 설정
        const hiddenPopups = JSON.parse(localStorage.getItem('hiddenPopupsToday')) || {};
        const todayKey = new Date().toDateString();
        
        if (!hiddenPopups[todayKey]) {
            hiddenPopups[todayKey] = [];
        }
        
        if (!hiddenPopups[todayKey].includes(popupId)) {
            hiddenPopups[todayKey].push(popupId);
        }
        
        localStorage.setItem('hiddenPopupsToday', JSON.stringify(hiddenPopups));
    }

    popup.remove();
}

// 페이지 로드 시 팝업 체크
document.addEventListener('DOMContentLoaded', function() {
    // 이전 날짜의 '오늘 하루 보지 않기' 데이터 정리
    const hiddenPopups = JSON.parse(localStorage.getItem('hiddenPopupsToday')) || {};
    const todayKey = new Date().toDateString();
    
    // 오늘이 아닌 날짜의 데이터 삭제
    Object.keys(hiddenPopups).forEach(key => {
        if (key !== todayKey) {
            delete hiddenPopups[key];
        }
    });
    
    localStorage.setItem('hiddenPopupsToday', JSON.stringify(hiddenPopups));
    
    // 팝업 표시 (1초 딜레이)
    setTimeout(checkAndShowPopup, 1000);
});

// ESC 키로 팝업 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});
