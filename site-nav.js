/* Origem TCG: navegação do site dentro dos relatórios (barra no topo, botão de volta e "continue no site"). */
(function () {
  if (window.__ozNav) return; window.__ozNav = 1;
  var WA = 'https://chat.whatsapp.com/KGKAxnOhzoTKeKYoR7SDMf';
  var GQ = 'https://www.galaxyquest.com.br/';
  var GQIG = 'https://www.instagram.com/galaxy.questtcg/';
  var REPORTS = [
    { u: 'nice-2026.html', n: 'Nice', t: 'Regional', d: '17 e 18 out 2026', c: 'Luc Gantner, Basic Box' },
    { u: 'louisville-2026.html', n: 'Louisville', t: 'Regional', d: '9 a 11 out 2026', c: 'Riley McKay, Dragapult ex' },
    { u: 'recife-2026.html', n: 'Recife', t: 'Regional', d: '3 e 4 out 2026', c: 'Victor Carreira, Ogerpon Meganium Arboliva' },
    { u: 'frankfurt-brisbane.html', n: 'Frankfurt × Brisbane', t: 'Regionais', d: '26 e 27 set 2026', c: 'Alakazam Dusknoir e Dragapult ex' },
    { u: 'cl-yokohama-2027.html', n: 'CL Yokohama', t: 'Champions League', d: '20 a 22 set 2026', c: 'Keiyou Watanabe, Mega Excadrill ex' },
    { u: 'baltimore.html', n: 'Baltimore', t: 'Regional', d: '18 a 20 set 2026', c: 'Dylan Kasturi, Basic Box' },
    { u: 'mundial-2026.html', n: 'Mundial 2026', t: 'Mundial', d: '28 a 30 ago 2026', c: 'Andrew Hedrick, Dragapult ex' }
  ];
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var idx = -1; REPORTS.forEach(function (r, i) { if (r.u === here) idx = i; });

  var css = '' +
    '.oz,.oz *{box-sizing:border-box}' +
    '.oz{--oz-bg:#fbfaf7;--oz-ink:#151513;--oz-ink2:#55544e;--oz-ink3:#8b8981;--oz-line:#e4e1d8;--oz-card:#ffffff;--oz-acc:#8a6300;font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}' +
    '.oz-dark .oz,.oz.oz-d{--oz-bg:#0e0e0d;--oz-ink:#f1efe8;--oz-ink2:#b5b3aa;--oz-ink3:#7c7a73;--oz-line:#2a2a27;--oz-card:#161615;--oz-acc:#d4af37}' +
    '.oz a{text-decoration:none;color:inherit}' +
    /* barra do topo */
    '#oz-bar{background:#0b0b0a;color:#e9e6dc;border-bottom:1px solid #222;font-size:13px;position:relative;z-index:60}' +
    '#oz-bar .w{max-width:1120px;margin:0 auto;padding:0 20px;height:48px;display:flex;align-items:center;gap:22px}' +
    '#oz-bar .sp{display:flex;align-items:center;gap:9px;padding-left:18px;border-left:1px solid #2e2e2b;flex-shrink:0}' +
    '#oz-bar .sp small{font:500 9px/1.3 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#8f8b7f}' +
    '#oz-bar .sp img{height:38px;width:auto;display:block}' +
    '#oz-bar .home{display:flex;align-items:center;gap:8px;font-weight:600;letter-spacing:.02em;white-space:nowrap;color:#fff}' +
    '#oz-bar .home span{color:#d4af37;font-size:15px;transition:transform .2s}' +
    '#oz-bar .home:hover span{transform:translateX(-3px)}' +
    '#oz-bar nav{display:flex;gap:20px;margin-left:auto;overflow-x:auto;scrollbar-width:none}' +
    '#oz-bar nav::-webkit-scrollbar{display:none}' +
    '#oz-bar nav a{color:#b9b5a8;white-space:nowrap;transition:color .2s}' +
    '#oz-bar nav a:hover{color:#fff}' +
    '#oz-bar nav a.hot{color:#fff}' +
    '#oz-bar nav a.hot:before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#d4af37;margin-right:7px;vertical-align:1px}' +
    '@media (max-width:640px){#oz-bar .w{gap:14px;padding:0 16px;height:auto;flex-wrap:wrap;padding-top:6px;padding-bottom:6px}#oz-bar nav{gap:16px;width:100%;margin-left:0;order:3;padding:4px 0}#oz-bar .lbl{display:none}#oz-bar .sp{margin-left:auto;padding-left:12px}#oz-bar .sp img{height:34px}}' +
    /* botão flutuante */
    '#oz-back{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:90;display:flex;align-items:center;background:#151513;color:#f1efe8;border:1px solid #2e2e2b;border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.22);font-size:14px;opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .25s,transform .25s}' +
    '#oz-back.on{opacity:1;transform:none;pointer-events:auto}' +
    '#oz-back a{padding:10px 16px;white-space:nowrap;transition:color .2s}' +
    '#oz-back a:hover{color:#d4af37}' +
    '#oz-back i{width:1px;height:18px;background:#3a3a36}' +
    '@media print{#oz-back,#oz-bar,#oz-more{display:none!important}}' +
    /* continue no site */
    '#oz-more{background:var(--oz-bg);color:var(--oz-ink);border-top:1px solid var(--oz-line);padding:64px 0 56px;margin-top:48px}' +
    '#oz-more .w{max-width:1040px;margin:0 auto;padding:0 20px}' +
    '#oz-more .k{font:500 11px "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--oz-ink3)}' +
    '#oz-more h2{font-family:"Big Shoulders Display",Impact,sans-serif;font-weight:800;text-transform:uppercase;font-size:clamp(34px,5vw,52px);line-height:.95;margin:12px 0 28px;color:var(--oz-ink)}' +
    '#oz-more .g{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}' +
    '#oz-more .c{display:flex;flex-direction:column;gap:6px;padding:22px;border:1px solid var(--oz-line);border-radius:16px;background:var(--oz-card);transition:border-color .2s,transform .2s}' +
    '#oz-more .c:hover{border-color:var(--oz-acc);transform:translateY(-2px)}' +
    '#oz-more .c b{font-family:"Big Shoulders Display",Impact,sans-serif;font-weight:800;font-size:26px;text-transform:uppercase;line-height:1;color:var(--oz-ink)}' +
    '#oz-more .c p{font-size:14px;line-height:1.5;color:var(--oz-ink2);margin:0}' +
    '#oz-more .c .go{margin-top:auto;padding-top:8px;font-size:13px;font-weight:600;color:var(--oz-acc)}' +
    '#oz-more .c.gq{background:#152447;border-color:#152447;color:#e9e6dc}' +
    '#oz-more .c.gq b{color:#fff}#oz-more .c.gq p{color:#c9cfdd}#oz-more .c.gq{position:relative;padding-right:96px}' +
    '#oz-more .gql{position:absolute;right:18px;top:18px;width:66px;height:auto}' +
    '#oz-more .go2{margin-top:auto;padding-top:8px;display:flex;gap:18px;font-size:13px;font-weight:600}#oz-more .go2 a{color:#f2c94c}#oz-more .go2 a:hover{color:#fff}' +
    '#oz-more h3{font:500 11px "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--oz-ink3);margin:40px 0 0}' +
    '#oz-more .l{border-top:1px solid var(--oz-line);margin-top:12px}' +
    '#oz-more .r{display:grid;grid-template-columns:140px 1fr auto;gap:20px;align-items:center;padding:16px 4px;border-bottom:1px solid var(--oz-line);transition:background .2s}' +
    '#oz-more .r:hover{background:color-mix(in srgb,var(--oz-acc) 7%,transparent)}' +
    '#oz-more .r small{font:12px "IBM Plex Mono",ui-monospace,monospace;color:var(--oz-ink3)}' +
    '#oz-more .r strong{font-family:"Big Shoulders Display",Impact,sans-serif;font-weight:800;font-size:24px;text-transform:uppercase;color:var(--oz-ink);margin-right:10px}' +
    '#oz-more .r span{font-size:14px;color:var(--oz-ink2)}' +
    '#oz-more .r em{font-style:normal;color:var(--oz-ink3);transition:transform .2s,color .2s}' +
    '#oz-more .r:hover em{transform:translateX(4px);color:var(--oz-acc)}' +
    '#oz-more .all{display:inline-block;margin-top:22px;font-size:14px;font-weight:600;color:var(--oz-ink);border-bottom:1px solid var(--oz-ink);padding-bottom:2px}' +
    '@media (max-width:760px){#oz-more .g{grid-template-columns:1fr}#oz-more .r{grid-template-columns:1fr 20px;gap:2px 12px}#oz-more .r small{grid-column:1}#oz-more .r div{grid-column:1}#oz-more .r em{grid-column:2;grid-row:1/span 2}#oz-more .r span{display:block}}';

  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  function cameFromHome() {
    try {
      if (!document.referrer) return false;
      var r = new URL(document.referrer);
      return r.origin === location.origin && /(^\/$|\/index\.html$|\/Origem-TCG\/?$)/.test(r.pathname) && history.length > 1;
    } catch (e) { return false; }
  }
  function goHome(ev) {
    if (cameFromHome()) { ev.preventDefault(); history.back(); }
  }
  function isDark() {
    var n = document.body, c;
    while (n) {
      c = getComputedStyle(n).backgroundColor;
      var m = c && c.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > 0.5)) return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) < 128;
      n = n.parentElement;
    }
    return matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function init() {
    var st = el('style', {}, css); document.head.appendChild(st);

    /* barra do topo */
    var bar = el('div', { id: 'oz-bar', class: 'oz', role: 'navigation', 'aria-label': 'Site Origem TCG' },
      '<div class="w"><a class="home" href="./#relatorios"><span>←</span>Origem TCG<span class="lbl" style="color:#8f8b7f;font-weight:400;font-size:13px">&nbsp;· todos os relatórios</span></a>' +
      '<a class="sp" href="' + GQ + '" target="_blank" rel="noopener" aria-label="Patrocinador oficial: Galaxy Quest TCG"><small>Patrocínio<br>oficial</small><img src="galaxy-quest.svg" alt="Galaxy Quest TCG" width="37" height="38"></a>' +
      '<nav><a href="torneios.html">Torneios</a><a class="hot" href="' + WA + '" target="_blank" rel="noopener">Leilões</a>' +
      '<a href="' + GQ + '" target="_blank" rel="noopener">Galaxy Quest</a></nav></div>');
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector('.home').addEventListener('click', goHome);

    /* botão flutuante */
    var back = el('div', { id: 'oz-back', class: 'oz' },
      '<a href="./#relatorios" aria-label="Voltar para a página inicial">← Início</a><i></i><a href="torneios.html">Torneios</a>');
    document.body.appendChild(back);
    back.querySelector('a').addEventListener('click', goHome);
    var onScroll = function () { back.classList.toggle('on', scrollY > 700); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    /* continue no site */
    var others = REPORTS.filter(function (r, i) { return i !== idx; }).slice(0, 4);
    var more = el('section', { id: 'oz-more', class: 'oz', 'aria-label': 'Continue no site' },
      '<div class="w"><div class="k">Origem TCG</div><h2>Continue no site</h2>' +
      '<div class="g">' +
      '<a class="c" href="torneios.html"><b>Próximos torneios</b><p id="oz-tc">Todos os Cups e Challenges do estado de SP, com filtro por cidade.</p><span class="go">Ver a agenda →</span></a>' +
      '<a class="c" href="' + WA + '" target="_blank" rel="noopener"><b>Leilões</b><p>Cartas, leilões e oportunidades na nossa comunidade do WhatsApp.</p><span class="go">Entrar na comunidade →</span></a>' +
      '<div class="c gq"><img src="galaxy-quest.svg" alt="" class="gql"><b>Galaxy Quest TCG</b><p>Nosso patrocinador oficial. Cartas avulsas, boosters, pré-vendas e eventos.</p><span class="go2"><a href="' + GQ + '" target="_blank" rel="noopener">Visitar a loja →</a><a href="' + GQIG + '" target="_blank" rel="noopener">Instagram</a></span></div>' +
      '</div><h3>Outros raio-X</h3><div class="l">' +
      others.map(function (r) {
        return '<a class="r" href="' + r.u + '"><small>' + r.t + '<br>' + r.d + '</small><div><strong>' + r.n + '</strong><span>' + r.c + '</span></div><em>→</em></a>';
      }).join('') +
      '</div><a class="all" href="./#relatorios">Ver todos os relatórios</a></div>');
    var foot = null, fs = document.querySelectorAll('footer');
    for (var i = fs.length - 1; i >= 0; i--) { if (!fs[i].closest('section,article,#oz-more')) { foot = fs[i]; break; } }
    if (!foot && fs.length) foot = fs[fs.length - 1];
    if (foot && foot.parentNode) foot.parentNode.insertBefore(more, foot); else document.body.appendChild(more);
    var tip = document.querySelector('#tip, .tip'); if (tip && tip.parentNode === document.body) document.body.appendChild(tip);

    /* tema: segue o fundo da página (claro ou escuro, inclusive o botão de tema dos relatórios) */
    var theme = function () { more.classList.toggle('oz-d', isDark()); };
    theme();
    new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
    matchMedia('(prefers-color-scheme: dark)').addEventListener && matchMedia('(prefers-color-scheme: dark)').addEventListener('change', theme);

    /* número de torneios da semana */
    fetch('torneios.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (!d || !d.eventos) return;
      var t0 = new Date(); t0.setHours(0, 0, 0, 0); var t7 = new Date(t0.getTime() + 7 * 864e5);
      var n = d.eventos.filter(function (e) { var p = e.w.slice(0, 10).split('-'); var x = new Date(+p[0], p[1] - 1, +p[2]); return x >= t0 && x < t7; }).length;
      if (n) document.getElementById('oz-tc').textContent = n + ' Cups e Challenges nos próximos 7 dias no estado de SP. Veja onde jogar.';
    }).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
