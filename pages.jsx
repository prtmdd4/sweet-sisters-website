// === Sweet Sisters · Pages ===

// ============ HOME / CANDY LAB ============
function HomePage({ setPage, addToCart, choiceLimit }) {
  return (
    <div className="page" data-screen-label="01 Home">
      {/* Hero */}
      <section className="hero">
        <div>
          <span className="hero-eyebrow"><span className="dot" /> First market — today! 🎪</span>
          <h1>
            <span className="rainbow-text">Boardroom</span><br />
            on the <span className="underline">Lake</span>.
          </h1>
          <p className="lede">
            Hand-bagged candy curated by two sisters. We're also <strong>showing our work</strong> — every step it takes to start a real business, so other kid-preneurs can do it too.
          </p>
          <div className="hero-ctas">
            <GummyButton color="pink" size="lg" onClick={() => setPage('shop')}>
              🛍️ Shop the Bags
            </GummyButton>
            <GummyButton color="ghost" onClick={() => setPage('lab')}>
              🧪 Build Your Own
            </GummyButton>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 28, flexWrap: 'wrap', fontFamily: 'Fredoka', fontSize: 14, color: 'var(--ink-soft)' }}>
            <span>✓ Curated, not overwhelming</span>
            <span>✓ Built by 2 kid-preneurs</span>
            <span>✓ A learning platform too</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blob" />
          <div className="hero-photo" style={{ background: 'none', overflow: 'hidden' }}>
            <img src="assets/thefounders.jpg" alt="Keira and Lucy — the Sweet Sisters" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
          </div>
          <div className="hero-stickers">
            <div className="sticker s1">180g for $5!</div>
            <div className="sticker s2">Bubs 🍬</div>
            <div className="sticker s3">Built by kids 👯</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Learning platform banner */}
      <section className="section" style={{ marginTop: 56 }}>
        <div className="learn-hero">
          <div className="learn-hero-left">
            <div className="section-eyebrow" style={{ color: 'var(--purple)' }}>kid-preneur curriculum</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>This site teaches how to <span className="rainbow-text">build a business</span>.</h2>
            <p style={{ marginTop: 14, color: 'var(--ink-soft)', fontSize: 18, maxWidth: 540 }}>
              We're showing the math, the steps, and the mistakes. If you want to start your own thing, follow our roadmap.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <GummyButton color="purple" onClick={() => setPage('map')}>See the roadmap →</GummyButton>
              <button className="gummy ghost" onClick={() => setPage('lab')}>Try the Logic Lab</button>
            </div>
          </div>
          <div className="learn-hero-right">
            <div className="learn-pill"><span>🧪</span> Source &amp; taste-test</div>
            <div className="learn-pill"><span>📋</span> Food safety certified</div>
            <div className="learn-pill"><span>🎨</span> Brand &amp; packaging</div>
            <div className="learn-pill"><span>🤖</span> Built with AI</div>
            <div className="learn-pill"><span>🪧</span> Sell at the market</div>
            <div className="learn-pill"><span>🌐</span> Go online</div>
          </div>
        </div>
      </section>

      {/* Featured Bags */}
      <section className="section">
        <SectionHead eyebrow="straight from the lab" title="This week's bags" sub="Limited mixes. Limited choices. (That's a Pro Tip — keep scrolling.)" />
        <div className="bags">
          {BAGS.map(b => (
            <BagCard key={b.id} bag={b} onAdd={() => addToCart({ id: b.id, name: b.name, price: b.price, color: b.colors[0], qty: 1 })} />
          ))}
        </div>
      </section>

      {/* Pro Tips */}
      <section className="section">
        <SectionHead eyebrow="boardroom basics" title="Three rules we live by" sub="Real talk from the founders. (Yes, we wrote these on a glass whiteboard.)" />
        <div className="tips">
          <Tip num="1" title="Pricing is King" body="Don't spend $100 on something nobody will buy. Margins first, vibes second." quote="If it doesn't sell, it's not stock — it's snack." />
          <Tip num="2" title="Presentation Matters" body="Nice clothes. Brushed hair. The candy is in cute bags for a reason." quote="People buy from people who look like they care." />
          <Tip num="3" title="Choice Overload" body="Too many options and the customer just… walks away. Curate the menu." quote="Six bags > sixty bags. Every time." />
        </div>
      </section>

      {/* Scaling Roadmap teaser */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center' }} className="roadmap-teaser">
          <div>
            <SectionHead eyebrow="behind the bag" title="From Kitchen Lab to Boardroom." sub="We started weighing skulls on a kitchen scale. Now we ship to three towns. Here's the map." />
            <div style={{ marginTop: 22 }}>
              <GummyButton color="purple" onClick={() => setPage('map')}>See the Treasure Map →</GummyButton>
            </div>
          </div>
          <RoadmapMini />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .roadmap-teaser { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function BagCard({ bag, onAdd }) {
  return (
    <div className="bag" onClick={(e) => { if (!e.target.closest('button')) onAdd(); }}>
      <div className="bag-photo" style={{ background: '#fff8ee' }}>
        <div className="bag-tag">{bag.tag}</div>
        {bag.image
          ? <img src={bag.image} alt={bag.name} style={{ width: '88%', height: '100%', objectFit: 'contain' }} />
          : <div className="gummies">{bag.colors.flatMap((c, i) => ([...Array(4)].map((_, j) => (<GummyIcon key={`${i}-${j}`} color={c} rotate={(i + j) % 2 ? 8 : -6} />))))}</div>
        }
      </div>
      <h4>{bag.name}</h4>
      <div className="bag-meta">
        <span className="price">${bag.price.toFixed(2)}</span>
        <span className="weight">{bag.weight}</span>
      </div>
      <button className="gummy pink bag-add" onClick={onAdd}>Add to bag</button>
    </div>
  );
}

// ============ LOGIC LAB ============
function LogicLabPage({ addToCart, buttonStyle, setButtonStyle, choiceLimit }) {
  const [counts, setCounts] = useState({});
  const [warning, setWarning] = useState('');
  const [packId, setPackId] = useState('small');     // 'small' or 'large'
  const [founderMode, setFounderMode] = useState(false);

  const pack = PACKAGING.find(p => p.id === packId);
  const targetG = pack.targetG;
  const salePrice = pack.salePrice;
  const tolerance = 10; // ±10g

  // Aggregate
  const lines = CANDIES.map(c => {
    const n = counts[c.id] || 0;
    return { ...c, n, grams: n * c.gPer, ext: n * c.cost };
  }).filter(l => l.n > 0);

  const totalGrams = lines.reduce((s, l) => s + l.grams, 0);
  const totalCost = lines.reduce((s, l) => s + l.ext, 0);
  const totalCostWithPack = totalCost + pack.cost;
  const profit = salePrice - totalCostWithPack;
  const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;
  const distinctTypes = lines.length;

  const fillPct = Math.min(100, (totalGrams / targetG) * 100);
  const status = totalGrams === 0 ? 'empty'
                : totalGrams < targetG - tolerance ? 'under'
                : totalGrams > targetG + tolerance ? 'over'
                : 'good';
  const statusLabel = {
    empty: 'Empty bag · start picking →',
    under: `${(targetG - totalGrams).toFixed(0)}g to go`,
    good:  `Bag is ready! ✨`,
    over:  `${(totalGrams - targetG).toFixed(0)}g over · remove some pieces`,
  }[status];

  const bump = (id, delta) => {
    setCounts(prev => {
      const cur = prev[id] || 0;
      const next = Math.max(0, cur + delta);
      if (delta > 0 && cur === 0 && distinctTypes >= choiceLimit) {
        setWarning(`Choice limit: bags taste best with ${choiceLimit} flavours or fewer. Reduce another flavour first.`);
        setTimeout(() => setWarning(''), 3500);
        return prev;
      }
      return { ...prev, [id]: next };
    });
  };

  const addBagToCart = () => {
    if (totalGrams === 0) return;
    addToCart({
      id: 'custom-' + Date.now(),
      name: `Custom ${pack.name.split(' ')[0]} Bag`,
      price: salePrice,
      color: '#ff3a8c',
      qty: 1,
      weight: totalGrams,
    });
    setCounts({});
  };

  const clearBag = () => setCounts({});

  const NERD_COLORS = ['c-pink', 'c-orange', 'c-yellow', 'c-green', 'c-blue', 'c-purple'];
  const StepperButton = ({ onClick, children, disabled, colorIdx = 0 }) => {
    if (buttonStyle === 'nerd') {
      const cls = NERD_COLORS[colorIdx % NERD_COLORS.length];
      return <button className={`nerd ${cls}`} onClick={onClick} disabled={disabled} style={{ minWidth: 40 }}>{children}</button>;
    }
    return <button onClick={onClick} disabled={disabled}>{children}</button>;
  };

  // Group candies by category
  const byCat = CATEGORIES.map(cat => ({
    cat,
    items: CANDIES.filter(c => c.cat === cat),
  })).filter(g => g.items.length > 0);

  const CAT_META = {
    'Viral Hero':  { color: '#ff3a8c', icon: '⭐', desc: 'The eye-candy. One or two per bag — they sell the photo.' },
    'Showstopper': { color: '#a04ce8', icon: '🎪', desc: 'Big, chunky, photogenic. The "wow" pieces.' },
    'Spine':       { color: '#ff7a1f', icon: '🦴', desc: 'Structure. Long pieces that hold the bag\'s shape.' },
    'Mid-Fill':    { color: '#2e9bff', icon: '🧱', desc: 'Mid-size. The bulk that gets you to weight.' },
    'Base':        { color: '#2bc46b', icon: '🐻', desc: 'The staples. Cheap, reliable, beloved.' },
    'Specialty':   { color: '#ffcc1f', icon: '✨', desc: 'One-of-a-kind treats.' },
    'Filler':      { color: '#a04ce8', icon: '🫧', desc: 'Tiny pieces. They fill gaps and protect margins.' },
  };

  let stepperColorIdx = 0;

  return (
    <div className="page" data-screen-label="03 Logic Lab">
      <SectionHead
        eyebrow="the candy calculator · real cost data"
        title="The Logic Lab"
        sub="Build a bag. Watch the weight. Flip Founder Mode to see the actual cost, packaging, and profit math behind every bag we sell."
      />

      <div className="lab-controls">
        <div className="lab-controls-row">
          <div className="lab-controls-group">
            <div className="lab-controls-label">Bag size</div>
            <div className="button-style-toggle">
              {PACKAGING.map(p => (
                <button key={p.id} className={packId === p.id ? 'on' : ''} onClick={() => setPackId(p.id)}>
                  {p.id === 'holo' ? '🌟' : '✨'} {p.targetG}g · ${p.salePrice}
                </button>
              ))}
            </div>
          </div>
          <div className="lab-controls-group">
            <div className="lab-controls-label">Button style</div>
            <div className="button-style-toggle">
              <button className={buttonStyle === 'gummy' ? 'on' : ''} onClick={() => setButtonStyle('gummy')}>🧸 Gummy</button>
              <button className={buttonStyle === 'nerd' ? 'on' : ''} onClick={() => setButtonStyle('nerd')}>🍬 Nerds</button>
            </div>
          </div>
          <div className="lab-controls-group">
            <div className="lab-controls-label">View</div>
            <button
              className={`founder-toggle ${founderMode ? 'on' : ''}`}
              onClick={() => setFounderMode(v => !v)}
            >
              {founderMode ? '🧠 Founder Mode' : '🛍️ Customer Mode'} <span className="founder-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      {founderMode && (
        <div className="founder-banner">
          <div className="founder-banner-icon">🧠</div>
          <div>
            <strong>Founder Mode is ON.</strong> You're seeing real cost-per-piece data from our supplier sheet. The customer doesn't see this — but every kid-preneur should.
          </div>
        </div>
      )}

      <div className="lab">
        <div className="lab-board">
          <h3>Pick your treats <span className="lab-board-target">target: {targetG}g</span></h3>
          <p className="lab-sub">Tap + to add. We cap at <strong>{choiceLimit}</strong> flavours per bag (Pro Tip #3). Categories below sort by role — heroes first, fillers last.</p>

          {byCat.map(group => {
            const meta = CAT_META[group.cat];
            return (
              <div className="candy-group" key={group.cat}>
                <div className="candy-group-head" style={{ '--cat-color': meta.color }}>
                  <span className="cat-badge"><span className="cat-icon">{meta.icon}</span> {group.cat}</span>
                  <span className="cat-desc">{meta.desc}</span>
                </div>
                {group.items.map((c) => {
                  const n = counts[c.id] || 0;
                  const rowColorA = stepperColorIdx++;
                  const rowColorB = stepperColorIdx++;
                  return (
                    <div className={`candy-row ${n > 0 ? 'active' : ''}`} key={c.id}>
                      <div className="candy-row-emoji" style={{ background: `${c.color}26` }}>{c.emoji}</div>
                      <div className="candy-info">
                        <div className="name">
                          <span className="swatch" style={{ background: c.color }} />
                          {c.name}
                        </div>
                        <div className="meta">
                          {c.gPer}g each
                          {founderMode && <span className="meta-cost"> · ${c.cost.toFixed(3)}/pc</span>}
                        </div>
                      </div>
                      <div className="stepper">
                        <StepperButton onClick={() => bump(c.id, -1)} disabled={n === 0} colorIdx={rowColorA}>−</StepperButton>
                        <span className="count">{n}</span>
                        <StepperButton onClick={() => bump(c.id, +1)} colorIdx={rowColorB}>+</StepperButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {warning && (
            <div className="lab-warning" key={warning}>
              <span style={{ fontSize: 22 }}>🛑</span> {warning}
            </div>
          )}
        </div>

        <div className="receipt-sticky">
          {/* Bag-fill visual */}
          <div className={`bag-tracker status-${status}`}>
            <div className="bag-tracker-head">
              <div>
                <div className="bag-tracker-label">{pack.name}</div>
                <div className="bag-tracker-target">target {targetG}g · sale ${salePrice}</div>
              </div>
              <div className={`bag-tracker-status status-${status}`}>{statusLabel}</div>
            </div>
            <div className="bag-meter">
              <div className="bag-meter-fill" style={{ width: `${fillPct}%` }} />
              <div className="bag-meter-target" style={{ left: '100%' }} />
            </div>
            <div className="bag-meter-axis">
              <span>0g</span>
              <span>{targetG}g</span>
            </div>
          </div>

          <div className="receipt">
            <h3>Lab Receipt <span className="lab-coat">live preview</span></h3>
            {distinctTypes === 0 ? (
              <div className="receipt-empty">
                <div style={{ fontSize: 36 }}>🧪</div>
                Empty beaker. Add some candy →
              </div>
            ) : (
              <>
                {lines.map(l => (
                  <div className="receipt-line" key={l.id}>
                    <span><span className="name">{l.name}</span> × {l.n}</span>
                    <span>
                      {l.grams}g
                      {founderMode && <span className="receipt-cost"> · ${l.ext.toFixed(2)}</span>}
                    </span>
                  </div>
                ))}
                <div className="receipt-divide" />
                <div className="receipt-line">
                  <span>Weight</span>
                  <span><strong>{totalGrams}g</strong> / {targetG}g</span>
                </div>
                <div className="receipt-line">
                  <span>Flavours</span>
                  <span>{distinctTypes} / {choiceLimit}</span>
                </div>

                {founderMode && (
                  <>
                    <div className="receipt-divide" />
                    <div className="founder-math">
                      <div className="founder-math-row">
                        <span>Candy cost</span>
                        <span>${totalCost.toFixed(2)}</span>
                      </div>
                      <div className="founder-math-row">
                        <span>+ Packaging ({pack.name.split(' ')[0]})</span>
                        <span>${pack.cost.toFixed(2)}</span>
                      </div>
                      <div className="founder-math-row total-cost">
                        <span>= Total cost</span>
                        <span>${totalCostWithPack.toFixed(2)}</span>
                      </div>
                      <div className="founder-math-row sale">
                        <span>Sale price</span>
                        <span>${salePrice.toFixed(2)}</span>
                      </div>
                      <div className={`founder-math-row profit ${profit < 0 ? 'loss' : ''}`}>
                        <span>Profit</span>
                        <span>
                          ${profit.toFixed(2)} <small>({margin.toFixed(0)}%)</small>
                        </span>
                      </div>
                      {profit < 0 && (
                        <div className="founder-warn">
                          ⚠️ You're losing ${Math.abs(profit).toFixed(2)} per bag. Swap heroes for base/filler.
                        </div>
                      )}
                      {profit >= 0 && profit < salePrice * 0.4 && (
                        <div className="founder-warn ok">
                          📉 Margin is below 40%. Pricing is King — Pro Tip #1.
                        </div>
                      )}
                      {profit >= salePrice * 0.6 && (
                        <div className="founder-warn good">
                          ✨ Healthy margin! That's a sustainable bag.
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="receipt-divide" />
                <div className="receipt-total">
                  <span>Customer pays</span>
                  <span className="price">${salePrice.toFixed(2)}</span>
                </div>
              </>
            )}
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <GummyButton color="pink" onClick={addBagToCart}>
                {distinctTypes === 0
                  ? 'Add candy to start'
                  : status === 'good'
                    ? `Add bag — $${salePrice.toFixed(2)}`
                    : `Add ${totalGrams}g bag anyway`}
              </GummyButton>
              {distinctTypes > 0 && (
                <button className="gummy ghost" onClick={clearBag} style={{ padding: '10px 18px', fontSize: 14 }}>
                  Reset bag
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ marginTop: 56 }}>
        <SectionHead
          eyebrow="why this calculator exists"
          title="The math is the lesson."
          sub="Every kid-preneur should learn three numbers before they sell anything: cost, price, and the gap between them. Flip Founder Mode and play with it."
          align="center"
        />
        <div className="lesson-grid">
          <div className="lesson-card">
            <div className="lesson-num">📦</div>
            <h4>Cost per piece</h4>
            <p>Bulk price ÷ pieces in the bag. A 454g bag of Swedish Skulls = $0.77/piece. Know yours.</p>
          </div>
          <div className="lesson-card">
            <div className="lesson-num">⚖️</div>
            <h4>Cost per bag</h4>
            <p>Sum every piece you put in, plus the bag itself. The mylar bag alone is $0.27.</p>
          </div>
          <div className="lesson-card">
            <div className="lesson-num">💰</div>
            <h4>Profit margin</h4>
            <p>Healthy small-business candy = 50–65% margin. Below 40%, the math doesn't work.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============ SHOP ============
function ShopPage({ addToCart }) {
  return (
    <div className="page" data-screen-label="02 Shop">
      <SectionHead eyebrow="ready to grab" title="The Candy Shop" sub="Curated bags weighed and priced in the lab. Pick one or three." />
      <div className="bags" style={{ marginTop: 32 }}>
        {BAGS.map(b => (
          <BagCard key={b.id} bag={b} onAdd={() => addToCart({ id: b.id, name: b.name, price: b.price, color: b.colors[0], qty: 1 })} />
        ))}
      </div>

      <section className="section">
        <SectionHead eyebrow="for the kid-preneur" title="What's in our inventory" sub="Twenty candies, sorted by their role in the bag. (See Pro Tip #3 — we curate so you don't have to.)" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 24 }}>
          {CANDIES.slice(0, 12).map(c => (
            <div key={c.id} className="board-card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 32 }}>{c.emoji}</div>
                <div>
                  <div style={{ fontFamily: 'Fredoka', fontWeight: 600, fontSize: 16 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{c.cat} · {c.gPer}g each</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
                {[...Array(5)].map((_, i) => <GummyIcon key={i} color={c.color} size={20} rotate={i % 2 ? 6 : -8} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============ ROADMAP (Treasure Map) ============
function MapPage({ revenue, goal }) {
  const stations = [
    { id: 1, status: 'done', x: 10, y: 88, title: 'Source the Candy', body: 'Found a wholesale supplier we trust.', when: 'Wk 1 · Apr 2026', learn: '💡 Suppliers decide your margins.' },
    { id: 2, status: 'done', x: 40, y: 88, title: 'Order Candy + Bags', body: 'First inventory in: bags, scale, stickers, freezies.', when: 'Wk 1 · Apr 2026', learn: '💡 You spend before you earn.' },
    { id: 3, status: 'done', x: 72, y: 88, title: 'Taste Test', body: 'Vetted every flavour. Cut what we wouldn\'t buy.', when: 'Wk 2 · Apr 2026', learn: '💡 Sell what you\'d buy.' },
    { id: 4, status: 'done', x: 86, y: 52, title: 'Food Safety', body: 'Both founders certified. Hair tied, gloves on.', when: 'Wk 2 · Apr 2026', learn: '💡 Trust = paperwork.' },
    { id: 5, status: 'done', x: 54, y: 52, title: 'Brand + Stickers', body: 'Logo, bag stickers, packaging. Pro Tip #2 in action.', when: 'Wk 3 · Apr 2026', learn: '💡 The wrapper sells.' },
    { id: 6, status: 'done', x: 22, y: 52, title: 'Website + Domain', body: 'Built sweetsisterstreats.shop with AI. Designed by us.', when: 'Wk 4 · Apr–May', learn: '💡 AI is a power tool.' },
    { id: 7, status: 'now', x: 14, y: 16, title: 'First Market Day', body: 'TODAY. Table, bags, freezies. First customer = first lesson.', when: 'TODAY · May 15', learn: '💡 Until a stranger buys, it\'s a hobby.' },
    { id: 8, status: 'future', x: 46, y: 16, title: 'Weekly Markets', body: 'Saturday stand across the Kawarthas. Build regulars.', when: 'Summer 2026', learn: '💡 Repeat > new customers.' },
    { id: 9, status: 'future', x: 80, y: 16, title: 'Online Orders', body: 'Ship bags across Ontario. Website becomes the store.', when: 'Fall 2026', learn: '💡 Online works at 2am.' },
  ];

  // Build SVG path connecting stations
  const path = useMemo(() => {
    let d = '';
    stations.forEach((s, i) => {
      const cmd = i === 0 ? 'M' : 'L';
      d += ` ${cmd} ${s.x} ${s.y}`;
    });
    return d.trim();
  }, []);

  return (
    <div className="page" data-screen-label="04 Roadmap">
      <SectionHead eyebrow="x marks the spot · also a learning lab" title="The Scaling Roadmap" sub="From April 2026 to today: nine stations from sourcing candy to running a real online store. Every stop teaches a business lesson — borrow them, steal them, start your own thing." />

      <div className="learn-banner">
        <div className="learn-banner-icon">📚</div>
        <div>
          <strong>This is also a learning platform.</strong> Every step shows how a real small business gets built — what to do, what it costs, what we learned. Use it. Steal it. Start your own.
        </div>
      </div>

      <div className="map-wrap">
        <div className="map-title">~ Scaling Roadmap · The Boardroom on the Lake ~</div>
        <div className="compass">N<br/>↑<br/>S</div>
        <div className="map">
          <svg className="trail" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={path} fill="none" stroke="#2b1b3a" strokeWidth="0.5" strokeDasharray="1.5 1.2" strokeLinecap="round" />
          </svg>
          {stations.map(s => (
            <div key={s.id} className={`station ${s.status}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <div className="pin">{s.status === 'done' ? '' : s.id}</div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
              <span className="pill">{s.when}</span>
              {s.learn && <div className="station-learn">{s.learn}</div>}
            </div>
          ))}
        </div>
      </div>

      <ThermoBoard revenue={revenue} goal={goal} />

      <section className="section">
        <SectionHead eyebrow="how we run it" title="The Boardroom" sub="Three workrooms. Three jobs. One whiteboard. Here's what runs the business right now." />
        <div className="boardroom">
          <div className="board-card">
            <div className="stage">Stage 1</div>
            <h4>The Kitchen Lab</h4>
            <p>Weighing, tasting, naming. Inventory spreadsheets on the fridge. Every flavour test is a board meeting.</p>
            <div className="stage-meta">
              <span className="chip">📏 scale</span>
              <span className="chip">📓 inventory sheet</span>
              <span className="chip">🍬 taste-test log</span>
            </div>
          </div>
          <div className="board-card">
            <div className="stage">Stage 2</div>
            <h4>The Digital Studio</h4>
            <p>Photos, packaging, QR codes. Built this very website with AI. The studio that scales us.</p>
            <div className="stage-meta">
              <span className="chip">📱 QR bridge</span>
              <span className="chip">🤖 built with AI</span>
              <span className="chip">💡 studio lights</span>
            </div>
          </div>
          <div className="board-card">
            <div className="stage">Stage 3</div>
            <h4>The Market Table</h4>
            <p>Today: first table at the market. Bags + freezies. The classroom is open — come watch us learn.</p>
            <div className="stage-meta">
              <span className="chip">🧊 freezies</span>
              <span className="chip">💵 float + change</span>
              <span className="chip">🪧 signage</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="learn-cta">
          <div>
            <div style={{ fontFamily: 'Caveat', fontSize: 28, color: 'var(--pink)' }}>~ kid-preneur curriculum ~</div>
            <h2 className="section-title" style={{ fontSize: 36 }}>Three things every small business needs.</h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 8, maxWidth: 540 }}>We're not just selling candy — we're showing the math, the mistakes, and the steps. If you're 9 or 90, the lessons are the same.</p>
          </div>
          <div className="learn-grid">
            <div className="learn-card">
              <div className="learn-num">01</div>
              <h4>A product worth buying</h4>
              <p>Source carefully. Taste-test ruthlessly. Margins matter.</p>
            </div>
            <div className="learn-card">
              <div className="learn-num">02</div>
              <h4>A way to be found</h4>
              <p>Stickers, signs, websites, QR codes. The bridge to customers.</p>
            </div>
            <div className="learn-card">
              <div className="learn-num">03</div>
              <h4>The courage to ask</h4>
              <p>Stand at the table. Smile. Tell people what it costs. Repeat.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ThermoBoard({ revenue, goal }) {
  const pct = Math.min(100, (revenue / goal) * 100);
  const fillHeight = useRef(null);
  return (
    <section className="section">
      <SectionHead eyebrow="goal-o-meter" title="Today's Market Thermometer" sub="Our very first selling day. Every bag and freezie fills it a little more. The fundamentals of cash flow, live." />
      <div className="thermo-wrap">
        <div className="thermo">
          <div className="thermo-tube" style={{ height: '100%' }}>
            <div className="thermo-fill" ref={fillHeight} style={{ height: `${pct}%` }} />
            <div className="thermo-ticks">
              {[100, 75, 50, 25].map((v, i) => (
                <div key={v} className="thermo-tick" style={{ top: `${i * 25 + 4}%` }}>${Math.round(goal * v / 100)}</div>
              ))}
            </div>
          </div>
          <div className="thermo-bulb" />
        </div>
        <div className="thermo-info">
          <h3>${revenue.toLocaleString()} so far</h3>
          <div className="big">{pct.toFixed(0)}%</div>
          <div className="of">of our ${goal.toLocaleString()} first-market goal</div>
          <div className="next">
            <strong>Next milestone:</strong> Sell out today → graduate to weekly markets. <br/>
            <span style={{ color: 'var(--ink-soft)', fontFamily: 'Nunito' }}>That's the entire lesson: <em>start small, measure, repeat</em>.</span>
          </div>
          <div className="learn-chips">
            <span className="learn-chip">📈 cash flow</span>
            <span className="learn-chip">🎯 goal setting</span>
            <span className="learn-chip">📊 unit economics</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOUNDERS ============
function FoundersPage() {
  return (
    <div className="page" data-screen-label="05 Founders">
      <SectionHead
        eyebrow="meet the team"
        title="Two sisters. One dog. A lot of sugar."
        sub="We're fun experts — masters of sugar, and the math of small business."
        align="center"
      />

      <div style={{ borderRadius: 32, overflow: 'hidden', border: '3px solid var(--ink)', boxShadow: '10px 10px 0 var(--ink)', marginTop: 32 }}>
        <img src="assets/thefounders.jpg" alt="Keira and Lucy — the Sweet Sisters" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 560 }} />
      </div>

      <div className="founders" style={{ marginTop: 28 }}>
        <div className="founder">
          <h3>Keira <span className="role">co-founder & lead designer</span></h3>
          <p>The hand behind the gummy bear buttons and the bag stickers. Drawing tablet evangelist. Will redesign the logo at 11pm.</p>
          <div className="founder-stats">
            <div className="founder-stat"><div className="num">42</div><div className="lbl">sticker drafts</div></div>
            <div className="founder-stat"><div className="num">9</div><div className="lbl">logo revisions</div></div>
            <div className="founder-stat"><div className="num">∞</div><div className="lbl">ideas</div></div>
          </div>
        </div>
        <div className="founder">
          <h3>Lucy <span className="role">co-founder & head of math</span></h3>
          <p>The one who keeps the spreadsheets and weighs every bag to the gram. Set the choice limit. Wrote Pro Tip #1 on the whiteboard in red marker.</p>
          <div className="founder-stats">
            <div className="founder-stat"><div className="num">$0</div><div className="lbl">revenue (yet!)</div></div>
            <div className="founder-stat"><div className="num">42</div><div className="lbl">bags ready</div></div>
            <div className="founder-stat"><div className="num">1</div><div className="lbl">market today</div></div>
          </div>
        </div>
      </div>

      <div className="video-card">
        <div>
          <div style={{ fontFamily: 'Caveat', fontSize: 28, color: 'var(--yellow)' }}>~ behind the scenes ~</div>
          <h3>The Top Secret Weighing</h3>
          <p>Watch us weigh the Swedish Skulls, balance a bag to exactly 180g, and argue about how many Bubs is "too many." Studio-lit, founder-approved.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <GummyButton color="yellow">▶ Watch the film</GummyButton>
            <button className="gummy ghost">Read the recipe</button>
          </div>
        </div>
        <div className="video-frame">
          <div className="play" />
          <div className="scale">LIVE · 04:32</div>
        </div>
      </div>

    </div>
  );
}

// --- Mini roadmap preview (home) ---
function RoadmapMini() {
  const dots = [
    { x: 10, y: 78, done: true },
    { x: 28, y: 60, done: true },
    { x: 46, y: 70, done: true },
    { x: 62, y: 42, now: true },
    { x: 80, y: 56, done: false },
    { x: 92, y: 22, done: false },
  ];
  return (
    <div style={{
      position: 'relative', aspectRatio: '5/3',
      background: 'radial-gradient(circle at 30% 30%, rgba(255,204,31,0.16), transparent 60%), #fff3dd',
      borderRadius: 24, border: '3px solid var(--ink)', boxShadow: '6px 6px 0 var(--ink)', padding: 16,
    }}>
      <div style={{ fontFamily: 'Caveat', fontSize: 22, color: 'var(--ink)' }}>~ the path so far ~</div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d={dots.map((d, i) => `${i ? 'L' : 'M'} ${d.x} ${d.y}`).join(' ')} fill="none" stroke="#2b1b3a" strokeWidth="0.5" strokeDasharray="1.2 1" />
      </svg>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${d.x}%`, top: `${d.y}%`,
          transform: 'translate(-50%, -50%)',
          width: 28, height: 28,
          borderRadius: 99,
          background: d.now ? 'var(--yellow)' : d.done ? 'var(--green)' : 'white',
          border: '3px solid var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fredoka', fontSize: 12, fontWeight: 700,
          boxShadow: d.now ? '0 0 0 6px rgba(255,204,31,0.3)' : 'none',
          animation: d.now ? 'pulse 1.6s ease-in-out infinite' : 'none',
        }}>{d.done ? '✓' : d.now ? '★' : i + 1}</div>
      ))}
      <div style={{
        position: 'absolute', bottom: 12, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', fontFamily: 'Fredoka', fontSize: 12, color: 'var(--ink-soft)',
      }}>
        <span>Kitchen Lab</span><span>Treat HQ →</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  HomePage, ShopPage, LogicLabPage, MapPage, FoundersPage,
});
