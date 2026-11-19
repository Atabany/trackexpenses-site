/* No tracking, requests, storage or input persistence. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canObserve = 'IntersectionObserver' in window;
  // Motion is opt-in: without JS or with Reduce Motion, every element is simply visible in its final state.
  if (!reduced.matches && canObserve) document.documentElement.classList.add('motion');

  // A phone visitor can install while reading, without duplicating a visible download button.
  const mobileDownload = document.querySelector('.mobile-download');
  if (mobileDownload && canObserve) {
    const phone = matchMedia('(max-width: 760px)');
    const visibleDownloads = new Set();
    const syncDownload = () => {
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
      if (mobileDownload.contains(document.activeElement)) return;
      mobileDownload.hidden = !phone.matches || visibleDownloads.size > 0 || editing;
    };
    const downloads = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) visibleDownloads.add(entry.target);
        else visibleDownloads.delete(entry.target);
      }
      syncDownload();
    }, {threshold: [0, 0.5, 1]});
    document.querySelectorAll('.store-cta').forEach(link => {
      if (!mobileDownload.contains(link)) downloads.observe(link);
    });
    phone.addEventListener('change', syncDownload);
    document.addEventListener('focusin', syncDownload);
    document.addEventListener('focusout', () => requestAnimationFrame(syncDownload));
  }

  // The phone header's menu closes on a link, a tap outside it and Escape (it works without script as a plain disclosure).
  document.querySelectorAll('.nav-menu').forEach(menu => {
    const close = () => { menu.open = false; };
    menu.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.open) { close(); menu.querySelector('summary').focus(); } });
  });

  // Example amounts follow the visitor's own currency. The region comes from the browser's time
  // zone or language — nothing is requested or stored. Base values are US-dollar sized and are
  // scaled by a rough, rounded factor so a coffee never reads as ¥5. Illustrative, not live rates.
  const localMoney = (() => {
    const zones = {Dubai:'AE',Riyadh:'SA',Qatar:'QA',Kuwait:'KW',Bahrain:'BH',Muscat:'OM',Amman:'JO',Cairo:'EG',Casablanca:'MA',Algiers:'DZ',Tunis:'TN',Beirut:'LB',Baghdad:'IQ',Jerusalem:'IL',Istanbul:'TR',Kolkata:'IN',Calcutta:'IN',Karachi:'PK',Dhaka:'BD',Colombo:'LK',Kathmandu:'NP',Shanghai:'CN',Hong_Kong:'HK',Taipei:'TW',Tokyo:'JP',Seoul:'KR',Singapore:'SG',Kuala_Lumpur:'MY',Jakarta:'ID',Bangkok:'TH',Ho_Chi_Minh:'VN',Manila:'PH',Lagos:'NG',Nairobi:'KE',Accra:'GH',Johannesburg:'ZA',Dar_es_Salaam:'TZ',Kampala:'UG',Addis_Ababa:'ET',London:'GB',Dublin:'IE',Paris:'FR',Berlin:'DE',Madrid:'ES',Rome:'IT',Amsterdam:'NL',Brussels:'BE',Vienna:'AT',Lisbon:'PT',Helsinki:'FI',Athens:'GR',Zurich:'CH',Stockholm:'SE',Oslo:'NO',Copenhagen:'DK',Warsaw:'PL',Prague:'CZ',Budapest:'HU',Bucharest:'RO',Sofia:'BG',Moscow:'RU',Kyiv:'UA',Kiev:'UA',Toronto:'CA',Vancouver:'CA',Sydney:'AU',Melbourne:'AU',Auckland:'NZ',Mexico_City:'MX',Sao_Paulo:'BR',Buenos_Aires:'AR',Santiago:'CL',Bogota:'CO',Lima:'PE'};
    const euro = 'IE FR DE ES IT NL BE AT PT FI GR SK SI EE LV LT LU MT CY HR'.split(' ');
    const byRegion = {US:'USD',CA:'CAD',GB:'GBP',AU:'AUD',NZ:'NZD',CH:'CHF',SE:'SEK',NO:'NOK',DK:'DKK',PL:'PLN',CZ:'CZK',HU:'HUF',RO:'RON',BG:'BGN',TR:'TRY',RU:'RUB',UA:'UAH',AE:'AED',SA:'SAR',QA:'QAR',KW:'KWD',BH:'BHD',OM:'OMR',JO:'JOD',EG:'EGP',MA:'MAD',DZ:'DZD',TN:'TND',LB:'LBP',IQ:'IQD',IL:'ILS',IN:'INR',PK:'PKR',BD:'BDT',LK:'LKR',NP:'NPR',CN:'CNY',HK:'HKD',TW:'TWD',JP:'JPY',KR:'KRW',SG:'SGD',MY:'MYR',ID:'IDR',TH:'THB',VN:'VND',PH:'PHP',NG:'NGN',KE:'KES',GH:'GHS',ZA:'ZAR',TZ:'TZS',UG:'UGX',ET:'ETB',MX:'MXN',BR:'BRL',AR:'ARS',CL:'CLP',CO:'COP',PE:'PEN'};
    const scale = {AED:4,SAR:4,QAR:4,OMR:.4,KWD:.3,BHD:.4,JOD:.7,EGP:50,MAD:10,DZD:130,TND:3,LBP:90000,IQD:1300,ILS:4,TRY:40,GBP:.8,CHF:.9,CAD:1.4,AUD:1.5,NZD:1.7,SEK:10,NOK:10,DKK:7,PLN:4,CZK:23,HUF:350,RON:4.5,BGN:1.8,RUB:90,UAH:41,INR:85,PKR:280,BDT:120,LKR:300,NPR:135,CNY:7,HKD:8,TWD:32,JPY:150,KRW:1400,SGD:1.3,MYR:4.5,IDR:16000,THB:35,VND:25000,PHP:57,NGN:1500,KES:130,GHS:15,ZAR:18,TZS:2600,UGX:3700,ETB:120,MXN:19,BRL:5.5,ARS:1000,CLP:950,COP:4000,PEN:3.8};
    let region = 'US';
    try {
      const zone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').split('/').pop();
      const lang = new Intl.Locale(navigator.language || 'en-US');
      region = zones[zone] || lang.region || lang.maximize().region || 'US';
    } catch {}
    const code = euro.includes(region) ? 'EUR' : (byRegion[region] || 'USD');
    // The shops in the demos follow the visitor as the amounts do: the page ships American, the Gulf
    // and the wider Arab world see their own shops and an Arabic bank alert, as the app's onboarding does.
    const arab = 'AE SA QA KW BH OM JO EG MA DZ TN LB IQ'.split(' ').includes(region);
    const grocery = arab || code !== 'USD' ? 'Carrefour' : 'Walmart', fuel = arab ? 'ENOC' : 'Shell';
    if (arab) {
      const gulf = document.getElementById('gulf-alert');
      const english = gulf && gulf.previousElementSibling;
      if (english) english.replaceWith(gulf.content.cloneNode(true));
    }
    document.querySelectorAll('[data-brand]').forEach(el => { const name = el.dataset.brand === 'fuel' ? fuel : grocery; el.textContent = 'upper' in el.dataset ? name.toUpperCase() : name; });
    const rename = text => (arab ? text.replace('a card debit for', 'an Arabic alert for') : text).replace(/Walmart/g, grocery).replace(/Shell/g, fuel);
    document.querySelectorAll('.demo-phone[aria-label]').forEach(el => el.setAttribute('aria-label', rename(el.getAttribute('aria-label'))));
    document.querySelectorAll('[data-words]').forEach(el => { el.dataset.words = rename(el.dataset.words); });
    const factor = scale[code] || 1;
    // Formatted in the page's language for the visitor's region, in Western digits (the app's choice for Arabic too).
    const pageLang = (document.documentElement.lang || 'en').split('-')[0];
    const locale = (pageLang === 'ar' ? 'en' : pageLang) + '-' + region + '-u-nu-latn'; // Arabic writes AED 312.40, as the app does
    const make = opts => { try { return new Intl.NumberFormat(locale, {style: 'currency', currency: code, ...opts}); } catch { return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', ...opts}); } };
    const symbol = make({currencyDisplay: 'narrowSymbol'}), plainCode = make({currencyDisplay: 'code'});
    // Spoken numbers are whole and rounded like a person would say them.
    const nice = v => { const x = v * factor; if (x < 10) return Math.round(x * 10) / 10; if (x < 100) return Math.round(x); const p = Math.pow(10, Math.floor(Math.log10(x)) - 1); return Math.round(x / p) * p; };
    const exact = v => Math.round(v * factor * 100) / 100;
    const grouped = n => n.toLocaleString(locale); // spoken numbers as the page's language writes them ("café 1,5")
    const value = el => el.dataset.sum ? el.dataset.sum.split(',').reduce((t, v) => t + nice(+v), 0) : ('int' in el.dataset ? nice(+el.dataset.v) : exact(+el.dataset.v));
    const format = (el, n) => ('code' in el.dataset && code !== 'USD' ? plainCode : symbol).format(n); // an American bank writes the dollar sign
    document.querySelectorAll('.num[data-v]').forEach(el => { el.textContent = grouped(nice(+el.dataset.v)); });
    document.querySelectorAll('[data-words]').forEach(el => { el.dataset.words = el.dataset.words.replace(/\{([\d.]+)\}/g, (_, v) => grouped(nice(+v))); });
    document.querySelectorAll('.money').forEach(el => {
      const n = value(el);
      if (el.dataset.count) el.dataset.count = n;
      el.textContent = format(el, n);
    });
    return {format, nice, exact, factor, locale};
  })();
  window.teMoney = localMoney; // home.js keeps its demo arithmetic in the same scaled money

  // Scroll reveals and count-ups run once, when the element first enters the viewport.
  const countUp = el => {
    const target = Number(el.dataset.count), decimals = Number(el.dataset.decimals || 0);
    const format = el.classList.contains('money') ? n => localMoney.format(el, n) : n => n.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
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

  // The demos' pause button speaks the page's language: [visible label, spoken label] for Pause, then for Play.
  // The spoken label always contains the visible word (WCAG 2.5.3, label in name).
  const toggleWords = ({
    ar: [['إيقاف مؤقت', 'إيقاف مؤقت للحركة'], ['تشغيل', 'تشغيل الحركة']],
    de: [['Pausieren', 'Animation pausieren'], ['Abspielen', 'Animation abspielen']],
    es: [['Pausar', 'Pausar la animación'], ['Reproducir', 'Reproducir la animación']],
    pt: [['Pausar', 'Pausar a animação'], ['Reproduzir', 'Reproduzir a animação']]
  })[(document.documentElement.lang || 'en').split('-')[0]] || [['Pause', 'Pause animation'], ['Play', 'Play animation']];

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
      if (toggle) { const w = toggleWords[userPaused ? 1 : 0]; toggle.textContent = w[0]; toggle.setAttribute('aria-label', w[1]); }
    };
    // Reduced motion keeps the finished screen: drafts listed, messages read, rows filed.
    if (reduced.matches || !canObserve) return;
    demo.classList.add('animate'); render();
    if (toggle) { toggle.hidden = false; toggle.addEventListener('click', () => { userPaused = !userPaused; sync(); }); }
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold: Number(demo.dataset.threshold || 0.35)}).observe(demo);
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
  const figure = n => n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});

  // 50/30/20: take-home pay times each share, per paycheck, per month and per year.
  const split = document.querySelector('#split-form');
  if (split) {
    const result = document.querySelector('#split-result'), rows = document.querySelectorAll('#split-table tbody tr');
    const cycles = {12:'once a month', 24:'twice a month', 26:'every two weeks', 52:'every week'};
    split.addEventListener('submit', event => {
      event.preventDefault();
      if (!split.reportValidity()) return;
      const pay = Number(split.elements.pay.value), perYear = Number(split.elements.cycle.value);
      const shares = ['needs','wants','savings'].map(name => Number(split.elements[name].value));
      const total = shares.reduce((sum, share) => sum + share, 0);
      if (![pay, perYear, ...shares].every(Number.isFinite) || pay < 0 || shares.some(share => share < 0)) {
        result.textContent = 'Use a pay of zero or more and shares between 0 and 100.'; return;
      }
      if (Math.abs(total - 100) > 0.001) {
        result.textContent = `The three shares must add up to 100%. They add up to ${total}%.`; return;
      }
      const names = ['Needs','Wants','Savings'];
      shares.forEach((share, index) => {
        const perPay = pay * share / 100, cells = rows[index].children;
        cells[0].textContent = `${names[index]} (${share}%)`;
        cells[1].textContent = figure(perPay);
        cells[2].textContent = figure(perPay * perYear / 12);
        cells[3].textContent = figure(perPay * perYear);
      });
      const amounts = shares.map(share => figure(pay * share / 100));
      result.textContent = `Take-home pay of ${figure(pay)} ${cycles[perYear]} gives ${amounts[0]} for needs, ${amounts[1]} for wants and ${amounts[2]} for savings per paycheck.`;
    });
  }

  // Subscriptions: every price as a year, then the total as a month, a year and five years.
  const subs = document.querySelector('#subs-form');
  if (subs) {
    const rowsBox = document.querySelector('#subs-rows'), result = document.querySelector('#subs-result'), list = document.querySelector('#subs-list');
    const template = rowsBox.querySelector('.sub-row').cloneNode(true);
    document.querySelector('#subs-add').addEventListener('click', () => {
      if (rowsBox.children.length >= 40) return;
      const row = template.cloneNode(true);
      row.querySelector('[name=name]').value = ''; row.querySelector('[name=price]').value = ''; row.querySelector('[name=cycle]').value = '12';
      rowsBox.append(row); row.querySelector('[name=name]').focus();
    });
    rowsBox.addEventListener('click', event => {
      const button = event.target.closest('.sub-remove');
      if (button && rowsBox.children.length > 1) button.closest('.sub-row').remove();
    });
    subs.addEventListener('submit', event => {
      event.preventDefault();
      if (!subs.reportValidity()) return;
      const items = [...rowsBox.querySelectorAll('.sub-row')].map((row, index) => ({
        name: row.querySelector('[name=name]').value.trim() || `Subscription ${index + 1}`,
        yearly: Number(row.querySelector('[name=price]').value) * Number(row.querySelector('[name=cycle]').value)
      }));
      if (!items.every(item => Number.isFinite(item.yearly) && item.yearly >= 0)) {
        result.textContent = 'Use prices of zero or more.'; return;
      }
      const yearly = items.reduce((sum, item) => sum + item.yearly, 0), pay = Number(subs.elements.pay.value);
      let text = `${items.length} subscription${items.length === 1 ? '' : 's'} come${items.length === 1 ? 's' : ''} to ${figure(yearly / 12)} a month, ${figure(yearly)} a year and ${figure(yearly * 5)} over five years.`;
      if (Number.isFinite(pay) && pay > 0) text += ` That is ${(yearly / 12 / pay * 100).toLocaleString(undefined,{maximumFractionDigits:1})}% of your monthly take-home pay.`;
      result.textContent = text;
      list.replaceChildren(...items.sort((a, b) => b.yearly - a.yearly).map(item => {
        const line = document.createElement('li'); line.textContent = `${item.name}: ${figure(item.yearly)} a year`; return line;
      }));
    });
  }

  // Shared by the date-based calculators: a date as a day number, today shifted by some days, a share as a percentage.
  const dayNumber = str => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str); return m ? Date.UTC(+m[1],+m[2]-1,+m[3])/86400000 : NaN; };
  const localDay = offset => { const d = new Date(); d.setDate(d.getDate()+offset); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); };
  const percent = n => (n*100).toLocaleString(undefined,{maximumFractionDigits:1}) + '%';
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  // A field marked data-for shows only for the options it names.
  const showFor = (formEl, value) => formEl.querySelectorAll('[data-for]').forEach(field => {
    field.hidden = !field.dataset.for.split(' ').includes(value);
    // A hidden field is disabled too, or the browser still validates it and blocks the form with nothing to show.
    field.querySelectorAll('input,select').forEach(control => { control.disabled = field.hidden; });
  });

  // Budget pacing: share of the budget spent against share of the period passed (days before today).
  const pace = document.querySelector('#pace-form');
  if (pace) {
    const result = document.querySelector('#pace-result'), cells = [...document.querySelectorAll('#pace-table tbody td')];
    pace.elements.start.value = localDay(-15); pace.elements.end.value = localDay(14); pace.elements.today.value = localDay(0);
    pace.addEventListener('submit', event => {
      event.preventDefault();
      if (!pace.reportValidity()) return;
      const budget = Number(pace.elements.budget.value), spent = Number(pace.elements.spent.value);
      const start = dayNumber(pace.elements.start.value), end = dayNumber(pace.elements.end.value), today = dayNumber(pace.elements.today.value);
      const total = end - start + 1;
      if (![budget, spent, total, today].every(Number.isFinite) || budget <= 0 || spent < 0 || total < 1 || total > 3660 || today < start) {
        result.textContent = 'Use a budget above zero, a last day on or after the first day, and a today that is not before the period starts.'; return;
      }
      const done = Math.min(today - start, total), left = Math.max(0, end - today + 1);
      const elapsed = done / total, even = budget * elapsed, gap = spent - even, remaining = budget - spent;
      const projected = done > 0 ? spent / done * total : null;
      cells[0].textContent = percent(spent / budget);
      cells[1].textContent = `${percent(elapsed)} (${done} of ${plural(total, 'day')})`;
      cells[2].textContent = figure(even);
      cells[3].textContent = Math.abs(gap) < 0.005 ? 'On pace' : `${figure(Math.abs(gap))} ${gap > 0 ? 'over' : 'under'}`;
      cells[4].textContent = projected === null ? 'Needs one completed day' : `${figure(projected)} (${Math.abs(projected - budget) < 0.005 ? 'on budget' : `${figure(Math.abs(projected - budget))} ${projected > budget ? 'over' : 'under'} budget`})`;
      cells[5].textContent = left === 0 ? 'The period has ended' : remaining <= 0 ? `0.00 (budget used up, ${plural(left, 'day')} left)` : `${figure(remaining / left)} for ${plural(left, 'day')}`;
      if (left === 0) { result.textContent = `The period has ended: ${percent(spent / budget)} of the budget was spent, ${figure(Math.abs(remaining))} ${remaining >= 0 ? 'under' : 'over'} budget.`; return; }
      result.textContent = `${percent(spent / budget)} of the budget is spent with ${percent(elapsed)} of the period gone. ` + (gap > 0.005 ? `That is ${figure(gap)} more than an even pace.` : gap < -0.005 ? `That is ${figure(-gap)} less than an even pace.` : 'That is exactly an even pace.');
    });
  }

  // Paydays: every 7 or 14 days from a known payday, or fixed days of the month, for twelve calendar months.
  const payday = document.querySelector('#payday-form');
  if (payday) {
    const result = document.querySelector('#payday-result'), body = document.querySelector('#payday-table tbody');
    const sync = () => showFor(payday, payday.elements.cycle.value);
    payday.elements.cycle.addEventListener('change', sync); sync();
    payday.elements.today.value = localDay(0);
    const utc = n => new Date(n * 86400000);
    const long = n => utc(n).toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
    // A day of the month: the last day when the month is shorter, the Friday before a weekend when asked.
    const fixed = (year, month, day, toFriday) => {
      const last = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      let n = Date.UTC(year, month, Math.min(day, last)) / 86400000;
      const weekday = utc(n).getUTCDay();
      if (toFriday && weekday === 6) n -= 1;
      if (toFriday && weekday === 0) n -= 2;
      return n;
    };
    payday.addEventListener('submit', event => {
      event.preventDefault();
      if (!payday.reportValidity()) return;
      const cycle = payday.elements.cycle.value, today = dayNumber(payday.elements.today.value);
      if (!Number.isFinite(today)) { result.textContent = 'Enter today’s date.'; return; }
      const year = utc(today).getUTCFullYear(), month = utc(today).getUTCMonth();
      const from = Date.UTC(year, month, 1) / 86400000, to = Date.UTC(year, month + 13, 1) / 86400000;
      // Each payday keeps the month it belongs to: one moved back to a Friday can fall in the month before.
      let days = [];
      const entry = n => ({n, key: utc(n).getUTCFullYear() * 12 + utc(n).getUTCMonth()});
      if (cycle === '14' || cycle === '7') {
        const step = Number(cycle), known = dayNumber(payday.elements.known.value);
        if (!Number.isFinite(known)) { result.textContent = 'Enter one payday you know.'; return; }
        for (let n = known + Math.ceil((from - known) / step) * step; n < to; n += step) days.push(entry(n));
      } else {
        const picks = [Number(payday.elements.day1.value)];
        if (cycle === 'twice') picks.push(Number(payday.elements.day2.value));
        if (!picks.every(day => Number.isInteger(day) && day >= 1 && day <= 31) || picks[0] === picks[1]) {
          result.textContent = cycle === 'twice' ? 'Use two different days of the month, each between 1 and 31.' : 'Use a day of the month between 1 and 31.'; return;
        }
        const toFriday = payday.elements.weekend.value === 'friday';
        for (let i = 0; i <= 13; i++) for (const day of picks) {
          const n = fixed(year, month + i, day, toFriday);
          if (!days.some(other => other.n === n)) days.push({n, key: year * 12 + month + i});
        }
        days.sort((a, b) => a.n - b.n);
      }
      const next = days.find(day => day.n >= today).n, after = days.find(day => day.n > today).n;
      const usual = cycle === '14' ? 2 : cycle === '7' ? 4 : null, extras = [];
      let count = 0;
      body.replaceChildren(...Array.from({length: 12}, (_, i) => {
        const first = Date.UTC(year, month + i, 1) / 86400000, key = year * 12 + month + i;
        const inMonth = days.filter(day => day.key === key), name = utc(first).toLocaleDateString(undefined,{month:'long',year:'numeric',timeZone:'UTC'});
        // A payday moved into the month before is written with its month, e.g. "30 Apr" in May's row.
        const label = day => day.n >= first ? String(utc(day.n).getUTCDate()) : utc(day.n).toLocaleDateString(undefined,{day:'numeric',month:'short',timeZone:'UTC'});
        count += inMonth.length;
        if (usual && inMonth.length > usual) extras.push(name);
        const row = document.createElement('tr'), head = document.createElement('th');
        head.scope = 'row'; head.textContent = name; row.append(head);
        for (const text of [inMonth.map(label).join(', ') || 'None', String(inMonth.length)]) { const cell = document.createElement('td'); cell.textContent = text; row.append(cell); }
        return row;
      }));
      let text = next === today ? `Today is payday. The next one is ${long(after)}, in ${plural(after - today, 'day')}.` : `Your next payday is ${long(next)}, in ${plural(next - today, 'day')}.`;
      text += ` In the 12 months of the table, this month included, you are paid ${plural(count, 'time')}.`;
      if (extras.length) text += ` ${extras.join(', ')} ${extras.length === 1 ? 'has' : 'have'} ${usual + 1} paydays.`;
      result.textContent = text;
    });
  }

  // Savings goal: what is still to save, spread over the days to a date, or divided by a monthly amount.
  const goal = document.querySelector('#goal-form');
  if (goal) {
    const result = document.querySelector('#goal-result');
    const sync = () => showFor(goal, goal.elements.mode.value);
    goal.elements.mode.addEventListener('change', sync); sync();
    goal.elements.by.value = localDay(365);
    goal.addEventListener('submit', event => {
      event.preventDefault();
      if (!goal.reportValidity()) return;
      const target = Number(goal.elements.goal.value), saved = Number(goal.elements.saved.value), left = target - saved;
      if (![target, saved].every(Number.isFinite) || target <= 0 || saved < 0) { result.textContent = 'Use a goal above zero and savings of zero or more.'; return; }
      if (left <= 0) { result.textContent = left < 0 ? `You already have the goal amount, with ${figure(-left)} to spare.` : 'You already have the goal amount.'; return; }
      if (goal.elements.mode.value === 'date') {
        const days = dayNumber(goal.elements.by.value) - dayNumber(localDay(0));
        if (!Number.isFinite(days) || days < 1 || days > 36600) { result.textContent = 'Choose a date after today, within 100 years.'; return; }
        const perDay = left / days;
        result.textContent = `${figure(left)} still to save over ${plural(days, 'day')} is ` + (days >= 31 ? `${figure(perDay * 365 / 12)} a month, ${figure(perDay * 7)} a week or ${figure(perDay)} a day.` : days >= 7 ? `${figure(perDay * 7)} a week or ${figure(perDay)} a day.` : `${figure(perDay)} a day.`);
        return;
      }
      const monthly = Number(goal.elements.monthly.value);
      if (!(monthly > 0)) { result.textContent = 'Enter a monthly amount above zero.'; return; }
      const months = Math.ceil(left / monthly - 1e-9);
      if (months > 1200) { result.textContent = `At ${figure(monthly)} a month, ${figure(left)} takes more than 100 years. Try a larger monthly amount.`; return; }
      const when = new Date(); when.setDate(1); when.setMonth(when.getMonth() + months);
      const span = months >= 12 ? ` (${plural(Math.floor(months / 12), 'year')}${months % 12 ? ` and ${plural(months % 12, 'month')}` : ''})` : '';
      result.textContent = `At ${figure(monthly)} a month, ${figure(left)} takes ${plural(months, 'month')}${span}: you reach it in ${when.toLocaleDateString(undefined,{month:'long',year:'numeric'})}.`;
    });
  }

  // Habit cost: price times how often, as a week, a month, a year, five years and ten.
  const habit = document.querySelector('#habit-form');
  if (habit) {
    const result = document.querySelector('#habit-result'), cells = [...document.querySelectorAll('#habit-table tbody td')];
    habit.addEventListener('submit', event => {
      event.preventDefault();
      if (!habit.reportValidity()) return;
      const price = Number(habit.elements.price.value), times = Number(habit.elements.times.value), perYear = Number(habit.elements.per.value), pay = Number(habit.elements.pay.value);
      if (![price, times, perYear].every(Number.isFinite) || price < 0 || times < 0) { result.textContent = 'Use a price and a count of zero or more.'; return; }
      const yearly = price * times * perYear, unit = {365:'day', 52:'week', 12:'month'}[perYear], name = habit.elements.name.value.trim();
      [perYear === 365 ? price * times * 7 : yearly / 52, yearly / 12, yearly, yearly * 5, yearly * 10].forEach((amount, index) => { cells[index].textContent = figure(amount); });
      let text = `${name ? `${name} at` : 'At'} ${figure(price)}, ${plural(times, 'time')} a ${unit}, ${name ? '' : 'it '}costs ${figure(yearly)} a year.`;
      if (times >= 1 && price > 0) text += ` One fewer a ${unit} saves ${figure(price * perYear)} a year.`;
      if (Number.isFinite(pay) && pay > 0) text += ` That is ${(yearly / 12 / pay * 100).toLocaleString(undefined,{maximumFractionDigits:1})}% of your monthly take-home pay.`;
      result.textContent = text;
    });
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
    result.textContent=raw<0 ? `Budget exceeded by ${money(-raw)} after extra commitments. Daily amount: 0.00 over ${days} day${days===1?'':'s'}, including today.` : `${money(remaining)} remaining ÷ ${days} day${days===1?'':'s'}, including today = ${money(Math.floor(Math.round(remaining*100)/days)/100)} per day.`;
  });
})();

// Stop the previous silent tutorial when its iOS panel is hidden.
document.querySelectorAll('input[name="sms-ios"]').forEach(input => {
  input.addEventListener('change', () => {
    document.querySelectorAll('.sms-videos video').forEach(video => video.pause());
  });
});

// Watch pages remain readable without JavaScript. Time links enhance the native player.
(() => {
  const video = document.querySelector('.watch-video');
  if (!video) return;
  const seek = seconds => {
    if (!Number.isFinite(seconds) || seconds < 0) return;
    const apply = () => { video.currentTime = Math.min(seconds, video.duration || seconds); };
    if (video.readyState >= 1) apply();
    else video.addEventListener('loadedmetadata', apply, {once:true});
  };
  const initial = new URLSearchParams(location.search).get('t');
  if (initial !== null) seek(Number(initial));
  document.querySelectorAll('[data-video-time]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const seconds = Number(link.dataset.videoTime);
      seek(seconds);
      history.replaceState(null, '', link.getAttribute('href'));
      video.scrollIntoView({block:'center', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      video.focus();
    });
  });
})();

/* === Calculators batch 2026-11-19 === */
// Monthly budget, travel budget, emergency fund and net worth. Arithmetic on what is typed, in this browser only:
// nothing is requested, sent or stored.
(() => {
  const formats = {};
  const number = (n, digits = 2) => {
    formats[digits] ||= new Intl.NumberFormat(undefined, {minimumFractionDigits: digits, maximumFractionDigits: digits});
    // Never print "-0.00" for a figure that rounds to nothing.
    return formats[digits].format(Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n);
  };
  const oneDecimal = new Intl.NumberFormat(undefined, {maximumFractionDigits: 1});
  const percentFormat = new Intl.NumberFormat(undefined, {style: 'percent', maximumFractionDigits: 0});
  // A whole percent, rounded half away from zero like the app's salary plan (12.5% shows as 13%).
  const wholePercent = (part, whole) => { const x = part * 100 / whole; return Math.sign(x) * Math.round(Math.abs(x) + 1e-9); };
  const showPercent = n => percentFormat.format(n / 100);
  const plural = (n, word) => `${n}\u00a0${word}${n === 1 ? '' : 's'}`;
  const span = months => months >= 12 ? ` (${plural(Math.floor(months / 12), 'year')}${months % 12 ? ` and ${plural(months % 12, 'month')}` : ''})` : '';
  // Money is added in cents, so 0.1 + 0.2 is 0.30 and not 0.30000000000000004.
  const cents = value => Math.round(Number(value) * 100);
  const amountOf = input => input.value.trim() === '' ? 0 : Number(input.value);
  const dayNumber = str => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000 : NaN; };
  const localDay = offset => { const d = new Date(); d.setDate(d.getDate() + offset); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); };
  // A field marked data-for shows only for the option it names; hidden fields are disabled so they never block the form.
  const showFor = (formEl, value) => formEl.querySelectorAll('[data-for]').forEach(field => {
    field.hidden = !field.dataset.for.split(' ').includes(value);
    field.querySelectorAll('input,select').forEach(control => { control.disabled = field.hidden; });
  });
  // Rows that can be added and removed; at least one always stays.
  const editableRows = (box, addButton, max = 40) => {
    const template = box.querySelector('.sub-row').cloneNode(true);
    addButton.addEventListener('click', () => {
      if (box.children.length >= max) return;
      const row = template.cloneNode(true);
      row.querySelectorAll('input').forEach(input => { input.value = ''; input.removeAttribute('placeholder'); });
      row.querySelectorAll('select').forEach(select => { select.selectedIndex = 0; });
      box.append(row); row.querySelector('input').focus();
    });
    box.addEventListener('click', event => {
      const button = event.target.closest('.sub-remove');
      if (!button || box.children.length <= 1) return;
      const row = button.closest('.sub-row'), next = row.nextElementSibling || row.previousElementSibling;
      row.remove(); next.querySelector('input').focus();
    });
  };
  const cell = (tag, text, scope) => { const el = document.createElement(tag); el.textContent = text; if (scope) el.scope = scope; return el; };
  const tableRow = (label, ...values) => { const row = document.createElement('tr'); row.append(cell('th', label, 'row'), ...values.map(v => cell('td', v))); return row; };
  const setCells = (table, values) => table.querySelectorAll('tbody td').forEach((td, i) => { td.textContent = values[i]; });

  // Monthly budget: one paycheck turned into a month, every line's share of it, and what is left to plan.
  const month = document.querySelector('#month-form');
  if (month) {
    const box = document.querySelector('#month-rows'), result = document.querySelector('#month-result');
    const body = document.querySelector('#month-table tbody'), foot = document.querySelector('#month-table tfoot');
    const cycles = {12: 'a month', 24: 'twice a month', 26: 'every two weeks', 52: 'every week'};
    editableRows(box, document.querySelector('#month-add'));
    month.addEventListener('submit', event => {
      event.preventDefault();
      if (!month.reportValidity()) return;
      const pay = Number(month.elements.pay.value), perYear = Number(month.elements.cycle.value), income = pay * perYear / 12;
      const lines = [...box.querySelectorAll('.sub-row')].map((row, i) => ({
        name: row.querySelector('[name=name]').value.trim() || `Line ${i + 1}`,
        cents: cents(amountOf(row.querySelector('[name=amount]'))),
        saving: row.querySelector('[name=kind]').value === 'save'
      }));
      if (!Number.isFinite(income) || income < 0 || !lines.every(line => Number.isFinite(line.cents) && line.cents >= 0)) {
        result.textContent = 'Use a take-home pay and line amounts of zero or more.'; return;
      }
      const sum = list => list.reduce((total, line) => total + line.cents, 0) / 100;
      const spending = sum(lines.filter(line => !line.saving)), saving = sum(lines.filter(line => line.saving)), planned = spending + saving;
      const left = income - planned, hasIncome = income > 0, share = amount => hasIncome ? showPercent(wholePercent(amount, income)) : '—';
      const plannedShare = hasIncome ? wholePercent(planned, income) : 0;
      body.replaceChildren(...lines.map(line => tableRow(line.name, number(line.cents / 100), share(line.cents / 100))));
      const over = hasIncome && left < -0.005;
      foot.replaceChildren(
        tableRow('Spending', number(spending), share(spending)),
        tableRow('Saving', number(saving), share(saving)),
        tableRow('Planned', number(planned), share(planned)),
        tableRow(over ? 'Over by' : 'Left to plan', hasIncome ? number(Math.abs(left)) : '—',
          !hasIncome ? '—' : over ? share(-left) : showPercent(Math.max(0, 100 - plannedShare))));
      if (!hasIncome) { result.textContent = `Your lines come to ${number(planned)} a month. Enter your take-home pay to see what is left to plan and each line's share of it.`; return; }
      const intro = perYear === 12 ? '' : `${number(pay)} ${cycles[perYear]} is ${number(income)} a month. `;
      result.textContent = intro + (over
        ? `Your plan is ${number(-left)} (${share(-left)}) more than your take-home pay of ${number(income)} a month. Lower a line or two until nothing is over.`
        : Math.abs(left) <= 0.005
          ? `Every part of your ${number(income)} a month has a job: nothing is left to plan.`
          : `You have planned ${number(planned)} (${showPercent(plannedShare)}) of ${number(income)} a month, so ${number(left)} (${showPercent(Math.max(0, 100 - plannedShare))}) is left to plan. Give it a job, such as savings, until nothing is left.`);
    });
  }

  // Travel budget: what is left, shared across the days left (today included), at home and in local money.
  const trip = document.querySelector('#trip-form');
  if (trip) {
    const result = document.querySelector('#trip-result'), table = document.querySelector('#trip-table'), unit = document.querySelector('#trip-unit');
    const sync = () => showFor(trip, trip.elements.mode.value);
    trip.elements.mode.addEventListener('change', sync); sync();
    trip.elements.start.value = localDay(-4); trip.elements.end.value = localDay(5); trip.elements.today.value = localDay(0);
    const label = () => trip.elements.code.value.trim();
    trip.elements.code.addEventListener('input', () => { unit.textContent = label() || 'unit of local money'; });
    // A currency code such as JPY gets its own usual decimals; anything else gets two.
    const digitsFor = code => { try { return /^[A-Za-z]{3}$/.test(code) ? new Intl.NumberFormat('en', {style: 'currency', currency: code.toUpperCase()}).resolvedOptions().maximumFractionDigits : 2; } catch { return 2; } };
    trip.addEventListener('submit', event => {
      event.preventDefault();
      if (!trip.reportValidity()) return;
      const budget = Number(trip.elements.budget.value), spent = Number(trip.elements.spent.value);
      let total, done, startsIn = 0;
      if (trip.elements.mode.value === 'dates') {
        const start = dayNumber(trip.elements.start.value), end = dayNumber(trip.elements.end.value), today = dayNumber(trip.elements.today.value);
        if (![start, end, today].every(Number.isFinite) || end < start) { result.textContent = 'Enter a first day, a last day on or after it, and today’s date.'; return; }
        total = end - start + 1;
        if (today < start) { startsIn = start - today; done = 0; } else done = Math.min(today - start, total);
      } else {
        total = Number(trip.elements.days.value); done = Number(trip.elements.over.value);
        if (!Number.isInteger(total) || total < 1 || !Number.isInteger(done) || done < 0) { result.textContent = 'Use a trip of at least one day and zero or more days already over.'; return; }
        done = Math.min(done, total);
      }
      if (![budget, spent].every(Number.isFinite) || budget < 0 || spent < 0 || total > 3660) { result.textContent = 'Use amounts of zero or more and a trip of up to ten years.'; return; }
      const daysLeft = total - done, left = budget - spent, even = budget * done / total, gap = spent - even, plannedDay = budget / total;
      const code = label(), rate = Number(trip.elements.rate.value), hasRate = trip.elements.rate.value.trim() !== '' && rate > 0;
      const digits = digitsFor(code), name = code || 'in local money';
      const inLocal = amount => `${number(amount / rate, digits)}\u00a0${name}`;
      // In the sentence the local figure is in brackets; in the table it is on a line of its own.
      const local = amount => hasRate ? ` (${inLocal(amount)})` : '', localLine = amount => hasRate ? `\n${inLocal(amount)}` : '';
      const pace = startsIn ? 'Not started yet' : Math.abs(gap) < 0.005 ? 'On pace' : `${number(Math.abs(gap))} ${gap > 0 ? 'over' : 'under'}`;
      if (daysLeft === 0) {
        setCells(table, [left >= 0 ? number(left) + localLine(left) : `0.00 (${number(-left)} over)`, `0 of ${total}`, 'The trip is over', number(plannedDay) + localLine(plannedDay), number(budget), left >= 0 ? `${number(left)} under` : `${number(-left)} over`]);
        result.textContent = `The trip is over: you spent ${number(spent)} of a ${number(budget)} budget, ` + (Math.abs(left) < 0.005 ? 'exactly on budget.' : `${number(Math.abs(left))} ${left > 0 ? 'under' : 'over'} budget.`);
        return;
      }
      const perDay = Math.max(0, left) / daysLeft;
      setCells(table, [
        left >= 0 ? number(left) + localLine(left) : `0.00 (${number(-left)} over)`,
        startsIn ? `${total}, starting in ${plural(startsIn, 'day')}` : `${daysLeft} of ${total}`,
        left > 0 ? number(perDay) + localLine(perDay) : '0.00 (budget used up)',
        number(plannedDay) + localLine(plannedDay),
        number(even), pace]);
      if (left <= 0) {
        result.textContent = (left < 0 ? `You have spent ${number(-left)} more than the whole budget` : 'The whole budget is spent') + `, with ${plural(daysLeft, 'day')} left. Nothing is left to share across them.`;
        return;
      }
      let text = startsIn ? `The trip starts in ${plural(startsIn, 'day')}. ` : '';
      text += `${number(left)} left for ${plural(daysLeft, 'day')} is ${number(perDay)} a day${local(perDay)}.`;
      if (!startsIn && done > 0) text += Math.abs(gap) < 0.005 ? ` That is exactly an even pace: ${number(plannedDay)} a day, as planned.`
        : ` You are ${number(Math.abs(gap))} ${gap > 0 ? 'over' : 'under'} an even pace, so each day left gets ${number(Math.abs(plannedDay - perDay))} ${gap > 0 ? 'less' : 'more'} than the ${number(plannedDay)} a day you planned.`;
      if (code && !hasRate) text += ` Add a rate to see it in ${code}.`;
      result.textContent = text;
    });
  }

  // Emergency fund: essential costs times months of cover, less what is saved, at a monthly amount.
  const fund = document.querySelector('#fund-form');
  if (fund) {
    const result = document.querySelector('#fund-result'), table = document.querySelector('#fund-table');
    const sync = () => showFor(fund, fund.elements.months.value);
    fund.elements.months.addEventListener('change', sync); sync();
    const monthYear = new Intl.DateTimeFormat(undefined, {month: 'long', year: 'numeric'});
    fund.addEventListener('submit', event => {
      event.preventDefault();
      if (!fund.reportValidity()) return;
      const costs = Number(fund.elements.costs.value), saved = Number(fund.elements.saved.value), monthly = Number(fund.elements.monthly.value);
      const months = fund.elements.months.value === 'custom' ? Number(fund.elements.custom.value) : Number(fund.elements.months.value);
      if (![costs, saved, monthly, months].every(Number.isFinite) || costs <= 0 || saved < 0 || monthly < 0 || !Number.isInteger(months) || months < 1) {
        result.textContent = 'Use essential costs above zero, a whole number of months, and savings of zero or more.'; return;
      }
      const target = (cents(costs) * months) / 100, gap = target - saved, cover = saved / costs;
      const coverMonths = `${oneDecimal.format(cover)}\u00a0${oneDecimal.format(cover) === oneDecimal.format(1) ? 'month' : 'months'}`;
      const coverText = saved > 0 ? `${number(saved)} (${coverMonths})` : '0.00';
      const intro = `Your target is ${number(target)}: ${plural(months, 'month')} of ${number(costs)}.`;
      if (gap <= 0.005) {
        setCells(table, [number(target), coverText, '0.00', 'Reached', 'Already there']);
        result.textContent = `${intro} Your ${number(saved)} already covers it: ${coverMonths} of essential costs` + (gap < -0.005 ? `, ${number(-gap)} more than the target.` : '.');
        return;
      }
      const have = saved > 0 ? ` You have ${number(saved)}, enough for ${coverMonths}, so ${number(gap)} is still to save.` : ` Nothing is saved for it yet, so all of it is still to save.`;
      if (!(monthly > 0)) {
        setCells(table, [number(target), coverText, number(gap), 'Add a monthly amount', '—']);
        result.textContent = intro + have + ' Add a monthly amount to see when you would get there.'; return;
      }
      const needed = Math.ceil(gap / monthly - 1e-9);
      if (needed > 1200) {
        setCells(table, [number(target), coverText, number(gap), 'More than 100 years', '—']);
        result.textContent = intro + have + ` At ${number(monthly)} a month that takes more than 100 years. Try a larger monthly amount.`; return;
      }
      const now = new Date(), when = monthYear.format(new Date(now.getFullYear(), now.getMonth() + needed, 1));
      setCells(table, [number(target), coverText, number(gap), `${needed}${span(needed)}`, when]);
      result.textContent = intro + have + ` At ${number(monthly)} a month that takes ${plural(needed, 'month')}${span(needed)}: adding it from next month, you get there in ${when}.`;
    });
  }

  // Net worth: what is owned minus what is owed, the total derived from the two so the three always agree.
  const worth = document.querySelector('#worth-form');
  if (worth) {
    const result = document.querySelector('#worth-result'), table = document.querySelector('#worth-table');
    const assets = document.querySelector('#worth-assets'), debts = document.querySelector('#worth-debts');
    editableRows(assets, document.querySelector('#worth-add-asset'));
    editableRows(debts, document.querySelector('#worth-add-debt'));
    const total = box => [...box.querySelectorAll('[name=amount]')].reduce((sum, input) => sum + cents(amountOf(input)), 0);
    worth.addEventListener('submit', event => {
      event.preventDefault();
      if (!worth.reportValidity()) return;
      const owned = total(assets), owed = total(debts);
      if (![owned, owed].every(Number.isFinite)) { result.textContent = 'Use amounts of zero or more.'; return; }
      const net = (owned - owed) / 100;
      setCells(table, [number(owned / 100), number(owed / 100), number(net)]);
      if (owned === 0 && owed === 0) { result.textContent = 'Enter what you own and what you owe.'; return; }
      let text = `${number(owned / 100)} owned − ${number(owed / 100)} owed = ${number(net)} net worth.`;
      if (net < 0) text += ` You owe ${number(-net)} more than you own.`;
      if (owned > 0 && owed > 0) text += ` What you owe is ${oneDecimal.format(owed / owned * 100)}% of what you own.`;
      result.textContent = text;
    });
  }
})();
