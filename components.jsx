// === Sweet Sisters · Shared components ===
const { useState, useEffect, useMemo, useRef } = React;

// --- Gummy Bear shaped button (default for CTAs) ---
function GummyButton({ color = 'pink', size, onClick, children, type = 'button', style }) {
  return (
    <button type={type} onClick={onClick} className={`gummy ${color}`} style={{ ...(size === 'lg' ? { fontSize: 20, padding: '20px 32px' } : {}), ...style }}>
      {children}
    </button>
  );
}

// --- Nerd Candy chunky button (alt style) ---
function NerdButton({ color = 'pink', onClick, children }) {
  return (
    <button onClick={onClick} className={`nerd ${color}`}>{children}</button>
  );
}

// --- Tiny SVG gummy icon ---
function GummyIcon({ color = '#ff3a8c', size = 28, rotate = 0 }) {
  return (
    <div className="gummy-icon" style={{ background: color, transform: `rotate(${rotate}deg)`, width: size, height: size * 1.3 }} />
  );
}

// --- Logo lockup ---
function Logo({ onClick }) {
  return (
    <div className="nav-logo" onClick={onClick}>
      <img src="assets/logo.png" alt="Sweet Sisters" />
      <div>
        <div style={{ fontFamily: 'Fredoka', fontWeight: 700, fontSize: 18, lineHeight: 1, marginBottom: 2 }}>The Boardroom</div>
        <div className="nav-tagline">on the lake ✨</div>
      </div>
    </div>
  );
}

// --- Header / nav ---
function Header({ page, setPage, cart, openCart }) {
  const links = [
    ['home', 'Home'],
    ['shop', 'Candy Shop'],
    ['lab', 'Logic Lab'],
    ['map', 'Scaling Roadmap'],
    ['founders', 'Founders'],
  ];
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Logo onClick={() => setPage('home')} />
        <div className="nav-links">
          {links.map(([k, label]) => (
            <button key={k} className={`nav-link ${page === k ? 'active' : ''}`} onClick={() => setPage(k)}>{label}</button>
          ))}
          <button className="nav-cart" onClick={openCart}>
            <span style={{ marginRight: 4 }}>🛍️</span> Bag
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

// --- Footer ---
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-stripe" />
      <div className="footer-nav">
        <a onClick={() => setPage('home')}>Home</a>
        <a onClick={() => setPage('shop')}>Candy Shop</a>
        <a onClick={() => setPage('lab')}>Logic Lab</a>
        <a onClick={() => setPage('map')}>Scaling Roadmap</a>
        <a onClick={() => setPage('founders')}>Founders</a>
      </div>
      <div>Hand-bagged in the Kawartha Lakes · Pickup or regional delivery · Also a kid-preneur learning project</div>
      <div className="footer-url">sweetsisterstreats.shop</div>
      <div style={{ marginTop: 14, fontSize: 13 }}>© 2026 Sweet Sisters · A kid-preneur production 🍬</div>
    </footer>
  );
}

// --- Toast ---
function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast" key={message}>
      <span className="dot" />{message}
    </div>
  );
}

// --- Marquee stripe ---
function Marquee() {
  const items = ['First market today 🎪', 'Bags + freezies', 'Built by kid-preneurs', 'Learn how we did it', 'Boardroom on the Lake', 'Scan · Build · Smile'];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {Array.from({ length: 4 }).flatMap((_, i) => items.map((t, j) => (
          <span key={`${i}-${j}`}>{t} <span className="dot">✦</span></span>
        )))}
      </div>
    </div>
  );
}

// --- Cart drawer ---
function CartDrawer({ open, onClose, cart, setCart, setPage, candies }) {
  if (!open) return null;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <div className="cart-backdrop" onClick={onClose} />
      <aside className="cart-drawer">
        <h3>
          Your Bag
          <button onClick={onClose}>✕</button>
        </h3>
        <div style={{ color: 'var(--ink-soft)', marginBottom: 14 }}>{cart.length} treat{cart.length !== 1 ? 's' : ''} ready to weigh</div>
        {cart.length === 0 ? (
          <div className="receipt-empty" style={{ padding: '40px 12px' }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🥺</div>
            Nothing in your bag yet.
            <div style={{ marginTop: 16 }}>
              <GummyButton color="pink" onClick={() => { onClose(); setPage('lab'); }}>Build a bag →</GummyButton>
            </div>
          </div>
        ) : (
          <>
            {cart.map((it, idx) => (
              <div className="cart-item" key={idx}>
                <div className="thumb">
                  <GummyIcon color={it.color} size={26} />
                </div>
                <div className="body">
                  <div className="name">{it.name}</div>
                  <div className="qty">{it.qty} × ${it.price.toFixed(2)}</div>
                </div>
                <div className="price">${(it.qty * it.price).toFixed(2)}</div>
              </div>
            ))}
            <div className="receipt-divide" style={{ marginTop: 16 }} />
            <div className="receipt-total" style={{ marginTop: 8 }}>
              <span>Subtotal</span>
              <span className="price">${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <GummyButton color="green" onClick={() => { alert('Checkout opens here — secure Stripe / Shopify handoff'); }}>Checkout 🔒</GummyButton>
              <button className="gummy ghost" onClick={() => setCart([])}>Empty bag</button>
            </div>
            <div style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-soft)', fontFamily: 'Fredoka' }}>
              🚗 Pickup in Bobcaygeon · 🛻 Delivery in the Kawartha Lakes
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// --- Section heading ---
function SectionHead({ eyebrow, title, sub, align = 'left' }) {
  return (
    <header className="section-head" style={{ textAlign: align, maxWidth: align === 'center' ? 720 : 'none', margin: align === 'center' ? '0 auto' : 0 }}>
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub" style={align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}}>{sub}</p>}
    </header>
  );
}

// --- Tip card ---
function Tip({ num, title, body, quote }) {
  return (
    <div className="tip">
      <div className="tip-num">{num}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="tip-quote">"{quote}"</div>
    </div>
  );
}

// --- Real candy inventory (from Master Calculator) ---
// gPer: grams per piece · cost: cost per piece in CAD · cat: stocking category
const CANDIES = [
  // ⭐ Viral Hero — the eye-candy
  { id: 'bubs',        name: 'Bubs Oval',                  emoji: '🍬', color: '#ff3a8c', cat: 'Viral Hero',  gPer: 13, cost: 0.83 },
  { id: 'skull',       name: 'Swedish Skull',              emoji: '💀', color: '#a04ce8', cat: 'Viral Hero',  gPer: 12, cost: 0.766 },
  // 🎪 Showstopper — chunky, photogenic
  { id: 'fish',        name: 'Gummy Fish (Large)',         emoji: '🐟', color: '#2e9bff', cat: 'Showstopper', gPer: 7,  cost: 0.126 },
  { id: 'seahorse',    name: 'Seahorse',                   emoji: '🐠', color: '#2bc46b', cat: 'Showstopper', gPer: 7,  cost: 0.126 },
  { id: 'smile',       name: 'Red Smile Face',             emoji: '😀', color: '#ff3a8c', cat: 'Showstopper', gPer: 7,  cost: 0.126 },
  { id: 'sour-person', name: 'Sour Person',                emoji: '🟢', color: '#2bc46b', cat: 'Showstopper', gPer: 7,  cost: 0.126 },
  // 🦴 Spine — the structure of the bag
  { id: 'rollup',      name: 'Fruit Roll-Up',              emoji: '🍓', color: '#ff7a1f', cat: 'Spine',       gPer: 14, cost: 0.299 },
  { id: 'rainbow',     name: 'Rainbow Strip (Long)',       emoji: '🌈', color: '#ff3a8c', cat: 'Spine',       gPer: 7,  cost: 0.126 },
  // 🧱 Mid-Fill — bulk
  { id: 'egg',         name: 'Blue Egg',                   emoji: '🥚', color: '#2e9bff', cat: 'Mid-Fill',    gPer: 5,  cost: 0.09 },
  { id: 'soda',        name: 'Soda Bottle',                emoji: '🥤', color: '#ffcc1f', cat: 'Mid-Fill',    gPer: 4,  cost: 0.072 },
  { id: 'rsquare',     name: 'Rainbow Square',             emoji: '🟪', color: '#a04ce8', cat: 'Mid-Fill',    gPer: 4,  cost: 0.072 },
  // 🐻 Base — the staples
  { id: 'squashies',   name: 'Squashies (Sour Cherry+Apple)', emoji: '🍎', color: '#2bc46b', cat: 'Base',     gPer: 5,  cost: 0.078 },
  { id: 'bear',        name: 'Gummy Bear',                 emoji: '🧸', color: '#ff3a8c', cat: 'Base',        gPer: 3,  cost: 0.036 },
  { id: 'leaf',        name: 'Gummy Leaf',                 emoji: '🍃', color: '#2bc46b', cat: 'Base',        gPer: 3,  cost: 0.054 },
  { id: 'log',         name: 'Pink/Blue Log',              emoji: '🟦', color: '#2e9bff', cat: 'Base',        gPer: 3,  cost: 0.054 },
  // ✨ Specialty
  { id: 'nerdcluster', name: 'Nerd Cluster (Heart)',       emoji: '💗', color: '#ff3a8c', cat: 'Specialty',   gPer: 3,  cost: 0.054 },
  // 🍬 Filler — small, cheap, fills gaps
  { id: 'gumball',     name: 'Dubble Bubble Gumballs',     emoji: '🫧', color: '#ff7a1f', cat: 'Filler',      gPer: 5,  cost: 0.056 },
  { id: 'twist',       name: 'Gummy Twist',                emoji: '🌀', color: '#a04ce8', cat: 'Filler',      gPer: 2,  cost: 0.036 },
  { id: 'berryball',   name: 'Berry Ball',                 emoji: '🫐', color: '#a04ce8', cat: 'Filler',      gPer: 2,  cost: 0.036 },
  { id: 'smallberry',  name: 'Small Berry',                emoji: '🍇', color: '#a04ce8', cat: 'Filler',      gPer: 1,  cost: 0.018 },
];

const CATEGORIES = ['Viral Hero', 'Showstopper', 'Spine', 'Mid-Fill', 'Base', 'Specialty', 'Filler'];

const PACKAGING = [
  { id: 'small', name: 'Small Bag (180g)', cost: 0.19, targetG: 180, salePrice: 5 },
  { id: 'large', name: 'Large Bag (360g)', cost: 0.27, targetG: 360, salePrice: 10 },
];

// --- Pre-built bag products ---
const BAGS = [
  { id: 'small', name: 'Sweet Sisters Mix', tag: '180g', weight: '180g', price: 5, image: 'assets/180g-bag.png' },
  { id: 'large', name: 'Sweet Sisters Mix', tag: '360g', weight: '360g', price: 10, image: 'assets/360g-bag.png' },
];

Object.assign(window, {
  GummyButton, NerdButton, GummyIcon, Logo, Header, Footer, Toast, Marquee, CartDrawer, SectionHead, Tip,
  CANDIES, BAGS, CATEGORIES, PACKAGING,
});
