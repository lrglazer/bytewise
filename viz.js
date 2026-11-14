/* Bytewise — interactive visualizers. Each mount(box, opts) returns an optional cleanup. */
'use strict';
const sv = (w, h, inner, cls = '') => `<svg class="vsvg ${cls}" viewBox="0 0 ${w} ${h}" role="img">${inner}</svg>`;
const NODE = (x, y, t, cls = '', r = 18) => `<g class="nd ${cls}"><circle cx="${x}" cy="${y}" r="${r}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle">${t}</text></g>`;
const VCSS = `<style>.vsvg .nd circle{fill:var(--panel2);stroke:var(--acc2);stroke-width:2;transition:all .3s}.vsvg .nd.hot circle{fill:var(--acc);stroke:var(--acc)}.vsvg .nd.hot text{fill:#04110a;font-weight:700}.vsvg .nd.seen circle{stroke:var(--acc);fill:color-mix(in srgb,var(--acc) 22%,var(--panel2))}.vsvg .nd.q circle{stroke:var(--warn);stroke-dasharray:4 3}.vsvg .ed{stroke:var(--line);stroke-width:2.2}.vsvg .ed.hot{stroke:var(--acc);stroke-width:3.5}.vsvg .bar{transition:all .25s}.vsvg .w{font-size:11px;fill:var(--warn)}</style>`;
let timers = [];
const auto = (fn, ms) => { const id = setInterval(fn, ms); timers.push(id); return () => clearInterval(id); };

/* 1. Code tracer ------------------------------------------------------------------- */
const PROGS = {
  'nested loops': { src: ['int total = 0;', 'for (int i = 1; i <= 3; i++) {', '  for (int j = 0; j < i; j++) {', '    total += i * j;', '  }', '}', 'System.out.println(total);'],
    *run() { let total = 0; yield [0, { total }]; for (let i = 1; i <= 3; i++) { yield [1, { total, i }]; for (let j = 0; j < i; j++) { yield [2, { total, i, j }]; total += i * j; yield [3, { total, i, j }]; } } yield [6, { total }, String(total)]; } },
  'while + modulo': { src: ['int n = 1234, sum = 0;', 'while (n > 0) {', '  sum += n % 10;', '  n /= 10;', '}', 'System.out.println(sum);'],
    *run() { let n = 1234, sum = 0; yield [0, { n, sum }]; while (n > 0) { yield [1, { n, sum }]; sum += n % 10; yield [2, { n, sum }]; n = Math.floor(n / 10); yield [3, { n, sum }]; } yield [1, { n, sum }]; yield [5, { n, sum }, String(sum)]; } },
  'recursion (factorial)': { src: ['int fact(int n) {', '  if (n <= 1) return 1;', '  return n * fact(n - 1);', '}', 'System.out.println(fact(4));'],
    *run() { const st = []; function* f(n) { st.push(`fact(${n})`); yield [0, { n, stack: st.join(' → ') }]; yield [1, { n, stack: st.join(' → ') }]; if (n <= 1) { st.pop(); return 1; } const r = yield* f(n - 1); yield [2, { n, 'fact(n-1)': r, returns: n * r, stack: st.join(' → ') }]; st.pop(); return n * r; } const v = yield* f(4); yield [4, { result: v }, String(v)]; } },
  'array swap (reverse)': { src: ['int[] a = {3, 8, 1, 9, 4};', 'int lo = 0, hi = a.length - 1;', 'while (lo < hi) {', '  int t = a[lo]; a[lo] = a[hi]; a[hi] = t;', '  lo++; hi--;', '}'],
    *run() { const a = [3, 8, 1, 9, 4]; yield [0, { a: `{${a}}` }]; let lo = 0, hi = 4; yield [1, { a: `{${a}}`, lo, hi }]; while (lo < hi) { yield [2, { a: `{${a}}`, lo, hi }]; [a[lo], a[hi]] = [a[hi], a[lo]]; yield [3, { a: `{${a}}`, lo, hi }]; lo++; hi--; yield [4, { a: `{${a}}`, lo, hi }]; } yield [5, { a: `{${a}}` }, `{${a}}`]; } },
  'pointers (C++)': { src: ['int x = 5;', 'int* p = &x;', '*p = *p + 3;', 'int& r = x;', 'r *= 2;', 'cout << x << " " << *p;'],
    *run() { let x = 5; yield [0, { x, '&x': '0x7ff0' }]; yield [1, { x, p: '0x7ff0 → x' }]; x += 3; yield [2, { x, p: '0x7ff0 → x', '*p': x }]; yield [3, { x, r: 'alias of x' }]; x *= 2; yield [4, { x, r: x, '*p': x }]; yield [5, { x }, `${x} ${x}`]; } },
};
VIZ.push({ id: 'tracer', icon: '⏯', title: 'Line-by-line code tracer', color: '#7CFFB2', blurb: 'Step through real code one line at a time and watch every variable change. This is the skill exams test.',
  mount(box, o = {}) {
    let name = o.prog || Object.keys(PROGS)[0], it, steps = [], k = -1;
    box.innerHTML = VCSS + `<div class="vctl"><select id="tp">${Object.keys(PROGS).map(p => `<option ${p === name ? 'selected' : ''}>${p}</option>`).join('')}</select><button class="btn sm" id="tb">⏮ reset</button><button class="btn sm pri" id="tn">step ▶</button><button class="btn sm" id="tr">run all ⏩</button></div><div class="two"><div class="codeview" id="tc"></div><div><div class="pg">variables</div><div class="vars" id="tv"></div><div class="pg">console</div><div class="out" id="to"></div></div></div>`;
    const load = () => { const P = PROGS[name]; steps = [...P.run()]; k = -1; draw(); };
    let prev = {}; const draw = () => { const P = PROGS[name], s = steps[k] || [-1, {}];
      $('#tc', box).innerHTML = P.src.map((l, i) => `<div class="${i === s[0] ? 'cur' : ''}"><span class="ln">${i + 1}</span>${hl(l)}</div>`).join('');
      $('#tv', box).innerHTML = Object.entries(s[1]).map(([a, b]) => `<span class="${prev[a] !== b ? 'chg' : ''}">${a} = <b>${esc(b)}</b></span>`).join('') || '<span>—</span>'; prev = { ...s[1] };
      $('#to', box).textContent = steps.slice(0, k + 1).filter(x => x[2] != null).map(x => x[2]).join('\n'); $('#tn', box).disabled = k >= steps.length - 1; };
    $('#tp', box).onchange = e => { name = e.target.value; load(); }; $('#tb', box).onclick = load; $('#tn', box).onclick = () => { k++; draw(); };
    $('#tr', box).onclick = () => { const stop = auto(() => { if (k >= steps.length - 1) return stop(); k++; draw(); }, 380); };
    load(); return () => timers.forEach(clearInterval);
  } });

/* 2. Sorting ----------------------------------------------------------------------- */
function* sortSteps(alg, a) {
  a = a.slice(); const n = a.length; let cmp = 0, sw = 0; const S = (hl = [], done = []) => ({ a: a.slice(), hl, done, cmp, sw });
  if (alg === 'bubble') { for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - 1 - i; j++) { cmp++; yield S([j, j + 1]); if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; sw++; yield S([j, j + 1]); } } } }
  if (alg === 'selection') { for (let i = 0; i < n - 1; i++) { let m = i; for (let j = i + 1; j < n; j++) { cmp++; yield S([m, j]); if (a[j] < a[m]) m = j; } if (m !== i) { [a[i], a[m]] = [a[m], a[i]]; sw++; } yield S([i]); } }
  if (alg === 'insertion') { for (let i = 1; i < n; i++) { let j = i; while (j > 0) { cmp++; yield S([j - 1, j]); if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; sw++; j--; } else break; } } }
  if (alg === 'merge') { const tmp = []; function* ms(lo, hi) { if (hi - lo < 1) return; const mid = (lo + hi) >> 1; yield* ms(lo, mid); yield* ms(mid + 1, hi); let i = lo, j = mid + 1, k = 0; while (i <= mid && j <= hi) { cmp++; yield S([i, j]); tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++]; } while (i <= mid) tmp[k++] = a[i++]; while (j <= hi) tmp[k++] = a[j++]; for (let t = 0; t < k; t++) { a[lo + t] = tmp[t]; sw++; } yield S(range(lo, hi + 1)); } yield* ms(0, n - 1); }
  if (alg === 'quick') { function* qs(lo, hi) { if (lo >= hi) return; const p = a[hi]; let i = lo; for (let j = lo; j < hi; j++) { cmp++; yield S([j, hi]); if (a[j] < p) { [a[i], a[j]] = [a[j], a[i]]; sw++; i++; } } [a[i], a[hi]] = [a[hi], a[i]]; sw++; yield S([i]); yield* qs(lo, i - 1); yield* qs(i + 1, hi); } yield* qs(0, n - 1); }
  if (alg === 'heap') { const sift = function* (i, m) { for (; ;) { let l = 2 * i + 1, r = l + 1, b = i; if (l < m) { cmp++; if (a[l] > a[b]) b = l; } if (r < m) { cmp++; if (a[r] > a[b]) b = r; } yield S([i, b]); if (b === i) return; [a[i], a[b]] = [a[b], a[i]]; sw++; i = b; } }; for (let i = (n >> 1) - 1; i >= 0; i--) yield* sift(i, n); for (let e = n - 1; e > 0; e--) { [a[0], a[e]] = [a[e], a[0]]; sw++; yield S([0, e]); yield* sift(0, e); } }
  yield S([], range(0, n));
}
const range = (a, b) => [...Array(b - a)].map((_, i) => a + i);
VIZ.push({ id: 'sorting', icon: '📊', title: 'Sorting algorithm race', color: '#FF9F5A', blurb: 'Watch bubble, selection, insertion, merge, quick and heap sort side by side and count their comparisons.',
  mount(box) {
    const ALG = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap']; let n = 24, data = [], runs = [], stop = null;
    box.innerHTML = VCSS + `<div class="vctl"><label>n <input type="range" id="sn" min="8" max="60" value="24"></label><select id="si"><option>random</option><option>nearly sorted</option><option>reversed</option><option>few unique</option></select><button class="btn sm" id="sr">new data</button><button class="btn sm pri" id="sg">▶ race</button></div><div id="sv" class="sortgrid"></div>`;
    const css = document.createElement('style'); css.textContent = '.sortgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}.sortgrid .sc{border:1px solid var(--line);border-radius:10px;padding:8px;background:var(--panel)}.sortgrid .sc b{font:600 13px var(--mono)}.sortgrid .sc small{float:right;font:11px var(--mono);color:var(--muted)}'; box.appendChild(css);
    const gen = () => { const kind = $('#si', box).value; data = range(0, n).map(i => i + 1); if (kind === 'random') data = R.shuffle(data); if (kind === 'reversed') data.reverse(); if (kind === 'nearly sorted') for (let k = 0; k < n / 10; k++) { const i = R.int(0, n - 2); [data[i], data[i + 1]] = [data[i + 1], data[i]]; } if (kind === 'few unique') data = data.map(() => R.int(1, 4) * n / 4); runs = ALG.map(a => ({ a, it: sortSteps(a, data), s: { a: data, hl: [], done: [], cmp: 0, sw: 0 }, fin: false })); draw(); };
    const draw = () => { $('#sv', box).innerHTML = runs.map(r => { const w = 240 / n, mx = Math.max(...data); return `<div class="sc"><b>${r.a} sort</b><small>${r.s.cmp} cmp · ${r.s.sw} moves${r.fin ? ' ✓' : ''}</small>${sv(240, 110, r.s.a.map((v, i) => `<rect class="bar" x="${i * w + .5}" y="${110 - v / mx * 104}" width="${w - 1}" height="${v / mx * 104}" fill="${r.s.done.includes(i) || r.fin ? 'var(--acc)' : r.s.hl.includes(i) ? 'var(--pink)' : 'var(--acc2)'}"/>`).join(''))}</div>`; }).join(''); };
    $('#sn', box).oninput = e => { n = +e.target.value; gen(); }; $('#si', box).onchange = gen; $('#sr', box).onclick = gen;
    $('#sg', box).onclick = () => { stop && stop(); runs = ALG.map(a => ({ a, it: sortSteps(a, data), s: { a: data, hl: [], done: [], cmp: 0, sw: 0 }, fin: false })); stop = auto(() => { let live = 0; runs.forEach(r => { if (r.fin) return; const x = r.it.next(); if (x.done) r.fin = true; else { r.s = x.value; live++; } }); draw(); if (!live) stop(); }, 40); };
    gen(); return () => timers.forEach(clearInterval);
  } });

/* 3. Binary search tree ----------------------------------------------------------- */
function bstInsert(t, v) { if (!t) return { v, l: null, r: null }; if (v < t.v) t.l = bstInsert(t.l, v); else if (v > t.v) t.r = bstInsert(t.r, v); return t; }
function bstDelete(t, v) { if (!t) return null; if (v < t.v) t.l = bstDelete(t.l, v); else if (v > t.v) t.r = bstDelete(t.r, v); else { if (!t.l) return t.r; if (!t.r) return t.l; let s = t.r; while (s.l) s = s.l; t.v = s.v; t.r = bstDelete(t.r, s.v); } return t; }
const order = (t, k, out = []) => { if (!t) return out; if (k === 'pre') out.push(t.v); order(t.l, k, out); if (k === 'in') out.push(t.v); order(t.r, k, out); if (k === 'post') out.push(t.v); return out; };
const levelOrder = t => { const out = [], q = t ? [t] : []; while (q.length) { const n = q.shift(); out.push(n.v); n.l && q.push(n.l); n.r && q.push(n.r); } return out; };
const height = t => t ? 1 + Math.max(height(t.l), height(t.r)) : 0;
function treeSVG(t, hot = [], W = 640) { const pos = []; let i = 0; (function lay(n, d) { if (!n) return; lay(n.l, d + 1); pos.push({ n, x: 0, d, i: i++ }); lay(n.r, d + 1); })(t, 0);
  const N = pos.length || 1, H = Math.max(1, height(t)); pos.forEach(p => p.x = 30 + p.i * (W - 60) / Math.max(1, N - 1)); const P = new Map(pos.map(p => [p.n, p])); let e = '', nd = '';
  pos.forEach(p => { [p.n.l, p.n.r].forEach(c => { if (c) { const q = P.get(c); e += `<line class="ed ${hot.includes(c.v) && hot.includes(p.n.v) ? 'hot' : ''}" x1="${p.x}" y1="${30 + p.d * 60}" x2="${q.x}" y2="${30 + q.d * 60}"/>`; } }); nd += NODE(p.x, 30 + p.d * 60, p.n.v, hot.includes(p.n.v) ? 'hot' : ''); });
  return sv(W, 40 + H * 60, e + nd); }
VIZ.push({ id: 'bst', icon: '🌳', title: 'Binary search tree', color: '#5CC8FF', blurb: 'Insert, delete and search, then watch the four traversals walk the tree.',
  mount(box) {
    let t = null; [50, 30, 70, 20, 40, 60, 80, 35].forEach(v => t = bstInsert(t, v)); let hot = [];
    box.innerHTML = VCSS + `<div class="vctl"><input type="number" id="bv" value="45" style="width:80px"><button class="btn sm pri" id="bi">insert</button><button class="btn sm" id="bd">delete</button><button class="btn sm" id="bs">search</button><button class="btn sm" id="bx">random tree</button>|${['pre', 'in', 'post', 'level'].map(k => `<button class="chip" data-o="${k}">${k}order</button>`).join('')}</div><div id="bt"></div><div class="vmsg" id="bm"></div>`;
    const draw = () => { $('#bt', box).innerHTML = treeSVG(t, hot); };
    const path = v => { const p = []; let n = t; while (n) { p.push(n.v); if (v === n.v) break; n = v < n.v ? n.l : n.r; } return p; };
    const val = () => +$('#bv', box).value;
    $('#bi', box).onclick = () => { t = bstInsert(t, val()); hot = path(val()); draw(); $('#bm', box).textContent = `inserted ${val()}: compared against ${hot.slice(0, -1).join(' → ') || 'nothing (new root)'}. height = ${height(t)}`; };
    $('#bd', box).onclick = () => { const had = path(val()).includes(val()); t = bstDelete(t, val()); hot = []; draw(); $('#bm', box).textContent = had ? `deleted ${val()} (two children → replaced by its inorder successor)` : `${val()} isn't in the tree`; };
    $('#bs', box).onclick = () => { hot = path(val()); draw(); $('#bm', box).textContent = hot.includes(val()) ? `found ${val()} in ${hot.length} comparisons` : `not found after ${hot.length} comparisons`; };
    $('#bx', box).onclick = () => { t = null; R.sample(range(1, 99), 10).forEach(v => t = bstInsert(t, v)); hot = []; draw(); };
    $$('[data-o]', box).forEach(b => b.onclick = () => { const seq = b.dataset.o === 'level' ? levelOrder(t) : order(t, b.dataset.o); let k = 0; hot = []; const stop = auto(() => { if (k >= seq.length) return stop(); hot = seq.slice(0, ++k); draw(); $('#bm', box).textContent = `${b.dataset.o}order: ${seq.slice(0, k).join(' ')}`; }, 420); });
    draw(); return () => timers.forEach(clearInterval);
  } });

/* 4. Heap ------------------------------------------------------------------------- */
VIZ.push({ id: 'heap', icon: '⛰️', title: 'Binary heap (priority queue)', color: '#FF9F5A', blurb: 'A min-heap stored in an array. Insert sifts up, extract-min sifts down. Watch both views at once.',
  mount(box) {
    let h = [3, 8, 5, 12, 10, 9, 7], hot = [];
    box.innerHTML = VCSS + `<div class="vctl"><input type="number" id="hv" value="4" style="width:70px"><button class="btn sm pri" id="hi">insert</button><button class="btn sm" id="he">extract-min</button><button class="btn sm" id="hb">build from random array</button></div><div id="ht"></div><div id="ha"></div><div class="vmsg" id="hm"></div>`;
    const draw = () => { let e = '', nd = ''; const W = 640, pos = i => { const d = Math.floor(Math.log2(i + 1)), k = i - (2 ** d - 1), cnt = 2 ** d; return [(k + .5) * W / cnt, 30 + d * 58]; };
      h.forEach((v, i) => { if (i) { const [x1, y1] = pos(i), [x2, y2] = pos((i - 1) >> 1); e += `<line class="ed ${hot.includes(i) && hot.includes((i - 1) >> 1) ? 'hot' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; } const [x, y] = pos(i); nd += NODE(x, y, v, hot.includes(i) ? 'hot' : ''); });
      $('#ht', box).innerHTML = sv(W, 40 + Math.max(1, Math.ceil(Math.log2(h.length + 1))) * 58, e + nd);
      $('#ha', box).innerHTML = sv(640, 56, h.map((v, i) => `<rect x="${i * 40 + 4}" y="6" width="36" height="30" rx="5" fill="${hot.includes(i) ? 'var(--acc)' : 'var(--panel2)'}" stroke="var(--line)"/><text x="${i * 40 + 22}" y="26" text-anchor="middle" style="fill:${hot.includes(i) ? '#000' : 'var(--ink)'}">${v}</text><text class="lbl" x="${i * 40 + 22}" y="52" text-anchor="middle">${i}</text>`).join('')); };
    const anim = (seq, msg) => { let k = 0; const stop = auto(() => { if (k >= seq.length) { hot = []; draw(); $('#hm', box).textContent = msg; return stop(); } const s = seq[k++]; h = s.h; hot = s.hot; draw(); $('#hm', box).textContent = s.m; }, 600); };
    $('#hi', box).onclick = () => { const v = +$('#hv', box).value, a = [...h, v], seq = []; let i = a.length - 1; seq.push({ h: a.slice(), hot: [i], m: `put ${v} at index ${i} (next open spot)` }); while (i > 0 && a[(i - 1) >> 1] > a[i]) { const p = (i - 1) >> 1; seq.push({ h: a.slice(), hot: [i, p], m: `${a[i]} < parent ${a[p]} → swap` }); [a[i], a[p]] = [a[p], a[i]]; i = p; seq.push({ h: a.slice(), hot: [i], m: 'sift up' }); } anim(seq, `inserted ${v}. parent of i is ⌊(i−1)/2⌋`); };
    $('#he', box).onclick = () => { if (!h.length) return; const a = h.slice(), mn = a[0], seq = [{ h: a.slice(), hot: [0], m: `min is the root: ${mn}` }]; a[0] = a[a.length - 1]; a.pop(); seq.push({ h: a.slice(), hot: [0], m: 'move the last leaf to the root' }); let i = 0; for (; ;) { const l = 2 * i + 1, r = l + 1; let s = i; if (l < a.length && a[l] < a[s]) s = l; if (r < a.length && a[r] < a[s]) s = r; if (s === i) break; seq.push({ h: a.slice(), hot: [i, s], m: `smaller child ${a[s]} < ${a[i]} → swap` }); [a[i], a[s]] = [a[s], a[i]]; i = s; } anim(seq, `extracted ${mn}. children of i are 2i+1 and 2i+2`); };
    $('#hb', box).onclick = () => { const a = R.sample(range(1, 60), 10); for (let i = (a.length >> 1) - 1; i >= 0; i--) { let j = i; for (; ;) { const l = 2 * j + 1, r = l + 1; let s = j; if (l < a.length && a[l] < a[s]) s = l; if (r < a.length && a[r] < a[s]) s = r; if (s === j) break; [a[j], a[s]] = [a[s], a[j]]; j = s; } } h = a; hot = []; draw(); $('#hm', box).textContent = 'buildHeap: sift down from the last parent to the root. O(n) total.'; };
    draw(); return () => timers.forEach(clearInterval);
  } });

/* 5. Graph search ----------------------------------------------------------------- */
const GRAPH = { nodes: { A: [80, 60], B: [220, 40], C: [200, 160], D: [360, 90], E: [340, 220], F: [500, 60], G: [520, 200], H: [640, 130] },
  edges: [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'E', 8], ['C', 'D', 8], ['D', 'E', 2], ['D', 'F', 6], ['E', 'G', 3], ['F', 'G', 1], ['F', 'H', 4], ['G', 'H', 7]] };
const adj = (g, directed = false) => { const a = {}; Object.keys(g.nodes).forEach(n => a[n] = []); g.edges.forEach(([u, v, w]) => { a[u].push([v, w]); if (!directed) a[v].push([u, w]); }); Object.values(a).forEach(l => l.sort((x, y) => x[0] < y[0] ? -1 : 1)); return a; };
function* graphSteps(alg, g, s) {
  const A = adj(g), seen = new Set(), order = [], tree = [];
  if (alg === 'BFS') { const q = [s]; seen.add(s); while (q.length) { const u = q.shift(); order.push(u); yield { cur: u, seen: [...seen], q: [...q], order: [...order], tree: [...tree], m: `dequeue ${u}; queue: [${q}]` }; for (const [v] of A[u]) if (!seen.has(v)) { seen.add(v); q.push(v); tree.push(u + v); yield { cur: u, seen: [...seen], q: [...q], order: [...order], tree: [...tree], m: `discover ${v} from ${u}; enqueue → [${q}]` }; } } }
  if (alg === 'DFS') { const st = []; function* d(u) { seen.add(u); order.push(u); st.push(u); yield { cur: u, seen: [...seen], q: [...st], order: [...order], tree: [...tree], m: `visit ${u}; stack: [${st}]` }; for (const [v] of A[u]) if (!seen.has(v)) { tree.push(u + v); yield* d(v); } st.pop(); yield { cur: st[st.length - 1], seen: [...seen], q: [...st], order: [...order], tree: [...tree], m: `${u} finished, backtrack` }; } yield* d(s); }
  if (alg === 'Dijkstra') { const dist = {}, prev = {}; Object.keys(g.nodes).forEach(n => dist[n] = Infinity); dist[s] = 0; const done = new Set(); while (done.size < Object.keys(dist).length) { let u = null; for (const n in dist) if (!done.has(n) && (u === null || dist[n] < dist[u])) u = n; if (dist[u] === Infinity) break; done.add(u); order.push(u); if (prev[u]) tree.push(prev[u] + u);
      yield { cur: u, seen: [...done], q: [], order: [...order], tree: [...tree], dist: { ...dist }, m: `extract ${u} (dist ${dist[u]})` }; for (const [v, w] of A[u]) if (!done.has(v) && dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prev[v] = u; yield { cur: u, seen: [...done], q: [v], order: [...order], tree: [...tree], dist: { ...dist }, m: `relax ${u}→${v}: dist[${v}] = ${dist[v]}` }; } } }
  if (alg === 'Prim') { const inT = new Set([s]); order.push(s); let tot = 0; yield { cur: s, seen: [s], q: [], order: [...order], tree: [], m: `start MST at ${s}` }; while (inT.size < Object.keys(g.nodes).length) { let best = null; g.edges.forEach(([u, v, w]) => { if (inT.has(u) !== inT.has(v) && (!best || w < best[2])) best = [u, v, w]; }); if (!best) break; const nv = inT.has(best[0]) ? best[1] : best[0]; inT.add(nv); order.push(nv); tree.push(best[0] + best[1]); tot += best[2]; yield { cur: nv, seen: [...inT], q: [], order: [...order], tree: [...tree], m: `cheapest crossing edge ${best[0]}–${best[1]} (${best[2]}); MST weight ${tot}` }; } }
}
VIZ.push({ id: 'graph', icon: '🕸️', title: 'Graph search: BFS, DFS, Dijkstra, Prim', color: '#FF8AD8', blurb: 'Pick an algorithm and a start node, then step through it. Ties break alphabetically, like most exam answer keys.',
  mount(box, o = {}) {
    let alg = o.alg || 'BFS', s = 'A', it, st = null;
    box.innerHTML = VCSS + `<div class="vctl">${['BFS', 'DFS', 'Dijkstra', 'Prim'].map(a => `<button class="chip ${a === alg ? 'on' : ''}" data-a="${a}">${a}</button>`).join('')}<label>start <select id="gs">${Object.keys(GRAPH.nodes).map(n => `<option>${n}</option>`).join('')}</select></label><button class="btn sm" id="gr">reset</button><button class="btn sm pri" id="gn">step ▶</button><button class="btn sm" id="ga">auto ⏩</button></div><div id="gv"></div><div class="vmsg" id="gm"></div><div class="vars" id="go"></div>`;
    const draw = (x = {}) => { let e = ''; GRAPH.edges.forEach(([u, v, w]) => { const [x1, y1] = GRAPH.nodes[u], [x2, y2] = GRAPH.nodes[v], hot = (x.tree || []).some(t => t === u + v || t === v + u); e += `<line class="ed ${hot ? 'hot' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>${alg === 'Dijkstra' || alg === 'Prim' ? `<text class="w" x="${(x1 + x2) / 2 + 6}" y="${(y1 + y2) / 2 - 4}">${w}</text>` : ''}`; });
      const nd = Object.entries(GRAPH.nodes).map(([n, [px, py]]) => NODE(px, py, n, n === x.cur ? 'hot' : (x.seen || []).includes(n) ? 'seen' : (x.q || []).includes(n) ? 'q' : '') + (x.dist ? `<text class="lbl" x="${px}" y="${py + 34}" text-anchor="middle">${x.dist[n] === Infinity ? '∞' : x.dist[n]}</text>` : '')).join('');
      $('#gv', box).innerHTML = sv(720, 260, e + nd); $('#gm', box).textContent = x.m || 'press step'; $('#go', box).innerHTML = x.order ? `<span>order: <b>${x.order.join(' ')}</b></span>` : ''; };
    const reset = () => { st && st(); it = graphSteps(alg, GRAPH, s); draw(); };
    $$('[data-a]', box).forEach(b => b.onclick = () => { $$('[data-a]', box).forEach(x => x.classList.toggle('on', x === b)); alg = b.dataset.a; reset(); });
    $('#gs', box).onchange = e => { s = e.target.value; reset(); }; $('#gr', box).onclick = reset;
    const step = () => { const x = it.next(); if (x.done) { $('#gm', box).textContent += '  ✓ done'; return false; } draw(x.value); return true; };
    $('#gn', box).onclick = step; $('#ga', box).onclick = () => { st && st(); st = auto(() => { if (!step()) st(); }, 650); };
    reset(); return () => timers.forEach(clearInterval);
  } });

/* 6. Hash table ------------------------------------------------------------------- */
VIZ.push({ id: 'hash', icon: '#️⃣', title: 'Hash tables & collisions', color: '#FF9F5A', blurb: 'h(k) = k mod m. Compare linear probing, quadratic probing and separate chaining as the table fills.',
  mount(box) {
    let m = 11, mode = 'linear', T = [], keys = [];
    box.innerHTML = VCSS + `<div class="vctl">${['linear', 'quadratic', 'chaining'].map(k => `<button class="chip ${k === mode ? 'on' : ''}" data-m="${k}">${k}</button>`).join('')}<label>m <select id="hm2"><option>7</option><option selected>11</option><option>13</option></select></label><input type="number" id="hk" value="23" style="width:80px"><button class="btn sm pri" id="hi">insert</button><button class="btn sm" id="hr">insert 5 random</button><button class="btn sm" id="hc">clear</button></div><div id="hv"></div><div class="vmsg" id="hmsg"></div>`;
    const draw = (hot = -1, probes = []) => { const lf = (keys.length / m).toFixed(2);
      $('#hv', box).innerHTML = sv(700, mode === 'chaining' ? 60 + Math.max(1, ...T.map(c => (c || []).length)) * 34 : 70, T.map((c, i) => { const x = 8 + i * (684 / m), w = 684 / m - 6; let s = `<rect x="${x}" y="8" width="${w}" height="34" rx="6" fill="${i === hot ? 'var(--acc)' : probes.includes(i) ? 'color-mix(in srgb,var(--bad) 40%,var(--panel2))' : 'var(--panel2)'}" stroke="var(--line)"/><text class="lbl" x="${x + w / 2}" y="60" text-anchor="middle">${mode === 'chaining' ? '' : i}</text>`;
        if (mode === 'chaining') { s += `<text class="lbl" x="${x + w / 2}" y="29" text-anchor="middle">${i}</text>`; (c || []).forEach((k, j) => s += `<rect x="${x + 4}" y="${50 + j * 34}" width="${w - 8}" height="26" rx="5" fill="var(--panel)" stroke="var(--acc2)"/><text x="${x + w / 2}" y="${68 + j * 34}" text-anchor="middle">${k}</text>`); }
        else if (c != null) s += `<text x="${x + w / 2}" y="30" text-anchor="middle" style="${i === hot ? 'fill:#000;font-weight:700' : ''}">${c}</text>`; return s; }).join('')) + `<div class="vars"><span>keys = <b>${keys.length}</b></span><span>load factor λ = n/m = <b>${lf}</b></span></div>`; };
    const clear = () => { m = +$('#hm2', box).value; T = Array(m).fill(null).map(() => mode === 'chaining' ? [] : null); keys = []; draw(); };
    const ins = k => { const h = ((k % m) + m) % m; if (mode === 'chaining') { T[h].push(k); keys.push(k); draw(h); return `h(${k}) = ${k} mod ${m} = ${h} → append to chain ${h}`; }
      const probes = []; for (let i = 0; i < m; i++) { const p = (h + (mode === 'linear' ? i : i * i)) % m; if (T[p] == null) { T[p] = k; keys.push(k); draw(p, probes); return `h(${k}) = ${h}${probes.length ? `; collided at ${probes.join(', ')}` : ''} → slot ${p} (${probes.length + 1} probe${probes.length ? 's' : ''})`; } probes.push(p); } draw(-1, probes); return `no free slot reached: ${mode === 'quadratic' ? 'quadratic probing can miss slots when λ > ½' : 'table full'}`; };
    $$('[data-m]', box).forEach(b => b.onclick = () => { $$('[data-m]', box).forEach(x => x.classList.toggle('on', x === b)); mode = b.dataset.m; clear(); });
    $('#hm2', box).onchange = clear; $('#hc', box).onclick = clear; $('#hi', box).onclick = () => $('#hmsg', box).textContent = ins(+$('#hk', box).value);
    $('#hr', box).onclick = () => { let msg = ''; for (let i = 0; i < 5; i++) msg = ins(R.int(1, 99)); $('#hmsg', box).textContent = msg; };
    clear(); [22, 33, 44].forEach(k => ins(k)); draw(); $('#hmsg', box).textContent = '22, 33 and 44 all hash to 0 when m = 11: watch them probe.'; return () => { };
  } });

/* 7. Stack / queue / linked list -------------------------------------------------- */
VIZ.push({ id: 'lists', icon: '🔗', title: 'Stacks, queues & linked lists', color: '#5CC8FF', blurb: 'Push, pop, enqueue and dequeue, and insert or remove nodes from a singly linked list by rewiring pointers.',
  mount(box) {
    let mode = 'stack', S2 = [4, 9, 2], Q = [5, 1, 7], L = [3, 6, 8];
    box.innerHTML = VCSS + `<div class="vctl">${['stack', 'queue', 'linked list'].map(k => `<button class="chip ${k === mode ? 'on' : ''}" data-m="${k}">${k}</button>`).join('')}<input type="number" id="lv" value="5" style="width:70px"><span id="lb"></span></div><div id="lvw"></div><div class="vmsg" id="lm"></div>`;
    const btns = () => { $('#lb', box).innerHTML = mode === 'stack' ? '<button class="btn sm pri" data-o="push">push</button><button class="btn sm" data-o="pop">pop</button><button class="btn sm" data-o="peek">peek</button>' : mode === 'queue' ? '<button class="btn sm pri" data-o="enq">enqueue</button><button class="btn sm" data-o="deq">dequeue</button>' : '<button class="btn sm pri" data-o="head">insert at head</button><button class="btn sm" data-o="tail">insert at tail</button><label>after index <input type="number" id="li" value="0" style="width:50px"></label><button class="btn sm" data-o="after">insert after</button><button class="btn sm" data-o="del">delete value</button><button class="btn sm" data-o="rev">reverse</button>';
      $$('[data-o]', box).forEach(b => b.onclick = () => op(b.dataset.o)); };
    const draw = (hot = -1) => { let s = '';
      if (mode === 'stack') { S2.forEach((v, i) => s += `<rect x="260" y="${200 - i * 34}" width="120" height="30" rx="6" fill="${i === S2.length - 1 ? 'var(--acc)' : 'var(--panel2)'}" stroke="var(--line)"/><text x="320" y="${220 - i * 34}" text-anchor="middle" style="${i === S2.length - 1 ? 'fill:#000' : ''}">${v}</text>`); s += `<text class="lbl" x="400" y="${220 - (S2.length - 1) * 34}">← top</text><path d="M250 ${235}h140" stroke="var(--muted)"/>`; $('#lvw', box).innerHTML = sv(640, 250, s); return; }
      const arr = mode === 'queue' ? Q : L; arr.forEach((v, i) => { const x = 30 + i * 100; s += `<rect x="${x}" y="40" width="${mode === 'queue' ? 70 : 52}" height="40" rx="7" fill="${i === hot ? 'var(--acc)' : 'var(--panel2)'}" stroke="var(--acc2)"/><text x="${x + (mode === 'queue' ? 35 : 26)}" y="65" text-anchor="middle">${v}</text>`; if (mode !== 'queue') s += `<rect x="${x + 52}" y="40" width="20" height="40" rx="4" fill="var(--panel)" stroke="var(--acc2)"/><circle cx="${x + 62}" cy="60" r="3" fill="var(--acc2)"/><path d="M${x + 64} 60H${x + 98}" stroke="var(--acc2)" stroke-width="2" marker-end="url(#ar)"/>`; });
      if (mode === 'queue') s += arr.length ? `<text class="lbl" x="30" y="30">front (dequeue)</text><text class="lbl" x="${30 + (arr.length - 1) * 100}" y="104">back (enqueue)</text>` : ''; else s += `<text class="lbl" x="30" y="30">head</text><text x="${30 + arr.length * 100}" y="65" class="lbl">null</text>`;
      $('#lvw', box).innerHTML = sv(Math.max(640, 60 + arr.length * 100), 120, `<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--acc2)"/></marker></defs>` + s); };
    const msg = t => $('#lm', box).textContent = t, val = () => +$('#lv', box).value;
    const op = o => { if (o === 'push') { S2.push(val()); msg(`push(${val()}): O(1), goes on top`); } if (o === 'pop') msg(S2.length ? `pop() → ${S2.pop()} (LIFO)` : 'stack underflow!'); if (o === 'peek') msg(S2.length ? `peek() → ${S2[S2.length - 1]} (not removed)` : 'empty');
      if (o === 'enq') { Q.push(val()); msg(`enqueue(${val()}) at the back: O(1)`); } if (o === 'deq') msg(Q.length ? `dequeue() → ${Q.shift()} (FIFO)` : 'queue empty');
      if (o === 'head') { L.unshift(val()); msg('newNode.next = head; head = newNode → O(1)'); } if (o === 'tail') { L.push(val()); msg('walk to the last node, last.next = newNode → O(n) (O(1) with a tail pointer)'); }
      if (o === 'after') { const i = +$('#li', box).value; if (i < 0 || i >= L.length) return msg('index out of range'); L.splice(i + 1, 0, val()); msg(`newNode.next = cur.next; cur.next = newNode (order matters!)`); draw(i + 1); return; }
      if (o === 'del') { const i = L.indexOf(val()); if (i < 0) return msg('not found'); L.splice(i, 1); msg(i ? 'prev.next = cur.next (cur is skipped, then garbage-collected)' : 'head = head.next'); }
      if (o === 'rev') { L.reverse(); msg('prev = null; while (cur) { next = cur.next; cur.next = prev; prev = cur; cur = next; } head = prev'); } draw(); };
    $$('[data-m]', box).forEach(b => b.onclick = () => { $$('[data-m]', box).forEach(x => x.classList.toggle('on', x === b)); mode = b.dataset.m; btns(); draw(); });
    btns(); draw(); return () => { };
  } });

/* 8. Base converter / two's complement / IEEE 754 ---------------------------------- */
VIZ.push({ id: 'bits', icon: '🧮', title: 'Bits: bases, two\'s complement & floats', color: '#FF7AC6', blurb: 'Flip bits and watch the unsigned, signed and hex values update. Then pull a float apart into sign, exponent and mantissa.',
  mount(box) {
    let n = 8, bits = Array(8).fill(0);
    box.innerHTML = VCSS + `<div class="vctl"><label>width <select id="bw"><option>4</option><option selected>8</option><option>16</option></select></label><label>decimal <input type="number" id="bd" value="-23" style="width:90px"></label><button class="btn sm" id="bset">set</button><button class="btn sm" id="bneg">negate (invert + 1)</button></div><div id="bb" class="bitrow"></div><div class="vars" id="bo"></div><hr style="border-color:var(--line)"><div class="vctl"><label>float32 <input type="text" id="ff" value="-6.75" style="width:110px"></label><button class="btn sm" id="fgo">decode</button></div><div id="fo"></div>`;
    const st = document.createElement('style'); st.textContent = '.bitrow{display:flex;gap:4px;flex-wrap:wrap}.bitrow button{width:38px;height:46px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font:700 18px var(--mono);cursor:pointer;position:relative}.bitrow button.on{background:var(--acc);color:#000}.bitrow button small{position:absolute;bottom:-17px;left:0;right:0;font:400 9px var(--mono);color:var(--muted)}.fbits span{display:inline-block;font:700 14px var(--mono);padding:4px 2px}.fbits .s{color:var(--bad)}.fbits .e{color:var(--warn)}.fbits .m{color:var(--acc2)}'; box.appendChild(st);
    const u = () => bits.reduce((s, b) => s * 2 + b, 0), sgn = () => bits[0] ? u() - 2 ** n : u();
    const draw = () => { $('#bb', box).innerHTML = bits.map((b, i) => `<button class="${b ? 'on' : ''}" data-i="${i}">${b}<small>${i === 0 ? '−' : ''}2^${n - 1 - i}</small></button>`).join('');
      $$('#bb button', box).forEach(x => x.onclick = () => { bits[+x.dataset.i] ^= 1; draw(); });
      $('#bo', box).innerHTML = `<span>unsigned = <b>${u()}</b></span><span>two's complement = <b>${sgn()}</b></span><span>hex = <b>0x${u().toString(16).toUpperCase().padStart(n / 4, '0')}</b></span><span>range = <b>${-(2 ** (n - 1))} … ${2 ** (n - 1) - 1}</b></span>`; };
    const set = v => { const lo = -(2 ** (n - 1)), hi = 2 ** (n - 1) - 1; v = Math.max(lo, Math.min(hi, v)); let x = v < 0 ? v + 2 ** n : v; bits = [...x.toString(2).padStart(n, '0')].map(Number); draw(); };
    $('#bw', box).onchange = e => { n = +e.target.value; set(sgn()); }; $('#bset', box).onclick = () => set(+$('#bd', box).value); $('#bneg', box).onclick = () => set(-sgn());
    const fdec = () => { const f = parseFloat($('#ff', box).value); const dv = new DataView(new ArrayBuffer(4)); dv.setFloat32(0, f); const b = dv.getUint32(0).toString(2).padStart(32, '0'), e = parseInt(b.slice(1, 9), 2), m = b.slice(9);
      $('#fo', box).innerHTML = `<div class="fbits"><span class="s">${b[0]}</span> <span class="e">${b.slice(1, 9)}</span> <span class="m">${m}</span></div><div class="vars"><span>sign = <b>${b[0]}</b> (${b[0] === '1' ? '−' : '+'})</span><span>exponent = <b>${e}</b> − 127 = <b>${e - 127}</b></span><span>mantissa = <b>1.${m.replace(/0+$/, '') || '0'}</b>₂</span><span>value = <b>${dv.getFloat32(0)}</b></span><span>hex = <b>0x${dv.getUint32(0).toString(16).toUpperCase().padStart(8, '0')}</b></span></div>`; };
    $('#fgo', box).onclick = fdec; set(-23); fdec(); return () => { };
  } });

/* 9. Logic: truth table + K-map --------------------------------------------------- */
function minSOP(ones, dc, nv) { // Quine–McCluskey + greedy/Petrick-lite cover
  const all = [...ones, ...dc]; if (!ones.length) return '0'; if (ones.length + dc.length === 2 ** nv) return '1';
  let groups = all.map(m => ({ v: m, mask: 0, ms: [m] })), primes = [];
  while (groups.length) { const next = [], used = new Set(), seen = new Set();
    for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) { const a = groups[i], b = groups[j]; if (a.mask !== b.mask) continue; const d = a.v ^ b.v; if (d && !(d & (d - 1))) { used.add(i); used.add(j); const v = a.v & ~d, mask = a.mask | d, k = v + ':' + mask; if (!seen.has(k)) { seen.add(k); next.push({ v, mask, ms: [...new Set([...a.ms, ...b.ms])] }); } } }
    groups.forEach((g, i) => { if (!used.has(i)) primes.push(g); }); groups = next; }
  const cover = [], left = new Set(ones); // essential primes first
  for (const m of ones) { const ps = primes.filter(p => p.ms.includes(m)); if (ps.length === 1 && !cover.includes(ps[0])) { cover.push(ps[0]); ps[0].ms.forEach(x => left.delete(x)); } }
  while (left.size) { let best = null, bc = -1; primes.forEach(p => { const c = p.ms.filter(x => left.has(x)).length; if (c > bc || (c === bc && best && bitcount(p.mask) > bitcount(best.mask))) { best = p; bc = c; } }); cover.push(best); best.ms.forEach(x => left.delete(x)); }
  const V = 'ABCD'.slice(0, nv); return cover.map(p => [...V].map((ch, i) => { const bit = 1 << (nv - 1 - i); return p.mask & bit ? '' : (p.v & bit ? ch : ch + "'"); }).join('') || '1').join(' + ');
}
const bitcount = x => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
VIZ.push({ id: 'kmap', icon: '🔲', title: 'Truth tables & Karnaugh maps', color: '#4DE1FF', blurb: 'Click K-map cells to set outputs to 1, 0 or don\'t-care, and get the minimal sum of products instantly.',
  mount(box) {
    let nv = 4, F = Array(16).fill(0);
    box.innerHTML = VCSS + `<div class="vctl"><label>variables <select id="kn"><option>2</option><option>3</option><option selected>4</option></select></label><button class="btn sm" id="kr">random function</button><button class="btn sm" id="kc">clear</button><span class="lbl">click: 0 → 1 → X → 0</span></div><div class="two"><div id="km"></div><div id="kt" style="max-height:340px;overflow:auto"></div></div><div class="vmsg" id="ks"></div>`;
    const gray = k => k === 1 ? [0, 1] : [0, 1, 3, 2];
    const draw = () => { const rv = nv === 4 ? 2 : 1, cv = nv - rv, rows = gray(rv), cols = gray(cv), V = 'ABCD'; let s = '';
      const cell = (r, c) => (r << cv) | c;
      s += `<text class="lbl" x="10" y="20">${V.slice(0, rv)}\\${V.slice(rv, nv)}</text>`; cols.forEach((c, j) => s += `<text class="lbl" x="${80 + j * 60 + 30}" y="22" text-anchor="middle">${c.toString(2).padStart(cv, '0')}</text>`);
      rows.forEach((r, i) => { s += `<text class="lbl" x="40" y="${60 + i * 50 + 6}" text-anchor="middle">${r.toString(2).padStart(rv, '0')}</text>`; cols.forEach((c, j) => { const m = cell(r, c), v = F[m]; s += `<g class="kc" data-m="${m}" style="cursor:pointer"><rect x="${80 + j * 60}" y="${35 + i * 50}" width="56" height="46" rx="6" fill="${v === 1 ? 'var(--acc)' : v === 2 ? 'var(--warn)' : 'var(--panel2)'}" stroke="var(--line)"/><text x="${80 + j * 60 + 28}" y="${35 + i * 50 + 29}" text-anchor="middle" style="font-weight:700;${v ? 'fill:#000' : ''}">${v === 2 ? 'X' : v}</text><text class="lbl" x="${80 + j * 60 + 50}" y="${35 + i * 50 + 12}" text-anchor="end" style="font-size:9px">${m}</text></g>`; }); });
      $('#km', box).innerHTML = sv(80 + cols.length * 60 + 10, 45 + rows.length * 50, s);
      $$('.kc', box).forEach(g => g.onclick = () => { const m = +g.dataset.m; F[m] = (F[m] + 1) % 3; draw(); });
      const N = 2 ** nv; $('#kt', box).innerHTML = `<table class="t"><tr>${[...V.slice(0, nv)].map(x => `<th>${x}</th>`).join('')}<th>F</th></tr>${range(0, N).map(m => `<tr>${[...m.toString(2).padStart(nv, '0')].map(b => `<td>${b}</td>`).join('')}<td style="color:${F[m] === 1 ? 'var(--acc)' : F[m] === 2 ? 'var(--warn)' : 'inherit'}">${F[m] === 2 ? 'X' : F[m]}</td></tr>`).join('')}</table>`;
      const ones = range(0, N).filter(m => F[m] === 1), dc = range(0, N).filter(m => F[m] === 2);
      $('#ks', box).innerHTML = `F = Σm(${ones.join(',')})${dc.length ? ` + d(${dc.join(',')})` : ''}<br>minimal SOP: <b style="color:var(--acc)">F = ${minSOP(ones, dc, nv)}</b>`; };
    $('#kn', box).onchange = e => { nv = +e.target.value; F = Array(2 ** nv).fill(0); draw(); }; $('#kc', box).onclick = () => { F = F.map(() => 0); draw(); }; $('#kr', box).onclick = () => { F = F.map(() => Math.random() < .45 ? 1 : Math.random() < .12 ? 2 : 0); draw(); };
    F = [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1]; draw(); return () => { };
  } });

/* 10. DFA / NFA simulator --------------------------------------------------------- */
const DFAS = {
  'even number of 0s': { states: ['q0', 'q1'], start: 'q0', acc: ['q0'], alpha: '01', d: { q0: { 0: 'q1', 1: 'q0' }, q1: { 0: 'q0', 1: 'q1' } }, pos: { q0: [180, 110], q1: [420, 110] } },
  'ends in 01': { states: ['q0', 'q1', 'q2'], start: 'q0', acc: ['q2'], alpha: '01', d: { q0: { 0: 'q1', 1: 'q0' }, q1: { 0: 'q1', 1: 'q2' }, q2: { 0: 'q1', 1: 'q0' } }, pos: { q0: [120, 120], q1: [320, 120], q2: [520, 120] } },
  'binary divisible by 3': { states: ['r0', 'r1', 'r2'], start: 'r0', acc: ['r0'], alpha: '01', d: { r0: { 0: 'r0', 1: 'r1' }, r1: { 0: 'r2', 1: 'r0' }, r2: { 0: 'r1', 1: 'r2' } }, pos: { r0: [120, 120], r1: [320, 120], r2: [520, 120] } },
  'contains "aba"': { states: ['s0', 's1', 's2', 's3'], start: 's0', acc: ['s3'], alpha: 'ab', d: { s0: { a: 's1', b: 's0' }, s1: { a: 's1', b: 's2' }, s2: { a: 's3', b: 's0' }, s3: { a: 's3', b: 's3' } }, pos: { s0: [90, 120], s1: [250, 120], s2: [410, 120], s3: [570, 120] } },
};
function runDFA(D, w) { let s = D.start; const tr = [s]; for (const ch of w) { s = D.d[s] && D.d[s][ch]; if (!s) return { tr, ok: false, dead: true }; tr.push(s); } return { tr, ok: D.acc.includes(s) }; }
VIZ.push({ id: 'dfa', icon: '🤖', title: 'DFA simulator', color: '#A6FF6B', blurb: 'Feed a string to a finite automaton and watch it hop between states. It accepts if it ends in a double-circled state.',
  mount(box) {
    let name = Object.keys(DFAS)[0], stop = null;
    box.innerHTML = VCSS + `<div class="vctl"><select id="dn">${Object.keys(DFAS).map(k => `<option>${k}</option>`).join('')}</select><input type="text" id="dw" value="1001" style="width:140px"><button class="btn sm pri" id="dg">▶ run</button><button class="btn sm" id="dr">random string</button></div><div id="dv"></div><div class="vmsg" id="dm"></div>`;
    const draw = (cur, i = -1, w = '') => { const D = DFAS[name]; let s = `<defs><marker id="da" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>`;
      const pairs = {}; D.states.forEach(q => Object.entries(D.d[q] || {}).forEach(([c, t]) => { const k = q + '>' + t; (pairs[k] ??= []).push(c); }));
      Object.entries(pairs).forEach(([k, cs]) => { const [a, b] = k.split('>'), [x1, y1] = D.pos[a], [x2, y2] = D.pos[b];
        if (a === b) s += `<path d="M${x1 - 12} ${y1 - 24} C${x1 - 30} ${y1 - 80} ${x1 + 30} ${y1 - 80} ${x1 + 12} ${y1 - 24}" fill="none" stroke="var(--muted)" stroke-width="1.8" marker-end="url(#da)"/><text class="w" x="${x1}" y="${y1 - 70}" text-anchor="middle">${cs.join(',')}</text>`;
        else { const back = pairs[b + '>' + a], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, off = back ? 26 : 0, mx = (x1 + x2) / 2 - uy * off * 1.6, my = (y1 + y2) / 2 + ux * off * 1.6;
          s += `<path d="M${x1 + ux * 26} ${y1 + uy * 26} Q${mx} ${my} ${x2 - ux * 28} ${y2 - uy * 28}" fill="none" stroke="var(--muted)" stroke-width="1.8" marker-end="url(#da)"/><text class="w" x="${mx}" y="${my - 4}" text-anchor="middle">${cs.join(',')}</text>`; } });
      D.states.forEach(q => { const [x, y] = D.pos[q]; s += NODE(x, y, q, q === cur ? 'hot' : '', 24); if (D.acc.includes(q)) s += `<circle cx="${x}" cy="${y}" r="29" fill="none" stroke="var(--acc2)" stroke-width="2"/>`; if (q === D.start) s += `<path d="M${x - 70} ${y}H${x - 30}" stroke="var(--ink)" stroke-width="2" marker-end="url(#da)"/>`; });
      s += `<text x="20" y="235" style="font-size:18px">${[...w].map((c, k) => `<tspan style="fill:${k < i ? 'var(--muted)' : k === i ? 'var(--acc)' : 'var(--ink)'};font-weight:${k === i ? 800 : 400}">${c}</tspan>`).join('')}</text>`;
      $('#dv', box).innerHTML = sv(660, 250, s); };
    const run = () => { stop && stop(); const D = DFAS[name], w = $('#dw', box).value.trim(), r = runDFA(D, w); let k = 0; draw(r.tr[0], -1, w);
      stop = auto(() => { if (k >= w.length || k + 1 >= r.tr.length) { $('#dm', box).innerHTML = r.dead ? `✗ symbol "${w[k]}" isn't in the alphabet → rejected` : `ended in ${r.tr[r.tr.length - 1]} → <b style="color:${r.ok ? 'var(--acc)' : 'var(--bad)'}">${r.ok ? 'ACCEPT' : 'REJECT'}</b>  ·  path: ${r.tr.join(' → ')}`; return stop(); } k++; draw(r.tr[k], k - 1, w); $('#dm', box).textContent = `read "${w[k - 1]}": δ(${r.tr[k - 1]}, ${w[k - 1]}) = ${r.tr[k]}`; }, 650); };
    $('#dn', box).onchange = e => { name = e.target.value; $('#dw', box).value = name.includes('aba') ? 'bbabab' : '1001'; draw(DFAS[name].start); };
    $('#dg', box).onclick = run; $('#dr', box).onclick = () => { const a = DFAS[name].alpha; $('#dw', box).value = [...Array(R.int(3, 8))].map(() => R.pick([...a])).join(''); run(); };
    draw(DFAS[name].start); return () => timers.forEach(clearInterval);
  } });

/* 11. CPU scheduling ------------------------------------------------------------- */
function schedule(ps, alg, q = 2) { // ps: [{id,arr,burst,pri}]
  const P = ps.map(p => ({ ...p, rem: p.burst })), G = []; let t = 0, done = 0; const push = (id, s, e) => { if (G.length && G[G.length - 1].id === id && G[G.length - 1].e === s) G[G.length - 1].e = e; else G.push({ id, s, e }); };
  if (alg === 'RR') { const Q = []; const arrived = new Set(); const add = () => P.filter(p => p.arr <= t && !arrived.has(p.id)).sort((a, b) => a.arr - b.arr).forEach(p => { arrived.add(p.id); Q.push(p); }); add();
    while (done < P.length) { if (!Q.length) { t = Math.min(...P.filter(p => p.rem > 0).map(p => p.arr)); add(); continue; } const p = Q.shift(), run = Math.min(q, p.rem); push(p.id, t, t + run); t += run; p.rem -= run; add(); if (p.rem > 0) Q.push(p); else { p.fin = t; done++; } } }
  else while (done < P.length) { const ready = P.filter(p => p.arr <= t && p.rem > 0); if (!ready.length) { t = Math.min(...P.filter(p => p.rem > 0).map(p => p.arr)); continue; }
    const key = alg === 'FCFS' ? p => [p.arr, p.id] : alg === 'SJF' || alg === 'SRTF' ? p => [alg === 'SJF' ? p.burst : p.rem, p.arr, p.id] : p => [p.pri, p.arr, p.id];
    ready.sort((a, b) => { const x = key(a), y = key(b); for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1; return 0; }); const p = ready[0];
    if (alg === 'SRTF') { const nextArr = Math.min(...P.filter(x => x.arr > t).map(x => x.arr), Infinity), run = Math.min(p.rem, nextArr - t); push(p.id, t, t + run); t += run; p.rem -= run; if (!p.rem) { p.fin = t; done++; } }
    else { push(p.id, t, t + p.rem); t += p.rem; p.rem = 0; p.fin = t; done++; } }
  P.forEach(p => { p.tat = p.fin - p.arr; p.wait = p.tat - p.burst; }); return { G, P };
}
VIZ.push({ id: 'sched', icon: '⏱️', title: 'CPU scheduling Gantt charts', color: '#9DB4FF', blurb: 'FCFS, SJF, SRTF, round robin and priority on the same processes. Compare average waiting and turnaround time.',
  mount(box) {
    let ps = [{ id: 'P1', arr: 0, burst: 7, pri: 3 }, { id: 'P2', arr: 2, burst: 4, pri: 1 }, { id: 'P3', arr: 4, burst: 1, pri: 4 }, { id: 'P4', arr: 5, burst: 4, pri: 2 }], alg = 'FCFS';
    box.innerHTML = VCSS + `<div class="vctl">${['FCFS', 'SJF', 'SRTF', 'RR', 'Priority'].map(a => `<button class="chip ${a === alg ? 'on' : ''}" data-a="${a}">${a}</button>`).join('')}<label>quantum <input type="number" id="sq" value="2" min="1" style="width:56px"></label><button class="btn sm" id="sx">random processes</button></div><div id="spt"></div><div id="sg"></div><div id="sst"></div>`;
    const COL = ['#7CFFB2', '#5CC8FF', '#FF7AC6', '#FFD166', '#B69CFF', '#FF9F5A'];
    const draw = () => { const r = schedule(ps, alg === 'Priority' ? 'PRI' : alg, +$('#sq', box).value || 2), T = r.G[r.G.length - 1].e, sc = 640 / T;
      $('#spt', box).innerHTML = `<table class="t"><tr><th>proc</th><th>arrival</th><th>burst</th><th>priority</th><th>finish</th><th>turnaround</th><th>waiting</th></tr>${r.P.map(p => `<tr><td style="color:${COL[ps.findIndex(x => x.id === p.id)]}">${p.id}</td><td>${p.arr}</td><td>${p.burst}</td><td>${p.pri}</td><td>${p.fin}</td><td>${p.tat}</td><td>${p.wait}</td></tr>`).join('')}</table>`;
      $('#sg', box).innerHTML = sv(680, 80, r.G.map(g => `<rect x="${20 + g.s * sc}" y="10" width="${(g.e - g.s) * sc}" height="38" fill="${COL[ps.findIndex(x => x.id === g.id)]}" stroke="var(--bg)" stroke-width="2"/><text x="${20 + (g.s + g.e) / 2 * sc}" y="34" text-anchor="middle" style="fill:#000;font-weight:700">${g.id}</text><text class="lbl" x="${20 + g.s * sc}" y="66" text-anchor="middle">${g.s}</text>`).join('') + `<text class="lbl" x="${20 + T * sc}" y="66" text-anchor="middle">${T}</text>`);
      const aw = r.P.reduce((s, p) => s + p.wait, 0) / r.P.length, at = r.P.reduce((s, p) => s + p.tat, 0) / r.P.length; $('#sst', box).innerHTML = `<div class="vars"><span>avg waiting = <b>${sig(aw, 3)}</b></span><span>avg turnaround = <b>${sig(at, 3)}</b></span><span>context switches = <b>${r.G.length - 1}</b></span><span>${alg === 'Priority' ? 'lower number = higher priority, non-preemptive' : alg === 'RR' ? 'new arrivals join the queue before the preempted process' : alg === 'SRTF' ? 'preemptive SJF' : alg === 'SJF' ? 'non-preemptive' : 'first come, first served'}</span></div>`; };
    $$('[data-a]', box).forEach(b => b.onclick = () => { $$('[data-a]', box).forEach(x => x.classList.toggle('on', x === b)); alg = b.dataset.a; draw(); });
    $('#sq', box).oninput = draw; $('#sx', box).onclick = () => { ps = range(1, R.int(3, 5) + 1).map(i => ({ id: 'P' + i, arr: i === 1 ? 0 : R.int(0, 8), burst: R.int(1, 8), pri: R.int(1, 5) })); draw(); };
    draw(); return () => { };
  } });

/* 12. Page replacement ------------------------------------------------------------ */
function pageSim(refs, F, alg) { const fr = [], rows = []; let faults = 0; const last = {};
  refs.forEach((p, t) => { let hit = fr.includes(p), victim = null; if (!hit) { faults++; if (fr.length < F) fr.push(p); else { let idx;
        if (alg === 'FIFO') idx = 0; if (alg === 'LRU') idx = fr.reduce((b, x, i) => last[x] < last[fr[b]] ? i : b, 0);
        if (alg === 'OPT') { const nxt = fr.map(x => { const k = refs.indexOf(x, t + 1); return k < 0 ? Infinity : k; }); idx = nxt.indexOf(Math.max(...nxt)); }
        victim = fr[idx]; if (alg === 'FIFO') { fr.shift(); fr.push(p); } else fr[idx] = p; } }
    last[p] = t; rows.push({ p, fr: fr.slice(), hit, victim }); }); return { rows, faults }; }
VIZ.push({ id: 'paging', icon: '📄', title: 'Page replacement: FIFO, LRU, OPT', color: '#9DB4FF', blurb: 'Run a reference string through a few frames and count page faults. Try FIFO with 3 vs 4 frames to see Bélády\'s anomaly.',
  mount(box) {
    box.innerHTML = VCSS + `<div class="vctl"><input type="text" id="pr" value="1 2 3 4 1 2 5 1 2 3 4 5" style="width:260px"><label>frames <input type="number" id="pf" value="3" min="1" max="7" style="width:56px"></label><button class="btn sm" id="px">random</button></div><div id="pv"></div>`;
    const draw = () => { const refs = $('#pr', box).value.trim().split(/[\s,]+/).filter(Boolean).map(Number), F = +$('#pf', box).value || 3;
      $('#pv', box).innerHTML = ['FIFO', 'LRU', 'OPT'].map(a => { const r = pageSim(refs, F, a); return `<div class="pg" style="margin-top:12px">${a} · <span style="color:var(--bad)">${r.faults} faults</span> · ${refs.length - r.faults} hits</div>` + sv(Math.max(640, 40 + refs.length * 44), 30 + F * 30 + 30, r.rows.map((row, t) => `<text x="${30 + t * 44 + 18}" y="20" text-anchor="middle" style="font-weight:700">${row.p}</text>` + range(0, F).map(f => `<rect x="${30 + t * 44}" y="${28 + f * 30}" width="38" height="26" rx="4" fill="${row.fr[f] === row.p && !row.hit ? 'color-mix(in srgb,var(--bad) 45%,var(--panel2))' : 'var(--panel2)'}" stroke="var(--line)"/><text x="${30 + t * 44 + 19}" y="${46 + f * 30}" text-anchor="middle">${row.fr[f] ?? ''}</text>`).join('') + `<text x="${30 + t * 44 + 19}" y="${46 + F * 30}" text-anchor="middle" style="fill:${row.hit ? 'var(--acc)' : 'var(--bad)'}">${row.hit ? '✓' : 'F'}</text>`).join('')); }).join(''); };
    $('#pr', box).oninput = draw; $('#pf', box).oninput = draw; $('#px', box).onclick = () => { $('#pr', box).value = [...Array(14)].map(() => R.int(0, 6)).join(' '); draw(); };
    draw(); return () => { };
  } });

/* 13. MIPS pipeline -------------------------------------------------------------- */
VIZ.push({ id: 'pipeline', icon: '🏭', title: '5-stage MIPS pipeline & hazards', color: '#FF7AC6', blurb: 'IF, ID, EX, MEM, WB. Toggle forwarding and watch data hazards turn into stalls (bubbles) or disappear.',
  mount(box) {
    const PROG = [['lw $t0, 0($s0)', ['$t0'], ['$s0'], 'load'], ['add $t1, $t0, $t2', ['$t1'], ['$t0', '$t2']], ['sub $t3, $t1, $t4', ['$t3'], ['$t1', '$t4']], ['sw $t3, 4($s0)', [], ['$t3', '$s0']], ['or $t5, $t6, $t7', ['$t5'], ['$t6', '$t7']]];
    box.innerHTML = VCSS + `<div class="vctl"><label><input type="checkbox" id="pfw" checked> forwarding</label><span class="lbl">hazard rule: a value is needed in EX (or ID without forwarding); a load's value only exists after MEM.</span></div><div id="pv"></div><div class="vmsg" id="pm"></div>`;
    const draw = () => { const fw = $('#pfw', box).checked, ST = ['IF', 'ID', 'EX', 'MEM', 'WB'], start = []; const ready = {}; let c = 0, stalls = 0;
      PROG.forEach((ins, i) => { let s = i === 0 ? 0 : start[i - 1] + 1; // need: EX cycle (s+2) >= ready cycle
        ins[2].forEach(r => { if (ready[r] != null) { const needAt = fw ? s + 2 : s + 1; const avail = ready[r]; if (needAt < avail) { stalls += avail - needAt; s += avail - needAt; } } });
        start.push(s); ins[1].forEach(r => ready[r] = fw ? (ins[3] === 'load' ? s + 4 : s + 3) : s + 4 + 0); });
      // without forwarding: value written in WB first half, read in ID second half → available to ID at cycle s+4 (same cycle)
      const T = start[start.length - 1] + 5; let svg = range(0, T).map(k => `<text class="lbl" x="${190 + k * 52 + 24}" y="16" text-anchor="middle">c${k + 1}</text>`).join('');
      PROG.forEach((ins, i) => { svg += `<text x="6" y="${44 + i * 34}" style="font-size:12px">${ins[0]}</text>`; for (let k = start[i - 1] + 1 || 1; k < start[i]; k++) if (i) svg += `<rect x="${190 + k * 52 + 2}" y="${28 + i * 34}" width="46" height="24" rx="4" fill="none" stroke="var(--bad)" stroke-dasharray="4 3"/><text x="${190 + k * 52 + 25}" y="${45 + i * 34}" text-anchor="middle" style="fill:var(--bad);font-size:10px">stall</text>`;
        ST.forEach((st, j) => svg += `<rect x="${190 + (start[i] + j) * 52 + 2}" y="${28 + i * 34}" width="46" height="24" rx="4" fill="${['#5CC8FF', '#B69CFF', '#7CFFB2', '#FFD166', '#FF7AC6'][j]}"/><text x="${190 + (start[i] + j) * 52 + 25}" y="${45 + i * 34}" text-anchor="middle" style="fill:#000;font-size:11px;font-weight:700">${st}</text>`); });
      $('#pv', box).innerHTML = sv(200 + T * 52, 40 + PROG.length * 34, svg); $('#pm', box).innerHTML = `total cycles = <b>${T}</b> · stalls = <b>${stalls}</b> · CPI = ${sig(T / PROG.length, 3)} for ${PROG.length} instructions. ${fw ? 'The lw → add load-use hazard still needs 1 stall even with forwarding.' : 'Without forwarding, each dependent instruction waits for WB.'}`; };
    $('#pfw', box).onchange = draw; draw(); return () => { };
  } });

/* 14. Recursion tree ------------------------------------------------------------- */
VIZ.push({ id: 'rectree', icon: '🌲', title: 'Recursion trees & memoization', color: '#FF8AD8', blurb: 'fib(n) calls itself twice. See the exponential call tree, then turn on memoization and watch it collapse.',
  mount(box) {
    box.innerHTML = VCSS + `<div class="vctl"><label>n <input type="range" id="rn" min="2" max="7" value="5"></label><label><input type="checkbox" id="rm"> memoize</label></div><div id="rv"></div><div class="vmsg" id="rmsg"></div>`;
    const draw = () => { const n = +$('#rn', box).value, memo = $('#rm', box).checked, seen = new Set(); let calls = 0, nodes = [], leafX = 0;
      function build(k, d) { calls++; const node = { k, d, kids: [], cached: false }; if (memo && seen.has(k)) { node.cached = true; } else if (k >= 2) { node.kids = [build(k - 1, d + 1), build(k - 2, d + 1)]; } seen.add(k); if (!node.kids.length) node.x = leafX++; else node.x = (node.kids[0].x + node.kids[node.kids.length - 1].x) / 2; nodes.push(node); return node; }
      const root = build(n, 0), W = Math.max(640, leafX * 54), D = Math.max(...nodes.map(x => x.d)); let e = '', nd = ''; const X = x => 30 + x * (W - 60) / Math.max(1, leafX - 1);
      nodes.forEach(p => p.kids.forEach(c => e += `<line class="ed" x1="${X(p.x)}" y1="${26 + p.d * 56}" x2="${X(c.x)}" y2="${26 + c.d * 56}"/>`)); nodes.forEach(p => nd += NODE(X(p.x), 26 + p.d * 56, p.k, p.cached ? 'seen' : p.k < 2 ? 'q' : '', 16));
      $('#rv', box).innerHTML = sv(W, 50 + D * 56, e + nd); $('#rmsg', box).innerHTML = `fib(${n}) made <b>${calls}</b> calls${memo ? ' (green = answered from the memo table, no recursion)' : ` · grows like φⁿ ≈ 1.618ⁿ → O(2ⁿ)`}. ${memo ? 'With memoization it is O(n).' : ''}`; };
    $('#rn', box).oninput = draw; $('#rm', box).onchange = draw; draw(); return () => { };
  } });

/* 15. Probability distributions -------------------------------------------------- */
const binomP = (n, k, p) => { let c = 1; for (let i = 0; i < k; i++) c = c * (n - i) / (i + 1); return c * p ** k * (1 - p) ** (n - k); };
VIZ.push({ id: 'dist', icon: '🎲', title: 'Probability distributions', color: '#B69CFF', blurb: 'Binomial, Poisson, geometric and normal. Drag the parameters and read off the mean, variance and shaded probability.',
  mount(box) {
    let kind = 'binomial';
    box.innerHTML = VCSS + `<div class="vctl">${['binomial', 'poisson', 'geometric', 'normal'].map(k => `<button class="chip ${k === kind ? 'on' : ''}" data-k="${k}">${k}</button>`).join('')}</div><div class="vctl" id="dp"></div><div id="dv"></div><div class="vars" id="ds"></div>`;
    const ctl = () => { $('#dp', box).innerHTML = kind === 'binomial' ? '<label>n <input type="range" id="a" min="1" max="40" value="12"></label><label>p <input type="range" id="b" min="1" max="99" value="30"></label><label>P(X ≤ <input type="number" id="c" value="3" style="width:50px">)</label>' : kind === 'poisson' ? '<label>λ <input type="range" id="a" min="1" max="200" value="40"></label><label>P(X ≤ <input type="number" id="c" value="3" style="width:50px">)</label>' : kind === 'geometric' ? '<label>p <input type="range" id="a" min="2" max="90" value="25"></label><label>P(X ≤ <input type="number" id="c" value="3" style="width:50px">)</label>' : '<label>μ <input type="range" id="a" min="-30" max="30" value="0"></label><label>σ <input type="range" id="b" min="3" max="30" value="10"></label><label>P(X ≤ <input type="number" id="c" value="1" step=".1" style="width:60px">)</label>';
      $$('#dp input', box).forEach(i => i.oninput = draw); draw(); };
    const draw = () => { const a = +$('#a', box).value, b = $('#b', box) ? +$('#b', box).value : 0, c = +$('#c', box).value; let pts = [], mean, vr, P;
      if (kind === 'normal') { const mu = a / 10, s = b / 10; for (let x = mu - 4 * s; x <= mu + 4 * s; x += s / 20) pts.push([x, Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI))]); mean = mu; vr = s * s; const z = (c - mu) / s; P = .5 * (1 + erf(z / Math.SQRT2));
        const xs = pts.map(p => p[0]), mx = Math.max(...pts.map(p => p[1])), X = x => 20 + (x - xs[0]) / (xs[xs.length - 1] - xs[0]) * 640, Y = y => 210 - y / mx * 190;
        $('#dv', box).innerHTML = sv(680, 230, `<path d="M${X(xs[0])} 210 ${pts.filter(p => p[0] <= c).map(p => `L${X(p[0])} ${Y(p[1])}`).join(' ')} L${X(Math.min(c, xs[xs.length - 1]))} 210Z" fill="color-mix(in srgb,var(--acc) 35%,transparent)"/><polyline points="${pts.map(p => `${X(p[0])},${Y(p[1])}`).join(' ')}" fill="none" stroke="var(--acc2)" stroke-width="2.5"/><text class="lbl" x="${X(mu)}" y="226" text-anchor="middle">μ</text>`);
        $('#ds', box).innerHTML = `<span>z = (x − μ)/σ = <b>${sig(z, 3)}</b></span><span>P(X ≤ ${c}) = Φ(z) = <b>${sig(P, 4)}</b></span><span>mean <b>${sig(mean, 3)}</b></span><span>variance <b>${sig(vr, 3)}</b></span>`; return; }
      let K = 0; if (kind === 'binomial') { const n = a, p = b / 100; K = n; for (let k = 0; k <= n; k++) pts.push([k, binomP(n, k, p)]); mean = n * p; vr = n * p * (1 - p); }
      if (kind === 'poisson') { const l = a / 10; K = Math.ceil(l + 4 * Math.sqrt(l) + 3); let pk = Math.exp(-l); for (let k = 0; k <= K; k++) { pts.push([k, pk]); pk = pk * l / (k + 1); } mean = l; vr = l; }
      if (kind === 'geometric') { const p = a / 100; K = Math.min(40, Math.ceil(4 / p)); for (let k = 1; k <= K; k++) pts.push([k, (1 - p) ** (k - 1) * p]); mean = 1 / p; vr = (1 - p) / p / p; }
      P = pts.filter(q => q[0] <= c).reduce((s, q) => s + q[1], 0); const mx = Math.max(...pts.map(q => q[1])), w = 640 / pts.length;
      $('#dv', box).innerHTML = sv(680, 230, pts.map((q, i) => `<rect x="${20 + i * w + 1}" y="${210 - q[1] / mx * 190}" width="${Math.max(1, w - 2)}" height="${q[1] / mx * 190}" fill="${q[0] <= c ? 'var(--acc)' : 'var(--acc2)'}" opacity="${q[0] <= c ? 1 : .6}"/>${pts.length <= 26 ? `<text class="lbl" x="${20 + i * w + w / 2}" y="226" text-anchor="middle">${q[0]}</text>` : ''}`).join(''));
      $('#ds', box).innerHTML = `<span>P(X ≤ ${c}) = <b>${sig(P, 4)}</b></span><span>E[X] = <b>${sig(mean, 4)}</b></span><span>Var(X) = <b>${sig(vr, 4)}</b></span><span>σ = <b>${sig(Math.sqrt(vr), 4)}</b></span>`; };
    $$('[data-k]', box).forEach(x => x.onclick = () => { $$('[data-k]', box).forEach(y => y.classList.toggle('on', y === x)); kind = x.dataset.k; ctl(); });
    ctl(); return () => { };
  } });
function erf(x) { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + .3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - .284496736) * t + .254829592) * t * Math.exp(-x * x)); }
const Phi = z => .5 * (1 + erf(z / Math.SQRT2));
