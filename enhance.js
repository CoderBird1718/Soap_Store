/* ============================================================
   ENHANCE.JS — LatherLux Luxury Enhancement Layer
   Dark Mode · Image Fixes · Glitter · Quick View · Cart
   Loaded AFTER script.js and cart.js to override functions
   ============================================================ */

/* ─── 0. PATCH MISSING EMOJIS IN PRODUCTS ARRAY ──────────────
   Products 1–10 were defined without an emoji field.
   We patch them here so cart/quickview fallbacks work.
─────────────────────────────────────────────────────────── */
const PRODUCT_EMOJIS = {
  1:'🌹', 2:'💜', 3:'🖤', 4:'☕',
  5:'🌿', 6:'🌸', 7:'⚡', 8:'🪻',
  9:'🍵', 10:'✨', 11:'💗', 12:'🌷'
};
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PRODUCTS !== 'undefined') {
    PRODUCTS.forEach(p => { if (!p.emoji) p.emoji = PRODUCT_EMOJIS[p.id] || '🧼'; });
  }
}, { once: true, capture: true }); // capture:true fires before other listeners


(function initTheme() {
  const saved = localStorage.getItem('latherlux_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('latherlux_theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* Inject the theme-toggle button into each page's nav-actions */
function injectThemeToggle() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions || document.querySelector('.theme-toggle')) return;
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.onclick = toggleTheme;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  // Insert before hamburger (last child)
  const hamburger = navActions.querySelector('.hamburger');
  navActions.insertBefore(btn, hamburger || null);
}

/* ─── 2. ENHANCED BUBBLE CREATION (replaces script.js version) ── */
function createBubbles() {
  const container = document.querySelector('.bubble-bg');
  if (!container) return;
  container.innerHTML = ''; // clear any existing

  // Iridescent soap bubbles
  const bubbleCount = 18;
  const colors = [
    'rgba(245,198,198,0.35)',
    'rgba(196,170,220,0.3)',
    'rgba(138,200,220,0.25)',
    'rgba(212,168,67,0.2)',
    'rgba(180,220,180,0.25)',
    'rgba(255,182,193,0.3)',
  ];

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 100 + 25;
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 10;
    const delay = Math.random() * 25;
    bubble.style.cssText = `
      width:${size}px;height:${size}px;
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
    `;
    container.appendChild(bubble);
  }

  // Glitter sparkle dots
  const glitterCount = 30;
  const glitterColors = ['#ffd700','#ff69b4','#da70d6','#87ceeb','#fffacd','#ffb6c1'];
  for (let i = 0; i < glitterCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'glitter-dot';
    const size = Math.random() * 5 + 2;
    const color = glitterColors[Math.floor(Math.random() * glitterColors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 12;
    const delay = Math.random() * 25;
    dot.style.cssText = `
      width:${size}px;height:${size}px;
      left:${left}%;
      bottom:-20px;
      background:${color};
      box-shadow:0 0 ${size*2}px ${color};
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
    `;
    container.appendChild(dot);
  }
}

/* ─── 3. QUICK VIEW — WITH ACTUAL PRODUCT IMAGE ──────────────── */
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  let modal = document.getElementById('quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `<div class="modal" id="quickViewContent"></div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeQuickView(); });
    document.body.appendChild(modal);
  }

  document.getElementById('quickViewContent').innerHTML = `
    <button class="modal-close" onclick="closeQuickView()">✕</button>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;">
      
      <!-- Product Image -->
      <div class="qv-image-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,var(--blush),var(--lavender))';this.parentElement.innerHTML+='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:5rem;\\'>${product.emoji}</div>';"
        >
      </div>

      <!-- Product Info -->
      <div>
        <div style="font-size:0.72rem;color:var(--text-light);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">${product.categoryLabel}</div>
        <h2 style="font-family:var(--font-display);font-size:1.35rem;color:var(--charcoal);margin-bottom:12px;line-height:1.3;">${product.name}</h2>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
          <span style="color:var(--gold);font-size:0.95rem;">${renderStars(product.rating)}</span>
          <span style="font-size:0.82rem;color:var(--text-light);">(${product.reviews} reviews)</span>
        </div>
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:16px;">
          <span style="font-size:1.75rem;font-weight:700;color:var(--deep-rose);font-family:var(--font-display);">${formatPrice(product.price)}</span>
          <span style="font-size:0.95rem;color:var(--text-light);text-decoration:line-through;">${formatPrice(product.originalPrice)}</span>
          <span style="background:linear-gradient(135deg,#d6edcc,#e8f5e0);color:#2d6b2d;padding:3px 8px;border-radius:999px;font-size:0.75rem;font-weight:700;">${discount}% OFF</span>
        </div>
        <p style="font-size:0.88rem;color:var(--text-mid);line-height:1.75;margin-bottom:18px;">${product.description}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
          ${product.ingredients.slice(0,4).map(i => `<span style="padding:5px 12px;background:linear-gradient(135deg,var(--cream),var(--warm-white));border:1px solid rgba(212,168,67,0.2);border-radius:999px;font-size:0.78rem;color:var(--text-mid);">${i}</span>`).join('')}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" style="flex:1;justify-content:center;min-width:130px;" onclick="addToCart(${product.id});showToast('🛒 Added to cart!');closeQuickView()">🛒 Add to Cart</button>
          <a href="product.html?id=${product.id}" class="btn btn-outline" style="justify-content:center;min-width:110px;">View Details</a>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.classList.add('show'));
  });
  document.body.style.overflow = 'hidden';
}

/* ─── 4. CART RENDER — WITH PRODUCT IMAGES ──────────────────── */
function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  if (!cartContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty fade-in visible" style="text-align:center;padding:60px 24px;">
        <div style="font-size:4rem;margin-bottom:20px;filter:drop-shadow(0 4px 12px rgba(212,168,67,0.3));">🛒</div>
        <h3 style="margin-bottom:12px;">Your cart is empty</h3>
        <p style="margin-bottom:28px;">Looks like you haven't added any soaps yet. Discover our handmade collection!</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    renderOrderSummary(cart);
    return;
  }

  const countEl = document.getElementById('cartCountText');
  if (countEl) countEl.textContent = `${cart.length} item${cart.length > 1 ? 's' : ''}`;

  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    const imgSrc = item.image || '';
    return `
      <div class="cart-item fade-in visible" data-id="${item.id}">
        <div class="cart-item-img">
          ${imgSrc
            ? `<img src="${imgSrc}" alt="${item.name}" onerror="this.style.display='none';">`
            : `<span style="font-size:2rem;display:flex;align-items:center;justify-content:center;height:100%;">${item.emoji || '🧼'}</span>`
          }
        </div>
        <div class="cart-item-info">
          <h4 style="font-family:var(--font-display);font-size:1rem;margin-bottom:4px;">${item.name}</h4>
          <p class="cat" style="font-size:0.75rem;color:var(--text-light);margin-bottom:10px;">${item.category}</p>
          <div class="cart-item-controls">
            <div class="mini-qty-control">
              <button class="mini-qty-btn" onclick="changeQty(${item.id}, ${item.quantity - 1})">−</button>
              <span class="mini-qty-value">${item.quantity}</span>
              <button class="mini-qty-btn" onclick="changeQty(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <span class="remove-btn" onclick="removeItem(${item.id})">Remove</span>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <div class="cart-item-price" style="font-family:var(--font-display);">${formatPrice(itemTotal)}</div>
          <div style="font-size:0.75rem;color:var(--text-light);margin-top:4px;">${formatPrice(item.price)} each</div>
        </div>
      </div>
    `;
  }).join('');

  renderOrderSummary(cart);
}

/* ─── 5. CHECKOUT MINI CART — WITH PRODUCT IMAGES ───────────── */
function renderCheckoutMiniCart() {
  const container = document.getElementById('checkoutMiniCart');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);font-size:0.85rem;text-align:center;">No items in cart</p>';
    return;
  }

  container.innerHTML = cart.map(item => {
    const imgSrc = item.image || '';
    return `
      <div class="mini-cart-item">
        <div class="mini-item-img">
          ${imgSrc
            ? `<img src="${imgSrc}" alt="${item.name}" onerror="this.style.display='none';">`
            : `<span style="font-size:1.5rem;">${item.emoji || '🧼'}</span>`
          }
        </div>
        <div class="mini-item-info">
          <h5>${item.name}</h5>
          <span>Qty: ${item.quantity}</span>
        </div>
        <div class="mini-item-price">${formatPrice(item.price * item.quantity)}</div>
      </div>
    `;
  }).join('');
}

/* ─── 6. PRODUCT DETAIL — REAL IMAGE GALLERY ─────────────────── */
/* loadProduct() runs synchronously before DOMContentLoaded, so by
   the time enhance.js DOMContentLoaded fires the DOM is already built.
   We just directly replace the placeholder elements. */
function patchProductDetailImages() {
  if (!document.getElementById('productDetail')) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  // Replace main gallery placeholder with real image
  const mainImg = document.getElementById('mainImage');
  if (mainImg) {
    mainImg.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
        style="width:100%;height:100%;object-fit:cover;"
        onerror="this.style.display='none';"
      >
    `;
  }

  // Replace emoji thumbnails with image-based thumbnails
  const thumbsContainer = document.querySelector('.gallery-thumbs');
  if (thumbsContainer) {
    const filters = ['none', 'hue-rotate(15deg) saturate(1.1)', 'brightness(1.08) contrast(1.05)', 'saturate(0.85) brightness(0.92)'];
    const labels  = ['Front', 'Side', 'Detail', 'Pack'];
    thumbsContainer.innerHTML = labels.map((label, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}"
           onclick="switchThumbImg(this,'${product.image}','${filters[i]}')"
           title="${label}">
        <img
          src="${product.image}"
          alt="${label}"
          style="width:100%;height:100%;object-fit:cover;filter:${filters[i]};"
          onerror="this.style.display='none';"
        >
      </div>
    `).join('');
  }
}

/* Override switchThumb to handle real images with optional filter */
function switchThumbImg(thumbEl, src, filter) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
  const mainImg = document.getElementById('mainImage');
  if (mainImg) {
    mainImg.innerHTML = `
      <img
        src="${src}"
        alt="Product"
        style="width:100%;height:100%;object-fit:cover;filter:${filter || 'none'};"
        onerror="this.style.display='none';"
      >
    `;
  }
}

/* ─── 7. ABOUT PAGE — STORY IMAGE + SOAP SHOWCASE ────────────── */
function enhanceAboutPage() {
  if (!document.querySelector('.about-story-img')) return;

  // Replace the 🧼 emoji with a real soap image collage
  const storyImg = document.querySelector('.about-story-img');
  if (storyImg) {
    // Build a beautiful collage from product images
    storyImg.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 8px;
      padding: 0;
      border-radius: 40px;
      overflow: hidden;
      aspect-ratio: 4/5;
      box-shadow: 32px 32px 70px rgba(120,60,80,0.2), -8px -8px 40px rgba(196,170,220,0.15);
      border: 3px solid rgba(255,255,255,0.5);
    `;
    const collageProducts = [
      { image: 'images/rose-garden.jpg', name: 'Rose' },
      { image: 'images/lavender-dreams.jpg', name: 'Lavender' },
      { image: 'images/charcoal-detox.jpg', name: 'Charcoal' },
      { image: 'images/coffee-scrub.jpg', name: 'Coffee' },
    ];
    storyImg.innerHTML = collageProducts.map((p, i) => `
      <div style="
        overflow:hidden;
        position:relative;
        ${i === 0 ? 'grid-column:1;grid-row:1;' : ''}
        ${i === 1 ? 'grid-column:2;grid-row:1 / span 2;' : ''}
        ${i === 2 ? 'grid-column:1;grid-row:2;' : ''}
        ${i === 3 ? 'display:none;' : ''}
      ">
        <img
          src="${p.image}"
          alt="${p.name}"
          style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;"
          onmouseover="this.style.transform='scale(1.08)'"
          onmouseout="this.style.transform='scale(1)'"
          onerror="this.parentElement.style.background='linear-gradient(135deg,var(--blush),var(--lavender))';"
        >
        <div style="
          position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(to top,rgba(20,10,30,0.7),transparent);
          padding:12px 10px 8px;
          font-family:'Playfair Display',serif;
          font-size:0.75rem;font-weight:600;
          color:rgba(255,255,255,0.9);
          letter-spacing:0.06em;
          text-transform:uppercase;
        ">${p.name}</div>
      </div>
    `).join('');
  }

  // Inject soap showcase section
  if (!document.querySelector('.soap-showcase')) {
    const showcase = document.createElement('section');
    showcase.className = 'soap-showcase';
    
    const allProducts = (typeof PRODUCTS !== 'undefined') ? PRODUCTS : [];
    
    showcase.innerHTML = `
      <div class="container">
        <div class="section-title fade-in">
          <h2>Our Handcrafted Collection</h2>
          <p>Every bar tells a story — pure ingredients, artisan care</p>
          <div class="title-line"></div>
        </div>
        <div class="soap-showcase-grid">
          ${allProducts.slice(0, 12).map(p => {
            return `
              <a href="product.html?id=${p.id}" class="soap-showcase-card fade-in">
                <img src="${p.image}" alt="${p.name}" onerror="this.style.background='linear-gradient(135deg,var(--blush),var(--lavender))';">
                ${p.isBestseller ? '<div class="soap-showcase-badge">Bestseller</div>' : ''}
                ${p.isNew ? '<div class="soap-showcase-badge" style="background:linear-gradient(135deg,#8aab8a,#5a7a5a);">New</div>' : ''}
                <div class="soap-showcase-overlay">
                  <div class="soap-showcase-name">${p.name}</div>
                  <div class="soap-showcase-price">${formatPrice(p.price)} <span style="text-decoration:line-through;opacity:0.6;font-weight:400;">${formatPrice(p.originalPrice)}</span></div>
                </div>
              </a>
            `;
          }).join('')}
        </div>
        <div style="text-align:center;margin-top:40px;">
          <a href="products.html" class="btn btn-primary">View All Products →</a>
        </div>
      </div>
    `;
    // Insert before newsletter section
    const newsletter = document.querySelector('.newsletter-section');
    if (newsletter) newsletter.before(showcase);
    else document.querySelector('footer').before(showcase);
  }
}

/* ─── 8. GLITTER HERO PARTICLES ─────────────────────────────── */
function addGlitterHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (document.querySelector('.glitter-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'glitter-overlay';
  const colors = ['#ffd700','#ff69b4','#da70d6','#87ceeb','#fffacd','#ffb6c1','#fff8dc'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'glitter-particle';
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${Math.random()*5+2}px;
      height:${Math.random()*5+2}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      background:${color};
      box-shadow:0 0 6px ${color};
      --d:${Math.random()*3+1}s;
      --delay:-${Math.random()*4}s;
    `;
    overlay.appendChild(p);
  }
  hero.style.position = 'relative';
  hero.appendChild(overlay);
}

/* ─── 9. HERO SOAP CARDS — REAL IMAGES ──────────────────────── */
function enhanceHeroSoapCards() {
  const soapCards = document.querySelectorAll('.soap-card-3d');
  if (!soapCards.length) return;

  const heroImages = [
    'images/rose-garden.jpg',
    'images/lavender-dreams.jpg',
    'images/charcoal-detox.jpg',
    'images/coffee-scrub.jpg',
  ];

  soapCards.forEach((card, i) => {
    const src = heroImages[i % heroImages.length];
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.innerHTML = `
      <img
        src="${src}"
        alt="LatherLux Soap"
        style="width:100%;height:100%;object-fit:cover;opacity:0.9;"
        onerror="this.remove();"
      >
    `;
  });
}

/* ─── 10. INITIALIZATION ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectThemeToggle();
  updateThemeIcon();
  createBubbles(); // enhanced version overrides script.js version

  // Page-specific enhancements
  enhanceAboutPage();
  addGlitterHero();
  enhanceHeroSoapCards();
  patchProductDetailImages();

  // Re-render cart if on cart page (to use our enhanced version)
  if (document.getElementById('cartItems')) {
    setTimeout(() => renderCart(), 50);
  }

  // Re-render checkout mini cart if on checkout page
  if (document.getElementById('checkoutMiniCart')) {
    setTimeout(() => renderCheckoutMiniCart(), 50);
  }
});
