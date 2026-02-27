/* ============================================================
   SCRIPT.JS — Product Data, Cart Logic, UI Utilities
   ============================================================
   This is the BRAIN of the website.
   
   HOW JAVASCRIPT WORKS WITH HTML:
   - HTML creates structure (boxes, buttons, text)
   - CSS styles those boxes
   - JavaScript makes them INTERACTIVE and DYNAMIC
   
   Think of it like a restaurant:
   - HTML = the menu and tables
   - CSS = the decoration and lighting
   - JavaScript = the waiter and kitchen
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Rose Garden Bliss",
    category: "rose",
    categoryLabel: "Rose Soaps",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviews: 124,
    image: "images/rose-garden.jpg",
    description: "Luxuriously creamy soap infused with real rose petals and rose hip oil. Leaves skin silky soft with a delicate floral fragrance that lasts all day.",
    shortDesc: "Real rose petals & rose hip oil for silky skin",
    ingredients: ["Rose Petal Extract", "Rose Hip Oil", "Shea Butter", "Glycerin", "Coconut Oil", "Vitamin E"],
    scents: ["Rose", "Floral", "Sweet"],
    weight: "100g",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 2,
    name: "Lavender Dreams",
    category: "lavender",
    categoryLabel: "Lavender Soaps",
    price: 329,
    originalPrice: 399,
    rating: 4.9,
    reviews: 218,
    image: "images/lavender-dreams.jpg",
    description: "Calming lavender essential oil soap perfect for bedtime routines. The soothing aroma helps relax the mind while the gentle formula nourishes sensitive skin.",
    shortDesc: "Calming lavender essential oil for bedtime bliss",
    ingredients: ["Lavender Essential Oil", "Oat Extract", "Shea Butter", "Castor Oil", "Kaolin Clay"],
    scents: ["Lavender", "Herbal", "Calming"],
    weight: "110g",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Activated Charcoal Detox",
    category: "charcoal",
    categoryLabel: "Charcoal Soaps",
    price: 379,
    originalPrice: 499,
    rating: 4.7,
    reviews: 89,
    image: "images/charcoal-detox.jpg",
    description: "Deep cleansing activated charcoal soap draws out impurities and toxins from your pores. Perfect for oily and acne-prone skin. Zero compromise on moisturization.",
    shortDesc: "Deep pore cleansing with activated charcoal",
    ingredients: ["Activated Charcoal", "Tea Tree Oil", "Neem Oil", "Coconut Oil", "Peppermint"],
    scents: ["Fresh", "Minty", "Clean"],
    weight: "100g",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 4,
    name: "Coffee Awakening Scrub",
    category: "coffee",
    categoryLabel: "Coffee Soaps",
    price: 359,
    originalPrice: 429,
    rating: 4.6,
    reviews: 156,
    image: "images/coffee-scrub.jpg",
    description: "Wake up your skin with real ground coffee exfoliant. Reduces cellulite appearance, removes dead skin, and leaves you smelling like a fresh brew.",
    shortDesc: "Real coffee grounds for skin-awakening exfoliation",
    ingredients: ["Ground Coffee", "Coffee Butter", "Coconut Oil", "Shea Butter", "Vanilla Extract"],
    scents: ["Coffee", "Vanilla", "Warm"],
    weight: "110g",
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 5,
    name: "Neem & Tulsi Herbal",
    category: "herbal",
    categoryLabel: "Herbal Soaps",
    price: 279,
    originalPrice: 349,
    rating: 4.7,
    reviews: 203,
    image: "images/neem-tulsi.jpg",
    description: "Ancient Ayurvedic formula combining powerful neem and holy basil (tulsi). Antibacterial properties fight acne, while the herbal blend soothes irritated skin naturally.",
    shortDesc: "Ayurvedic neem & tulsi for clear, healthy skin",
    ingredients: ["Neem Extract", "Tulsi Extract", "Aloe Vera", "Turmeric", "Coconut Oil"],
    scents: ["Herbal", "Earthy", "Fresh"],
    weight: "100g",
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 6,
    name: "Rose & Honey Glow",
    category: "rose",
    categoryLabel: "Rose Soaps",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviews: 312,
    image: "images/rose-honey.jpg",
    description: "The ultimate moisturizing combination. Raw honey locks in hydration while rose water tones and brightens. Your skin will feel like velvet after every wash.",
    shortDesc: "Raw honey + rose water for luminous skin",
    ingredients: ["Raw Honey", "Rose Water", "Beeswax", "Argan Oil", "Rose Hip Seed Oil"],
    scents: ["Honey", "Rose", "Floral"],
    weight: "105g",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: 7,
    name: "Midnight Charcoal Mint",
    category: "charcoal",
    categoryLabel: "Charcoal Soaps",
    price: 399,
    originalPrice: 499,
    rating: 4.5,
    reviews: 67,
    image: "images/charcoal-mint.jpg",
    description: "Bold combination of activated charcoal and cooling peppermint. The mint provides an invigorating tingle while charcoal deep-cleanses. Ideal for morning refresh.",
    shortDesc: "Charcoal + mint for a bold, invigorating cleanse",
    ingredients: ["Activated Charcoal", "Peppermint Oil", "Eucalyptus", "Olive Oil", "Vitamin C"],
    scents: ["Mint", "Eucalyptus", "Fresh"],
    weight: "100g",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: 8,
    name: "Lavender & Oat Gentle",
    category: "lavender",
    categoryLabel: "Lavender Soaps",
    price: 299,
    originalPrice: 379,
    rating: 4.8,
    reviews: 189,
    image: "images/lavender-oat.jpg",
    description: "Specially formulated for sensitive and baby-soft skin. Colloidal oatmeal soothes redness and irritation, while lavender provides gentle antibacterial protection.",
    shortDesc: "Gentle oat + lavender formula for sensitive skin",
    ingredients: ["Colloidal Oatmeal", "Lavender Oil", "Calendula", "Almond Oil", "Shea Butter"],
    scents: ["Lavender", "Mild", "Floral"],
    weight: "110g",
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 9,
    name: "Green Tea Antioxidant",
    category: "herbal",
    categoryLabel: "Herbal Soaps",
    price: 319,
    originalPrice: 399,
    rating: 4.6,
    reviews: 143,
    image: "images/green-tea.jpg",
    description: "Packed with antioxidants from real green tea extract. Fights free radicals, reduces signs of aging, and brightens dull complexion. Rich in catechins for youthful skin.",
    shortDesc: "Antioxidant-rich green tea for youthful skin",
    ingredients: ["Green Tea Extract", "Matcha Powder", "Vitamin C", "Jojoba Oil", "Aloe Vera"],
    scents: ["Green", "Fresh", "Earthy"],
    weight: "100g",
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 10,
    name: "Espresso Vanilla Luxury",
    category: "coffee",
    categoryLabel: "Coffee Soaps",
    price: 419,
    originalPrice: 529,
    rating: 4.8,
    reviews: 98,
    image: "images/espresso-vanilla.jpg",
    description: "Our most indulgent coffee soap. Double espresso extract with Tahitian vanilla bean creates an unforgettable sensory experience. Exfoliates while deeply nourishing.",
    shortDesc: "Double espresso & vanilla bean luxury bar",
    ingredients: ["Espresso Extract", "Vanilla Bean", "Cocoa Butter", "Coconut Oil", "Sweet Almond Oil"],
    scents: ["Coffee", "Vanilla", "Cocoa"],
    weight: "115g",
    inStock: true,
    isNew: true,
    isBestseller: true
  },
  {
    id: 11,
    name: "Himalayan Pink Salt",
    category: "herbal",
    categoryLabel: "Herbal Soaps",
    price: 449,
    originalPrice: 549,
    rating: 4.7,
    reviews: 76,
    image: "images/himalayan-salt.jpg",
    emoji: "💗",
    description: "84 trace minerals from authentic Himalayan pink salt gently exfoliate and detoxify. Creates a spa-like experience at home. Balances skin's pH and reduces inflammation.",
    shortDesc: "84 trace minerals from authentic Himalayan salt",
    ingredients: ["Himalayan Pink Salt", "Geranium Oil", "Coconut Oil", "Shea Butter", "Rose Absolute"],
    scents: ["Floral", "Mineral", "Clean"],
    weight: "120g",
    inStock: true,
    isNew: false,
    isBestseller: false
  },
  {
    id: 12,
    name: "Triple Rose Bouquet",
    category: "rose",
    categoryLabel: "Rose Soaps",
    price: 469,
    originalPrice: 599,
    rating: 4.9,
    reviews: 234,
    image: "images/triple-rose.jpg",
    emoji: "🌷",
    description: "The pinnacle of rose skincare. Three types of rose — Bulgarian rose otto, rose absolute, and rose hip seed oil — combined in one luxurious bar. Our best-selling gift option.",
    shortDesc: "Three premium roses in one luxurious bar",
    ingredients: ["Bulgarian Rose Otto", "Rose Absolute", "Rose Hip Seed Oil", "Rose Clay", "Jojoba Beads"],
    scents: ["Rose", "Floral", "Sweet", "Luxury"],
    weight: "110g",
    inStock: true,
    isNew: false,
    isBestseller: true
  }
];

/* ─── 2. CART FUNCTIONS ─────────────────────────────────────
   Cart data lives in localStorage (browser storage).
   localStorage stores data as STRINGS, so we use:
   - JSON.stringify() to convert object → string before saving
   - JSON.parse() to convert string → object when reading
   
   Think of it like a notepad in the browser that remembers
   your cart even if you close and reopen the tab.
   ─────────────────────────────────────────────────────────── */

/**
 * getCart() — Reads cart from localStorage
 * Returns: Array of cart items (empty array if none)
 */
function getCart() {
  const stored = localStorage.getItem('latherlux_cart');
  return stored ? JSON.parse(stored) : [];
}

/**
 * saveCart() — Saves cart array to localStorage
 * @param {Array} cart - The cart array to save
 */
function saveCart(cart) {
  localStorage.setItem('latherlux_cart', JSON.stringify(cart));
  updateCartCount(); // Always refresh the badge count in navbar
}

/**
 * addToCart() — Adds a product to the cart
 * Logic:
 * 1. Get existing cart
 * 2. Check if this product already exists (by id)
 * 3. If yes → just increase quantity by amount
 * 4. If no → push a new item object into the array
 * 5. Save updated cart
 * 6. Show a toast notification
 *
 * @param {number} productId - The id of the product from PRODUCTS array
 * @param {number} qty - How many to add (default 1)
 */
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);
  
  if (existingIndex >= 0) {
    // Product already in cart — increase quantity
    cart[existingIndex].quantity += qty;
  } else {
    // New product — add to cart array
    cart.push({
      id: product.id,
      name: product.name,
      category: product.categoryLabel,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      emoji: product.emoji,
      quantity: qty
    });
  }
  
  saveCart(cart);
  showToast(`🛒 "${product.name}" added to cart!`);
}

/**
 * removeFromCart() — Removes a product from cart completely
 * Array.filter() creates a NEW array excluding the item with that id.
 */
function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

/**
 * updateQuantity() — Changes the quantity of a cart item
 * If new quantity is 0 or less, removes the item completely.
 */
function updateQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
  }
}

/**
 * getCartTotal() — Calculates the total price of all cart items
 * reduce() loops through the array and accumulates a running total.
 * Formula: total = sum of (price × quantity) for each item
 */
function getCartTotal() {
  return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * getCartCount() — Returns total number of items in cart
 * (counting quantities, not unique products)
 */
function getCartCount() {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}

/**
 * clearCart() — Empties the entire cart
 */
function clearCart() {
  localStorage.removeItem('latherlux_cart');
  updateCartCount();
}

/* ─── 3. UI UTILITY FUNCTIONS ───────────────────────────────
   These functions control visual elements across all pages.
   They're defined in script.js so any page can use them
   by loading this one file.
   ─────────────────────────────────────────────────────────── */

/**
 * updateCartCount() — Updates the number badge on the cart icon
 * It finds the element with class .cart-count and updates its text.
 * If count is 0, hides the badge. If more, shows it.
 */
function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/**
 * showToast() — Shows a notification popup at bottom-right
 * 1. Creates a div element programmatically
 * 2. Sets its innerHTML (inner HTML content)
 * 3. Appends it to the body
 * 4. Adds .show class after a tiny delay (so CSS transition fires)
 * 5. Removes it after 3 seconds
 * 
 * This "trick" with setTimeout is needed because the browser
 * needs a moment to register the element before animating it.
 */
let toastTimeout;
function showToast(message, duration = 3000) {
  // Remove any existing toast first
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">✨</span>
    <span class="toast-text">${message}</span>
    <span class="toast-close" onclick="this.parentElement.classList.remove('show')">✕</span>
  `;
  document.body.appendChild(toast);
  
  // Small delay needed so CSS transition works on newly added element
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/**
 * formatPrice() — Formats number to Indian Rupee string
 * Example: 349 → "₹349"
 */
function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * renderStars() — Generates star emoji string from rating number
 * Example: 4.5 → "⭐⭐⭐⭐½"
 */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/**
 * getCategoryBadge() — Returns the HTML for a category badge
 * Each category has a different color via CSS classes.
 */
function getCategoryBadge(category, label) {
  return `<span class="badge badge-${category}">${label}</span>`;
}

/**
 * createProductCard() — Generates HTML for a product card
 * This is a TEMPLATE LITERAL (string with backticks ``)
 * that builds a complete HTML card for one product.
 * 
 * WHY DO THIS IN JS INSTEAD OF HTML?
 * Because we have 12 products, writing 12 cards in HTML
 * would be 300+ lines of repetitive code. Instead, we
 * loop through PRODUCTS array and call this function once
 * per product to generate all cards automatically.
 */
function createProductCard(product) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const imageHTML = `
     <img 
    src="${product.image}" 
    alt="${product.name}"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
  >
  <div class="card-image-placeholder" style="display:none">${product.emoji}</div>
`;
  
  return `
    <div class="product-card fade-in" data-id="${product.id}" data-category="${product.category}">
      <div class="card-image">
        ${imageHTML}
        <div class="card-badge">
          ${product.isNew ? '<span class="badge badge-herbal">New</span>' : ''}
          ${product.isBestseller ? '<span class="badge badge-rose">Bestseller</span>' : ''}
        </div>
        <div class="card-wishlist" onclick="toggleWishlist(this, ${product.id})">🤍</div>
        <div class="card-quick-view" onclick="openQuickView(${product.id})">👁 Quick View</div>
      </div>
      <div class="card-body">
        <div class="card-category">${product.categoryLabel}</div>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-desc">${product.shortDesc}</p>
        <div class="card-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            <span class="price-original">${formatPrice(product.originalPrice)}</span>
            <span class="price-discount">${discount}% off</span>
          </div>
          <button class="add-to-cart-btn" onclick="handleAddToCart(this, ${product.id})">
            + Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * handleAddToCart() — Called when "Add to Cart" button is clicked
 * Adds product, then temporarily changes button text to confirm.
 * Uses setTimeout to revert button after 1.5 seconds.
 */
function handleAddToCart(button, productId) {
  addToCart(productId);
  button.textContent = '✓ Added';
  button.classList.add('added');
  setTimeout(() => {
    button.textContent = '+ Cart';
    button.classList.remove('added');
  }, 1500);
}

/**
 * toggleWishlist() — Toggles heart icon on product cards
 */
function toggleWishlist(el, productId) {
  el.classList.toggle('active');
  el.textContent = el.classList.contains('active') ? '❤️' : '🤍';
}

/* ─── 4. QUICK VIEW MODAL ───────────────────────────────────
   When user clicks "Quick View", a modal pops up with 
   product details without navigating to a new page.
   ─────────────────────────────────────────────────────────── */
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
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });
    document.body.appendChild(modal);
  }
  
  document.getElementById('quickViewContent').innerHTML = `
    <button class="modal-close" onclick="closeQuickView()">✕</button>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:start;">
      <div class="gallery-main" style="border-radius:16px; aspect-ratio:1; background:linear-gradient(135deg,var(--blush),var(--lavender)); display:flex;align-items:center;justify-content:center;font-size:5rem;">
        ${product.emoji}
      </div>
      <div>
        <div class="detail-category">${product.categoryLabel}</div>
        <h2 class="detail-title" style="font-size:1.4rem;">${product.name}</h2>
        <div class="detail-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="count">(${product.reviews} reviews)</span>
        </div>
        <div class="detail-price">
          <span class="current">${formatPrice(product.price)}</span>
          <span class="original">${formatPrice(product.originalPrice)}</span>
          <span class="discount">${discount}% OFF</span>
        </div>
        <p style="font-size:0.88rem;color:var(--text-mid);line-height:1.7;margin-bottom:20px;">${product.description}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
          ${product.ingredients.slice(0,4).map(i => `<span class="ingredient-tag">${i}</span>`).join('')}
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-primary" style="flex:1;justify-content:center;" onclick="addToCart(${product.id});showToast('Added to cart!');closeQuickView()">🛒 Add to Cart</button>
          <a href="product.html?id=${product.id}" class="btn btn-outline" style="justify-content:center;">View Details</a>
        </div>
      </div>
    </div>
  `;
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.classList.add('show'));
  });
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

/* ─── 5. BUBBLE BACKGROUND GENERATOR ───────────────────────
   Creates floating soap bubble elements dynamically.
   Math.random() generates random numbers for variety.
   Each bubble gets different: size, position, speed, delay.
   This makes the animation feel natural rather than robotic.
   ─────────────────────────────────────────────────────────── */
function createBubbles() {
  const container = document.querySelector('.bubble-bg');
  if (!container) return;
  
  const count = 12; // Number of bubbles
  
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 80 + 30; // 30px to 110px
    const left = Math.random() * 100;     // 0% to 100% from left
    const duration = Math.random() * 15 + 10; // 10s to 25s
    const delay = Math.random() * 20;     // 0s to 20s delay before starting
    
    bubble.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    
    container.appendChild(bubble);
  }
}

/* ─── 6. SCROLL REVEAL (INTERSECTION OBSERVER) ──────────────
   Intersection Observer API watches which elements are
   currently visible in the viewport (the visible window).
   
   When an element with class .fade-in enters the viewport,
   we add the class .visible which triggers the CSS animation.
   
   Why not just use CSS animation?
   → CSS animations run immediately. This way, elements only
     animate when they SCROLL into view, which looks much
     more impressive and professional.
   ─────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once visible (no need to watch anymore)
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Fire when 10% of element is visible
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ─── 7. NAVBAR LOGIC ───────────────────────────────────────
   - Hamburger menu opens/closes on mobile
   - Highlights the current page's nav link (active state)
   - Back to top button appears after scrolling 400px
   ─────────────────────────────────────────────────────────── */
function initNavbar() {
  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
  
  // Highlight active nav link based on current page URL
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
  
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Navbar search — redirect to products page with query
  const navSearchInput = document.querySelector('.nav-search-bar input');
  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(e.target.value.trim())}`;
      }
    });
  }
}

/* ─── 8. INITIALIZATION ─────────────────────────────────────
   DOMContentLoaded fires when HTML is fully parsed.
   We call all our setup functions here.
   
   Each page may have different elements, so each function
   checks if the required element exists before running.
   ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  createBubbles();
  initNavbar();
  
  // Initialize scroll reveal after a short delay
  // to ensure all dynamic content is rendered first
  setTimeout(initScrollReveal, 100);
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });
});
