# 🫧 LatherLux — Handmade Artisan Soap Store

> A fully static, zero-dependency e-commerce front-end for a handmade soap brand — built with vanilla HTML, CSS & JavaScript.

![LatherLux Preview](images/rose-garden.jpg)

---

## Overview

LatherLux is a complete, production-ready storefront for an artisan soap brand. It is built entirely with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies. Open any `.html` file in a browser and it works instantly.

The project was designed as both a real-world learning resource and a deployable storefront template. Every file is heavily commented to explain *why* each pattern is used, making it an excellent starting point for developers learning front-end fundamentals.

---

## Live Demo

```

```

---

## Features

###  Core Store Features
- **12-product catalogue** with categories: Rose, Lavender, Charcoal, Coffee, Herbal
- **Shopping cart** with persistent `localStorage` storage (survives page refresh and tab close)
- **Multi-step checkout** — Shipping → Payment → Review → Confirmation
- **Coupon code** system (`SOAP10`, `BUBBLE20`, `LATHER15`, `WELCOME`)
- **Product filter & sort** — by category, price, rating, newest
- **Quick View modal** — preview product without leaving the page
- **Wishlist toggle** per product card
- **Search** — redirects to products page with query param

###  Design & UX
- **Floating soap bubble** background animation (CSS `@keyframes` + JS-generated elements)
- **Scroll-reveal animations** using the Intersection Observer API
- **Responsive layout** — desktop, tablet, and mobile breakpoints
- **Frosted-glass navbar** with sticky positioning
- **Toast notifications** on cart actions
- **Back-to-top button** — appears after scrolling 400 px

###  Enhancement Layer (`enhance.css` + `enhance.js`)
- **Dark / Light mode toggle** with `localStorage` persistence
- **Iridescent glitter bubbles** — 18 soap bubbles + 30 glitter sparkle dots
- **Product images everywhere** — Quick View, cart items, checkout sidebar, product gallery with 4 angle thumbnails
- **Glitter shimmer buttons** — sweep animation on hover
- **Hero soap cards** display actual product photography
- **About page** collage — 3-panel photo mosaic + full product showcase grid
- **Luxury card styling** — gold border glow on hover, deeper lift shadows
- **Gradient text headings**, animated `title-line` dividers

---

## Project Structure

```
latherlux/
├── index.html          # Home page — hero, categories, featured products, testimonials
├── products.html       # Full catalogue with sidebar filters
├── product.html        # Single product detail page (URL: product.html?id=3)
├── cart.html           # Shopping cart with order summary
├── checkout.html       # 3-step checkout form
├── about.html          # Brand story, values, team, process
├── contact.html        # Contact form + info cards
│
├── style.css           # Main stylesheet (~1 500 lines, fully commented)
├── script.js           # Product data, cart logic, UI utilities (~730 lines)
├── cart.js             # Cart page & checkout page logic (~400 lines)
│
├── enhance.css         #  Enhancement layer — dark mode, glitter, luxury styles
├── enhance.js          #  Enhancement layer — dark mode toggle, image patching
│
└── images/
    ├── rose-garden.jpg
    ├── rose-honey.jpg
    ├── triple-rose.jpg
    ├── lavender-dreams.jpg
    ├── lavender-oat.jpg
    ├── charcoal-detox.jpg
    ├── charcoal-mint.jpg
    ├── coffee-scrub.jpg
    ├── espresso-vanilla.jpg
    ├── neem-tulsi.jpg
    ├── green-tea.jpg
    └── himalayan-salt.jpg
```

---

## Pages

| Page | File | Description |
|---|---|---|
| **Home** | `index.html` | Hero section, category pills, featured product grid, testimonials, newsletter |
| **Products** | `products.html` | Full catalogue, sidebar filters (category / price / rating), sort & view toggle |
| **Product Detail** | `product.html?id=N` | Image gallery, scent selector, quantity control, ingredients, related products |
| **Cart** | `cart.html` | Cart items with qty controls, coupon codes, order summary, recommendations |
| **Checkout** | `checkout.html` | 3-step form: Shipping → Payment → Review, order confirmation overlay |
| **About** | `about.html` | Brand origin story, values grid, artisan process steps, stats banner |
| **Contact** | `contact.html` | Contact form, info cards (address / phone / email / hours) |

---

## Product Catalogue

| # | Name | Category | Price | Status |
|---|---|---|---|---|
| 1 | Rose Garden Bliss | Rose | ₹349 | Bestseller |
| 2 | Lavender Dreams | Lavender | ₹329 | Bestseller |
| 3 | Activated Charcoal Detox | Charcoal | ₹379 | New |
| 4 | Coffee Awakening Scrub | Coffee | ₹359 | — |
| 5 | Neem & Tulsi Herbal | Herbal | ₹279 | — |
| 6 | Rose & Honey Glow | Rose | ₹399 | Bestseller |
| 7 | Midnight Charcoal Mint | Charcoal | ₹399 | New |
| 8 | Lavender & Oat Gentle | Lavender | ₹299 | — |
| 9 | Green Tea Antioxidant | Herbal | ₹319 | — |
| 10 | Espresso Vanilla Luxury | Coffee | ₹419 | New · Bestseller |
| 11 | Himalayan Pink Salt | Herbal | ₹449 | — |
| 12 | Triple Rose Bouquet | Rose | ₹469 | Bestseller |

---

## Coupon Codes

Use these on the cart page to test the discount system:

| Code | Discount |
|---|---|
| `SOAP10` | 10% off |
| `BUBBLE20` | 20% off |
| `LATHER15` | 15% off |
| `WELCOME` | 5% off |

