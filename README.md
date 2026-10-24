# MAISON ATELIER — Fashion Storefront

Responsive React + Vite fashion storefront concept for a Contra portfolio.

## Run locally
1. Install Node.js LTS.
2. Extract the ZIP and open the `maison-atelier-fashion` folder in VS Code.
3. Open Terminal in VS Code and run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite prints (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Functional interactions
- Responsive mobile navigation and smooth section links
- Product category filters and product search
- Wishlist heart buttons
- Add-to-bag, quantity controls, subtotal and shipping threshold
- Newsletter email validation and success feedback
- Toast feedback for demo actions

## Where things live
- `src/data.js`: products, journal stories and every photo id. Swap an id to change an image.
- `src/main.jsx`: components and interaction logic.
- `src/styles.css`: design tokens (colours, type) at the top, then sections.

## Before real client launch
This is a frontend portfolio concept. Cart and newsletter interactions are local demo interactions only. Checkout does not process payments. Photography loads from Unsplash (free licence) and needs internet access; if one image fails, a tonal block shows instead. Copy about fabrics and mills is sample text. Replace sample products, prices, contact details, policies, and demo email before launch; connect a backend/commerce provider for production.
