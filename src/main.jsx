import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import './styles.css';
import { CATEGORIES, FREE_SHIPPING_AT, SWATCH, images, journal, photoUrl, products } from './data.js';

/* Image with a quiet tonal fallback if the remote photo fails to load. */
function Photo({ id, w = 900, alt, pos = '50% 50%', className = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`photo-fallback ${className}`} role="img" aria-label={alt} />;
  return (
    <img
      className={className}
      src={photoUrl(id, w)}
      alt={alt}
      style={{ objectPosition: pos }}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

const money = (n) => `$${n}`;

function App() {
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All pieces');
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const shown = useMemo(
    () =>
      products.filter(
        (p) =>
          (filter === 'All pieces' || p.category === filter) &&
          `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [filter, query]
  );

  const count = cart.reduce((n, p) => n + p.qty, 0);
  const total = cart.reduce((n, p) => n + p.price * p.qty, 0);

  function notify(message) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2400);
  }

  function go(id) {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function add(p) {
    setCart((c) =>
      c.some((x) => x.id === p.id) ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...p, qty: 1 }]
    );
    notify(`${p.name} added to bag`);
  }

  function changeQty(id, d) {
    setCart((c) => c.map((p) => (p.id === id ? { ...p, qty: p.qty + d } : p)).filter((p) => p.qty > 0));
  }

  function toggleSaved(p) {
    setSaved((s) => (s.includes(p.id) ? s.filter((id) => id !== p.id) : [...s, p.id]));
  }

  // Escape closes the bag and menu; page does not scroll behind the bag or mobile menu.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = cartOpen || menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen, menu]);

  return (
    <div className="shell">
      <div className="announcement">
        Complimentary shipping on orders over {money(FREE_SHIPPING_AT)}. Autumn/Winter 2026 is in.
      </div>

      <header className="header">
        <button className="icon menu-btn" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menu ? 'nav open' : 'nav'} aria-label="Main">
          <button onClick={() => go('collection')}>Shop</button>
          <button onClick={() => go('story')}>Our approach</button>
          <button onClick={() => go('journal')}>Journal</button>
        </nav>

        <a className="logo" href="#top" onClick={() => go('top')} aria-label="Maison Atelier, home">
          Maison <span>Atelier</span>
        </a>

        <div className="actions">
          <button className="icon" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search the collection" aria-expanded={searchOpen}>
            <Search size={19} />
          </button>
          <button className="bag" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${count} items`}>
            <span className="bag-word">Bag</span>
            <ShoppingBag size={19} />
            <span className="bag-count">{count}</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search">
          <Search size={18} />
          <input
            autoFocus
            placeholder="Search by piece, colour or category"
            aria-label="Search the collection"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              go('collection');
            }}
          />
          <button
            className="icon"
            aria-label="Close search"
            onClick={() => {
              setSearchOpen(false);
              setQuery('');
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-title">
            <span className="line l1"><span>Made slowly,</span></span>
            <span className="line l2"><span>worn for</span></span>
            <span className="line l3"><span>years.</span></span>
          </h1>

          <div className="hero-photo">
            <Photo {...images.hero} id={images.hero.id} w={1400} eager className="hero-img" />
            <p className="hero-vertical" aria-hidden="true">Autumn/Winter 2026</p>
          </div>

          <div className="hero-copy">
            <p>
              Coats, knits and tailoring cut for ordinary days. Natural fibres, small production runs, and nothing you will
              want to replace next season.
            </p>
            <button className="btn" onClick={() => go('collection')}>
              Shop the collection <ArrowRight size={16} />
            </button>
          </div>

          <figure className="hero-detail">
            <Photo {...images.heroDetail} id={images.heroDetail.id} w={500} className="detail-img" />
            <figcaption>Look 07. The trench in sand, over the Form trouser. Cotton gabardine, woven in Portugal.</figcaption>
          </figure>
        </section>

        <ul className="values" aria-label="Our promises">
          <li>Natural fibres, cut in small runs</li>
          <li>Free shipping over {money(FREE_SHIPPING_AT)}</li>
          <li>Thirty days to change your mind</li>
        </ul>

        {/* ───────── Collection ───────── */}
        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="section-head">
            <h2 id="collection-title">The autumn edit</h2>
            <p>
              Eight pieces we reach for on ordinary days. Each one works with the others, so the wardrobe grows without growing
              loud.
            </p>
          </div>

          <div className="toolbar">
            <div className="filters" role="group" aria-label="Filter by category">
              {CATEGORIES.map((x) => (
                <button key={x} className={filter === x ? 'selected' : ''} aria-pressed={filter === x} onClick={() => setFilter(x)}>
                  {x}
                </button>
              ))}
            </div>
            <span className="result-count" aria-live="polite">
              {query ? `${shown.length} for “${query}”` : `${shown.length} ${shown.length === 1 ? 'piece' : 'pieces'}`}
            </span>
          </div>

          <div className="products">
            {shown.map((p) => {
              const isSaved = saved.includes(p.id);
              return (
                <article className="product" key={p.id}>
                  <div className="product-img">
                    <Photo id={p.photo} w={800} alt={`${p.name} in ${p.color.toLowerCase()}`} pos={p.pos} />
                    {p.tag && <span className="tag">{p.tag}</span>}
                    <button
                      className={isSaved ? 'heart saved' : 'heart'}
                      aria-label={isSaved ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
                      aria-pressed={isSaved}
                      onClick={() => toggleSaved(p)}
                    >
                      <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.5} />
                    </button>
                    <button className="quick" onClick={() => add(p)} aria-label={`Add ${p.name} to bag, ${money(p.price)}`}>
                      <Plus size={15} /> Add to bag
                    </button>
                  </div>
                  <div className="product-meta">
                    <div>
                      <h3>{p.name}</h3>
                      <p className="color">
                        <i style={{ background: SWATCH[p.color] }} aria-hidden="true" />
                        {p.color}
                      </p>
                    </div>
                    <span className="price">{money(p.price)}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {!shown.length && (
            <div className="empty">
              <p>Nothing matches that yet.</p>
              <button
                className="text-link"
                onClick={() => {
                  setFilter('All pieces');
                  setQuery('');
                }}
              >
                Clear search and filters
              </button>
            </div>
          )}

          {!!shown.length && (filter !== 'All pieces' || query) && (
            <div className="center">
              <button
                className="text-link"
                onClick={() => {
                  setFilter('All pieces');
                  setQuery('');
                }}
              >
                View all pieces <ArrowRight size={15} />
              </button>
            </div>
          )}
        </section>

        {/* ───────── Philosophy ───────── */}
        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-media">
            <Photo {...images.story} id={images.story.id} w={1100} className="story-img" />
            <Photo {...images.storyDetail} id={images.storyDetail.id} w={500} className="story-detail" />
          </div>
          <div className="story-copy">
            <h2 id="story-title">
              A wardrobe should feel like you, only a little more considered.
            </h2>
            <p>
              We make fewer things, in better cloth, and we cut them to last past the season they arrive in. Linen from Normandy,
              wool from Biella, buttons that are sewn on twice.
            </p>
            <p>Designed for real life, and made to stay in it.</p>
            <dl className="facts">
              <div>
                <dt>Cloth</dt>
                <dd>Linen, cotton, merino and wool. No blends we would not wear ourselves.</dd>
              </div>
              <div>
                <dt>Runs</dt>
                <dd>Each style is made in a few hundred pieces, then retired or reworked.</dd>
              </div>
              <div>
                <dt>Afterwards</dt>
                <dd>Mending advice with every order, and care notes in the journal.</dd>
              </div>
            </dl>
            <button className="btn btn-ghost" onClick={() => go('journal')}>
              Read the journal <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* ───────── Journal ───────── */}
        <section className="journal" id="journal" aria-labelledby="journal-title">
          <div className="journal-head">
            <h2 id="journal-title">From the studio</h2>
            <button className="text-link" onClick={() => notify('The full journal is coming soon.')}>
              All stories <ArrowRight size={15} />
            </button>
          </div>
          <div className="journal-grid">
            {journal.map((x, i) => (
              <article key={x.id} className={i === 0 ? 'story-card feature' : 'story-card'}>
                <div className="story-card-img">
                  <Photo id={x.photo} w={i === 0 ? 1000 : 700} alt={x.alt} pos={x.pos} />
                </div>
                <div className="story-card-body">
                  <p className="kicker">
                    {x.kind}, {x.read}
                  </p>
                  <h3>{x.title}</h3>
                  <p className="dek">{x.dek}</p>
                  <button className="text-link" onClick={() => notify('This story is coming soon.')}>
                    Read story <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── Newsletter ───────── */}
        <section className="newsletter" aria-labelledby="news-title">
          <h2 id="news-title">A letter, now and then.</h2>
          <p>New edits, studio notes and ten percent off your first order.</p>
          <Newsletter notify={notify} />
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="logo foot-logo" href="#top" onClick={() => go('top')}>
              Maison <span>Atelier</span>
            </a>
            <p>Considered pieces for everyday dressing.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <button onClick={() => go('collection')}>Shop all</button>
              <button onClick={() => go('story')}>Our approach</button>
              <button onClick={() => go('journal')}>Journal</button>
            </div>
            <div>
              <h4>Help</h4>
              <button onClick={() => notify('Add shipping and returns details before launch.')}>Shipping and returns</button>
              <button onClick={() => notify('Add a size guide before launch.')}>Size guide</button>
              <button onClick={() => notify('Add care details before launch.')}>Care</button>
            </div>
            <div>
              <h4>Say hello</h4>
              <a href="mailto:hello@maisonatelier.example">hello@maisonatelier.example</a>
              <button onClick={() => notify('Add your Instagram link before launch.')}>Instagram</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Maison Atelier. A portfolio concept.</span>
          <button onClick={() => go('top')}>Back to top</button>
        </div>
      </footer>

      {cartOpen && (
        <div
          className="overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCartOpen(false);
          }}
        >
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
            <div className="drawer-head">
              <h2>
                Your bag <small>({count})</small>
              </h2>
              <button className="icon" onClick={() => setCartOpen(false)} aria-label="Close bag">
                <X size={22} />
              </button>
            </div>

            {!cart.length ? (
              <div className="cart-empty">
                <ShoppingBag size={30} strokeWidth={1.3} />
                <h3>Your bag is empty.</h3>
                <p>Start with the trench. Everything else is built around it.</p>
                <button
                  className="btn"
                  onClick={() => {
                    setCartOpen(false);
                    go('collection');
                  }}
                >
                  Shop the collection <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((p) => (
                    <div className="cart-item" key={p.id}>
                      <Photo id={p.photo} w={250} alt={p.name} pos={p.pos} />
                      <div className="item-info">
                        <h3>{p.name}</h3>
                        <p>
                          {p.color}, {money(p.price)}
                        </p>
                        <div className="qty">
                          <button onClick={() => changeQty(p.id, -1)} aria-label={`Decrease quantity of ${p.name}`}>
                            <Minus size={14} />
                          </button>
                          <span aria-live="polite">{p.qty}</span>
                          <button onClick={() => changeQty(p.id, 1)} aria-label={`Increase quantity of ${p.name}`}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <strong>{money(p.price * p.qty)}</strong>
                    </div>
                  ))}
                </div>
                <div className="summary">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>{money(total)}</strong>
                  </div>
                  <p className="ship-note">
                    {total >= FREE_SHIPPING_AT
                      ? 'You qualify for complimentary shipping.'
                      : `You are ${money(FREE_SHIPPING_AT - total)} away from complimentary shipping.`}
                  </p>
                  <button className="btn full" onClick={() => notify('Demo only. No checkout is connected.')}>
                    Continue to checkout <ArrowRight size={16} />
                  </button>
                  <small>This is a portfolio demo. No payment is processed.</small>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}

function Newsletter({ notify }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address, like name@example.com.');
      setDone(false);
      return;
    }
    setError('');
    setDone(true);
    setEmail('');
    notify('You are on the list. Thank you.');
  }

  return (
    <form className="newsletter-form" onSubmit={submit} noValidate>
      <div className="field">
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          aria-invalid={!!error}
          aria-describedby="news-msg"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
        />
        <button type="submit">Subscribe</button>
      </div>
      <p id="news-msg" className={error ? 'msg error' : 'msg'} role="status">
        {error || (done ? 'Thank you. Your first letter is on its way.' : 'One letter a month. Unsubscribe whenever you like.')}
      </p>
    </form>
  );
}

createRoot(document.getElementById('root')).render(<App />);
