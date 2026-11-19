/* The landing of 19 November 2026. No tracking, requests or storage. Everything here enhances content that is
   already complete without script: the hero shows its finished frame, every example and answer is in the HTML. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Numbers follow the page's language, always in Western digits (as the app writes them in Arabic too).
  // site.js knows the visitor's region; without it, the page's language alone.
  const locale = (window.teMoney && window.teMoney.locale) || (document.documentElement.lang || 'en') + '-u-nu-latn';

  // Hero: the day's arithmetic stays exact in the visitor's own money (site.js scales the example amounts).
  const money = window.teMoney;
  const hero = document.querySelector('.hx-demo');
  // style.css hides a .demo-phone's timed elements unless the phone itself is animating; the timeline runs on .hx-demo.
  if (hero && hero.classList.contains('animate')) hero.querySelector('.hx-phone').classList.add('animate');
  if (hero && money) {
    const cents = v => Math.round(money.exact(v) * 100);
    // The amounts come from the page (a localized landing may use local prices): the daily budget, then each row.
    const spent = [...hero.querySelectorAll('.hx-row .hx-amt .money')].map(el => +el.dataset.v);
    let left = cents(+hero.querySelector('.hx-v0').dataset.v);
    const values = [left];
    for (const step of [[0], [1, 2], [3]]) { for (const i of step) left -= cents(spent[i]); values.push(left); }
    hero.querySelectorAll('.hx-left b').forEach((el, i) => { el.textContent = money.format(el, values[i] / 100); });
    const coachLeft = hero.querySelector('.hx-coach .money');
    if (coachLeft) coachLeft.textContent = money.format(coachLeft, values[3] / 100);
    const plain = new Intl.NumberFormat(locale, {maximumFractionDigits: 2});
    hero.querySelectorAll('.hx-num').forEach(el => { el.textContent = plain.format(money.exact(+el.dataset.v)); });
    const brand = hero.querySelector('[data-brand]');
    if (brand) hero.setAttribute('aria-label', hero.getAttribute('aria-label').replace('Walmart', brand.textContent));
  }

  // A long review folds after a few lines behind a button; the whole text is in the page, word for word.
  const moreWords = ({ar: ['اقرأ المراجعة كاملة', 'عرض أقل'], de: ['Ganze Rezension lesen', 'Weniger anzeigen'],
    es: ['Leer la reseña completa', 'Ver menos'], pt: ['Ler a avaliação completa', 'Ver menos']})[(document.documentElement.lang || 'en').split('-')[0]]
    || ['Read the whole review', 'Show less'];
  document.querySelectorAll('.review blockquote').forEach(quote => {
    if (quote.scrollHeight <= 330) return;
    quote.classList.add('clamp');
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'rv-more'; button.textContent = moreWords[0]; button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const open = quote.classList.toggle('open');
      button.textContent = moreWords[open ? 1 : 0]; button.setAttribute('aria-expanded', String(open));
    });
    quote.after(button);
  });

  // Three ways in: a link to #say, #sms or #tap opens that tab.
  const openWay = () => {
    let target = null;
    try { target = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch {}
    if (!target) return;
    // A tab's label (localized pages put anchors such as #import there) or anything inside a tab's panel.
    const label = target.closest('.ways-tabs > label[for]');
    const panel = target.closest('.way');
    const input = label ? document.getElementById(label.htmlFor) : panel && document.getElementById([...panel.classList].find(c => c.startsWith('way-')));
    if (input) input.checked = true;
  };
  openWay(); addEventListener('hashchange', openWay);

  // See it read: one example at a time, chosen from chips; the answer arrives field by field.
  const box = document.querySelector('.try-box');
  if (box) {
    box.classList.add('try-js');
    const groups = [...box.querySelectorAll('.try-group')];
    const switcher = box.querySelector('.try-switch');
    const show = (card, animate) => {
      const group = card.closest('.try-group');
      group.querySelectorAll('.try-card').forEach(c => c.classList.toggle('active', c === card));
      group.querySelectorAll('.try-chips button').forEach(b => b.setAttribute('aria-pressed', String(b.card === card)));
      if (animate && !reduced) { card.classList.remove('reading'); void card.offsetWidth; card.classList.add('reading'); }
    };
    for (const group of groups) {
      const chips = document.createElement('div');
      chips.className = 'try-chips';
      chips.setAttribute('role', 'group');
      chips.setAttribute('aria-label', group.querySelector('.try-title').textContent);
      group.querySelectorAll('.try-card').forEach(card => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = card.dataset.label; b.card = card;
        b.addEventListener('click', () => { show(card, true); b.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth'}); });
        chips.append(b);
      });
      group.insertBefore(chips, group.querySelector('.try-card'));
      show(group.querySelector('.try-card'), false);
    }
    const pick = name => {
      groups.forEach(g => g.classList.toggle('active', g.dataset.group === name));
      switcher.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.group === name)));
    };
    switcher.hidden = false;
    switcher.querySelectorAll('button').forEach(b => b.addEventListener('click', () => pick(b.dataset.group)));
    pick('say');
    // The first example reads itself once, when the box first comes into view.
    if ('IntersectionObserver' in window && !reduced) {
      const once = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        const active = box.querySelector('.try-group.active .try-card.active');
        if (active) show(active, true);
        once.disconnect();
      }, {threshold: 0.4});
      once.observe(box);
    }
  }

  // What can I spend per day: (left − bills still to come) ÷ days left, rounded down to the cent, as the app does.
  const calc = document.querySelector('.today-calc');
  if (calc) {
    const left = calc.querySelector('#tc-left'), bills = calc.querySelector('#tc-bills'), days = calc.querySelector('#tc-days'), out = calc.querySelector('#tc-out');
    const fmt = new Intl.NumberFormat(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    const num = el => { const v = parseFloat(String(el.value).replace(/,/g, '')); return Number.isFinite(v) ? v : 0; };
    const update = () => {
      const d = Math.max(1, Math.round(num(days)));
      const pool = Math.max(0, num(left) - num(bills));
      out.textContent = fmt.format(Math.floor(Math.round(pool * 100) / d) / 100); // whole cents first, so 1.15 stays 1.15
    };
    calc.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => {
      const input = calc.querySelector('#' + b.dataset.for);
      const min = Number(input.min || 0), max = input.max ? Number(input.max) : Infinity;
      input.value = String(Math.min(max, Math.max(min, Math.round((num(input) + Number(b.dataset.step)) * 100) / 100)));
      update();
    }));
    calc.addEventListener('input', update);
    update();
  }
})();
