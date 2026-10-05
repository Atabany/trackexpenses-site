/* No tracking, requests, storage or input persistence. */
(() => {
  const film = document.querySelector('#hero-film');
  if (film) {
    const toggle = document.querySelector('#film-toggle');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = navigator.connection?.saveData;
    toggle.hidden = false;
    const label = () => { toggle.textContent = film.paused ? 'Play animation' : 'Pause animation'; };
    const start = () => {
      if (!film.querySelector('source').src) { film.querySelector('source').src = film.querySelector('source').dataset.src; film.load(); }
      film.play().catch(label);
    };
    toggle.addEventListener('click', () => film.paused ? start() : film.pause());
    film.addEventListener('play', label); film.addEventListener('pause', label);
    reduced.addEventListener('change', () => { if (reduced.matches) film.pause(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) film.pause(); });
    if (!reduced.matches && !saveData) start();
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
