/* No tracking, requests, storage or input persistence. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canObserve = 'IntersectionObserver' in window;
  // Motion is opt-in: without JS or with Reduce Motion, every element is simply visible in its final state.
  if (!reduced.matches && canObserve) document.documentElement.classList.add('motion');

  // Scroll reveals and count-ups run once, when the element first enters the viewport.
  const countUp = el => {
    const target = Number(el.dataset.count), decimals = Number(el.dataset.decimals || 0);
    const format = n => n.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
    if (!target || reduced.matches) { el.textContent = format(target); return; }
    const t0 = performance.now(), duration = 1400;
    const frame = now => {
      const p = Math.min(1, (now - t0) / duration), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  if (canObserve) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        reveal.unobserve(entry.target);
      }
    }, {threshold: 0.18, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  }

  // Sticky feature tabs follow the story being read.
  const tabs = [...document.querySelectorAll('.feature-jump a')];
  if (tabs.length && canObserve) {
    const spy = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        tabs.forEach(tab => tab.classList.toggle('active', tab.getAttribute('href') === '#' + entry.target.id));
      }
    }, {rootMargin: '-45% 0px -45% 0px'});
    tabs.forEach(tab => { const target = document.querySelector(tab.getAttribute('href')); if (target) spy.observe(target); });
  }

  // Demo phones: a declarative timeline. data-at / data-off are milliseconds into the loop,
  // data-pulse a list of moments for a brief .ping. Runs only while visible and not paused.
  document.querySelectorAll('[data-demo]').forEach(demo => {
    const screen = demo.querySelector('.demo-screen');
    const words = demo.querySelector('[data-words]');
    if (words) {
      const start = Number(words.dataset.start), step = Number(words.dataset.step);
      words.dataset.words.split(' ').forEach((word, i) => {
        const span = document.createElement('span'); span.textContent = word; span.dataset.at = start + i * step; words.append(span);
      });
    }
    const timed = [...demo.querySelectorAll('[data-at],[data-off],[data-pulse]')];
    const loop = Number(demo.dataset.loop);
    const toggle = demo.parentElement.querySelector('.demo-toggle');
    let elapsed = 0, timer = null, visible = false, userPaused = false, resetting = false;
    const render = () => {
      for (const el of timed) {
        if (el.dataset.at) el.classList.toggle('on', elapsed >= Number(el.dataset.at));
        if (el.dataset.off) el.classList.toggle('off', elapsed >= Number(el.dataset.off));
        if (el.dataset.pulse) el.classList.toggle('ping', el.dataset.pulse.split(',').some(t => elapsed >= +t && elapsed < +t + 700));
      }
    };
    const tick = () => {
      if (resetting) return;
      elapsed += 100;
      if (elapsed < loop) { render(); return; }
      resetting = true; screen.classList.add('fade');
      setTimeout(() => { elapsed = 0; render(); screen.classList.remove('fade'); resetting = false; }, 500);
    };
    const sync = () => {
      const run = visible && !userPaused && !document.hidden;
      demo.classList.toggle('paused', !run);
      if (run && !timer) timer = setInterval(tick, 100);
      if (!run && timer) { clearInterval(timer); timer = null; }
      if (toggle) { toggle.textContent = userPaused ? 'Play' : 'Pause'; toggle.setAttribute('aria-label', (userPaused ? 'Play' : 'Pause') + ' animation'); }
    };
    // Reduced motion keeps the finished screen: drafts listed, messages read, rows filed.
    if (reduced.matches || !canObserve) return;
    demo.classList.add('animate'); render();
    if (toggle) { toggle.hidden = false; toggle.addEventListener('click', () => { userPaused = !userPaused; sync(); }); }
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold: 0.35}).observe(demo);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', () => { if (reduced.matches) { userPaused = true; sync(); } });
  });

  // Screenshot rail: arrow buttons scroll by one card on wider screens.
  const rail = document.querySelector('.screen-gallery'), controls = document.querySelector('.gallery-controls');
  if (rail && controls) {
    controls.hidden = false;
    const [prev, next] = controls.querySelectorAll('button');
    const card = () => (rail.querySelector('.gallery-card')?.getBoundingClientRect().width || 300) + 22;
    const state = () => { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8; };
    prev.addEventListener('click', () => rail.scrollBy({left: -card()}));
    next.addEventListener('click', () => rail.scrollBy({left: card()}));
    rail.addEventListener('scroll', state, {passive: true}); addEventListener('resize', state); state();
  }

  const film = document.querySelector('#hero-film');
  if (film) {
    const toggle = document.querySelector('#film-toggle');
    const saveData = navigator.connection?.saveData;
    toggle.hidden = false;
    const label = () => { toggle.textContent = film.paused ? 'Play animation' : 'Pause animation'; };
    const start = () => {
      if (!film.querySelector('source').src) { film.querySelector('source').src = film.querySelector('source').dataset.src; film.load(); }
      film.play().catch(label);
    };
    toggle.addEventListener('click', () => {
      const shouldStart = film.paused;
      film.dataset.userPaused = shouldStart ? '' : 'true';
      shouldStart ? start() : film.pause();
    });
    film.addEventListener('play', label); film.addEventListener('pause', label);
    reduced.addEventListener('change', () => { if (reduced.matches) film.pause(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });
    // The below-fold illustration loads only when it is actually in view.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) film.pause();
          else if (!reduced.matches && !saveData && !film.dataset.userPaused) start();
        }
      }, {threshold: 0.25});
      observer.observe(film);
    }
  }
  const form = document.querySelector('#budget-form');
  if (!form) return;
  const dateValue = date => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  const today = new Date(); const end = new Date(today); end.setDate(end.getDate()+9);
  document.querySelector('#today').value = dateValue(today); document.querySelector('#end').value = dateValue(end);
  const money = n => n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
  const day = str => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str); return m ? Date.UTC(+m[1],+m[2]-1,+m[3])/86400000 : NaN; };
  form.addEventListener('submit', event => {
    event.preventDefault(); const result=document.querySelector('#calc-result');
    if (!form.reportValidity()) return;
    const budget=Number(form.elements.budget.value), spent=Number(form.elements.spent.value), reserved=Number(form.elements.reserved.value);
    const days=day(form.elements.end.value)-day(form.elements.today.value)+1;
    if (![budget,spent,reserved,days].every(Number.isFinite) || Math.min(budget,spent,reserved)<0 || days<1 || days>3660) {
      result.textContent='Use non-negative amounts and a period ending today or later, within ten years.'; return;
    }
    const raw=budget-spent-reserved, remaining=Math.max(0,raw);
    result.textContent=raw<0 ? `Budget exceeded by ${money(-raw)} after extra commitments. Daily amount: 0.00 over ${days} day${days===1?'':'s'}, including today.` : `${money(remaining)} remaining ÷ ${days} day${days===1?'':'s'}, including today = ${money(remaining/days)} per day.`;
  });
})();
