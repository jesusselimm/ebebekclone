// Sayfa kontrolü
if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
    console.log('wrong page');
    throw new Error('Bu sayfa ana sayfada çalışmalıdır.');
}

class ProductCarousel {
    constructor() {
        this.addMaterialIcons();
        this.createStyles();
        this.createHTML();
        this.initializeCarousel();
    }

    addMaterialIcons() {
        // Material Icons
        if (!document.querySelector('link[href*="Material+Icons"]')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        // Quicksand Font
        if (!document.querySelector('link[href*="Quicksand"]')) {
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
        }
    }

    createStyles() {
        const styles = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Quicksand', sans-serif;
            }

            body {
                background: white;
                min-height: 100vh;
            }

            .product-carousel-container {
                max-width: 1200px;
                margin: 2rem auto;
                padding: 0;
                background: white;
                border-radius: 0;
                box-shadow: none;
            }

            .product-carousel-title {
                font-size: 24px;
                margin-bottom: 0;
                color: #ff6b00;
                padding: 15px 20px;
                font-weight: 700;
                background: #fff9ec;
                border-radius: 30px 30px 0 0;
                margin-bottom: 10px;
            }

            .product-carousel-title::after {
                font-size: 14px;
                color: #0099e5;
                cursor: pointer;
            }

            .product-carousel {
                background: white;
                padding: 0 40px;
                position: relative;
                overflow: hidden;
            }

            .product-carousel-wrapper {
                display: flex;
                transition: transform 0.3s ease;
                gap: 0;
                padding: 0;
                border-top: 1px solid #eee;
            }

            .product-card {
                flex: 0 0 calc(20% - 0px);
                background: white;
                border-radius: 0;
                padding: 20px;
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
            }

            .product-card:hover {
                box-shadow: none;
                transform: none;
            }

            .product-card:last-child {
                border-right: none;
            }

            .product-image-container {
                position: relative;
                padding-top: 100%;
                margin-bottom: 15px;
                overflow: hidden;
                border-radius: 8px;
            }

            .product-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
                transition: transform 0.3s ease;
            }

            .product-card:hover .product-image {
                transform: scale(1.05);
            }

            .product-title {
                margin: 10px 0;
                font-size: 13px;
                color: #333;
                height: 50px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-weight: 500;
                line-height: 1.3;
            }

            .price-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding: 10px 0;
            }

            .price {
                font-weight: 700;
                color: #333;
                font-size: 18px;
                margin-top: 10px;
            }

            .original-price {
                text-decoration: line-through;
                color: #999;
                font-size: 14px;
            }

            .discount {
                position: absolute;
                top: 10px;
                left: 10px;
                background-color: #ff6b6b;
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                z-index: 2;
            }

            .heart-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                font-size: 24px;
                color: #ff6b00;
                transition: all 0.3s ease;
                z-index: 2;
                background: white;
                border: 1px solid #e9e9e9;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                box-shadow: 0 2px 4px #e9e9e9;
            }

            .heart-icon:hover {
                transform: scale(1.1);
                border-color: #ff6b00;
            }

            .heart-icon.filled {
                color: #ff6b6b;
                border-color: #ff6b6b;
            }

            .product-carousel-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: #fff9ec;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                color: #ff6b00;
            }

            .product-carousel-button:hover {
                background: #f8f8f8;
                transform: translateY(-50%) scale(1.1);
            }

            .product-carousel-button.prev {
                left: 5px;
            }

            .product-carousel-button.next {
                right: 5px;
            }

            .rating {
                display: flex;
                align-items: center;
                gap: 4px;
                margin: 5px 0;
            }

            .rating .stars {
                color: #ffd700;
                font-size: 16px;
            }

            .rating .count {
                color: #666;
                font-size: 12px;
            }

            .sepete-ekle {
                width: 100%;
                padding: 10px;
                background: #fff9ec;
                color: #ff6b00;
                border: none;
                border-radius: 8px;
                margin-top: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
                text-align: center;
                text-decoration: none;
                display: block;
                font-size: 14px;
            }

            .sepete-ekle:hover {
                background: #ff6b00;
                color: white;
            }

            .cok-satan-badge {
                position: absolute;
                top: 10px;
                left: 10px;
                background: #ff6b00;
                color: white;
                padding: 4px 8px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                z-index: 2;
            }

            .yildiz-urun-badge {
                position: absolute;
                top: 45px;
                left: 10px;
                background: #ffd700;
                color: #333;
                padding: 3px 6px;
                border-radius: 2px;
                font-size: 10px;
                font-weight: 600;
                z-index: 2;
            }

            .discount-price {
                color: #ff6b00;
                font-weight: 700;
            }

            .discount-badge {
                background: #4CAF50;
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 12px;
                margin-left: 5px;
            }

            .video-badge {
                position: absolute;
                bottom: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                z-index: 2;
            }

            .ar-badge {
                position: absolute;
                bottom: 10px;
                left: 60px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                z-index: 2;
            }

            @media (max-width: 1200px) {
                .product-card {
                    flex: 0 0 calc(25% - 15px);
                }
            }

            @media (max-width: 992px) {
                .product-card {
                    flex: 0 0 calc(33.333% - 15px);
                }
            }

            @media (max-width: 768px) {
                .product-card {
                    flex: 0 0 calc(50% - 15px);
                }
                
                .product-carousel-title {
                    font-size: 20px;
                }
            }

            @media (max-width: 480px) {
                .product-card {
                    flex: 0 0 100%;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    createHTML() {
        const container = document.createElement('div');
        container.className = 'product-carousel-container';
        container.innerHTML = `
            <h2 class="product-carousel-title">Sizin İçin Seçtiklerimiz</h2>
            <div class="product-carousel">
                <button class="product-carousel-button prev">
                    <span class="material-icons">chevron_left</span>
                </button>
                <div class="product-carousel-wrapper"></div>
                <button class="product-carousel-button next">
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        `;
        document.body.appendChild(container);
    }

    createStars(rating) {
        const fullStar = '<span class="material-icons">star</span>';
        const emptyStar = '<span class="material-icons">star_border</span>';
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? fullStar : emptyStar);
        }
        return stars.join('');
    }

    formatPrice(price) {
        return price.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    initializeCarousel() {
        this.currentIndex = 0;
        this.products = [];
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.carouselWrapper = document.querySelector('.product-carousel-wrapper');
        this.prevButton = document.querySelector('.product-carousel .prev');
        this.nextButton = document.querySelector('.product-carousel .next');
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
    }

    async loadProducts() {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            this.products = JSON.parse(storedProducts);
            this.renderProducts();
            return;
        }

        try {
            const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
            this.products = await response.json();
            localStorage.setItem('products', JSON.stringify(this.products));
            this.renderProducts();
        } catch (error) {
            console.error('Ürünler yüklenirken hata oluştu:', error);
        }
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.navigate('prev'));
        this.nextButton.addEventListener('click', () => this.navigate('next'));
    }

    navigate(direction) {
        const cardWidth = document.querySelector('.product-card').offsetWidth;
        const maxScroll = this.carouselWrapper.scrollWidth - this.carouselWrapper.clientWidth;
        
        if (direction === 'next' && this.currentIndex * cardWidth < maxScroll) {
            this.currentIndex++;
        } else if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex--;
        }

        this.carouselWrapper.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
    }

    calculateDiscount(price, originalPrice) {
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    }

    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        if (index === -1) {
            this.favorites.push(productId);
        } else {
            this.favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.renderProducts();
    }

    renderProducts() {
        this.carouselWrapper.innerHTML = '';
        
        this.products.forEach(product => {
            const isFavorite = this.favorites.includes(product.id);
            const discount = product.price !== product.original_price ? 
                this.calculateDiscount(product.price, product.original_price) : null;
            
            // Ürün detaylarını kısaltma
            const productName = product.name.length > 60 ? product.name.substring(0, 60) + '...' : product.name;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="cok-satan-badge">ÇOK SATAN</div>
                ${product.id % 3 === 0 ? '<div class="yildiz-urun-badge">YILDIZ ÜRÜN</div>' : ''}
                <button class="heart-icon ${isFavorite ? 'filled' : ''}" data-product-id="${product.id}">
                    <span class="material-icons">${isFavorite ? 'favorite' : 'favorite_border'}</span>
                </button>
                <div class="product-image-container">
                    <img src="${product.img}" alt="${product.name}" class="product-image">
                    ${product.id % 5 === 0 ? '<span class="video-badge">VIDEO</span>' : ''}
                    ${product.id % 5 === 0 ? '<span class="ar-badge">AR</span>' : ''}
                </div>
                <div class="rating">
                    <div class="stars">
                        ${this.createStars(product.rating || 4)}
                    </div>
                    <span class="count">(${product.id * 13 % 400})</span>
                </div>
                <h3 class="product-title">${productName}</h3>
                <div class="price-container">
                    ${discount ? `
                        <div class="original-price">${this.formatPrice(product.original_price)} TL</div>
                        <div class="discount-price" style="color:#ff6b00; font-weight:bold;">
                            ${this.formatPrice(product.price)} TL
                            <span class="discount-badge" style="background:#4CAF50;">%${discount}</span>
                        </div>
                    ` : `
                        <div class="price">${this.formatPrice(product.price)} TL</div>
                    `}
                </div>
                <a href="#" class="sepete-ekle">Sepete Ekle</a>
            `;

            productCard.addEventListener('click', (e) => {
                if (!e.target.classList.contains('heart-icon') && !e.target.classList.contains('sepete-ekle')) {
                    window.open(product.url, '_blank');
                }
            });

            const heartIcon = productCard.querySelector('.heart-icon');
            heartIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(product.id);
            });

            const sepeteEkleBtn = productCard.querySelector('.sepete-ekle');
            sepeteEkleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert('Ürün sepete eklendi!');
            });

            this.carouselWrapper.appendChild(productCard);
        });
    }
}

class BannerCarousel {
    constructor() {
        this.addMaterialIcons();
        this.createStyles();
        this.createHTML();
        this.banners = [];
        this.initializeCarousel();
    }

    addMaterialIcons() {
        // Material Icons
        if (!document.querySelector('link[href*="Material+Icons"]')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        // Quicksand Font
        if (!document.querySelector('link[href*="Quicksand"]')) {
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
        }
    }

    createStyles() {
        const styles = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Quicksand', sans-serif;
                background: white;
                min-height: 100vh;
            }

            .top-bar {
                background: white;
                padding: 15px 0;
                border-bottom: 1px solid #eee;
            }

            .top-bar-content {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 30px;
                align-items: center;
            }

            .logo {
                width: 150px;
                height: auto;
            }

            .logo img {
                width: 100%;
                height: auto;
            }

            .search-bar {
                position: relative;
                max-width: 800px;
                width: 100%;
            }

            .search-input {
                width: 100%;
                padding: 12px 20px;
                border: none;
                border-radius: 30px;
                background: #f0f7ff;
                font-size: 14px;
                color: #333;
                transition: all 0.3s ease;
            }

            .search-input:focus {
                outline: none;
                background: #e6f2ff;
                box-shadow: 0 0 0 2px rgba(0, 153, 229, 0.2);
            }

            .search-input::placeholder {
                color: #999;
            }

            .search-icon {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #0099e5;
                font-size: 20px;
                cursor: pointer;
            }

            .user-actions {
                display: flex;
                gap: 20px;
                align-items: center;
            }

            .user-action {
                display: flex;
                align-items: center;
                gap: 8px;
                text-decoration: none;
                color: #333;
                font-size: 14px;
                padding: 8px 15px;
                border-radius: 20px;
                transition: all 0.3s ease;
            }

            .user-action:hover {
                background: rgba(0, 153, 229, 0.1);
                color: #0099e5;
            }

            .user-action.cart {
                background: #f0f7ff;
            }

            .user-action.cart:hover {
                background: #e6f2ff;
            }

            .user-action i {
                font-size: 24px;
                color: #0099e5;
            }

            .top-nav {
                background: white;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }

            .top-nav-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                padding: 0;
                height: 40px;
            }

            .top-nav-left {
                display: flex;
                gap: 25px;
                justify-content: center;
            }

            .top-nav-right {
                display: flex;
                gap: 20px;
                align-items: center;
                position: absolute;
                right: 20px;
            }

            .top-nav-item {
                color: #666;
                text-decoration: none;
                font-size: 11px;
                display: flex;
                align-items: center;
                gap: 4px;
                transition: color 0.3s ease;
                font-weight: 500;
                padding: 5px 8px;
            }

            .top-nav-item:hover {
                color: #0099e5;
            }

            .top-nav-item[href="#internete"] {
                color: #0099e5;
            }

            .top-nav-item[href="#kampanyalar"],
            .top-nav-item[href="#outlet"] {
                color: #ff6b00;
            }

            .top-nav-item.dropdown {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .top-nav-item.dropdown .material-icons {
                font-size: 13px;
                color: inherit;
            }

            .top-nav-right .top-nav-item {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #666;
            }

            .top-nav-right .material-icons {
                color: #0099e5;
                font-size: 16px;
            }

            .header {
                max-width: 100%;
                margin: 0;
                padding: 0;
                background: #0099e5;
            }

            .nav {
                max-width: 1200px;
                margin: 0 auto;
                background: transparent;
                padding: 0;
                margin-bottom: 20px;
                border-radius: 0;
                display: flex;
                box-shadow: none;
                overflow: visible;
                height: 50px;
                align-items: center;
                justify-content: center;
            }

            .nav-item {
                color: white;
                text-decoration: none;
                font-weight: 500;
                font-size: 11px;
                transition: all 0.3s ease;
                padding: 15px;
                position: relative;
                white-space: nowrap;
                background: transparent;
                letter-spacing: 0.2px;
                text-align: center;
            }

            .nav-item:first-child {
                background: transparent;
                color: white;
                border-radius: 0;
                margin: 0;
                padding: 15px 12px;
                font-weight: 600;
                font-size: 11px;
                box-shadow: none;
            }

            .nav-item:first-child:hover {
                color: rgba(255, 255, 255, 0.8);
                background: transparent;
            }

            .nav-item:not(:first-child) {
                font-weight: 600;
                text-transform: uppercase;
                padding: 15px 12px;
            }

            .nav-item:not(:first-child):hover {
                color: rgba(255, 255, 255, 0.8);
                background: transparent;
            }

            .nav-item.active {
                background: #fff6f0;
                color: #ff6b00;
                border-radius: 30px;
                margin: 10px 15px 10px 0;
                padding: 10px 25px;
                font-weight: 600;
                font-size: 11px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .nav-item.active:hover {
                background: #fff0e6;
                color: #ff6b00;
            }

            .nav-item .material-icons {
                display: none;
            }

            .banner-container {
                background: white;
                padding: 20px;
                margin: 0 auto;
                max-width: 1200px;
                border-radius: 30px;
            }

            .banner-carousel {
                background: linear-gradient(135deg, #0099e5 0%, #00bfff 100%);
                border-radius: 20px;
                overflow: hidden;
                position: relative;
                margin-bottom: 10px;
            }

            .banner-carousel-wrapper {
                display: flex;
                transition: transform 0.3s ease;
            }

            .banner-slide {
                flex: 0 0 100%;
                display: flex;
                align-items: center;
                padding: 30px;
                background: linear-gradient(135deg, #0099e5 0%, #00bfff 100%);
                color: white;
                border-radius: 20px;
                min-height: 300px;
                position: relative;
                overflow: hidden;
            }

            .banner-slide::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%),
                    radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
            }

            .banner-content {
                flex: 1;
                padding-right: 40px;
                position: relative;
                z-index: 2;
            }

            .banner-badge {
                background: rgba(255, 255, 255, 0.2);
                padding: 8px 20px;
                border-radius: 20px;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
                font-weight: 700;
                backdrop-filter: blur(5px);
            }

            .banner-title {
                font-size: 32px;
                margin-bottom: 15px;
                line-height: 1.2;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .banner-description {
                font-size: 18px;
                margin-bottom: 25px;
                opacity: 0.9;
            }

            .banner-button {
                background: #ff6b00;
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 30px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                box-shadow: 0 4px 15px rgba(255,107,0,0.3);
            }

            .banner-button:hover {
                background: #ff8533;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255,107,0,0.4);
            }

            .banner-image {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                position: relative;
                z-index: 2;
            }

            .banner-image img {
                max-width: 100%;
                height: auto;
                max-height: 300px;
                object-fit: contain;
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
                transform: scale(1.1);
                transition: transform 0.3s ease;
            }

            .banner-slide:hover .banner-image img {
                transform: scale(1.15);
            }

            .banner-decorations {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 1;
            }

            .banner-star {
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.8);
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                animation: twinkle 2s infinite;
            }

            .banner-candy {
                position: absolute;
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: float 3s infinite;
            }

            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            .banner-thumbnail-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
                padding: 10px;
                position: relative;
                align-items: center;
            }

            .thumbnails-wrapper {
                display: flex;
                gap: 10px;
                justify-content: center;
                flex: 1;
                overflow-x: auto;
                padding: 5px 10px;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            .thumbnails-wrapper::-webkit-scrollbar {
                display: none;
            }

            .banner-thumbnail {
                width: 120px;
                height: 60px;
                border-radius: 10px;
                overflow: hidden;
                cursor: pointer;
                border: 2px solid transparent;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                position: relative;
                flex-shrink: 0;
            }

            .banner-thumbnail::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.2);
                transition: background 0.3s ease;
            }

            .banner-thumbnail:hover {
                transform: translateY(-2px);
            }

            .banner-thumbnail.active {
                border-color: #ff6b00;
                transform: translateY(-2px);
            }

            .banner-thumbnail.active::after {
                background: rgba(0,0,0,0);
            }

            .banner-thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .banner-carousel-button {
                position: relative;
                transform: none;
                background: white;
                border: none;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 2;
                transition: all 0.3s ease;
                margin: 0 10px;
            }

            .banner-carousel-button:hover {
                background: #f8f8f8;
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(0,0,0,0.2);
            }

            .banner-carousel-button .material-icons {
                font-size: 24px;
                color: #0099e5;
            }

            @media (max-width: 992px) {
                .top-bar-content {
                    grid-template-columns: auto 1fr;
                    gap: 15px;
                }

                .user-actions {
                    grid-column: 1 / -1;
                    justify-content: center;
                }

                .top-nav-content {
                    flex-direction: column;
                    gap: 10px;
                }

                .top-nav-left, .top-nav-right {
                    width: 100%;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            }

            .material-icons {
                font-size: 24px;
                color: inherit;
                vertical-align: middle;
            }

            .search-icon .material-icons {
                color: #0099e5;
                font-size: 24px;
            }

            .user-action .material-icons {
                color: #0099e5;
                font-size: 24px;
                margin-right: 4px;
            }

            .heart-icon .material-icons {
                font-size: 24px;
                color: #ff6b00;
                transition: color 0.3s ease;
            }

            .heart-icon.filled .material-icons {
                color: #ff6b6b;
            }

            .banner-carousel-button .material-icons {
                font-size: 24px;
                color: #333;
            }

            .sepete-ekle .material-icons {
                font-size: 20px;
                margin-right: 8px;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    async createHTML() {
        // Üst bar
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        topBar.innerHTML = `
            <div class="top-bar-content">
                <a href="/" class="logo">
                    <img src="https://i.hizliresim.com/4tmgm10.jpg?_gl=1*gljt5*_ga*MTgyODUyNTI3MS4xNzQxOTQ5OTgy*_ga_M9ZRXYS2YN*MTc0MjcyMTM4NC4zLjEuMTc0MjcyMjA4MS40OS4wLjA" alt="ebebek logo">
                </a>
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Ürün, kategori veya marka arayın">
                    <span class="search-icon">
                        <span class="material-icons">search</span>
                    </span>
                </div>
                <div class="user-actions">
                    <a href="#" class="user-action">
                        <span class="material-icons">favorite_border</span>
                        <span>Favorilerim</span>
                    </a>
                    <a href="#" class="user-action">
                        <span class="material-icons">person_outline</span>
                        <span>Hesabım</span>
                    </a>
                    <a href="#" class="user-action cart">
                        <span class="material-icons">shopping_cart</span>
                        <span>Sepetim</span>
                    </a>
                </div>
            </div>
        `;
        document.body.insertBefore(topBar, document.body.firstChild);

        // Üst menü
        const topNav = document.createElement('div');
        topNav.className = 'top-nav';
        topNav.innerHTML = `
            <div class="top-nav-content">
                <div class="top-nav-left">
                    <a href="#" class="top-nav-item dropdown">
                        Kategoriler
                        <span class="material-icons">expand_more</span>
                    </a>
                    <a href="#" class="top-nav-item dropdown">
                        Keşfet
                        <span class="material-icons">expand_more</span>
                    </a>
                    <a href="#" class="top-nav-item dropdown">
                        Hediye
                        <span class="material-icons">expand_more</span>
                    </a>
                    <a href="#internete" class="top-nav-item">İnternete Özel Ürünler</a>
                    <a href="#kampanyalar" class="top-nav-item">Kampanyalar</a>
                    <a href="#outlet" class="top-nav-item">Outlet</a>
                </div>
                <div class="top-nav-right">
                    <a href="#" class="top-nav-item">
                        <span class="material-icons">local_shipping</span>
                        SİPARİŞİM NEREDE
                    </a>
                    <a href="#" class="top-nav-item">
                        <span class="material-icons">location_on</span>
                        EN YAKIN EBEBEK
                    </a>
                </div>
            </div>
        `;
        document.body.insertBefore(topNav, document.body.children[1]);

        // Ana header ve nav
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
            <nav class="nav">
                <a href="#" class="nav-item" data-category="OYUNCAK">
                    OYUNCAK
                </a>
                <a href="#" class="nav-item" data-category="ARAC_GEREC">
                    ARAÇ GEREÇ&MOBİLYA
                </a>
                <a href="#" class="nav-item" data-category="BEBEK_BEZI">
                    BEBEK BEZİ&ISLAK MENDİL
                </a>
                <a href="#" class="nav-item" data-category="BEBEK_MODASI">
                    BEBEK MODASI
                </a>
                <a href="#" class="nav-item" data-category="EMZIRME">
                    EMZİRME&BESLENME
                </a>
                <a href="#" class="nav-item" data-category="BANYO">
                    BANYO&BAKIM
                </a>
                <a href="#" class="nav-item" data-category="BAYRAM">
                    BAYRAM ŞENLİĞİ
                </a>
                <a href="#" class="nav-item" data-category="DUYURU">
                    DUYURU
                </a>
            </nav>
        `;
        document.body.insertBefore(header, document.body.children[2]);

        // Banner container
        const bannerContainer = document.createElement('div');
        bannerContainer.className = 'banner-container';
        bannerContainer.innerHTML = `
            <div class="banner-carousel">
                <div class="banner-carousel-wrapper"></div>
            </div>
            <div class="banner-thumbnail-container">
                <button class="banner-carousel-button prev">
                    <span class="material-icons">chevron_left</span>
                </button>
                <div class="thumbnails-wrapper"></div>
                <button class="banner-carousel-button next">
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        `;
        document.body.insertBefore(bannerContainer, document.body.children[3]);

        // URL'den aktif kategoriyi al
        const urlParams = new URLSearchParams(window.location.search);
        const activeCategory = urlParams.get('category') || 'BEBEK_MODASI';

        // Aktif kategoriyi işaretle
        const navItems = header.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.category === activeCategory) {
                item.classList.add('active');
                // Aktif başlık stillerini uygula
                item.style.background = '#fff6f0';
                item.style.color = '#ff6b00';
                item.style.borderRadius = '30px';
                item.style.margin = '10px 15px 10px 0';
                item.style.padding = '10px 25px';
                item.style.fontWeight = '600';
                item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }

            // Tıklama olaylarını ekle
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Tüm active sınıflarını ve stilleri kaldır
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    navItem.style.background = '';
                    navItem.style.color = '';
                    navItem.style.borderRadius = '';
                    navItem.style.margin = '';
                    navItem.style.padding = '';
                    navItem.style.fontWeight = '';
                    navItem.style.boxShadow = '';
                });
                // Tıklanan öğeye active sınıfı ve stilleri ekle
                item.classList.add('active');
                item.style.background = '#fff6f0';
                item.style.color = '#ff6b00';
                item.style.borderRadius = '30px';
                item.style.margin = '10px 15px 10px 0';
                item.style.padding = '10px 25px';
                item.style.fontWeight = '600';
                item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                // URL'yi güncelle
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('category', item.dataset.category);
                window.history.pushState({}, '', newUrl);
            });
        });

        await this.loadBanners();
        this.renderBanners();
    }

    async loadBanners() {
        try {
            const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
            const products = await response.json();
            
            // İndirimli ürünleri filtrele
            const discountedProducts = products.filter(product => product.price !== product.original_price);
            
            // İndirimli ürünlerden banner'ları oluştur
            this.banners = discountedProducts.map(product => {
                const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
                return {
                    badge: `%${discount} İndirim`,
                    title: `${product.brand} ${product.name}`,
                    description: `${product.original_price.toLocaleString('tr-TR')} TL yerine şimdi sadece ${product.price.toLocaleString('tr-TR')} TL!`,
                    image: product.img,
                    url: product.url,
                    category: product.category
                };
            });

            // İlk indirimli ürünün kategorisini bul ve navbar'ı güncelle
            if (this.banners.length > 0) {
                const activeCategory = this.banners[0].category;
                const navItems = document.querySelectorAll('.nav-item');
                
                // Tüm active sınıflarını kaldır
                navItems.forEach(item => {
                    item.classList.remove('active');
                    // OYUNCAK başlığının stillerini kaldır
                    if (item.dataset.category === 'OYUNCAK') {
                        item.style.background = '';
                        item.style.color = '';
                        item.style.borderRadius = '';
                        item.style.margin = '';
                        item.style.padding = '';
                        item.style.fontWeight = '';
                        item.style.boxShadow = '';
                    }
                });

                // İlgili kategoriye active sınıfını ekle ve OYUNCAK stillerini uygula
                navItems.forEach(item => {
                    if (item.dataset.category === activeCategory) {
                        item.classList.add('active');
                        // OYUNCAK başlığının stillerini uygula
                        item.style.background = '#fff6f0';
                        item.style.color = '#ff6b00';
                        item.style.borderRadius = '30px';
                        item.style.margin = '10px 15px 10px 0';
                        item.style.padding = '10px 25px';
                        item.style.fontWeight = '600';
                        item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }
                });

                // URL'yi güncelle
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('category', activeCategory);
                window.history.pushState({}, '', newUrl);
            }

        } catch (error) {
            console.error('Banner\'lar yüklenirken hata oluştu:', error);
        }
    }

    renderBanners() {
        const bannerWrapper = document.querySelector('.banner-carousel-wrapper');
        const thumbnailsWrapper = document.querySelector('.thumbnails-wrapper');

        bannerWrapper.innerHTML = this.banners.map(banner => `
            <div class="banner-slide">
                <div class="banner-decorations">
                    ${Array.from({length: 10}, (_, i) => `
                        <div class="banner-star" style="
                            top: ${Math.random() * 100}%;
                            left: ${Math.random() * 100}%;
                            animation-delay: ${Math.random() * 2}s;
                        "></div>
                    `).join('')}
                    ${Array.from({length: 5}, (_, i) => `
                        <div class="banner-candy" style="
                            top: ${Math.random() * 100}%;
                            left: ${Math.random() * 100}%;
                            animation-delay: ${Math.random() * 3}s;
                            transform: rotate(${Math.random() * 360}deg);
                        "></div>
                    `).join('')}
                </div>
                <div class="banner-content">
                    <span class="banner-badge">${banner.badge}</span>
                    <h2 class="banner-title">${banner.title}</h2>
                    <p class="banner-description">${banner.description}</p>
                    <button class="banner-button" onclick="window.open('${banner.url}', '_blank')">
                        <span class="material-icons">shopping_cart</span>
                        Ürünü İncele
                    </button>
                </div>
                <div class="banner-image">
                    <img src="${banner.image}" alt="${banner.title}">
                </div>
            </div>
        `).join('');

        thumbnailsWrapper.innerHTML = this.banners.map((banner, index) => `
            <div class="banner-thumbnail ${index === 0 ? 'active' : ''}" onclick="this.carousel.goToSlide(${index})">
                <img src="${banner.image}" alt="Thumbnail ${index + 1}">
            </div>
        `).join('');

        // Navbar'ı güncelle
        const navItems = document.querySelectorAll('.nav-item');
        
        // Önce tüm active sınıflarını kaldır
        navItems.forEach(item => {
            item.classList.remove('active');
            item.style.background = '';
            item.style.color = '';
            item.style.borderRadius = '';
            item.style.margin = '';
            item.style.padding = '';
            item.style.fontWeight = '';
            item.style.boxShadow = '';
        });

        // BEBEK_MODASI başlığını aktif yap
        navItems.forEach(item => {
            if (item.dataset.category === 'BEBEK_MODASI') {
                item.classList.add('active');
                item.style.background = '#fff6f0';
                item.style.color = '#ff6b00';
                item.style.borderRadius = '30px';
                item.style.margin = '10px 15px 10px 0';
                item.style.padding = '10px 25px';
                item.style.fontWeight = '600';
                item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        });
    }

    initializeCarousel() {
        this.currentSlide = 0;
        this.banners = [];
        this.carouselWrapper = document.querySelector('.banner-carousel-wrapper');
        this.prevButton = document.querySelector('.banner-carousel-button.prev');
        this.nextButton = document.querySelector('.banner-carousel-button.next');
        this.thumbnails = document.querySelectorAll('.banner-thumbnail');
        
        this.prevButton.addEventListener('click', () => this.navigate('prev'));
        this.nextButton.addEventListener('click', () => this.navigate('next'));
        
        // Otomatik geçiş için interval
        this.autoPlayInterval = setInterval(() => this.navigate('next'), 5000);
        
        // Mouse hover olduğunda otomatik geçişi durdur
        const carousel = document.querySelector('.banner-carousel');
        carousel.addEventListener('mouseenter', () => clearInterval(this.autoPlayInterval));
        carousel.addEventListener('mouseleave', () => {
            this.autoPlayInterval = setInterval(() => this.navigate('next'), 5000);
        });
    }

    navigate(direction) {
        const slides = document.querySelectorAll('.banner-slide');
        const thumbnails = document.querySelectorAll('.banner-thumbnail');
        
        if (direction === 'next') {
            this.currentSlide = (this.currentSlide + 1) % slides.length;
        } else {
            this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
        }
        
        this.carouselWrapper.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Thumbnail'ları güncelle
        thumbnails.forEach((thumb, index) => {
            if (index === this.currentSlide) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.banner-slide');
        const thumbnails = document.querySelectorAll('.banner-thumbnail');
        
        this.currentSlide = index;
        this.carouselWrapper.style.transform = `translateX(-${index * 100}%)`;
        
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
}

// Carousel'leri başlat
document.addEventListener('DOMContentLoaded', () => {
    new BannerCarousel();
    new ProductCarousel();
});