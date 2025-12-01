# 🛒 Shopping Cart System

## ✅ Working Features

1. **Add to Cart** → Opens cart page automatically
2. **Cart Badge** → Shows item count (0 when empty)
3. **Cart Page** → View, update quantity, remove items
4. **Checkout** → Complete address form + Edit cart items
5. **Order Success** → Confirmation page
6. **Buy Now** → Direct checkout with cart editing

---

## 🚀 How to Test

1. Open `singlepageview@pid=665.html` (already updated)
2. Click "Add To Cart" button
3. Cart page opens with your product
4. Cart badge shows count
5. Click "PLACE ORDER" to checkout

---

## 🔧 To Update All Product Pages

### Option 1: Double-click (Easiest)
Just double-click: **`update-all-products.bat`**

### Option 2: PowerShell
Right-click on **`update-products.ps1`** → Run with PowerShell

### Option 3: Manual Command
```powershell
.\update-products.ps1
```

This will update ALL product pages automatically!

---

## 🧹 Clear Cart (If Needed)

Open `clear-cart.html` in browser to reset cart.

---

## 📝 Files

- `js/cart.js` - Cart management
- `js/cart-system.js` - Homepage integration
- `js/product-actions.js` - Product page actions
- `cart.html` - Cart page
- `checkout.html` - Checkout page
- `order-success.html` - Success page

---

## 🐛 Issues?

1. Cart badge not showing? → Open `clear-cart.html`
2. Add to cart not working? → Check browser console (F12)
3. Old products showing? → Open `clear-cart.html`
