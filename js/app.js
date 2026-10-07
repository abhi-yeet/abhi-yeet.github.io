/* ViduOS — behaviour. All text and photo names come from js/content.js. */
(() => {
'use strict';

const C = window.VIDU;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const wait = ms => new Promise(r => setTimeout(r, ms));
const svg = (id, cls = '') => `<svg class="s ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const params = new URLSearchParams(location.search);

const phone = $('#phone');
const appEl = $('#app');

/* ------------------------------------------------------------------ state */
const KEY = 'viduos-v1';
const state = { stars: {}, unlocked: false, slides: {}, daddy: false, pets: 0, best: null, opened: false };
try {
  if (params.has('reset')) localStorage.removeItem(KEY);
  Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}'));
} catch (e) { /* private mode: just don't remember */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

const APPS = [
  { id: 'profile',  name: 'VIDU.exe',     emoji: '💁‍♀️', hue: 'a' },
  { id: 'memories', name: 'OUR_MEMORIES', emoji: '📸', hue: 'b' },
  { id: 'lore',     name: 'VIDU_LORE',    emoji: '📁', hue: 'c' },
  { id: 'secret',   name: 'TOP_SECRET',   emoji: '🔪', hue: 'k' },
  { id: 'slides',   name: 'SLIDE_BOX',    emoji: '🧪', hue: 'd' },
  { id: 'race',     name: 'RACE_CTRL',    emoji: '🏎️', hue: 'n' },
  { id: 'cat',      name: 'KITTEN_CAM',   emoji: '🐈', hue: 'l' },
  { id: 'messages', name: 'MESSAGES',     emoji: '💬', hue: 'a' },
  { id: 'ipod',     name: 'iPod',         emoji: '🎧', hue: 's' },
  { id: 'cake',     name: 'CAKE',         emoji: '🎂', hue: 'b' },
  { id: 'hinge',    name: 'Hinge',        emoji: '🗑️', hue: 'x', fake: true },
  { id: 'letter',   name: 'FOR_YOU',      emoji: '💌', hue: 'g', last: true }
];
const STAR_IDS = APPS.filter(a => !a.fake && !a.last).map(a => a.id);
const STAR_ON_OPEN = ['profile', 'memories', 'lore', 'slides', 'race', 'cat', 'messages', 'ipod'];
const starCount = () => STAR_IDS.filter(id => state.stars[id]).length;
const letterOpen = () => starCount() >= C.starsToUnlock || params.get('stars') === 'all';

/* ----------------------------------------------------------------- photos */
function photo(file, label, cls = '', fallback = '') {
  return `<figure class="ph ${cls}"><img src="assets/photos/${file}" alt="${label}" data-file="${file}" data-fallback="${fallback}" draggable="false"></figure>`;
}
document.addEventListener('error', e => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || !img.dataset.file) return;
  const fig = img.parentElement;
  fig.classList.add('miss');
  fig.innerHTML = img.dataset.fallback
    ? `<span class="ph-fb">${img.dataset.fallback}</span>`
    : `<div class="ph-miss"><b>[ ADD PHOTO ]</b><span>${img.alt}</span><code>${img.dataset.file}</code></div>`;
}, true);

/* ------------------------------------------------------------ small things */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.innerHTML = msg;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('on'), 2600);
}

function dialog({ title = '', body = '', buttons = [{ label: 'OK' }], cls = '' }) {
  const host = $('#dlg');
  host.innerHTML = `
    <div class="dlg-box ${cls}">
      <div class="tbar"><span class="tbar-title">${title}</span><span class="tbar-x fake">✕</span></div>
      <div class="dlg-body">${body}</div>
      <div class="dlg-btns"></div>
    </div>`;
  host.classList.add('on');
  const close = () => { host.classList.remove('on'); host.innerHTML = ''; };
  return new Promise(resolve => {
    buttons.forEach((b, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn98 ' + (b.cls || '');
      btn.textContent = b.label;
      btn.addEventListener('click', ev => {
        if (b.onPress && b.onPress(ev, btn, host) === false) return;
        close(); resolve(i);
      });
      $('.dlg-btns', host).appendChild(btn);
    });
  });
}

function burst(x, y, n = 6) {
  const r = phone.getBoundingClientRect(), fx = $('#fx');
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i');
    s.className = 'spk';
    s.textContent = pick(['✦', '✧', '♥', '★', '✦']);
    s.style.left = (x - r.left) + 'px';
    s.style.top = (y - r.top) + 'px';
    s.style.setProperty('--dx', rand(-46, 46) + 'px');
    s.style.setProperty('--dy', rand(-56, 30) + 'px');
    s.style.fontSize = rand(10, 22) + 'px';
    fx.appendChild(s);
    setTimeout(() => s.remove(), 750);
  }
}
phone.addEventListener('pointerdown', e => burst(e.clientX, e.clientY, 5), { passive: true });
phone.addEventListener('contextmenu', e => e.preventDefault());

function confetti(n = 170) {
  if (params.has('noconfetti')) return;
  const cv = $('#confetti'), r = phone.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = r.width * dpr; cv.height = r.height * dpr;
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cols = ['#ff2d95', '#ffd3e8', '#ffffff', '#cfa8ff', '#ff77bc', '#ffe066', '#c4006a'];
  const ps = Array.from({ length: n }, () => ({
    x: rand(0, r.width), y: rand(-r.height * 0.7, -10), vx: rand(-1.2, 1.2), vy: rand(2.2, 5.5),
    s: rand(7, 15), a: rand(0, 6.28), va: rand(-0.2, 0.2), c: pick(cols), sh: pick(['r', 'r', 'h', 's'])
  }));
  const t0 = performance.now();
  cv.classList.add('on');
  (function tick(t) {
    ctx.clearRect(0, 0, r.width, r.height);
    let alive = false;
    for (const p of ps) {
      p.x += p.vx + Math.sin((t + p.s * 100) / 400) * 0.6; p.y += p.vy; p.a += p.va;
      if (p.y < r.height + 20) alive = true;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c;
      if (p.sh === 'r') ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else { ctx.font = `${p.s * 1.5}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.sh === 'h' ? '♥' : '✦', 0, 0); }
      ctx.restore();
    }
    if (alive && t - t0 < 8000) requestAnimationFrame(tick);
    else { ctx.clearRect(0, 0, r.width, r.height); cv.classList.remove('on'); }
  })(t0);
}

function show(id) {
  $$('.screen').forEach(s => s.classList.toggle('on', s.id === id));
}

/* ------------------------------------------------------------------ music */
const audio = $('#audio');
const music = { cur: -1, missing: {}, onChange: null };
function playTrack(i) {
  const n = C.music.tracks.length;
  music.cur = ((i % n) + n) % n;
  audio.src = 'assets/audio/' + C.music.tracks[music.cur].file;
  audio.play().catch(() => {});
  music.onChange && music.onChange();
}
audio.addEventListener('error', () => { if (music.cur >= 0) { music.missing[music.cur] = true; music.onChange && music.onChange(); } });
audio.addEventListener('ended', () => playTrack(music.cur + 1));
['play', 'pause', 'timeupdate'].forEach(ev => audio.addEventListener(ev, () => music.onChange && music.onChange()));

/* ------------------------------------------------------------------- boot */
function boot() {
  const el = $('#boot');
  el.innerHTML = `
    <div class="boot-in">
      ${svg('spark', 'boot-sp sp1')}${svg('spark', 'boot-sp sp2')}${svg('spark', 'boot-sp sp3')}
      <div class="boot-logo"><span class="script">${C.her}</span><b class="chunk">OS</b></div>
      <div class="boot-sub px">version ${C.age}.0 · birthday edition</div>
      <div class="bar"><i></i></div>
      <div class="boot-line px">&nbsp;</div>
      <div class="boot-skip px">tap to skip</div>
    </div>`;
  show('boot');
  let i = 0, timer, done = false;
  const next = () => { if (done) return; done = true; clearTimeout(timer); state.unlocked ? wall() : call(); };
  const step = () => {
    if (i >= C.boot.length) return next();
    $('.boot-line', el).textContent = C.boot[i];
    $('.bar i', el).style.width = ((i + 1) / C.boot.length * 100) + '%';
    i++; timer = setTimeout(step, 720);
  };
  el.onclick = next;
  step();
}

/* ------------------------------------------------------------------- call */
function call() {
  const el = $('#call');
  el.innerHTML = `
    <div class="call-ring">
      <div class="call-top px">incoming call…</div>
      <div class="call-ava"><i></i><i></i>${photo('abhi.jpg', C.him, 'round', '💗')}</div>
      <h2 class="chunk call-name">${C.him.toUpperCase()}</h2>
      <p class="hand call-sub">${C.call.sub}</p>
      <p class="px call-msg">&nbsp;</p>
      <div class="call-btns">
        <button class="cbtn no" aria-label="decline"><span>✕</span><small class="px">decline</small></button>
        <button class="cbtn yes" aria-label="pick up"><span>📞</span><small class="px">pick up</small></button>
      </div>
    </div>
    <div class="call-live" hidden>
      <div class="call-top px">connected · <span class="call-timer">00:00</span></div>
      <div class="call-lines"></div>
      <button class="jelly enter" hidden>enter vidu world ✦</button>
    </div>`;
  show('call');
  let declines = 0;
  $('.cbtn.no', el).onclick = e => {
    const b = e.currentTarget;
    $('.call-msg', el).textContent = C.call.declined[Math.min(declines, C.call.declined.length - 1)];
    declines++;
    b.style.transform = `scale(${Math.max(0.35, 1 - declines * 0.2)})`;
    $('.cbtn.yes', el).style.transform = `scale(${Math.min(1.5, 1 + declines * 0.14)})`;
  };
  $('.cbtn.yes', el).onclick = async () => {
    if (C.music.autoplayOnCall) playTrack(0);
    $('.call-ring', el).hidden = true;
    const live = $('.call-live', el); live.hidden = false;
    const t0 = Date.now();
    const tick = setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      const tm = $('.call-timer', el); if (!tm) return clearInterval(tick);
      tm.textContent = `00:${String(s).padStart(2, '0')}`;
    }, 1000);
    for (const [i, line] of C.call.lines.entries()) {
      await wait(i ? 1150 : 500);
      const p = document.createElement('p');
      p.className = 'bubble ' + (i < 2 ? 'big' : '');
      p.textContent = line;
      $('.call-lines', el).appendChild(p);
    }
    await wait(700);
    const go = $('.enter', el); go.hidden = false;
    go.onclick = () => { clearInterval(tick); wall(); };
  };
}

/* -------------------------------------------------------------- wallpaper */
function wall() {
  const el = $('#wall'), W = C.wall;
  const tape = W.marquee.map(t => `<span>${t}</span><span>✦</span>`).join('');
  el.innerHTML = `
    <div class="wall-in">
      ${svg('star', 'dc w-s1')}${svg('star', 'dc w-s2')}${svg('spark', 'dc w-p1')}${svg('spark', 'dc w-p2')}${svg('spark', 'dc w-p3')}
      ${svg('heart', 'dc w-h1')}${svg('heart', 'dc w-h2')}${svg('fly', 'dc w-f1')}${svg('fly', 'dc w-f2')}
      ${svg('lily', 'dc w-l1')}${svg('lily', 'dc w-l2')}
      <div class="disco w-disco"></div>
      <div class="hello">${W.hello}</div>
      <div class="pill px">✦ ${C.birthday} ✦</div>
      <h1 class="wall-hb chunk"><span>happy</span> <span class="n">${C.age}th</span> <span>birthday</span></h1>
      <div class="wall-name script" data-t="${C.her}">${C.her}</div>
      <div class="wall-pol pol">
        <i class="washi"></i>${photo(W.photo, C.her + ' — her best photo')}
        <span class="hand">${W.caption}</span>${svg('bow', 'pol-bow')}
      </div>
      <div class="tape"><div class="tape-run chunk">${tape}${tape}</div></div>
      <div class="slide"><span class="px">slide to unlock</span><div class="slide-knob">${svg('heart')}</div></div>
    </div>`;
  show('wall');
  const track = $('.slide', el), knob = $('.slide-knob', el);
  let sx = null, max = 0;
  const unlock = () => { state.unlocked = true; save(); home(); };
  knob.addEventListener('pointerdown', e => { sx = e.clientX; max = track.clientWidth - knob.offsetWidth - 8; knob.setPointerCapture(e.pointerId); });
  knob.addEventListener('pointermove', e => {
    if (sx == null) return;
    const dx = Math.max(0, Math.min(max, e.clientX - sx));
    knob.style.transform = `translateX(${dx}px)`;
    track.style.setProperty('--p', dx / max);
    if (dx >= max * 0.9) { sx = null; unlock(); }
  });
  const end = () => { if (sx == null) return; sx = null; knob.style.transform = ''; track.style.setProperty('--p', 0); };
  knob.addEventListener('pointerup', end);
  knob.addEventListener('pointercancel', end);
  track.addEventListener('click', e => { if (e.target === knob || knob.contains(e.target)) return; knob.classList.remove('nudge'); void knob.offsetWidth; knob.classList.add('nudge'); });
  el._unlock = unlock;
}

/* ------------------------------------------------------------------- home */
function home() {
  const el = $('#home'), H = C.home;
  el.innerHTML = `
    <div class="sbar px">
      <button class="clock-b"><span class="clock">00:00</span><span class="moon" hidden>🌙</span></button>
      <button class="caps">caps lock</button>
      <button class="batt"><i></i><span>patience 3%</span></button>
    </div>
    <div class="home-scroll">
      <div class="widget">
        ${svg('lily', 'wd-lily')}
        <b class="script">${H.hello}</b>
        <span class="hand">${H.hint}</span>
        <div class="w-stars"></div>
      </div>
      <div class="grid"></div>
      <button class="home-foot px">${H.foot}</button>
    </div>
    <div class="flies">
      ${[1, 2, 3, 4].map(i => `<span class="fly f${i}">${svg('fly')}</span>`).join('')}
      <button class="fly f5 odd" aria-label="a butterfly">${svg('fly')}</button>
    </div>`;
  show('home');
  renderHome();

  const clock = () => { const d = new Date(), c = $('.clock', el); if (c) c.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
  clock(); setInterval(clock, 20000);

  $('.grid', el).addEventListener('click', e => { const b = e.target.closest('.icon'); if (b) openApp(b.dataset.id); });

  // eepy o'clock: 10:30 pm until 5 am
  const eepy = () => { const d = new Date(), m = d.getHours() * 60 + d.getMinutes(); return params.has('eepy') || m >= 22 * 60 + 30 || m < 5 * 60; };
  $('.moon', el).hidden = !eepy();
  $('.clock-b', el).onclick = () => { $('.moon', el).hidden = !eepy(); toast(eepy() ? H.eepy.toastOn : H.eepy.toastOff); };
  if (eepy() && !state.eepySeen) {
    setTimeout(() => {
      if (appEl.classList.contains('on') || $('#dlg').classList.contains('on')) return;
      state.eepySeen = true; save();
      dialog({ title: H.eepy.title, body: H.eepy.body, cls: 'lav' });
    }, 1600);
  }

  // footer: she "takes credit" for the jokes; it gets taken back
  let stealing = false;
  $('.home-foot', el).onclick = e => {
    if (stealing) return; stealing = true;
    const f = e.currentTarget; f.textContent = H.footStolen; f.classList.add('stolen');
    setTimeout(() => { f.textContent = H.foot; f.classList.remove('stolen'); toast(H.footBack); stealing = false; }, 1700);
  };

  $('.fly.odd', el).onclick = () => dialog({ title: H.butterfly.title, body: H.butterfly.body, cls: 'lav' });

  $('.caps', el).onclick = e => {
    const on = phone.classList.toggle('caps-on');
    e.currentTarget.classList.toggle('on', on);
    toast(on ? H.capsOn : H.capsOff);
  };

  let pokes = 0;
  $('.batt', el).onclick = async e => {
    const b = e.currentTarget;
    if (b.classList.contains('full')) return toast(H.patience.done);
    pokes++;
    phone.classList.remove('shake'); void phone.offsetWidth; phone.classList.add('shake');
    if (pokes < 3) return toast(['stop poking it.', 'VIDU.'][pokes - 1]);
    await dialog({ title: H.patience.title, body: H.patience.body, buttons: [{ label: H.patience.button }] });
    b.classList.add('full'); $('span', b).textContent = 'patience 100%';
    toast(H.patience.done);
  };
}

function renderHome() {
  const el = $('#home'); if (!el.firstChild) return;
  const n = starCount(), open = letterOpen();
  $('.w-stars', el).innerHTML =
    STAR_IDS.map(id => `<i class="${state.stars[id] ? 'got' : ''}">${svg('star')}</i>`).join('') +
    `<em class="px">${n}/${STAR_IDS.length}${open ? ' · letter unlocked' : ''}</em>`;
  $('.grid', el).innerHTML = APPS.map((a, i) => {
    const locked = a.last && !open;
    return `<button class="icon ${a.fake ? 'fake' : ''} ${locked ? 'locked' : ''} ${a.last && open ? 'ready' : ''}" data-id="${a.id}" style="--i:${i}">
      <span class="ico h-${a.hue}"><span class="emo">${locked ? '🔒' : a.emoji}</span>${state.stars[a.id] ? svg('star', 'ico-star') : ''}</span>
      <span class="lbl px">${a.name}</span></button>`;
  }).join('');
}

function star(id) {
  if (state.stars[id] || !STAR_IDS.includes(id)) return;
  const was = letterOpen();
  state.stars[id] = true; save();
  toast(`${svg('star', 'tst')} star collected · ${starCount()}/${STAR_IDS.length}`);
  renderHome();
  if (!was && letterOpen()) pendingUnlock = true;   // announced once she is back on the home screen
}

let pendingUnlock = false;
function announceUnlock() {
  if (!pendingUnlock || $('#dlg').classList.contains('on')) return;
  pendingUnlock = false;
  dialog({ title: '💌 1 new message', body: `you collected enough stars.<br><br><b>FOR_YOU</b> is unlocked.<br><span class="hand">open it last. hold on to something.</span>`, cls: 'lav' });
}

/* ------------------------------------------------------------ app windows */
let token = 0, cleanup = null;
function openApp(id) {
  const a = APPS.find(x => x.id === id); if (!a) return;
  if (id === 'hinge') return void dialog({ title: C.home.hinge.title, body: C.home.hinge.body });
  if (a.last && !letterOpen()) {
    const need = C.starsToUnlock - starCount();
    return void dialog({ title: '🔒 locked', body: `this one opens last.<br><br>collect <b>${need}</b> more star${need > 1 ? 's' : ''} first.<br><span class="hand">open the other apps. finish what's inside them.</span>` });
  }
  const my = ++token;
  appEl.className = 'screen app-' + id;
  appEl.innerHTML = `
    <div class="tbar"><span class="tbar-ico">${a.emoji}</span><span class="tbar-title px">${a.name}</span>
      <button class="tbar-x" aria-label="close">✕</button></div>
    <div class="app-body"></div>`;
  $('.tbar-x', appEl).onclick = () => closeApp();
  const body = $('.app-body', appEl);
  cleanup = RENDER[id](body, () => my === token) || null;
  requestAnimationFrame(() => appEl.classList.add('on'));
  if (STAR_ON_OPEN.includes(id)) setTimeout(() => my === token && star(id), 900);
  try { history.pushState({ app: id }, ''); } catch (e) {}
}
function closeApp(fromPop) {
  if (!appEl.classList.contains('on') && !appEl.firstChild) return;
  token++;
  if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  appEl.classList.remove('on');
  setTimeout(() => { if (!appEl.classList.contains('on')) appEl.innerHTML = ''; }, 350);
  setTimeout(announceUnlock, 500);
  if (!fromPop) { try { if (history.state && history.state.app) history.back(); } catch (e) {} }
}
window.addEventListener('popstate', () => closeApp(true));

const RENDER = {};

/* --- VIDU.exe ------------------------------------------------------------ */
RENDER.profile = body => {
  const P = C.profile;
  body.innerHTML = `
    <div class="pf">
      <div class="pf-tape"><div class="tape-run px">✦ welcome to vidu world ✦ you are visitor #000001 ✦ the only visitor that matters ✦ welcome to vidu world ✦ you are visitor #000001 ✦ the only visitor that matters </div></div>
      <div class="pf-head">
        <div class="pf-pic">${photo(P.photo, C.her + ' — profile picture')}${svg('star', 'pf-st')}${svg('bow', 'pf-bow')}</div>
        <div class="pf-id">
          <div class="script pf-name">${C.her}</div>
          <div class="px pf-handle">✦ ${P.handle} ✦</div>
          <span class="online px"><i></i>online now</span>
        </div>
      </div>
      <p class="pf-quote serif">${P.quote}</p>
      <table class="pf-rows px">${P.rows.map(r => `<tr><th>${r[0]}:</th><td>${r[1]}</td></tr>`).join('')}</table>

      <div class="box"><h3 class="px">about me</h3>
        <p>${P.about}</p><p class="hand note">${P.aboutNote}</p></div>

      <div class="box"><h3 class="px">vidu's top 8</h3>
        <div class="top8">${P.top8.map((t, i) => `<div class="t8"><span class="t8-e">${t[0]}</span><b class="px">${i + 1}. ${t[1]}</b></div>`).join('')}</div></div>

      <div class="box"><h3 class="px">buddy list</h3>
        <div class="buds">${P.buddies.map(g => `
          <div class="bud-g px">▾ ${g[0]} (${g[1].length}/${g[1].length})</div>
          ${g[1].map((n, i) => `<div class="bud"><i></i><b>${n}</b>${i === 0 && g[2] ? `<span class="hand">${g[2]}</span>` : ''}</div>`).join('')}`).join('')}</div></div>

      <div class="box poll"><h3 class="px">${P.poll.q}</h3>
        <div class="poll-btns"><button class="btn98" data-v="a">${P.poll.a}</button><button class="btn98" data-v="b">${P.poll.b}</button></div>
        <div class="poll-res" hidden>
          <div class="poll-row px"><span>${P.poll.a}</span><div class="bar"><i></i></div><em>100%</em></div>
          <div class="poll-row px"><span>${P.poll.b}</span><div class="bar"></div><em>0%</em></div>
          <p class="hand poll-msg"></p></div></div>

      <div class="box stk"><h3 class="px">things that are just… you</h3>
        <div class="stk-sheet">${P.stickers.map((s, i) => `<button class="sticker" data-i="${i}" style="--r:${(i * 37 % 17) - 8}deg">
          <span class="stk-e">${s[0] === 'lily' ? svg('lily') : s[0]}</span><small class="px">${s[1]}</small></button>`).join('')}</div>
        <p class="hand stk-note">tap a sticker.</p></div>
    </div>`;
  $('.poll-btns', body).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $('.poll-res', body).hidden = false;
    $('.poll-msg', body).textContent = b.dataset.v === 'a' ? P.poll.pickedA : P.poll.pickedB;
    requestAnimationFrame(() => { $('.poll-res .bar i', body).style.width = '100%'; });
  });
  $('.stk-sheet', body).addEventListener('click', e => {
    const b = e.target.closest('.sticker'); if (!b) return;
    $$('.sticker', body).forEach(x => x.classList.toggle('on', x === b));
    const n = $('.stk-note', body);
    n.textContent = P.stickers[b.dataset.i][2];
    n.classList.remove('pop'); void n.offsetWidth; n.classList.add('pop');
  });
};

/* --- OUR_MEMORIES -------------------------------------------------------- */
RENDER.memories = body => {
  const M = C.memories;
  body.innerHTML = `
    <div class="mem">
      <h2 class="script mem-h">our memories</h2>
      <p class="hand mem-intro">${M.intro}</p>
      ${M.list.map((m, i) => `
        <div class="mem-item ${i % 2 ? 'r' : 'l'}">
          ${svg(['heart', 'star', 'fly', 'lily', 'bow', 'spark'][i % 6], 'mem-dc')}
          <div class="flip" data-i="${i}" style="--r:${[-4, 3, -2, 4, -3, 2][i % 6]}deg">
            <div class="pol face front"><i class="washi w${i % 3}"></i>
              ${m.photo ? photo(m.photo, m.title) : `<figure class="ph nophoto"><span>${m.emoji || '💗'}</span></figure>`}
              ${m.stamp ? `<em class="dstamp">${m.stamp}</em>` : ''}
              <span class="hand">${m.front}</span></div>
            <div class="pol face back"><i class="washi w${(i + 1) % 3}"></i>
              <b class="px">${m.title}${m.date ? ' · ' + m.date : ''}</b>
              <p class="hand">${m.back}</p><span class="back-heart">${svg('heart')}</span></div>
          </div>
          <div class="mem-tag chunk">${String(i + 1).padStart(2, '0')}</div>
        </div>`).join('')}
      <h2 class="script mem-h two">${M.wallTitle}</h2>
      <div class="wallgrid">${M.wall.map((w, i) => `
        <div class="wg ${['pol', 'stk', 'pol', 'pol', 'stk', 'pol'][i % 6]}" style="--r:${[-6, 5, 3, -4, 7, -2][i % 6]}deg">
          ${photo(w[0], w[1])}<span class="hand">${w[1]}</span></div>`).join('')}</div>
      <p class="hand mem-end">more coming. obviously.</p>
    </div>`;
  body.addEventListener('click', e => { const f = e.target.closest('.flip'); if (f) f.classList.toggle('on'); });
};

/* --- VIDU_LORE ----------------------------------------------------------- */
RENDER.lore = body => {
  const L = C.lore, R = L.receipt;
  body.innerHTML = `
    <div class="lore">
      <div class="wiki-top"><span class="serif wiki-logo">V<small>idupedia</small></span><span class="px wiki-tag">${L.tagline}</span></div>
      <h2 class="serif wiki-h">${C.her}</h2>
      <p class="px wiki-from">From Vidupedia · <u>edit</u> (denied) · <u>talk</u> (ALL CAPS)</p>
      <p class="wiki-p">${L.summary}</p>
      <div class="infobox">
        <div class="ib-h px">${C.her} ${svg('star')}</div>
        ${photo(L.babyPhoto, 'childhood photo of ' + C.her)}
        <p class="ib-cap">${L.babyCaption}</p>
        <table>${L.rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</table>
      </div>
      <h3 class="serif wiki-sub">Series history</h3>
      <ul class="seasons">${L.seasons.map(s => `<li><b class="px">${s[0]}</b><span>${s[1]}</span></li>`).join('')}</ul>
      <h3 class="serif wiki-sub">Controversies</h3>
      <ul class="contro">${L.controversies.map(c => `<li><b>${c[0]}.</b> ${c[1]}</li>`).join('')}</ul>
      <h3 class="serif wiki-sub">Primary source</h3>
      <div class="receipt">
        <i class="washi w1"></i>
        <b class="r-head">${R.head}</b><span class="r-date">${R.date}</span>
        <div class="r-rule"></div>
        ${R.lines.map(l => `<div class="r-line"><span>${l[0]}</span><span>${l[1]}</span></div>`).join('')}
        <div class="r-rule"></div>
        <div class="r-line r-total"><span>TOTAL</span><span>${R.total}</span></div>
        <div class="barcode"></div>
        <span class="r-foot">${R.foot}</span>
      </div>
    </div>`;
};

/* --- TOP_SECRET ---------------------------------------------------------- */
RENDER.secret = body => {
  const S = C.secret;
  const file = () => {
    body.innerHTML = `
      <div class="case">
        <div class="folder">
          <div class="case-dept px">${S.dept}</div>
          <div class="case-no px">${S.caseNo}</div>
          <h2 class="serif case-title">${S.title}</h2>
          <div class="stamp cls px">CLASSIFIED</div>
          <table class="case-rows px">${S.rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</table>
          <h4 class="px">SUMMARY OF EVENTS</h4><p>${S.summary}</p>
          <h4 class="px">EVIDENCE</h4><ul>${S.evidence.map(e => `<li>${e}</li>`).join('')}</ul>
          <h4 class="px">SUSPECT'S STATEMENT</h4><p class="serif stmt">${S.statement}</p>
          <h4 class="px">VERDICT</h4>
          <div class="verdict"><div class="stamp guilty chunk">${S.verdict}</div></div>
          <h4 class="px">SENTENCE</h4><p>${S.sentence}</p>
          <div class="sig"><span class="script">${S.sign}</span><small class="px">signature of the guilty party</small></div>
          <div class="slide-strip">${'<i></i>'.repeat(5)}</div>
        </div>
      </div>`;
  };
  if (state.stars.secret || params.has('code')) return file();
  body.innerHTML = `
    <div class="lock">
      <div class="lock-ico">🔒</div>
      <h2 class="px">TOP_SECRET</h2>
      <p class="px lock-sub">enter the 4-digit passcode</p>
      <div class="dots">${'<i></i>'.repeat(4)}</div>
      <p class="hand lock-hint">&nbsp;</p>
      <div class="keys">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(k => k ? `<button class="key px" data-k="${k}">${k}</button>` : '<span></span>').join('')}</div>
    </div>`;
  let code = '', fails = 0, busy = false;
  const dots = $$('.dots i', body);
  const draw = () => dots.forEach((d, i) => d.classList.toggle('on', i < code.length));
  $('.keys', body).addEventListener('pointerdown', async e => {
    const k = e.target.closest('.key'); if (!k || busy) return;
    if (k.dataset.k === '⌫') { code = code.slice(0, -1); return draw(); }
    code += k.dataset.k; draw();
    if (code.length < 4) return;
    busy = true; await wait(180);
    if (C.passcodes.includes(code)) {
      star('secret'); confetti(90); file();
    } else {
      fails++;
      const lock = $('.lock', body);
      lock.classList.remove('bad'); void lock.offsetWidth; lock.classList.add('bad');
      $('.lock-hint', body).textContent = S.hints[Math.min(fails, S.hints.length - 1)];
      code = ''; draw(); busy = false;
    }
  });
};

/* --- SLIDE BOX ----------------------------------------------------------- */
RENDER.slides = body => {
  const S = C.slides;
  body.innerHTML = `
    <div class="sbx">
      <h2 class="script sbx-h">the slide box</h2>
      <p class="hand sbx-intro">${S.intro}</p>
      <div class="sbx-box"><div class="sbx-lid px">A.'s collection · do not touch (vidu may touch)</div>
        <div class="sbx-row">${S.list.map((_, i) => `<button class="gslide ${state.slides[i] ? 'seen' : ''}" data-i="${i}">
          <span class="px">${String(i + 1).padStart(2, '0')}</span><i></i></button>`).join('')}</div></div>
      <p class="px sbx-count"></p>
      <div class="sbx-card" hidden>
        <span class="px sbx-no"></span>
        <p class="serif sbx-text"></p>
        ${svg('heart', 'sbx-heart')}
      </div>
    </div>`;
  const count = () => { $('.sbx-count', body).textContent = `${Object.keys(state.slides).length}/${S.list.length} examined`; };
  count();
  $('.sbx-row', body).addEventListener('click', e => {
    const b = e.target.closest('.gslide'); if (!b) return;
    const i = +b.dataset.i;
    $$('.gslide', body).forEach(x => x.classList.toggle('out', x === b));
    b.classList.add('seen'); state.slides[i] = true; save(); count();
    const card = $('.sbx-card', body);
    card.hidden = false;
    $('.sbx-no', body).textContent = `slide ${String(i + 1).padStart(2, '0')} — reason i love you`;
    $('.sbx-text', body).textContent = S.list[i];
    card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (Object.keys(state.slides).length === S.list.length && !state.slidesDone) {
      state.slidesDone = true; save(); confetti(80); toast('every slide examined. conclusion: i love you.');
    }
  });
};

/* --- RACE CONTROL -------------------------------------------------------- */
RENDER.race = body => {
  const R = C.race;
  body.innerHTML = `
    <div class="race">
      <div class="radio"><b class="px">TEAM RADIO · ABHI</b><div class="wave">${'<i></i>'.repeat(14)}</div><p>${R.radio}</p></div>
      <div class="gantry">${'<div class="lamp"><i></i><i></i></div>'.repeat(5)}</div>
      <button class="pad"><span class="pad-big chunk">START</span><span class="pad-sub px">${R.idle}</span></button>
      <p class="px best">${state.best ? `personal best: ${state.best} ms` : '&nbsp;'}</p>
      <h3 class="px race-h">${R.standingsTitle}</h3>
      <div class="tower">${R.standings.map((s, i) => `
        <div class="tw ${i === 0 ? 'p1' : ''} ${isNaN(+s[0]) ? 'out' : ''}">
          <b class="px pos">${s[0]}</b><i class="bar${i}"></i>
          <span class="who"><b>${s[1]}</b><small class="px">${s[2]}</small></span>
          <em class="px">${s[3]}</em></div>`).join('')}</div>
      <p class="px steward">${R.steward}</p>
    </div>`;
  const lamps = $$('.lamp', body), pad = $('.pad', body), big = $('.pad-big', body), sub = $('.pad-sub', body);
  let phase = 'idle', t0 = 0, timers = [];
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  const reset = () => { lamps.forEach(l => l.classList.remove('on')); pad.className = 'pad'; };
  pad.addEventListener('pointerdown', () => {
    if (phase === 'idle' || phase === 'done') {
      clear(); reset(); phase = 'arming'; pad.classList.add('arming');
      big.textContent = '…'; sub.textContent = R.wait;
      lamps.forEach((l, i) => timers.push(setTimeout(() => l.classList.add('on'), 650 * (i + 1))));
      timers.push(setTimeout(() => {
        lamps.forEach(l => l.classList.remove('on'));
        phase = 'go'; t0 = performance.now(); pad.classList.add('go');
        big.textContent = 'TAP!'; sub.textContent = R.go;
      }, 650 * 5 + rand(900, 2800)));
    } else if (phase === 'arming') {
      clear(); reset(); phase = 'done'; pad.classList.add('jump');
      big.textContent = 'OOPS'; sub.textContent = R.jump;
    } else if (phase === 'go') {
      const rt = Math.round(performance.now() - t0);
      phase = 'done'; pad.classList.remove('go'); pad.classList.add('fin');
      big.textContent = `${rt} ms`;
      sub.textContent = R.results.find(r => rt <= r[0])[1] + ' (tap to go again)';
      if (!state.best || rt < state.best) { state.best = rt; save(); $('.best', body).textContent = `personal best: ${rt} ms`; }
    }
  });
  return clear;
};

/* --- KITTEN CAM ---------------------------------------------------------- */
RENDER.cat = body => {
  const K = C.cat;
  body.innerHTML = `
    <div class="cat">
      <div class="tama">
        <div class="tama-top px"><i></i> KITTEN CAM · LIVE</div>
        <div class="tama-screen">
          <svg class="kitty" viewBox="0 0 200 172" aria-hidden="true">
            <path class="k-tail" d="M150 132C186 132 192 96 172 86" fill="none" stroke="#f0c48c" stroke-width="13" stroke-linecap="round"/>
            <ellipse cx="100" cy="122" rx="64" ry="43" fill="#f8d9ae"/>
            <ellipse cx="100" cy="133" rx="40" ry="27" fill="#fff6e8"/>
            <ellipse cx="78" cy="160" rx="15" ry="8" fill="#fff6e8"/><ellipse cx="122" cy="160" rx="15" ry="8" fill="#fff6e8"/>
            <g class="k-head">
              <path d="M58 54 50 12 86 36Z" fill="#f8d9ae"/><path d="M142 54 150 12 114 36Z" fill="#f8d9ae"/>
              <path d="M61 44 57 24 75 36Z" fill="#ffb3dc"/><path d="M139 44 143 24 125 36Z" fill="#ffb3dc"/>
              <ellipse cx="100" cy="64" rx="49" ry="39" fill="#f8d9ae"/>
              <circle cx="68" cy="78" r="8" fill="#ff9fd0" opacity=".55"/><circle cx="132" cy="78" r="8" fill="#ff9fd0" opacity=".55"/>
              <g class="k-eyes"><ellipse cx="81" cy="62" rx="5.5" ry="7.5" fill="#3a1028"/><ellipse cx="119" cy="62" rx="5.5" ry="7.5" fill="#3a1028"/>
                <circle cx="83" cy="59" r="2" fill="#fff"/><circle cx="121" cy="59" r="2" fill="#fff"/></g>
              <g class="k-happy" fill="none" stroke="#3a1028" stroke-width="3" stroke-linecap="round">
                <path d="M74 64q7-9 14 0"/><path d="M112 64q7-9 14 0"/></g>
              <path d="M95 73h10l-5 6z" fill="#ff5fb0"/>
              <path d="M100 79q-6 8-12 3M100 79q6 8 12 3" stroke="#3a1028" fill="none" stroke-width="2" stroke-linecap="round"/>
              <path d="M62 70 38 66M62 76 40 80M138 70 162 66M138 76 160 80" stroke="#b98a58" stroke-width="1.5" stroke-linecap="round"/>
            </g>
            <use href="#i-bow" x="84" y="94" width="32" height="24" style="color:#ff2d95"/>
          </svg>
          <div class="cat-fx"></div>
          <p class="px cat-say">mrrp?</p>
        </div>
        <div class="tama-btns">
          <button data-a="pet"><span>🤚</span><small class="px">pet</small></button>
          <button data-a="feed"><span>🐟</span><small class="px">feed</small></button>
        </div>
      </div>
      <div class="cat-card">
        <p><b class="px">name</b> ${K.name}</p>
        <p><b class="px">status</b> ${K.status}</p>
        <div class="bar"><i></i></div>
        <p><b class="px">pets</b> <span class="cat-pets">${state.pets}</span></p>
      </div>
      <div class="pol cat-pol" style="--r:3deg"><i class="washi w2"></i>${photo(K.photo, 'the real hostel cat')}<span class="hand">the real one</span></div>
    </div>`;
  const kitty = $('.kitty', body), say = $('.cat-say', body), fx = $('.cat-fx', body);
  let t;
  $('.tama-btns', body).addEventListener('pointerdown', e => {   // pointerdown: fast repeated taps all count
    const b = e.target.closest('button'); if (!b) return;
    const pet = b.dataset.a === 'pet';
    say.textContent = pick(pet ? K.pet : K.feed);
    kitty.classList.add('happy'); clearTimeout(t); t = setTimeout(() => kitty.classList.remove('happy'), 1100);
    const h = document.createElement('i'); h.textContent = pet ? '♥' : '🐟'; h.style.left = rand(25, 75) + '%'; fx.appendChild(h); setTimeout(() => h.remove(), 1000);
    if (!pet) return;
    state.pets++; save(); $('.cat-pets', body).textContent = state.pets;
    if (state.pets === K.petsNeeded) dialog({ title: '🐾 the cat has spoken', body: K.secret, cls: 'lav' });
  });
  return () => clearTimeout(t);
};

/* --- MESSAGES ------------------------------------------------------------ */
RENDER.messages = (body, alive) => {
  const M = C.messages, Q = M.request;
  body.innerHTML = `
    <div class="msg">
      <div class="msg-head">${photo('abhi.jpg', C.him, 'round', '💗')}
        <div><b class="msg-name chunk">${state.daddy ? 'Daddy 😌' : C.him}</b><span class="px"><i></i>online · thinking about you</span></div></div>
      <div class="msg-list"></div>
      <div class="msg-chips"></div>
    </div>`;
  const list = $('.msg-list', body), chips = $('.msg-chips', body);
  const add = (text, me) => {
    const p = document.createElement('p'); p.className = 'bub ' + (me ? 'me' : 'him'); p.textContent = text;
    list.appendChild(p); body.scrollTop = body.scrollHeight; return p;
  };
  const say = async text => {
    const dots = add('', false); dots.classList.add('typing'); dots.innerHTML = '<i></i><i></i><i></i>';
    await wait(Math.min(1700, 500 + text.length * 22));
    if (!alive()) return false;
    dots.remove(); add(text, false); return true;
  };
  const request = async () => {
    let tries = 0;
    const r = await dialog({
      title: Q.title, body: Q.body + `<p class="hand dodge-msg">&nbsp;</p>`, cls: 'ask',
      buttons: [
        { label: Q.yes, cls: 'primary' },
        { label: Q.no, cls: 'runner', onPress: (ev, btn, host) => {
            if (btn.dataset.tame) return true;
            tries++;
            btn.style.transform = `translate(${rand(-90, 30)}px, ${rand(-150, 40)}px) rotate(${rand(-20, 20)}deg)`;
            $('.dodge-msg', host).textContent = Q.dodge[Math.min(tries - 1, Q.dodge.length - 1)];
            if (tries >= Q.dodge.length) { btn.dataset.tame = 1; btn.textContent = Q.later; btn.style.transform = ''; }
            return false;
        } }
      ]
    });
    if (!alive()) return;
    if (r === 0) {
      state.daddy = true; save(); confetti(120);
      $('.msg-name', body).textContent = 'Daddy 😌';
      for (const t of Q.accepted) if (!await say(t)) return;
    } else {
      for (const t of Q.postponed) if (!await say(t)) return;
    }
  };
  (async () => {
    await wait(400);
    for (const t of M.thread) if (!await say(t)) return;
    chips.innerHTML = M.chips.map(c => `<button class="chip px">${c}</button>`).join('');
    chips.onclick = async e => {
      const c = e.target.closest('.chip'); if (!c) return;
      chips.innerHTML = ''; add(c.textContent, true);
      await wait(500);
      if (!await say(M.reply)) return;
      if (state.daddy) return;
      if (!await say(M.after)) return;
      await wait(500);
      if (alive()) request();
    };
  })();
};

/* --- iPod ---------------------------------------------------------------- */
RENDER.ipod = body => {
  const T = C.music.tracks;
  body.innerHTML = `
    <div class="ipod-wrap">
      ${svg('spark', 'dc ip-p1')}${svg('spark', 'dc ip-p2')}${svg('heart', 'dc ip-h')}
      <div class="ipod">
        <div class="ips">
          <div class="ips-top px"><span>iPod</span><span class="ips-state">■</span></div>
          <div class="ips-now">
            <div class="eq">${'<i></i>'.repeat(6)}</div>
            <b class="ips-title serif"></b><span class="ips-artist px"></span><span class="ips-note hand"></span>
          </div>
          <div class="ips-bar"><i></i></div>
          <ul class="ips-list px">${T.map((t, i) => `<li data-i="${i}">${i + 1}. ${t.title}</li>`).join('')}</ul>
          <a class="ips-link px" target="_blank" rel="noopener" hidden>no file — open the song ↗</a>
        </div>
        <div class="wheel">
          <button class="w-menu px" data-a="menu">MENU</button>
          <button class="w-prev" data-a="prev" aria-label="previous">◄◄</button>
          <button class="w-next" data-a="next" aria-label="next">►►</button>
          <button class="w-play" data-a="play" aria-label="play or pause">►❙❙</button>
          <button class="w-ok" data-a="play" aria-label="play"></button>
        </div>
      </div>
      <p class="hand ipod-cap">our songs. volume up.</p>
    </div>`;
  const view = music.cur < 0 ? 0 : music.cur;
  const draw = () => {
    const i = music.cur < 0 ? view : music.cur, t = T[i], playing = !audio.paused && music.cur >= 0;
    $('.ips-title', body).textContent = t.title;
    $('.ips-artist', body).textContent = t.artist;
    $('.ips-note', body).textContent = t.note || '';
    $('.ips-state', body).textContent = playing ? '▶' : '❚❚';
    $('.ipod', body).classList.toggle('playing', playing);
    $$('.ips-list li', body).forEach((li, k) => li.classList.toggle('on', k === i));
    $('.ips-bar i', body).style.width = (audio.duration ? audio.currentTime / audio.duration * 100 : 0) + '%';
    const link = $('.ips-link', body), miss = !!music.missing[i] && !!t.link;
    link.hidden = !miss; if (miss) link.href = t.link;
  };
  music.onChange = draw; draw();
  const act = a => {
    if (a === 'menu') return closeApp();
    if (a === 'next') return playTrack((music.cur < 0 ? 0 : music.cur) + 1);
    if (a === 'prev') return playTrack((music.cur < 0 ? 0 : music.cur) - 1);
    if (music.cur < 0) return playTrack(0);
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  };
  $('.wheel', body).addEventListener('click', e => { const b = e.target.closest('button'); if (b) act(b.dataset.a); });
  $('.ips-list', body).addEventListener('click', e => { const li = e.target.closest('li'); if (li) playTrack(+li.dataset.i); });
  return () => { music.onChange = null; };
};

/* --- CAKE ---------------------------------------------------------------- */
RENDER.cake = body => {
  const K = C.cake, n = C.age;
  body.innerHTML = `
    <div class="cake-app">
      <div class="disco"></div>
      ${svg('spark', 'dc ck-p1')}${svg('spark', 'dc ck-p2')}${svg('star', 'dc ck-s1')}${svg('star', 'dc ck-s2')}
      <p class="hand cake-prompt">${K.prompt}</p>
      <div class="cake">
        <div class="candles">${Array.from({ length: n }, (_, i) => `<i class="cd" style="--c:${['#fff', '#ffd3e8', '#cfa8ff', '#ffe066'][i % 4]}"><b></b></i>`).join('')}</div>
        <div class="tier t1"><span class="chunk">${n}</span></div>
        <div class="tier t2"></div>
        <div class="tier t3"></div>
        <div class="plate"></div>
      </div>
      <button class="jelly blow">${K.blowAll}</button>
      <div class="cake-done" hidden><h2 class="chunk">${K.done}</h2><p class="hand">${K.wish}</p></div>
    </div>`;
  const cake = $('.cake', body), cds = $$('.cd', body);
  let done = false;
  const check = () => {
    if (done || cds.some(c => !c.classList.contains('out'))) return;
    done = true;
    $('.cake-prompt', body).hidden = true; $('.blow', body).hidden = true; $('.cake-done', body).hidden = false;
    confetti(200); star('cake');
  };
  const blow = c => { if (c && !c.classList.contains('out')) { c.classList.add('out'); check(); } };
  const at = e => { const t = document.elementFromPoint(e.clientX, e.clientY); blow(t && t.closest('.cd')); };
  cake.addEventListener('pointerdown', at);
  cake.addEventListener('pointermove', e => { if (e.buttons || e.pointerType === 'touch') at(e); });
  $('.blow', body).onclick = () => cds.forEach((c, i) => setTimeout(() => blow(c), i * 55));
};

/* --- FOR_YOU: the letter, then the present -------------------------------- */
RENDER.letter = body => {
  const L = C.letter, P = C.present;
  const reveal = () => {
    state.opened = true; save();
    body.innerHTML = `
      <div class="reveal">
        <div class="rays"></div>
        ${svg('star', 'dc rv-s1')}${svg('star', 'dc rv-s2')}${svg('heart', 'dc rv-h1')}${svg('heart', 'dc rv-h2')}${svg('fly', 'dc rv-f1')}${svg('lily', 'dc rv-l1')}${svg('lily', 'dc rv-l2')}
        <h1 class="chunk rv-hb">${P.big[0]}</h1>
        <div class="script rv-name" data-t="${P.big[1]}">${P.big[1]}</div>
        <div class="pol rv-pol" style="--r:-3deg"><i class="washi w0"></i>${photo(P.photo, 'the two of you — the final photo')}${svg('bow', 'pol-bow')}</div>
        <p class="script rv-love">${P.love}</p>
        <p class="hand rv-ps">${P.ps}</p>
        <button class="jelly again">more glitter ✦</button>
      </div>`;
    body.scrollTop = 0;
    confetti(240);
    $('.again', body).onclick = () => confetti(200);
    if (music.cur < 0) playTrack(0);
  };
  if (params.get('demo') === 'reveal') return reveal();

  body.innerHTML = `
    <div class="letter">
      <div class="paper">
        ${svg('lily', 'lt-l1')}${svg('lily', 'lt-l2')}${svg('lily', 'lt-l3')}${svg('bow', 'lt-bow')}
        <h2 class="script lt-greet">${L.greeting}</h2>
        ${L.body.map(p => `<p class="hand">${p}</p>`).join('')}
        <p class="hand lt-sign">${L.signoff}<br><span class="script">${L.name}</span></p>
      </div>
      <div class="present">
        <p class="px pr-lead">✦ ${P.lead} ✦</p>
        <p class="hand pr-text">${P.hold}</p>
        <button class="hold" aria-label="hold my hand"><span class="hold-emo">🤝</span></button>
        <p class="px hold-msg">press and hold</p>
      </div>
    </div>`;
  const btn = $('.hold', body), msg = $('.hold-msg', body);
  const NEED = 3200;
  let t0 = 0, raf = 0;
  const stop = let_go => {
    if (!t0) return;
    t0 = 0; cancelAnimationFrame(raf);
    btn.style.setProperty('--p', 0); btn.classList.remove('on');
    if (let_go) msg.textContent = P.letGo;
  };
  const tick = () => {
    const p = Math.min(1, (performance.now() - t0) / NEED);
    btn.style.setProperty('--p', p);
    msg.textContent = P.holding[Math.min(P.holding.length - 1, Math.floor(p * P.holding.length))];
    if (p >= 1) { t0 = 0; return reveal(); }
    raf = requestAnimationFrame(tick);
  };
  btn.addEventListener('pointerdown', e => { e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch (x) {} t0 = performance.now(); btn.classList.add('on'); tick(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => btn.addEventListener(ev, () => stop(true)));
  return () => stop(false);
};

/* ------------------------------------------------------------------ start */
window.__vidu = { openApp, closeApp, star, confetti, state };

if (params.has('skip')) {
  home();
  if (params.get('app')) openApp(params.get('app'));
} else if (params.get('screen') === 'call') call();
else if (params.get('screen') === 'wall') wall();
else boot();

/* test hook: ?auto=.selector|.selector  clicks each in turn */
if (params.get('auto')) {
  (async () => {
    for (const sel of params.get('auto').split('|')) {
      await wait(350);
      const t = $(sel);
      if (t) t.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  })();
}
})();
