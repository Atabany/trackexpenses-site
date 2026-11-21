/* The download pages (21 November 2026). No tracking, requests or storage: this reads the browser's own user agent and
   referrer, here, to decide what to show and which App Store campaign tag the badge carries. Nothing is sent anywhere;
   Apple receives the tag only if the visitor taps the badge, as with every store link on this site. */
(() => {
  // The head has already named the device (data-platform), before the first paint; download.css shows its blocks.
  const ua = navigator.userAgent || '';

  // The campaign tag. ?ref= wins (site.js has already written it into every store link). Without one, the app whose
  // in-app browser opened the page, or the site that sent the visitor, names it: dl-tiktok, dl-instagram, ... so the
  // clean link trackexpenses.app/download can sit in every bio and App Analytics → Campaigns still tells them apart.
  const params = new URLSearchParams(location.search);
  const ref = params.get('ref');
  const hasRef = !!ref && /^[a-z0-9-]{2,32}$/.test(ref);
  if (!hasRef) {
    const apps = [[/musical_ly|BytedanceWebview|TikTok|trill_/i, 'tiktok'], [/Instagram/i, 'instagram'], [/FBAN|FBAV|FB_IAB|FBIOS|FB4A/, 'facebook'],
      [/Barcelona/, 'threads'], [/Snapchat/i, 'snapchat'], [/Pinterest/i, 'pinterest'], [/LinkedInApp/i, 'linkedin'], [/Reddit/i, 'reddit'],
      [/Telegram/i, 'telegram'], [/WhatsApp/i, 'whatsapp'], [/Line\//, 'line']];
    const sites = [[/(^|\.)tiktok\.com$/, 'tiktok'], [/(^|\.)instagram\.com$/, 'instagram'], [/(^|\.)(facebook|fb)\.com$/, 'facebook'],
      [/(^|\.)threads\.(net|com)$/, 'threads'], [/^t\.co$|(^|\.)(x|twitter)\.com$/, 'x'], [/(^|\.)youtube\.com$|^youtu\.be$/, 'youtube'],
      [/(^|\.)reddit\.com$/, 'reddit'], [/(^|\.)snapchat\.com$/, 'snapchat'], [/(^|\.)pinterest\./, 'pinterest'], [/(^|\.)linkedin\.com$|^lnkd\.in$/, 'linkedin'],
      [/(^|\.)whatsapp\.(com|net)$|^wa\.me$/, 'whatsapp'], [/(^|\.)t\.me$|(^|\.)telegram\.org$/, 'telegram'], [/(^|\.)google\./, 'google'], [/(^|\.)bing\.com$/, 'bing']];
    let source = (apps.find(([re]) => re.test(ua)) || [])[1];
    if (!source) {
      // The English page forwards to the visitor's language and hands the original referrer on as ?via=.
      let host = params.get('via') || '';
      try { if (!host && document.referrer) host = new URL(document.referrer).hostname; } catch {}
      host = host.toLowerCase();
      if (host && host !== location.hostname) source = (sites.find(([re]) => re.test(host)) || [])[1];
    }
    if (source) {
      document.querySelectorAll('a[href*="apps.apple.com/app/apple-store/"]').forEach(a => {
        try { const u = new URL(a.href); if (u.searchParams.has('ct')) { u.searchParams.set('ct', 'dl-' + source); a.href = u.toString(); } } catch {}
      });
    }
  }

  // The language links keep the visit's tag and source; the English one also says English was chosen, so it doesn't forward again.
  document.querySelectorAll('.dl-lang-sheet a').forEach(a => {
    try {
      const u = new URL(a.href);
      if (hasRef) u.searchParams.set('ref', ref);
      if (params.get('via')) u.searchParams.set('via', params.get('via'));
      if (a.hreflang === 'en') u.searchParams.set('lang', 'en');
      a.href = u.toString();
    } catch {}
  });
  // The language menu closes on a tap outside it and on Escape (it works without script as a plain disclosure).
  const menu = document.querySelector('.dl-lang');
  if (menu) {
    document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  }
})();
