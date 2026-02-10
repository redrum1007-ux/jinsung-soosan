// Quill.js 리치 텍스트 에디터 설정 및 유틸리티
// 상품 등록/수정 페이지에서 사용

// Quill 에디터 설정
const QUILL_CONFIG = {
    theme: 'snow',  // 'snow' 또는 'bubble'
    modules: {
        toolbar: {
            container: [
                // 폰트 스타일
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                
                // 텍스트 스타일
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                
                // 정렬
                [{ 'align': [] }],
                
                // 리스트
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                
                // 미디어
                ['link', 'image', 'video'],
                
                // 기타
                ['blockquote', 'code-block'],
                ['clean']  // 포맷 제거
            ],
            handlers: {
                'image': imageHandler,
                'video': videoHandler
            }
        }
    },
    placeholder: '상품 설명을 입력하세요...\n\n이미지, 동영상, 링크 등을 자유롭게 추가할 수 있습니다.',
};

// Quill 에디터 인스턴스 생성
function createQuillEditor(elementId, options = {}) {
    const config = { ...QUILL_CONFIG, ...options };
    const quill = new Quill(`#${elementId}`, config);
    
    // 에디터 인스턴스 저장 (나중에 참조용)
    if (!window.quillEditors) {
        window.quillEditors = {};
    }
    window.quillEditors[elementId] = quill;
    
    return quill;
}

// 이미지 업로드 핸들러
function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'true');
    
    input.onchange = async () => {
        const files = Array.from(input.files);
        
        if (files.length === 0) return;
        
        const quill = this.quill;
        const range = quill.getSelection(true);
        
        for (const file of files) {
            // 파일 크기 체크 (2MB 제한)
            if (file.size > 2 * 1024 * 1024) {
                alert(`${file.name}은(는) 크기가 너무 큽니다. 2MB 이하의 이미지를 선택해주세요.`);
                continue;
            }
            
            // Base64로 변환
            const base64 = await convertToBase64(file);
            
            // 에디터에 이미지 삽입
            quill.insertEmbed(range.index, 'image', base64);
            quill.setSelection(range.index + 1);
        }
    };
    
    input.click();
}

// 동영상 임베드 핸들러
function videoHandler() {
    const quill = this.quill;
    const range = quill.getSelection(true);
    
    const url = prompt('YouTube 동영상 URL을 입력하세요:');
    
    if (url) {
        // YouTube URL을 embed URL로 변환
        let embedUrl = url;
        
        // YouTube 일반 URL 처리
        if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            if (videoId) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
        }
        // YouTube 단축 URL 처리
        else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            if (videoId) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
        }
        
        // 에디터에 동영상 삽입
        quill.insertEmbed(range.index, 'video', embedUrl);
        quill.setSelection(range.index + 1);
    }
}

// 파일을 Base64로 변환
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// 에디터 내용 가져오기 (HTML)
function getEditorHTML(editorId) {
    const quill = window.quillEditors?.[editorId];
    if (!quill) {
        console.error(`Editor ${editorId} not found`);
        return '';
    }
    return quill.root.innerHTML;
}

// 에디터 내용 설정 (HTML)
function setEditorHTML(editorId, html) {
    const quill = window.quillEditors?.[editorId];
    if (!quill) {
        console.error(`Editor ${editorId} not found`);
        return;
    }
    quill.root.innerHTML = html || '';
}

// 에디터 내용 초기화
function clearEditor(editorId) {
    const quill = window.quillEditors?.[editorId];
    if (!quill) {
        console.error(`Editor ${editorId} not found`);
        return;
    }
    quill.setText('');
}

// 에디터가 비어있는지 확인
function isEditorEmpty(editorId) {
    const quill = window.quillEditors?.[editorId];
    if (!quill) return true;
    
    const text = quill.getText().trim();
    return text.length === 0;
}

// 이모티콘 삽입 헬퍼
function insertEmoji(editorId, emoji) {
    const quill = window.quillEditors?.[editorId];
    if (!quill) return;
    
    const range = quill.getSelection(true);
    quill.insertText(range.index, emoji);
    quill.setSelection(range.index + emoji.length);
}

// 자주 사용하는 이모티콘 목록
const COMMON_EMOJIS = [
    '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
    '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋',
    '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '👍', '👎', '👌', '✌️', '🤞', '🤝', '👏', '🙌', '👐', '🤲',
    '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
    '✨', '⭐', '🌟', '💫', '🔥', '💥', '💯', '✅', '❌', '🎉'
];

// 이모티콘 피커 UI 생성
function createEmojiPicker(editorId) {
    const container = document.createElement('div');
    container.className = 'emoji-picker';
    container.style.cssText = `
        position: absolute;
        background: white;
        border: 2px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 5px;
        max-width: 400px;
        z-index: 1000;
    `;
    
    COMMON_EMOJIS.forEach(emoji => {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.style.cssText = `
            font-size: 1.5rem;
            border: none;
            background: none;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background 0.2s;
        `;
        btn.onmouseover = () => btn.style.background = '#f0f0f0';
        btn.onmouseout = () => btn.style.background = 'none';
        btn.onclick = (e) => {
            e.preventDefault();
            insertEmoji(editorId, emoji);
            container.remove();
        };
        container.appendChild(btn);
    });
    
    return container;
}

// 에디터 툴바에 이모티콘 버튼 추가 헬퍼
function addEmojiButton(editorId, toolbarSelector) {
    const toolbar = document.querySelector(toolbarSelector || '.ql-toolbar');
    if (!toolbar) return;
    
    const emojiBtn = document.createElement('button');
    emojiBtn.className = 'ql-emoji';
    emojiBtn.innerHTML = '😀';
    emojiBtn.title = '이모티콘';
    emojiBtn.style.cssText = 'font-size: 1.2rem; padding: 3px 5px;';
    
    emojiBtn.onclick = (e) => {
        e.preventDefault();
        
        // 기존 피커 제거
        const existingPicker = document.querySelector('.emoji-picker');
        if (existingPicker) {
            existingPicker.remove();
            return;
        }
        
        // 새 피커 생성 및 위치 조정
        const picker = createEmojiPicker(editorId);
        document.body.appendChild(picker);
        
        const rect = emojiBtn.getBoundingClientRect();
        picker.style.top = `${rect.bottom + 5}px`;
        picker.style.left = `${rect.left}px`;
        
        // 외부 클릭 시 닫기
        setTimeout(() => {
            document.addEventListener('click', function closePickerOnClickOutside(e) {
                if (!picker.contains(e.target) && e.target !== emojiBtn) {
                    picker.remove();
                    document.removeEventListener('click', closePickerOnClickOutside);
                }
            });
        }, 100);
    };
    
    toolbar.appendChild(emojiBtn);
}

console.log('✅ Quill Editor Config Loaded');
