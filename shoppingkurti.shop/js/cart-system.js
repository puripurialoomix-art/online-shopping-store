// Cart System for Homepage and All Pages
// This file handles cart badge updates and basic cart functionality

// Load cart manager
if (typeof CartManager === 'undefined') {
    class CartManager {
        constructor() {
            this.cart = this.loadCart();
        }

        loadCart() {
            const cartData = localStorage.getItem('shoppingCart');
            return cartData ? JSON.parse(cartData) : [];
        }

        saveCart() {
            localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
            this.updateCartBadge();
        }

        addToCart(product) {
            const existingItem = this.cart.find(item => item.id === product.id && item.size === product.size);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    mrp: product.mrp,
                    image: product.image,
                    size: product.size || '',
                    quantity: 1
                });
            }
            
            this.saveCart();
            return true;
        }

        removeFromCart(productId, size = '') {
            this.cart = this.cart.filter(item => !(item.id === productId && item.size === size));
            this.saveCart();
        }

        updateQuantity(productId, size, quantity) {
            const item = this.cart.find(item => item.id === productId && item.size === size);
            if (item) {
                if (quantity <= 0) {
                    this.removeFromCart(productId, size);
                } else {
                    item.quantity = quantity;
                    this.saveCart();
                }
            }
        }

        getCart() {
            return this.cart;
        }

        getCartCount() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        }

        getCartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }

        clearCart() {
            this.cart = [];
            this.saveCart();
        }

        updateCartBadge() {
            const badges = document.querySelectorAll('.cart-badge, .badge');
            const count = this.getCartCount();
            
            badges.forEach(badge => {
                badge.textContent = count;
                if (count > 0) {
                    badge.style.display = 'inline-block';
                } else {
                    badge.style.display = 'none';
                }
            });
        }
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Update badge on page load
document.addEventListener('DOMContentLoaded', function() {
    cartManager.updateCartBadge();
});
