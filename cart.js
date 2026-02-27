/* ============================================================
   CART.JS — Cart Page & Checkout Page Logic
   ============================================================
   This file handles:
   1. Rendering the cart items on cart.html
   2. Quantity changes and item removal
   3. Order summary calculation
   4. Rendering checkout mini-cart on checkout.html
   5. Checkout form submission with validation
   6. Payment method UI switching
   ============================================================ */

function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  if (!cartContainer) return; // Not on cart page, skip
  
  const cart = getCart();
  
  if (cart.length === 0) {
    // Show empty cart message
    cartContainer.innerHTML = `
      <div class="cart-empty fade-in visible">
        <div class="icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any soaps yet. Discover our handmade collection!</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    renderOrderSummary(cart);
    return;
  }
  
  // Update cart count text in header
  const countEl = document.getElementById('cartCountText');
  if (countEl) countEl.textContent = `${cart.length} item${cart.length > 1 ? 's' : ''}`;
  
  // Build HTML for each cart item
  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    return `
      <div class="cart-item fade-in visible" data-id="${item.id}">
        <div class="cart-item-img">
          <span style="font-size:2.5rem">${item.emoji}</span>
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cat">${item.category}</p>
          <div class="cart-item-controls">
            <div class="mini-qty-control">
              <button class="mini-qty-btn" onclick="changeQty(${item.id}, ${item.quantity - 1})">−</button>
              <span class="mini-qty-value">${item.quantity}</span>
              <button class="mini-qty-btn" onclick="changeQty(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <span class="remove-btn" onclick="removeItem(${item.id})">Remove</span>
          </div>
        </div>
        <div style="text-align:right; flex-shrink:0;">
          <div class="cart-item-price">${formatPrice(itemTotal)}</div>
          <div style="font-size:0.75rem;color:var(--text-light);margin-top:4px">${formatPrice(item.price)} each</div>
        </div>
      </div>
    `;
  }).join('');
  
  renderOrderSummary(cart);
}

/**
 * renderOrderSummary() — Updates the right-side order summary panel
 * Calculates subtotal, delivery fee, and total.
 * Free delivery if order is ₹500 or above.
 */
function renderOrderSummary(cart) {
  const subtotal = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
  const delivery = subtotal >= 500 ? 0 : 60;
  const total = subtotal + delivery;
  
  const subtotalEl = document.getElementById('summarySubtotal');
  const deliveryEl = document.getElementById('summaryDelivery');
  const totalEl    = document.getElementById('summaryTotal');
  const savingsEl  = document.getElementById('summarySavings');
  
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (deliveryEl) deliveryEl.textContent = delivery === 0 ? '🎉 FREE' : formatPrice(delivery);
  if (totalEl)    totalEl.textContent    = formatPrice(total);
  
  // Calculate total savings from discounts
  const originalTotal = cart.reduce((t, i) => t + (i.originalPrice * i.quantity), 0);
  const savings = originalTotal - subtotal;
  if (savingsEl && savings > 0) {
    savingsEl.textContent = `You're saving ${formatPrice(savings)}!`;
    savingsEl.style.display = 'block';
  }
  
  // Enable/disable checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    if (cart.length === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';
    }
  }
}

/**
 * changeQty() — Called when +/- buttons are clicked in cart
 * Updates the quantity via the global updateQuantity() function,
 * then re-renders the cart to show the change.
 */
function changeQty(productId, newQty) {
  if (newQty < 1) {
    if (confirm('Remove this item from cart?')) {
      removeItem(productId);
    }
    return;
  }
  updateQuantity(productId, newQty);
  renderCart(); // Re-render to show updated numbers
}

/**
 * removeItem() — Removes item after confirmation
 */
function removeItem(productId) {
  removeFromCart(productId);
  renderCart();
  showToast('Item removed from cart');
}

/* ─── COUPON CODE LOGIC ─────────────────────────────────────
   Simple coupon validation. Real sites check with a server,
   but here we hardcode valid codes for demo purposes.
   ─────────────────────────────────────────────────────────── */
const VALID_COUPONS = {
  'SOAP10': 10,    // 10% off
  'BUBBLE20': 20,  // 20% off
  'LATHER15': 15,  // 15% off
  'WELCOME': 5     // 5% off for new users
};

function applyCoupon() {
  const input = document.getElementById('couponInput');
  if (!input) return;
  
  const code = input.value.trim().toUpperCase();
  const discount = VALID_COUPONS[code];
  
  if (discount) {
    showToast(`🎉 Coupon "${code}" applied! ${discount}% discount!`);
    input.style.borderColor = 'var(--sage)';
  } else {
    showToast(`❌ Invalid coupon code. Try SOAP10 or BUBBLE20`);
    input.style.borderColor = 'var(--rose)';
  }
}

/* ─── CHECKOUT PAGE LOGIC ───────────────────────────────────
   Multi-step checkout form with 3 steps:
   Step 1: Shipping Information
   Step 2: Payment Method
   Step 3: Review & Confirm
   ─────────────────────────────────────────────────────────── */
let currentStep = 1;
const TOTAL_STEPS = 3;

/**
 * initCheckout() — Sets up the checkout page
 * Renders the mini cart summary on the right,
 * and sets up the progress steps.
 */
function initCheckout() {
  if (!document.getElementById('checkoutMiniCart')) return;
  renderCheckoutMiniCart();
  renderCheckoutSummary();
  showStep(1);
}

/**
 * renderCheckoutMiniCart() — Shows cart items in the sidebar
 * on the checkout page (smaller version of cart items)
 */
function renderCheckoutMiniCart() {
  const container = document.getElementById('checkoutMiniCart');
  if (!container) return;
  
  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);font-size:0.85rem;text-align:center;">No items in cart</p>';
    return;
  }
  
  container.innerHTML = cart.map(item => `
    <div class="mini-cart-item">
      <div class="mini-item-img">${item.emoji}</div>
      <div class="mini-item-info">
        <h5>${item.name}</h5>
        <span>Qty: ${item.quantity}</span>
      </div>
      <div class="mini-item-price">${formatPrice(item.price * item.quantity)}</div>
    </div>
  `).join('');
}

/**
 * renderCheckoutSummary() — Updates price totals in checkout sidebar
 */
function renderCheckoutSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
  const delivery = subtotal >= 500 ? 0 : 60;
  const total = subtotal + delivery;
  
  const el = (id) => document.getElementById(id);
  if (el('chkSubtotal')) el('chkSubtotal').textContent = formatPrice(subtotal);
  if (el('chkDelivery')) el('chkDelivery').textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
  if (el('chkTotal'))    el('chkTotal').textContent    = formatPrice(total);
}

/**
 * showStep() — Shows a specific step and hides others
 * Each step is a div with class .checkout-step and a data-step attribute.
 */
function showStep(step) {
  currentStep = step;
  
  // Update step UI
  document.querySelectorAll('.step').forEach((el, i) => {
    const stepNum = i + 1;
    el.classList.remove('active', 'done');
    if (stepNum === step) el.classList.add('active');
    if (stepNum < step) el.classList.add('done');
  });
  
  document.querySelectorAll('.step-line').forEach((el, i) => {
    el.classList.toggle('done', i < step - 1);
  });
  
  // Show/hide step content panels
  document.querySelectorAll('.checkout-step').forEach(el => {
    el.style.display = el.dataset.step == step ? 'block' : 'none';
  });
  
  // Scroll to top of form
  document.querySelector('.checkout-layout')?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * nextStep() — Validates current step then advances
 * Simple validation checks that required fields are filled.
 */
function nextStep() {
  if (currentStep === 1 && !validateShippingForm()) return;
  if (currentStep < TOTAL_STEPS) {
    if (currentStep === 2) populateReviewStep();
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) showStep(currentStep - 1);
}

/**
 * validateShippingForm() — Checks that shipping fields are filled
 * Returns true if valid, false if any required field is empty.
 */
function validateShippingForm() {
  const required = ['shippingName', 'shippingPhone', 'shippingAddress', 'shippingCity', 'shippingState', 'shippingPin'];
  let valid = true;
  
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--rose)';
      el.style.boxShadow = '0 0 0 3px rgba(232,132,138,0.2)';
      valid = false;
    } else {
      el.style.borderColor = 'var(--border)';
      el.style.boxShadow = 'none';
    }
  });
  
  if (!valid) showToast('⚠️ Please fill in all required fields');
  return valid;
}

/**
 * populateReviewStep() — Fills the "Review Order" step with user's data
 */
function populateReviewStep() {
  const name    = document.getElementById('shippingName')?.value || '';
  const phone   = document.getElementById('shippingPhone')?.value || '';
  const address = document.getElementById('shippingAddress')?.value || '';
  const city    = document.getElementById('shippingCity')?.value || '';
  const state   = document.getElementById('shippingState')?.value || '';
  const pin     = document.getElementById('shippingPin')?.value || '';
  
  const reviewAddress = document.getElementById('reviewAddress');
  if (reviewAddress) {
    reviewAddress.innerHTML = `
      <strong>${name}</strong> — ${phone}<br>
      ${address}, ${city}, ${state} - ${pin}
    `;
  }
  
  const selectedPayment = document.querySelector('.payment-option.selected');
  const reviewPayment = document.getElementById('reviewPayment');
  if (reviewPayment && selectedPayment) {
    const methodName = selectedPayment.querySelector('.payment-text h5')?.textContent || 'Not selected';
    reviewPayment.textContent = methodName;
  }
  
  renderCheckoutSummary();
}

/**
 * selectPayment() — Highlights selected payment method
 * Removes .selected from all options, adds it to the clicked one.
 * Also shows/hides the card input fields.
 */
function selectPayment(el, method) {
  document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  
  const cardFields = document.getElementById('cardFields');
  if (cardFields) {
    cardFields.style.display = method === 'card' ? 'grid' : 'none';
  }
}

/**
 * placeOrder() — Final step: processes the order
 * In a real app, this would call a backend API.
 * Here we just clear the cart and show a success message.
 */
function placeOrder() {
  const btn = document.getElementById('placeOrderBtn');
  if (btn) {
    btn.textContent = '⏳ Processing...';
    btn.disabled = true;
  }
  
  // Simulate payment processing delay
  setTimeout(() => {
    clearCart(); // Empty the cart
    showSuccessOverlay(); // Show success modal
  }, 1800);
}

/**
 * showSuccessOverlay() — Shows order confirmation popup
 * Generates a fake order number using Math.random()
 */
function showSuccessOverlay() {
  const orderNum = 'LL' + Math.floor(Math.random() * 900000 + 100000);
  
  let overlay = document.getElementById('successOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'successOverlay';
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
      <div class="success-box">
        <div class="success-icon">🎉</div>
        <h2>Order Placed!</h2>
        <p>Thank you for your order. Your handmade soaps are being prepared with love!</p>
        <div style="background:var(--cream);border-radius:12px;padding:14px;margin:16px 0 24px;">
          <div style="font-size:0.78rem;color:var(--text-light);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Order Number</div>
          <div style="font-size:1.4rem;font-weight:700;color:var(--deep-rose);font-family:var(--font-display);">#${orderNum}</div>
        </div>
        <p style="font-size:0.85rem;margin-bottom:24px;">Expected delivery: <strong>3-5 business days</strong></p>
        <a href="index.html" class="btn btn-primary" style="width:100%;justify-content:center;">Back to Home</a>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('show'));
  });
  document.body.style.overflow = 'hidden';
}

/* ─── PAGE INITIALIZATION ───────────────────────────────────
   Runs setup functions depending on which page we're on.
   Checks for page-specific elements before calling functions.
   ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Cart page
  if (document.getElementById('cartItems')) {
    renderCart();
  }
  
  // Checkout page
  if (document.getElementById('checkoutMiniCart')) {
    initCheckout();
    
    // Set first payment option as selected by default
    const firstPayment = document.querySelector('.payment-option');
    if (firstPayment) firstPayment.classList.add('selected');
  }
});
