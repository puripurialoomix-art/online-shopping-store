// Product Actions - Add to Cart & Buy Now
document.addEventListener('DOMContentLoaded', function() {
    // Extract product data from page
    function getProductData() {
        const productTitle = document.querySelector('.product-title, h1');
        const productPrice = document.querySelector('.final-price');
        const productMRP = document.querySelector('.mrp');
        const productImage = document.querySelector('.carousel-item.active img, .productimage');
        
        // Get product ID from URL or button
        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('pid');
        
        // If not in URL, try to extract from filename
        if (!productId) {
            const match = window.location.pathname.match(/pid[=@](\d+)/);
            productId = match ? match[1] : Date.now().toString();
        }

        return {
            id: productId,
            name: productTitle ? productTitle.textContent.trim() : 'Product',
            price: productPrice ? parseInt(productPrice.textContent.replace(/[^0-9]/g, '')) : 0,
            mrp: productMRP ? parseInt(productMRP.textContent.replace(/[^0-9]/g, '')) : 0,
            image: productImage ? productImage.src : '',
            size: ''
        };
    }

    function handleAddToCart() {
        const product = getProductData();
        
        // Check for size selection if size selector exists
        const selectedSizeEl = document.querySelector('input[name="selected_size"]:checked');
        if (selectedSizeEl) {
            product.size = selectedSizeEl.value;
        }

        // Add to cart
        if (typeof cartManager !== 'undefined') {
            cartManager.addToCart(product);
            
            // Redirect to cart page immediately
            window.location.href = 'cart.html';
        } else {
            console.error('Cart manager not loaded');
            alert('Error: Cart system not initialized');
        }
    }

    function handleBuyNow() {
        const product = getProductData();
        
        // Check for size selection if size selector exists
        const selectedSizeEl = document.querySelector('input[name="selected_size"]:checked');
        if (selectedSizeEl) {
            product.size = selectedSizeEl.value;
        }

        // Add to cart and redirect to checkout
        if (typeof cartManager !== 'undefined') {
            cartManager.addToCart(product);
            window.location.href = 'checkout.html';
        } else {
            console.error('Cart manager not loaded');
            alert('Error: Cart system not initialized');
        }
    }



    // Attach event listeners
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }

    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', handleBuyNow);
    }

    // Handle "Add to cart" links in product cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('compact-add-to-cart-btn') || 
            e.target.closest('.compact-add-to-cart-btn')) {
            e.preventDefault();
            
            const link = e.target.classList.contains('compact-add-to-cart-btn') ? 
                         e.target : e.target.closest('.compact-add-to-cart-btn');
            
            // Extract product ID from href
            const href = link.getAttribute('href');
            const match = href.match(/pid[=@](\d+)/);
            
            if (match) {
                const productCard = link.closest('.compact-product-card');
                const productName = productCard.querySelector('.product-name');
                const productPrice = productCard.querySelector('.fw-bold');
                const productMRP = productCard.querySelector('.text-muted');
                const productImage = productCard.querySelector('img');
                
                const product = {
                    id: match[1],
                    name: productName ? productName.textContent.trim() : 'Product',
                    price: productPrice ? parseInt(productPrice.textContent.replace(/[^0-9]/g, '')) : 0,
                    mrp: productMRP ? parseInt(productMRP.textContent.replace(/[^0-9]/g, '')) : 0,
                    image: productImage ? productImage.src : '',
                    size: ''
                };
                
                if (typeof cartManager !== 'undefined') {
                    cartManager.addToCart(product);
                    window.location.href = 'cart.html';
                }
            }
        }
    });

    // Auto-scroll carousel functionality
    const autoScrollCarousels = document.querySelectorAll('.compact-carousel');
    
    function initAutoScroll(carousel) {
        if (carousel.children.length === 0) return;
        
        const initialChildrenCount = carousel.children.length;
        if (initialChildrenCount > 0) {
            for (let i = 0; i < initialChildrenCount; i++) {
                carousel.appendChild(carousel.children[i].cloneNode(true));
            }
        }

        let animationFrameId = null;
        const scrollSpeed = 0.7;
        
        const scrollStep = () => {
            carousel.scrollLeft += scrollSpeed;
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };
        
        const startScrolling = () => {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(scrollStep);
            }
        };
        
        const stopScrolling = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };
        
        carousel.addEventListener('mouseenter', stopScrolling);
        carousel.addEventListener('mouseleave', startScrolling);
        startScrolling();
    }
    
    autoScrollCarousels.forEach(carousel => initAutoScroll(carousel));
});
