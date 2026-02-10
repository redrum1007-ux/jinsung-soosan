// API Configuration
const API_URL = 'http://localhost:5000/api';
let useApi = true; // Will auto-switch to false if connection fails

// Auth Helpers
function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Data Manager: Abstracts API vs LocalStorage
const DataManager = {
    async checkApi() {
        try {
            await fetch(`${API_URL}/products`);
            useApi = true;
            console.log('Backend connected');
        } catch (e) {
            useApi = false;
            console.log('Backend not available, using LocalStorage');
        }
    },

    async getProducts() {
        if (useApi) {
            try {
                const res = await fetch(`${API_URL}/products`);
                if (!res.ok) throw new Error('API Error');
                return await res.json();
            } catch (e) {
                console.warn('Fetching products from API failed, falling back to LocalStorage', e);
                // Fallback to local storage if API call fails mid-session
                return JSON.parse(localStorage.getItem('products')) || [];
            }
        }
        return JSON.parse(localStorage.getItem('products')) || [];
    },

    async addToCart(product) {
        if (useApi && getToken()) {
            try {
                const res = await fetch(`${API_URL}/cart/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': getToken()
                    },
                    body: JSON.stringify({ productId: product.id, quantity: 1 })
                });
                if (res.ok) return true;
            } catch (e) {
                console.error('API Add to cart failed', e);
            }
        }
        
        // LocalStorage Fallback
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    },

    async getCart() {
        if (useApi && getToken()) {
            try {
                const res = await fetch(`${API_URL}/cart`, {
                    headers: { 'x-auth-token': getToken() }
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.error('API Get cart failed', e);
            }
        }
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
};

// Initial Product Data (Fallback/Seed)
const initialProducts = [
    {
        id: 1,
        name: "완도산 특대 전복 (1kg)",
        price: 59000,
        discount: "-15%",
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        isHot: false,
        category: "건어물"
    },
    {
        id: 2,
        name: "명품 영광 굴비 세트",
        price: 120000,
        discount: null,
        image: "https://images.unsplash.com/photo-1534604973900-c41846f47c40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        isHot: false,
        category: "건어물"
    },
    {
        id: 3,
        name: "자연산 수산물 랜덤박스",
        price: 35000,
        discount: "HOT",
        image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        isHot: true,
        category: "건어물"
    },
    {
        id: 4,
        name: "프리미엄 육수용 멸치",
        price: 15000,
        discount: null,
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        isHot: false,
        category: "멸치"
    }
];

// Initialize
async function initApp() {
    await DataManager.checkApi();
    
    // Seed LocalStorage if empty (for fallback)
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    renderProducts();
    updateCartBadge();
}

// Render Products
async function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const products = await DataManager.getProducts();
    productGrid.innerHTML = ''; 

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const priceFormatted = new Intl.NumberFormat('ko-KR').format(product.price);
        const discountBadge = product.discount ? `<span>${product.discount}</span>` : '';

        card.innerHTML = `
            <div class="image-placeholder" style="background-image: url('${product.image}'); cursor: pointer;" onclick="location.href='detail.html?id=${product.id}'"></div>
            <h4 style="cursor: pointer;" onclick="location.href='detail.html?id=${product.id}'">${product.name}</h4>
            <p class="price">₩${priceFormatted} ${discountBadge}</p>
            <button class="add-cart" onclick="addToCart('${product.name}')">담기</button>
        `;
        productGrid.appendChild(card);
    });
}

// Cart Functionality
async function addToCart(productName) {
    const products = await DataManager.getProducts();
    const product = products.find(p => p.name === productName);

    if (!product) {
        alert('상품을 찾을 수 없습니다.');
        return;
    }

    await DataManager.addToCart(product);
    updateCartBadge();
    alert(`${productName} 상품이 장바구니에 담겼습니다! 🛒`);
}

async function updateCartBadge() {
    const cart = await DataManager.getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = totalItems;
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            document.querySelector('.best-sellers').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

