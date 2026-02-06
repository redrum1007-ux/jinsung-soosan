// Initial Product Data (Dummy Data)
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

// Initialize Products in LocalStorage if empty
function initializeProducts() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
}

// Render Products
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const products = JSON.parse(localStorage.getItem('products'));
    productGrid.innerHTML = ''; // Clear existing content

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
function addToCart(productName) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.name === productName);

    if (!product) {
        alert('상품을 찾을 수 없습니다.');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();

    // Simple visual feedback
    alert(`${productName} 상품이 장바구니에 담겼습니다! 🛒`);
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = totalItems;
        badge.classList.add('bump'); // Animation class could be added here
        setTimeout(() => badge.classList.remove('bump'), 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    renderProducts();

    // Event listeners for other interactive elements can go here
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            document.querySelector('.best-sellers').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
