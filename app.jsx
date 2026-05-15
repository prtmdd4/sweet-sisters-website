// === Sweet Sisters · App ===
const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "rainbow",
  "buttonStyle": "gummy",
  "choiceLimit": 4,
  "revenue": 0,
  "goal": 250,
  "showHeroStickers": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useS('home');
  const [cart, setCart] = useS([]);
  const [cartOpen, setCartOpen] = useS(false);
  const [toast, setToast] = useS(null);

  // theme class on body
  useE(() => {
    document.body.classList.toggle('theme-calm', t.theme === 'calm');
    document.body.style.setProperty('--show-hero-stickers', t.showHeroStickers ? 'block' : 'none');
  }, [t.theme, t.showHeroStickers]);

  // toast auto-dismiss
  useE(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  // scroll to top on page change
  useE(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const addToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty || 1) };
        return next;
      }
      return [...prev, item];
    });
    setToast(`✨ Added "${item.name}" to your bag`);
  };

  // Hide hero stickers via tweak
  useE(() => {
    const els = document.querySelectorAll('.hero-stickers');
    els.forEach(el => el.style.display = t.showHeroStickers ? 'block' : 'none');
  });

  return (
    <>
      <Header page={page} setPage={setPage} cart={cart} openCart={() => setCartOpen(true)} />

      {page === 'home' && <HomePage setPage={setPage} addToCart={addToCart} choiceLimit={t.choiceLimit} />}
      {page === 'shop' && <ShopPage addToCart={addToCart} />}
      {page === 'lab' && (
        <LogicLabPage
          addToCart={addToCart}
          buttonStyle={t.buttonStyle}
          setButtonStyle={(v) => setTweak({ buttonStyle: v })}
          choiceLimit={t.choiceLimit}
        />
      )}
      {page === 'map' && <MapPage revenue={t.revenue} goal={t.goal} />}
      {page === 'founders' && <FoundersPage />}

      <Footer setPage={setPage} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} setPage={setPage} candies={CANDIES} />
      <Toast message={toast} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Look & feel" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          onChange={(v) => setTweak({ theme: v })}
          options={[{ value: 'rainbow', label: 'Rainbow' }, { value: 'calm', label: 'Calm' }]}
        />
        <TweakToggle
          label="Hero stickers"
          value={t.showHeroStickers}
          onChange={(v) => setTweak({ showHeroStickers: v })}
        />

        <TweakSection label="Logic Lab" />
        <TweakRadio
          label="Button style"
          value={t.buttonStyle}
          onChange={(v) => setTweak({ buttonStyle: v })}
          options={[{ value: 'gummy', label: 'Gummy' }, { value: 'nerd', label: 'Nerd' }]}
        />
        <TweakSlider
          label="Flavours per bag (limit)"
          value={t.choiceLimit}
          min={2} max={6} step={1}
          onChange={(v) => setTweak({ choiceLimit: v })}
        />

        <TweakSection label="Roadmap" />
        <TweakSlider
          label="Revenue"
          value={t.revenue}
          min={0} max={500} step={5} unit="$"
          onChange={(v) => setTweak({ revenue: v })}
        />
        <TweakSlider
          label="Goal"
          value={t.goal}
          min={50} max={1000} step={25} unit="$"
          onChange={(v) => setTweak({ goal: v })}
        />

        <TweakSection label="Quick jump" />
        <TweakButton label="🛍️ Shop" onClick={() => setPage('shop')} />
        <TweakButton label="🧪 Logic Lab" onClick={() => setPage('lab')} />
        <TweakButton label="🗺️ Roadmap" onClick={() => setPage('map')} />
        <TweakButton label="👯 Founders" onClick={() => setPage('founders')} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
